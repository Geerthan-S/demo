import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import {
  MAX_RESUME_BYTES,
  RESUME_TYPES,
  escapeHtml,
  makeSafeUploadName,
} from "@/lib/server-security";

const applicationSchema = z.object({
  jobOpeningId: z.string().trim().min(1, "Job opening ID is required"),
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Phone number is required"),
  city: z.string().trim().optional(),
  experience: z.string().trim().optional(),
  currentEmployer: z.string().trim().optional(),
  currentCTC: z.string().trim().optional(),
  expectedCTC: z.string().trim().optional(),
  noticePeriod: z.string().trim().optional(),
  linkedin: z.string().trim().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().trim().url("Enter a valid portfolio URL").optional().or(z.literal("")),
  coverLetter: z.string().trim().optional(),
});

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || undefined;
}

export async function POST(req: Request) {
  try {
    if (!canUseDatabase()) {
      return NextResponse.json({ message: "Database not available" }, { status: 503 });
    }

    const prisma = getPrisma();
    const formData = await req.formData();
    const resume = formData.get("resume");

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ message: "Resume file is required" }, { status: 400 });
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ message: "Resume must be less than 5MB" }, { status: 400 });
    }

    if (!RESUME_TYPES.has(resume.type)) {
      return NextResponse.json({ message: "Invalid file type. Only PDF, DOC, or DOCX allowed." }, { status: 400 });
    }

    const parsed = applicationSchema.safeParse({
      jobOpeningId: formData.get("jobOpeningId"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: optionalString(formData.get("city")),
      experience: optionalString(formData.get("experience")),
      currentEmployer: optionalString(formData.get("currentEmployer")),
      currentCTC: optionalString(formData.get("currentCTC")),
      expectedCTC: optionalString(formData.get("expectedCTC")),
      noticePeriod: optionalString(formData.get("noticePeriod")),
      linkedin: optionalString(formData.get("linkedin")),
      portfolio: optionalString(formData.get("portfolio")),
      coverLetter: optionalString(formData.get("coverLetter")),
    });

    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json({ message }, { status: 422 });
    }

    const data = parsed.data;
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        email: data.email,
        jobOpeningId: data.jobOpeningId,
      },
    });

    if (existingApplication) {
      return NextResponse.json({ message: "You have already applied for this position." }, { status: 400 });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());
    const uploadDir = join(process.cwd(), ".data", "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });

    const storageName = makeSafeUploadName(resume.name, resume.type);
    const filePath = join(uploadDir, storageName);
    await writeFile(filePath, buffer, { flag: "wx" });

    const jobApplication = await prisma.jobApplication.create({
      data: {
        jobOpeningId: data.jobOpeningId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        experience: data.experience,
        currentEmployer: data.currentEmployer,
        currentCTC: data.currentCTC,
        expectedCTC: data.expectedCTC,
        noticePeriod: data.noticePeriod,
        linkedin: data.linkedin || null,
        portfolio: data.portfolio || null,
        coverLetter: data.coverLetter,
        resumeUrl: `private://resumes/${storageName}`,
        resumeFilename: resume.name,
        source: "Website",
        status: "New",
      },
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const hrEmail = process.env.HR_EMAIL_ADDRESS || "admin@docksideconstructions.com";
      const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://docksideconstructions.com";
      const candidateName = escapeHtml(jobApplication.fullName);
      const candidateEmail = escapeHtml(jobApplication.email);
      const candidatePhone = escapeHtml(jobApplication.phone);
      const candidateExperience = escapeHtml(jobApplication.experience || "Not provided");

      await resend.emails.send({
        from: "Careers <noreply@docksideconstructions.com>",
        to: [hrEmail],
        subject: `New Career Application: ${jobApplication.fullName} - ${data.jobOpeningId}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Candidate:</strong> ${candidateName}</p>
          <p><strong>Position ID:</strong> ${escapeHtml(data.jobOpeningId)}</p>
          <p><strong>Phone:</strong> ${candidatePhone}</p>
          <p><strong>Experience:</strong> ${candidateExperience}</p>
          <p><strong>Email:</strong> ${candidateEmail}</p>
          <hr>
          <a href="${escapeHtml(appUrl)}/admin/job-applications/${jobApplication.id}">View Application</a>
        `,
        attachments: [
          {
            filename: resume.name,
            content: buffer,
          },
        ],
      });

      await resend.emails.send({
        from: "Dockside Careers <noreply@docksideconstructions.com>",
        to: [jobApplication.email],
        subject: "Application Received - Dockside Constructions",
        html: `
          <p>Hi ${candidateName},</p>
          <p>Thank you for applying for the position (Ref: ${escapeHtml(jobApplication.applicationId)}).</p>
          <p>Our recruitment team has received your application successfully and will review your profile.</p>
          <p>Best regards,<br>Dockside Constructions Recruitment Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true, applicationId: jobApplication.applicationId }, { status: 201 });
  } catch (error) {
    console.error("Application Submission Error:", error);
    return NextResponse.json({ message: "An unexpected error occurred while processing the application." }, { status: 500 });
  }
}
