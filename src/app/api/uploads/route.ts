import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { CMS_UPLOAD_TYPES, MAX_CMS_UPLOAD_BYTES } from "@/lib/server-security";

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({ error: "Cloudinary env vars not configured" }, { status: 503 });
  }

  configureCloudinary();
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });
  if (file.size > MAX_CMS_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File must be less than 10MB" }, { status: 413 });
  }
  if (!CMS_UPLOAD_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only PDF, JPG, PNG, and WebP uploads are allowed" }, { status: 415 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;
  const upload = await cloudinary.uploader.upload(dataUri, {
    folder: "dockside-cms",
    resource_type: file.type === "application/pdf" ? "raw" : "image",
  });

  if (canUseDatabase()) {
    await getPrisma().mediaAsset.create({
      data: {
        publicId: upload.public_id,
        secureUrl: upload.secure_url,
        resourceType: upload.resource_type,
        alt: String(formData.get("alt") ?? "") || undefined,
      },
    });
  }

  return NextResponse.json({
    publicId: upload.public_id,
    secureUrl: upload.secure_url,
    resourceType: upload.resource_type,
  });
}

