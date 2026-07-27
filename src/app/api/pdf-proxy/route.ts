import { NextRequest, NextResponse } from "next/server";
import { isAllowedRemotePdfUrl } from "@/lib/server-security";

const MAX_PDF_BYTES = 15 * 1024 * 1024;

export async function GET(request: NextRequest) {
  try {
    const fileUrl = request.nextUrl.searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    if (!isAllowedRemotePdfUrl(fileUrl)) {
      return NextResponse.json({ error: "URL is not allowed" }, { status: 400 });
    }

    const response = await fetch(fileUrl, {
      headers: {
        "User-Agent": "Dockside PDF Proxy",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({ error: "Redirects are not allowed" }, { status: 400 });
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch PDF: ${response.statusText}` },
        { status: response.status },
      );
    }

    const contentLength = Number(response.headers.get("content-length") ?? "0");
    if (contentLength > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "PDF is too large" }, { status: 413 });
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType && !contentType.toLowerCase().includes("pdf")) {
      return NextResponse.json({ error: "URL did not return a PDF" }, { status: 415 });
    }

    const pdfBuffer = await response.arrayBuffer();
    if (pdfBuffer.byteLength > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "PDF is too large" }, { status: 413 });
    }

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("PDF proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDF" },
      { status: 500 },
    );
  }
}
