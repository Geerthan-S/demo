import { randomUUID } from "crypto";
import { isIP } from "net";
import path from "path";

export const MAX_CONTACT_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const MAX_CMS_UPLOAD_BYTES = 10 * 1024 * 1024;

export const CONTACT_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

export const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const CMS_UPLOAD_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const PRIVATE_HOSTS = new Set(["localhost", "metadata.google.internal"]);

function extensionForMime(type: string) {
  switch (type) {
    case "application/pdf":
      return ".pdf";
    case "application/msword":
      return ".doc";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return ".docx";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    default:
      return "";
  }
}

export function makeSafeUploadName(originalName: string, mimeType: string) {
  const parsed = path.parse(originalName);
  const base = parsed.name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "upload";
  const ext = extensionForMime(mimeType) || parsed.ext.replace(/[^\w.]/g, "").slice(0, 12);
  return `${Date.now()}-${randomUUID()}-${base}${ext}`;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function nl2brEscaped(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

export function isAllowedRemotePdfUrl(rawUrl: string) {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  const host = url.hostname.toLowerCase();
  if (PRIVATE_HOSTS.has(host) || host.endsWith(".local")) return false;

  const ipVersion = isIP(host);
  if (ipVersion === 4) {
    const [a, b] = host.split(".").map(Number);
    if (a === 10 || a === 127 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) {
      return false;
    }
    if (a === 169 && b === 254) return false;
  }
  if (ipVersion === 6 && (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80"))) {
    return false;
  }

  const allowedHosts = (process.env.PDF_PROXY_ALLOWED_HOSTS ?? "drive.google.com,docs.google.com")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return allowedHosts.some((allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`));
}
