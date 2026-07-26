"use server";

import { Prisma, ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin, requireManager } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { editableProjectCategories, normalizeProjectCategory } from "@/lib/project-categories";

const listFromField = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);

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

const fieldLabels: Record<string, string> = {
  title: "Title",
  slug: "Slug",
  clientName: "Client name",
  clientType: "Project category",
  clientLogo: "Client logo",
  featuredImage: "Featured image",
  gallery: "Gallery",
  location: "Location",
  scopeOfWork: "Scope of work",
  timeline: "Timeline",
  projectValue: "Total contract value",
  contractValue: "Contract value",
  servicesUsed: "Nature of works",
  industry: "Industry",
  summary: "Summary",
  keyAchievements: "Key achievements",
  logoUrl: "Logo URL",
  website: "Website",
  description: "Description",
  heroTitle: "Hero title",
  heroDescription: "Hero description",
  heroImage: "Hero image",
};

function formatValidationError(error: z.ZodError) {
  return error.issues
    .map((issue) => {
      const key = String(issue.path[0] ?? "");
      return `${fieldLabels[key] ?? "Form"}: ${issue.message}`;
    })
    .join(" ");
}

function redirectWithError(path: string, message: string): never {
  const separator = path.includes("?") ? "&" : "?";
  redirect(`${path}${separator}error=${encodeURIComponent(message)}`);
}

function parseOrRedirect<T>(schema: z.ZodSchema<T>, data: unknown, path: string): T {
  const result = schema.safeParse(data);
  if (!result.success) redirectWithError(path, formatValidationError(result.error));
  return result.data;
}

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

const projectSchema = z.object({
  title: z.string().trim().min(3, "Enter at least 3 characters"),
  slug: z.string().trim().min(3, "Enter at least 3 characters"),
  clientName: z.string().trim().min(2, "Enter at least 2 characters"),
  // Removed from form: clientType, clientLogo, gallery, keyAchievements, seoTitle, seoDescription, published, featured
  clientType: z.string().optional(),
  clientLogo: optionalAssetPathSchema,
  featuredImage: assetPathSchema,
  gallery: z.array(assetPathSchema).optional().default([]),
  location: z.string().trim().min(2, "Enter at least 2 characters"),
  scopeOfWork: z.string().trim().min(10, "Enter at least 10 characters"),
  timeline: z.string().trim().min(2, "Enter at least 2 characters"),
  projectValue: z.string().trim().min(2, "Enter at least 2 characters"),
  contractValue: z.string().trim().optional(),
  status: z.nativeEnum(ProjectStatus),
  servicesUsed: z.array(z.string().trim()).min(1, "Add at least one nature of work"),
  industry: z.string().trim().min(2, "Enter at least 2 characters"),
  summary: z.string().trim().min(10, "Enter at least 10 characters"),
  keyAchievements: z.array(z.string().trim()).optional(),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

function projectDataFromForm(formData: FormData, failurePath: string) {
  const title = String(formData.get("title") ?? "");
  const contractValue = String(formData.get("contractValue") ?? "");
  return parseOrRedirect(projectSchema, {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    clientName: String(formData.get("clientName") ?? ""),
    clientType: String(formData.get("clientType") ?? "") || undefined,
    clientLogo: String(formData.get("clientLogo") ?? "") || undefined,
    featuredImage: String(formData.get("featuredImage") ?? ""),
    gallery: formData.has("gallery") ? listFromField(formData.get("gallery")) : [],
    location: String(formData.get("location") ?? ""),
    scopeOfWork: String(formData.get("scopeOfWork") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    projectValue: contractValue || String(formData.get("projectValue") ?? ""),
    contractValue: contractValue || undefined,
    status: String(formData.get("status") ?? "IN_PROGRESS"),
    servicesUsed: listFromField(formData.get("servicesUsed")),
    industry: String(formData.get("industry") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    keyAchievements: formData.has("keyAchievements") ? listFromField(formData.get("keyAchievements")) : [],
    seoTitle: String(formData.get("seoTitle") ?? "") || undefined,
    seoDescription: String(formData.get("seoDescription") ?? "") || undefined,
    published: formData.has("published") ? formData.get("published") === "on" : true,
    featured: formData.has("featured") ? formData.get("featured") === "on" : false,
  }, failurePath);
}

export async function createProject(formData: FormData) {
  const session = await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/projects?database=missing");

  const data = projectDataFromForm(formData, "/admin/projects/new");
  let project;
  try {
    project = await getPrisma().project.create({
      data: { ...data, authorId: session.user.id },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError("/admin/projects/new", "A project with this slug already exists. Use a unique SEO slug.");
    }
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/projects?database=missing");

  const failurePath = `/admin/projects/${id}/edit`;
  const data = projectDataFromForm(formData, failurePath);
  const db = getPrisma();
  const existing = await db.project.findUnique({ where: { id }, select: { slug: true } });
  let project;
  try {
    project = await db.project.update({ where: { id }, data });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError(failurePath, "A project with this slug already exists. Use a unique SEO slug.");
    }
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/projects");
  if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireManager();
  if (!canUseDatabase()) redirect("/admin/projects?database=missing");

  const db = getPrisma();
  const existing = await db.project.findUnique({ where: { id }, select: { slug: true } });
  await db.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
  revalidatePath("/admin/projects");
}

const clientSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters"),
  slug: z.string().trim().min(2, "Enter at least 2 characters"),
  logoUrl: optionalAssetPathSchema,
  industry: z.string().trim().optional(),
  website: z.string().trim().url("Enter a full website URL, including https://").optional().or(z.literal("")),
  testimonial: z.string().trim().optional(),
  featured: z.boolean(),
});



function clientDataFromForm(formData: FormData, failurePath: string) {
  const name = String(formData.get("name") ?? "");
  return parseOrRedirect(clientSchema, {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    logoUrl: String(formData.get("logoUrl") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    website: String(formData.get("website") ?? ""),
    testimonial: String(formData.get("testimonial") ?? ""),
    featured: formData.get("featured") === "on",
  }, failurePath);
}

export async function createClient(formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/clients?database=missing");

  try {
    await getPrisma().client.create({ data: clientDataFromForm(formData, "/admin/clients/new") });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError("/admin/clients/new", "A client with this slug already exists. Use a unique slug.");
    }
    throw error;
  }
  revalidatePath("/");
  redirect("/admin/clients");
}

export async function updateClient(id: string, formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/clients?database=missing");

  const failurePath = `/admin/clients/${id}/edit`;
  try {
    await getPrisma().client.update({ where: { id }, data: clientDataFromForm(formData, failurePath) });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError(failurePath, "A client with this slug already exists. Use a unique slug.");
    }
    throw error;
  }
  revalidatePath("/");
  redirect("/admin/clients");
}

export async function deleteClient(id: string) {
  await requireManager();
  if (!canUseDatabase()) redirect("/admin/clients?database=missing");

  await getPrisma().client.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/clients");
}


// ─── Equipment ────────────────────────────────────────────────────────────────

const equipmentSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters for the name"),
  slug: z.string().trim().min(2, "Enter at least 2 characters for the slug"),
  imageUrl: optionalAssetPathSchema,
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  capacity: z.string().trim().optional(),
  description: z.string().trim().optional(),
  manufacturer: z.string().trim().optional(),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1).optional().or(z.literal(0)).transform((v) => (v === 0 ? undefined : v)),
  status: z.string().trim().min(2, "Enter a status"),
  sortOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean(),
});

function equipmentDataFromForm(formData: FormData, failurePath: string) {
  const name = String(formData.get("name") ?? "");
  return parseOrRedirect(equipmentSchema, {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    imageUrl: String(formData.get("imageUrl") ?? "") || undefined,
    quantity: String(formData.get("quantity") ?? "1"),
    capacity: String(formData.get("capacity") ?? "") || undefined,
    description: String(formData.get("description") ?? "") || undefined,
    manufacturer: String(formData.get("manufacturer") ?? "") || undefined,
    year: Number(formData.get("year") ?? 0) || 0,
    status: String(formData.get("status") ?? "Active"),
    sortOrder: String(formData.get("sortOrder") ?? "0"),
    published: formData.get("published") === "on",
  }, failurePath);
}

export async function createEquipment(formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/equipment?database=missing");

  const data = equipmentDataFromForm(formData, "/admin/equipment/new");
  try {
    await getPrisma().equipment.create({ data });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError("/admin/equipment/new", "An equipment item with this slug already exists.");
    }
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/equipment-fleet");
  redirect("/admin/equipment?saved=1");
}

export async function updateEquipment(id: string, formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect(`/admin/equipment/${id}/edit?database=missing`);

  const failurePath = `/admin/equipment/${id}/edit`;
  const data = equipmentDataFromForm(formData, failurePath);
  try {
    await getPrisma().equipment.update({ where: { id }, data });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirectWithError(failurePath, "An equipment item with this slug already exists.");
    }
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/equipment-fleet");
  revalidatePath("/admin/equipment");
  redirect("/admin/equipment?saved=1");
}

export async function deleteEquipment(id: string) {
  await requireManager();
  if (!canUseDatabase()) redirect("/admin/equipment?database=missing");

  await getPrisma().equipment.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/equipment-fleet");
  revalidatePath("/admin/equipment");
}

// ─── Downloads ────────────────────────────────────────────────────────────────

const downloadSchema = z.object({
  title: z.string().trim().min(2, "Enter at least 2 characters for the title"),
  category: z.string().trim().min(2, "Select or enter a category"),
  fileUrl: assetPathSchema,
  fileType: z.string().trim().default("pdf"),
  sortOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean(),
  downloadEnabled: z.boolean(),
});

function downloadDataFromForm(formData: FormData, failurePath: string) {
  return parseOrRedirect(downloadSchema, {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    fileUrl: String(formData.get("fileUrl") ?? ""),
    fileType: String(formData.get("fileType") ?? "pdf"),
    sortOrder: String(formData.get("sortOrder") ?? "0"),
    published: formData.get("published") === "on",
    downloadEnabled: formData.get("downloadEnabled") === "on",
  }, failurePath);
}

export async function createDownload(formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/downloads?database=missing");

  const data = downloadDataFromForm(formData, "/admin/downloads/new");
  await getPrisma().download.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/downloads");
  redirect("/admin/downloads?saved=1");
}

export async function updateDownload(id: string, formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect(`/admin/downloads/${id}/edit?database=missing`);

  const failurePath = `/admin/downloads/${id}/edit`;
  const data = downloadDataFromForm(formData, failurePath);
  await getPrisma().download.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/downloads");
  redirect("/admin/downloads?saved=1");
}

export async function deleteDownload(id: string) {
  await requireManager();
  if (!canUseDatabase()) redirect("/admin/downloads?database=missing");

  await getPrisma().download.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/downloads");
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/site-settings?database=missing");

  const keys = [
    "company_name", "company_tagline", "phone_primary", "phone_alternate",
    "email", "address", "maps_url", "working_hours", "gst_number", "pan_number",
    "facebook_url", "instagram_url", "linkedin_url", "youtube_url",
    "seo_meta_title", "seo_meta_description", "seo_og_image",
  ];

  const db = getPrisma();
  await Promise.all(
    keys.map((key) => {
      const value = String(formData.get(key) ?? "").trim();
      return db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }),
  );

  revalidatePath("/");
  revalidatePath("/admin/site-settings");
  redirect("/admin/site-settings?saved=1");
}

// ─── Job Applications ─────────────────────────────────────────────────────────

export async function updateApplicationStatus(formData: FormData) {
  await requireAdmin();
  if (!canUseDatabase()) redirect("/admin/job-applications?database=missing");

  const applicationId = String(formData.get("applicationId") ?? "");
  const status = String(formData.get("status") ?? "");

  const validStatuses = ["New", "Under Review", "Shortlisted", "Interview Scheduled", "Rejected", "Offered", "Hired"];
  if (!validStatuses.includes(status)) {
    redirect("/admin/job-applications?error=Invalid+status");
  }

  try {
    await getPrisma().jobApplication.update({
      where: { id: applicationId },
      data: { status },
    });
  } catch (error) {
    console.error("Failed to update application status:", error);
    redirect("/admin/job-applications?error=Failed+to+update+status");
  }

  revalidatePath("/admin/job-applications");
}

export async function createJobOpening(formData: FormData) {
  await requireAdmin();
  const db = getPrisma();

  const title = String(formData.get("title") || "");
  const department = String(formData.get("department") || "");
  const location = String(formData.get("location") || "");
  const type = String(formData.get("type") || "");
  const experience = String(formData.get("experience") || "");
  const vacancies = Number(formData.get("vacancies")) || 1;
  const description = String(formData.get("description") || "");
  const requirements = String(formData.get("requirements") || "");
  const status = String(formData.get("status") || "Active");
  const published = formData.get("published") === "on";

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await db.jobOpening.create({
    data: {
      title,
      slug,
      department,
      location,
      type,
      experience,
      vacancies,
      description,
      requirements,
      status,
      published,
    },
  });

  revalidatePath("/careers");
  revalidatePath("/admin/job-openings");
  redirect("/admin/job-openings");
}

export async function updateJobOpening(id: string, formData: FormData) {
  await requireAdmin();
  const db = getPrisma();

  const title = String(formData.get("title") || "");
  const department = String(formData.get("department") || "");
  const location = String(formData.get("location") || "");
  const type = String(formData.get("type") || "");
  const experience = String(formData.get("experience") || "");
  const vacancies = Number(formData.get("vacancies")) || 1;
  const description = String(formData.get("description") || "");
  const requirements = String(formData.get("requirements") || "");
  const status = String(formData.get("status") || "Active");
  const published = formData.get("published") === "on";

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await db.jobOpening.update({
    where: { id },
    data: {
      title,
      slug,
      department,
      location,
      type,
      experience,
      vacancies,
      description,
      requirements,
      status,
      published,
    },
  });

  revalidatePath("/careers");
  revalidatePath("/admin/job-openings");
  redirect("/admin/job-openings");
}

export async function deleteJobOpening(id: string) {
  await requireAdmin();
  const db = getPrisma();
  await db.jobOpening.delete({ where: { id } });
  revalidatePath("/careers");
  revalidatePath("/admin/job-openings");
}
