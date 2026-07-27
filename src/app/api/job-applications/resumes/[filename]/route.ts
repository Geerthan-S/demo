import { readFile } from "fs/promises";
import { basename, extname, join } from "path";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  const safeName = basename(decodedFilename);
  if (safeName !== decodedFilename) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = join(process.cwd(), ".data", "uploads", "resumes", safeName);
  try {
    const file = await readFile(filePath);
    const contentType = CONTENT_TYPES[extname(safeName).toLowerCase()] ?? "application/octet-stream";
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeName.replace(/"/g, "")}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }
}
