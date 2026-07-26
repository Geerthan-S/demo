import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

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
      company: formData.get("company") as string || undefined,
      grievanceCategory: formData.get("grievanceCategory") as string || undefined,
      projectLocation: formData.get("projectLocation") as string || undefined,
      priorityLevel: formData.get("priorityLevel") as string || undefined,
      preferredContactMethod: formData.get("preferredContactMethod") as string,
      message: formData.get("message") as string,
    };

    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const validatedData = parsed.data;

    // Handle file attachments
    const attachments = formData.getAll("attachments") as File[];
    const attachmentPaths: string[] = [];

    if (attachments.length > 0) {
      const uploadDir = join(process.cwd(), "public", "uploads", "contact-attachments");

      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }

      for (const file of attachments) {
        if (file.size > 0) {
          const timestamp = Date.now();
          const fileName = `${timestamp}-${file.name}`;
          const filePath = join(uploadDir, fileName);

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filePath, buffer);

          attachmentPaths.push(`/uploads/contact-attachments/${fileName}`);
        }
      }
    }

    // Save to database
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
        // Continue with email even if database save fails
      }
    }

    // Format email content based on inquiry type
    const emailSubject =
      validatedData.inquiryType === "Grievance"
        ? `🚨 Grievance: ${validatedData.grievanceCategory || "Unspecified"}`
        : validatedData.inquiryType === "Project"
          ? `📋 Project Request: ${validatedData.name}`
          : `💬 General Inquiry: ${validatedData.name}`;

    const emailHtml = `
      <h2>New ${validatedData.inquiryType} Inquiry</h2>

      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Phone:</strong> ${validatedData.phone}</p>
      ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ""}
      <p><strong>Preferred Contact Method:</strong> ${validatedData.preferredContactMethod}</p>

      ${validatedData.inquiryType === "Grievance" ? `
        <h3>Grievance Details</h3>
        <p><strong>Category:</strong> ${validatedData.grievanceCategory || "Not specified"}</p>
        <p><strong>Priority Level:</strong> ${validatedData.priorityLevel || "Not specified"}</p>
      ` : ""}

      ${validatedData.inquiryType === "Project" ? `
        <h3>Project Details</h3>
        <p><strong>Priority Level:</strong> ${validatedData.priorityLevel || "Not specified"}</p>
      ` : ""}

      ${validatedData.projectLocation ? `<p><strong>Project/Site Location:</strong> ${validatedData.projectLocation}</p>` : ""}

      <h3>Message</h3>
      <p>${validatedData.message.replace(/\n/g, "<br>")}</p>

      ${attachmentPaths.length > 0 ? `
        <h3>Attachments</h3>
        <ul>
          ${attachmentPaths.map(path => `<li>${path.split("/").pop()}</li>`).join("")}
        </ul>
        <p><em>Note: Attachments are saved on the server at the paths above</em></p>
      ` : ""}

      <hr>
      <p style="color: #666; font-size: 12px;">
        Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
      </p>
    `;

    // Send email using Nodemailer
    console.log("[contact] Attempting to send email...");
    console.log("[contact] GMAIL_USER:", process.env.GMAIL_USER);
    console.log("[contact] Email to:", process.env.CONTACT_EMAIL);
    console.log("[contact] Email subject:", emailSubject);

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

      console.log("[contact] Email sent successfully! Message ID:", info.messageId);
    } catch (emailError) {
      console.error("[contact] Email send error:", emailError);
      return NextResponse.json(
        { error: "Form submitted but email notification failed. We'll review your submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
