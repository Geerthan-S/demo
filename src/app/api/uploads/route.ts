import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

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

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;
  const upload = await cloudinary.uploader.upload(dataUri, { folder: "dockside-cms" });

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

  return NextResponse.json(upload);
}

