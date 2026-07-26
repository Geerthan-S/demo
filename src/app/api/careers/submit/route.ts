import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");

export async function POST(req: Request) {
    try {
        const prisma = getPrisma();
        const formData = await req.formData();

        // 1. Extract File
        const resume = formData.get("resume") as File | null;
        if (!resume) {
            return NextResponse.json({ message: "Resume file is required" }, { status: 400 });
        }

        // 2. Validate File Size & Type
        if (resume.size > 5 * 1024 * 1024) {
            return NextResponse.json({ message: "Resume must be less than 5MB" }, { status: 400 });
        }
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validTypes.includes(resume.type)) {
            return NextResponse.json({ message: "Invalid file type. Only PDF or DOCX allowed." }, { status: 400 });
        }

        // 3. Save File Locally
        const buffer = Buffer.from(await resume.arrayBuffer());
        const uploadDir = join(process.cwd(), "public/uploads/resumes");

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const uniqueFilename = `${Date.now()}-${resume.name.replace(/\s+/g, "_")}`;
        const filePath = join(uploadDir, uniqueFilename);
        await writeFile(filePath, buffer);
        const resumeUrl = `/uploads/resumes/${uniqueFilename}`;

        // 4. Save to Database
        const jobOpeningId = formData.get("jobOpeningId") as string;
        const email = formData.get("email") as string;

        // Optional Check: Disable duplicate application to same post
        const existingApplication = await prisma.jobApplication.findFirst({
            where: {
                email,
                jobOpeningId
            }
        });

        if (existingApplication) {
            // Return early without crashing
            return NextResponse.json({ message: "You have already applied for this position." }, { status: 400 });
        }

        const jobApplication = await prisma.jobApplication.create({
            data: {
                jobOpeningId: jobOpeningId,
                fullName: formData.get("fullName") as string,
                email: email,
                phone: formData.get("phone") as string,
                city: formData.get("city") as string,
                experience: formData.get("experience") as string,
                currentEmployer: formData.get("currentEmployer") as string || null,
                currentCTC: formData.get("currentCTC") as string || null,
                expectedCTC: formData.get("expectedCTC") as string || null,
                noticePeriod: formData.get("noticePeriod") as string || null,
                linkedin: formData.get("linkedin") as string || null,
                portfolio: formData.get("portfolio") as string || null,
                coverLetter: formData.get("coverLetter") as string || null,
                resumeUrl: resumeUrl,
                resumeFilename: resume.name,
                source: "Website",
                status: "New"
            }
        });

        const hrEmail = process.env.HR_EMAIL_ADDRESS || "admin@docksideconstructions.com";
        const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://docksideconstructions.com";

        // Dispatch HR Notification
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Careers <noreply@docksideconstructions.com>",
                to: [hrEmail],
                subject: `New Career Application: ${jobApplication.fullName} - ${jobOpeningId}`,
                html: `
                  <h2>New Job Application Received</h2>
                  <p><strong>Candidate:</strong> ${jobApplication.fullName}</p>
                  <p><strong>Position ID:</strong> ${jobOpeningId}</p>
                  <p><strong>Phone:</strong> ${jobApplication.phone}</p>
                  <p><strong>Experience:</strong> ${jobApplication.experience}</p>
                  <p><strong>Email:</strong> ${jobApplication.email}</p>
                  <hr />
                  <a href="${appUrl}/admin/recruitment/applications" style="background-color: #8B3A4A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Application</a>
                `,
                attachments: [
                    {
                        filename: resume.name,
                        content: buffer
                    }
                ]
            });

            // Dispatch Candidate Confirmation
            await resend.emails.send({
                from: "Dockside Careers <noreply@docksideconstructions.com>",
                to: [jobApplication.email],
                subject: "Application Received - Dockside Constructions",
                html: `
                  <p>Hi ${jobApplication.fullName},</p>
                  <p>Thank you for applying for the position (Ref: ${jobApplication.applicationId}).</p>
                  <p>Our recruitment team has received your application successfully and will review your profile. You can expect a response from our team within 2-3 business days if your profile is shortlisted.</p>
                  <p>Best regards,<br/>Dockside Constructions Recruitment Team</p>
                `
            });
        }

        return NextResponse.json({ success: true, applicationId: jobApplication.applicationId }, { status: 201 });

    } catch (error: any) {
        console.error("Application Submission Error:", error);
        return NextResponse.json({ message: "An unexpected error occurred rendering the payload", error: error.message }, { status: 500 });
    }
}
