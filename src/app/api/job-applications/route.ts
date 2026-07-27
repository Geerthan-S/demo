import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { MAX_RESUME_BYTES, RESUME_TYPES, makeSafeUploadName } from "@/lib/server-security";

const jobApplicationSchema = z.object({
  jobOpeningId: z.string().trim().min(1, "Job opening ID is required"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Phone number must be at least 6 characters"),
  coverLetter: z.string().trim().optional(),
});

export async function POST(request: NextRequest) {
  try {
    if (!canUseDatabase()) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const formData = await request.formData();
    const resumeFile = formData.get("resume");

    if (!(resumeFile instanceof File) || resumeFile.size === 0) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 422 });
    }

    if (resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be less than 5MB" }, { status: 422 });
    }

    if (!RESUME_TYPES.has(resumeFile.type)) {
      return NextResponse.json({ error: "Invalid file type. Only PDF, DOC, or DOCX allowed." }, { status: 422 });
    }

    const parsed = jobApplicationSchema.safeParse({
      jobOpeningId: formData.get("jobOpeningId"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      coverLetter: formData.get("coverLetter") || undefined,
    });

    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const { jobOpeningId, name, email, phone, coverLetter } = parsed.data;
    const db = getPrisma();
    const existingApplication = await db.jobApplication.findFirst({
      where: { email, jobOpeningId },
    });

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this position." }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), ".data", "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });
    const storageName = makeSafeUploadName(resumeFile.name, resumeFile.type);
    await writeFile(join(uploadDir, storageName), Buffer.from(await resumeFile.arrayBuffer()), { flag: "wx" });

    await db.jobApplication.create({
      data: {
        jobOpeningId,
        fullName: name,
        email,
        phone,
        resumeUrl: `private://resumes/${storageName}`,
        resumeFilename: resumeFile.name,
        coverLetter: coverLetter || null,
        status: "New",
      },
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("[job-applications] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canUseDatabase()) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const applications = await getPrisma().jobApplication.findMany({
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
      { status: 500 },
    );
  }
}
