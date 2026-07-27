import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import {
  CONTACT_ATTACHMENT_TYPES,
  MAX_CONTACT_ATTACHMENT_BYTES,
  escapeHtml,
  makeSafeUploadName,
  nl2brEscaped,
} from "@/lib/server-security";

const contactSchema = z.object({
  inquiryType: z.enum(["General", "Project", "Grievance"]),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  company: z.string().trim().optional(),
  grievanceCategory: z.string().optional(),
  projectLocation: z.string().optional(),
  priorityLevel: z.string().optional(),
  preferredContactMethod: z.enum(["Email", "Phone", "Either"]),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data = {
      inquiryType: formData.get("inquiryType") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: (formData.get("company") as string) || undefined,
      grievanceCategory: (formData.get("grievanceCategory") as string) || undefined,
      projectLocation: (formData.get("projectLocation") as string) || undefined,
      priorityLevel: (formData.get("priorityLevel") as string) || undefined,
      preferredContactMethod: formData.get("preferredContactMethod") as string,
      message: formData.get("message") as string,
    };

    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const validatedData = parsed.data;
    const attachments = formData
      .getAll("attachments")
      .filter((file): file is File => file instanceof File && file.size > 0);
    const attachmentPaths: string[] = [];
    const attachmentNames: string[] = [];

    if (attachments.length > 0) {
      if (attachments.length > 3) {
        return NextResponse.json({ error: "You can upload up to 3 attachments." }, { status: 422 });
      }

      const uploadDir = join(process.cwd(), ".data", "uploads", "contact-attachments");
      await mkdir(uploadDir, { recursive: true });

      for (const file of attachments) {
        if (file.size > MAX_CONTACT_ATTACHMENT_BYTES) {
          return NextResponse.json({ error: `${file.name} exceeds the 5MB attachment limit.` }, { status: 422 });
        }

        if (!CONTACT_ATTACHMENT_TYPES.has(file.type)) {
          return NextResponse.json({ error: `${file.name} must be a PDF, JPG, or PNG file.` }, { status: 422 });
        }

        const fileName = makeSafeUploadName(file.name, file.type);
        const filePath = join(uploadDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer, { flag: "wx" });

        attachmentPaths.push(`private://contact-attachments/${fileName}`);
        attachmentNames.push(file.name);
      }
    }

    if (canUseDatabase()) {
      try {
        await getPrisma().contactMessage.create({
          data: {
            inquiryType: validatedData.inquiryType,
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            company: validatedData.company || "",
            grievanceCategory: validatedData.grievanceCategory || "",
            projectLocation: validatedData.projectLocation || "",
            priorityLevel: validatedData.priorityLevel || "",
            preferredContactMethod: validatedData.preferredContactMethod,
            message: validatedData.message,
            attachments: attachmentPaths,
          },
        });
      } catch (dbError) {
        console.error("[contact] Database save error:", dbError);
      }
    }

    const emailSubject =
      validatedData.inquiryType === "Grievance"
        ? `Grievance: ${validatedData.grievanceCategory || "Unspecified"}`
        : validatedData.inquiryType === "Project"
          ? `Project Request: ${validatedData.name}`
          : `General Inquiry: ${validatedData.name}`;

    const escaped = {
      inquiryType: escapeHtml(validatedData.inquiryType),
      name: escapeHtml(validatedData.name),
      email: escapeHtml(validatedData.email),
      phone: escapeHtml(validatedData.phone),
      company: validatedData.company ? escapeHtml(validatedData.company) : "",
      grievanceCategory: escapeHtml(validatedData.grievanceCategory || "Not specified"),
      priorityLevel: escapeHtml(validatedData.priorityLevel || "Not specified"),
      preferredContactMethod: escapeHtml(validatedData.preferredContactMethod),
      projectLocation: validatedData.projectLocation ? escapeHtml(validatedData.projectLocation) : "",
      message: nl2brEscaped(validatedData.message),
    };

    const emailHtml = `
      <h2>New ${escaped.inquiryType} Inquiry</h2>

      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${escaped.name}</p>
      <p><strong>Email:</strong> ${escaped.email}</p>
      <p><strong>Phone:</strong> ${escaped.phone}</p>
      ${escaped.company ? `<p><strong>Company:</strong> ${escaped.company}</p>` : ""}
      <p><strong>Preferred Contact Method:</strong> ${escaped.preferredContactMethod}</p>

      ${validatedData.inquiryType === "Grievance" ? `
        <h3>Grievance Details</h3>
        <p><strong>Category:</strong> ${escaped.grievanceCategory}</p>
        <p><strong>Priority Level:</strong> ${escaped.priorityLevel}</p>
      ` : ""}

      ${validatedData.inquiryType === "Project" ? `
        <h3>Project Details</h3>
        <p><strong>Priority Level:</strong> ${escaped.priorityLevel}</p>
      ` : ""}

      ${escaped.projectLocation ? `<p><strong>Project/Site Location:</strong> ${escaped.projectLocation}</p>` : ""}

      <h3>Message</h3>
      <p>${escaped.message}</p>

      ${attachmentNames.length > 0 ? `
        <h3>Attachments</h3>
        <ul>
          ${attachmentNames.map((name) => `<li>${escapeHtml(name)}</li>`).join("")}
        </ul>
        <p><em>Note: attachments were stored in private server storage.</em></p>
      ` : ""}

      <hr>
      <p style="color: #666; font-size: 12px;">
        Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
      </p>
    `;

    console.log("[contact] Attempting to send email notification.");

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: `"Dockside Constructions" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL,
        subject: emailSubject,
        html: emailHtml,
      });

      console.log("[contact] Email sent successfully. Message ID:", info.messageId);
    } catch (emailError) {
      console.error("[contact] Email send error:", emailError);
      return NextResponse.json(
        { error: "Form submitted but email notification failed. We'll review your submission." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
