import { Prisma, ProjectStatus } from "@prisma/client";
import { z } from "zod";
import { editableProjectCategories, normalizeProjectCategory } from "@/lib/project-categories";
import { slugify } from "@/lib/slug";

const assetPathSchema = z
  .string()
  .trim()
  .min(1, "Enter an image URL or public asset path")
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
    "Use a full URL or a public path starting with /",
  );

const optionalAssetPathSchema = z.preprocess((value) => {
  const text = String(value ?? "").trim();
  return text || undefined;
}, assetPathSchema.optional());

const optionalUrlSchema = z.preprocess((value) => {
  const text = String(value ?? "").trim();
  return text || undefined;
}, z.string().url("Enter a full URL, including https://").optional());

const stringListSchema = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  return String(value ?? "")
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}, z.array(z.string().trim().min(1)));

export const projectJsonSchema = z.object({
  title: z.string().trim().min(3, "Enter at least 3 characters"),
  slug: z.string().trim().min(3, "Enter at least 3 characters"),
  clientName: z.string().trim().min(2, "Enter at least 2 characters"),
  clientType: z.enum(editableProjectCategories).optional(),
  clientLogo: optionalAssetPathSchema,
  featuredImage: assetPathSchema,
  gallery: stringListSchema.pipe(z.array(assetPathSchema).min(1, "Add at least one image")),
  location: z.string().trim().min(2, "Enter at least 2 characters"),
  scopeOfWork: z.string().trim().min(10, "Enter at least 10 characters"),
  timeline: z.string().trim().min(2, "Enter at least 2 characters"),
  projectValue: z.string().trim().min(2, "Enter at least 2 characters"),
  contractValue: z.string().trim().optional(),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.IN_PROGRESS),
  servicesUsed: stringListSchema.pipe(z.array(z.string().trim().min(1)).min(1, "Add at least one nature of work")),
  industry: z.string().trim().min(2, "Enter at least 2 characters"),
  summary: z.string().trim().min(10, "Enter at least 10 characters"),
  keyAchievements: stringListSchema.optional(),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export const projectPatchJsonSchema = projectJsonSchema.partial();

export const clientJsonSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters"),
  slug: z.string().trim().min(2, "Enter at least 2 characters"),
  logoUrl: optionalAssetPathSchema,
  industry: z.string().trim().optional(),
  website: optionalUrlSchema,
  testimonial: z.string().trim().optional(),
  featured: z.boolean().default(true),
});

export const clientPatchJsonSchema = clientJsonSchema.partial();

export function prepareProjectJsonInput(body: Record<string, unknown>, createSlugFromTitle = true) {
  const prepared: Record<string, unknown> = {
    ...body,
    slug: body.slug || (createSlugFromTitle && typeof body.title === "string" ? slugify(body.title) : body.slug),
  };

  if (createSlugFromTitle || "clientType" in body) {
    prepared.clientType = normalizeProjectCategory(String(body.clientType ?? ""));
  }

  return {
    ...prepared,
  };
}

export function prepareClientJsonInput(body: Record<string, unknown>, createSlugFromName = true) {
  return {
    ...body,
    slug: body.slug || (createSlugFromName && typeof body.name === "string" ? slugify(body.name) : body.slug),
  };
}

export function formatZodIssues(error: z.ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "form",
    message: issue.message,
  }));
}

export function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}
