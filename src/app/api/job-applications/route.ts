import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const jobApplicationSchema = z.object({
  jobOpeningId: z.string().min(1, "Job opening ID is required"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Phone number must be at least 6 characters"),
  coverLetter: z.string().trim().optional(),
});

export async function POST(request: NextRequest) {
  try {
    if (!canUseDatabase()) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const resumeFile = formData.get("resume") as File | null;

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 422 }
      );
    }

    const parsed = jobApplicationSchema.safeParse({
      jobOpeningId: formData.get("jobOpeningId"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      coverLetter: formData.get("coverLetter") || undefined,
    });

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const { jobOpeningId, name, email, phone, coverLetter } = parsed.data;

    // Upload resume to Cloudinary
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = `data:${resumeFile.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64File,
        {
          folder: "dockside-cms/resumes",
          resource_type: "auto",
          public_id: `${jobOpeningId}-${Date.now()}-${name.replace(/\s+/g, "-")}`,
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Upload failed"));
        }
      );
    });

    // Save to database
    const db = getPrisma();
    await db.jobApplication.create({
      data: {
        jobOpeningId,
        fullName: name,
        email,
        phone,
        resumeUrl: uploadResult.secure_url,
        coverLetter: coverLetter || null,
        status: "New",
      },
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[job-applications] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!canUseDatabase()) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    const db = getPrisma();
    const applications = await db.jobApplication.findMany({
      include: {
        jobOpening: {
          select: {
            title: true,
            department: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("[job-applications] GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
