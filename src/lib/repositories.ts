import { Prisma, ProjectStatus, type Equipment } from "@prisma/client";
import { cache } from "react";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import {
  industrialImages,
  seedClients,
  seedProjects,
  serviceCategories,
  type ClientView,
  type ProjectView,
} from "@/lib/content";
import {
  defaultSitePages,
  getDefaultSitePage,
  type EditableSitePage,
  type SitePageSection,
} from "@/lib/site-content";
import { normalizeProjectCategory } from "@/lib/project-categories";


const PUBLIC_DATABASE_READ_TIMEOUT_MS = 6000;
const PUBLIC_DATABASE_RETRY_COOLDOWN_MS = 60_000;
const retiredSitePageSlugs = [
  "get-quote",
  ...serviceCategories.map((service) => `service-${service.slug}`),
];
let publicDatabaseUnavailableUntil = 0;

function markPublicDatabaseUnavailable() {
  publicDatabaseUnavailableUntil = Date.now() + PUBLIC_DATABASE_RETRY_COOLDOWN_MS;
}

async function withDatabaseFallback<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (Date.now() < publicDatabaseUnavailableUntil) return fallback;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const query = operation().catch(() => {
    markPublicDatabaseUnavailable();
    return fallback;
  });
  const timeout = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      markPublicDatabaseUnavailable();
      resolve(fallback);
    }, PUBLIC_DATABASE_READ_TIMEOUT_MS);
  });

  try {
    return await Promise.race([query, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

type NormalizableProject = Partial<ProjectView> & Record<string, unknown>;

export function normalizeProject(project: NormalizableProject): ProjectView {
  const parseJsonArray = (val: unknown): string[] => {
    if (Array.isArray(val)) return val.map(String);
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch { }
    }
    return [];
  };

  return {
    ...project,
    clientType: normalizeProjectCategory(
      project.clientType ||
      `${project.clientName ?? ""} ${project.industry ?? ""} ${parseJsonArray(project.servicesUsed).join(" ")} ${project.scopeOfWork ?? ""}`,
    ),
    status: project.status as ProjectStatus,
    gallery: parseJsonArray(project.gallery),
    servicesUsed: parseJsonArray(project.servicesUsed),
    keyAchievements: parseJsonArray(project.keyAchievements),
  } as ProjectView;
}

const fallbackProjects = seedProjects.map(normalizeProject);

function normalizeSections(slug: string, value: Prisma.JsonValue, fallback: SitePageSection[]) {
  if (!Array.isArray(value)) return fallback;

  let sections = value as SitePageSection[];
  if (slug === "about") {
    const fallbackCertifications = fallback.find((section) => section.id === "certifications");
    const fallbackImageByTitle = new Map(
      fallbackCertifications?.items
        ?.filter((item) => item.image)
        .map((item) => [item.title, item.image]) ?? [],
    );

    if (fallbackImageByTitle.size) {
      sections = sections.map((section) => {
        if (section.id !== "certifications" || !section.items?.length) return section;
        return {
          ...section,
          items: section.items.map((item) => ({
            ...item,
            image: item.image ?? fallbackImageByTitle.get(item.title),
          })),
        };
      });
    }
  }

  return sections;
}

const staleDefaultHeroImages: Record<string, string[]> = {
  about: [industrialImages.structure],
  services: [industrialImages.highRise],
  projects: [industrialImages.hero, "/projects-hero-logistics.jpg"],
};

function normalizeHeroImage(slug: string, heroImage: string, fallback?: EditableSitePage | null) {
  if (fallback && staleDefaultHeroImages[slug]?.includes(heroImage)) {
    return fallback.heroImage;
  }

  return heroImage || fallback?.heroImage || "";
}

function hasCurrentServiceCatalog(sections: SitePageSection[], fallback: EditableSitePage) {
  const expectedHrefs =
    fallback.sections
      .find((section) => section.id === "service-selection")
      ?.items?.map((item) => item.href)
      .filter(Boolean) ?? [];
  const actualHrefs = sections
    .flatMap((section) => section.items ?? [])
    .map((item) => item.href)
    .filter(Boolean);

  return expectedHrefs.length > 0 && expectedHrefs.every((href) => actualHrefs.includes(href));
}

function removeRetiredProjectSections(sections: SitePageSection[]) {
  return sections.filter((section) => section.id !== "project-categories");
}

function normalizeSitePage(
  page: {
    slug: string;
    title: string;
    description: string;
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    sections: Prisma.JsonValue;
    published: boolean;
  },
  fallback?: EditableSitePage | null,
): EditableSitePage {
  if (fallback && page.slug === "about" && Array.isArray(page.sections)) {
    const sectionIds = new Set((page.sections as SitePageSection[]).map((section) => section.id));
    const hasPremiumAboutStructure = [
      "company-snapshot",
      "who-we-are",
      "project-exposure",
      "corporate-profile",
      "about-final-cta",
    ].every((id) => sectionIds.has(id));

    if (!hasPremiumAboutStructure) {
      return { ...fallback, published: page.published };
    }
  }

  if (fallback && page.slug === "services" && Array.isArray(page.sections)) {
    if (!hasCurrentServiceCatalog(page.sections as SitePageSection[], fallback)) {
      return { ...fallback, published: page.published };
    }
  }

  const sections =
    page.slug === "projects"
      ? removeRetiredProjectSections(normalizeSections(page.slug, page.sections, fallback?.sections ?? []))
      : normalizeSections(page.slug, page.sections, fallback?.sections ?? []);

  return {
    slug: page.slug,
    title: page.title || fallback?.title || page.slug,
    description: page.description || fallback?.description || "",
    heroTitle: page.heroTitle || fallback?.heroTitle || page.title,
    heroDescription: page.heroDescription || fallback?.heroDescription || page.description,
    heroImage: normalizeHeroImage(page.slug, page.heroImage, fallback),
    sections,
    published: page.published,
  };
}

export const getProjects = cache(async (): Promise<ProjectView[]> => {
  if (!canUseDatabase()) return fallbackProjects;

  return withDatabaseFallback(async () => {
    const projects = await getPrisma().project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    });
    return projects.map(normalizeProject);
  }, fallbackProjects);
});

export const getFeaturedProjects = cache(async () => {
  const projects = await getProjects();
  let featured = projects.filter((project) => project.featured);

  // Pad with fallbacks to protect layout if database has limited entries
  if (featured.length < 5) {
    const fallbacks = fallbackProjects.filter(p => p.featured && !featured.some(f => f.slug === p.slug));
    featured = [...featured, ...fallbacks];
  }

  return featured.slice(0, 6);
});

export const getProjectBySlug = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
});

export const getClients = cache(async (): Promise<ClientView[]> => {
  if (!canUseDatabase()) return seedClients;

  return withDatabaseFallback(
    () =>
      getPrisma().client.findMany({
        where: { featured: true },
        orderBy: { updatedAt: "desc" },
      }),
    seedClients,
  );
});

export const getSitePages = cache(async (): Promise<EditableSitePage[]> => {
  if (!canUseDatabase()) return defaultSitePages;

  return withDatabaseFallback(async () => {
    const rows = await getPrisma().sitePage.findMany({
      where: { slug: { notIn: retiredSitePageSlugs } },
      orderBy: [{ slug: "asc" }],
    });
    const rowBySlug = new Map(rows.map((row) => [row.slug, row]));
    const merged = defaultSitePages.map((fallback) => {
      const row = rowBySlug.get(fallback.slug);
      rowBySlug.delete(fallback.slug);
      return row ? normalizeSitePage(row, fallback) : fallback;
    });
    const customPages = [...rowBySlug.values()].map((row) => normalizeSitePage(row));
    return [...merged, ...customPages];
  }, defaultSitePages);
});

export const getSitePage = cache(async (slug: string): Promise<EditableSitePage | null> => {
  if (retiredSitePageSlugs.includes(slug)) return null;

  const fallback = getDefaultSitePage(slug);
  if (!canUseDatabase()) return fallback;

  return withDatabaseFallback(async () => {
    const row = await getPrisma().sitePage.findUnique({ where: { slug } });
    return row ? normalizeSitePage(row, fallback) : fallback;
  }, fallback);
});

export async function getAdminMetrics() {
  if (!canUseDatabase()) {
    return {
      projects: seedProjects.length,
      testimonials: seedProjects.filter((project) => project.testimonial).length,
      clients: seedClients.length,
      sitePages: defaultSitePages.length,
      equipment: 0,
      downloads: 0,
    };
  }

  const db = getPrisma();
  const [projects, clients, sitePages, equipment, downloads] = await Promise.all([
    db.project.count(),
    db.client.count(),
    db.sitePage.count({ where: { slug: { notIn: retiredSitePageSlugs } } }),
    db.equipment.count({ where: { published: true } }),
    db.download.count({ where: { published: true } }),
  ]);

  return {
    projects,
    clients,
    sitePages: Math.max(sitePages, defaultSitePages.length),
    equipment,
    downloads,
  };
}

// ─── Equipment ────────────────────────────────────────────────────────────────

export interface EquipmentItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  gallery: string[];
  quantity: number;
  capacity: string | null;
  description?: string | null;
  detailedDescription?: string | null;
  application: string | null;
  manufacturer: string | null;
  year: number | null;
  status: string;
  sortOrder: number;
  featured: boolean;
}

const seedEquipmentFallback: EquipmentItem[] = [
  {
    id: "equip-1", name: "Tipper Trucks", slug: "tipper-trucks",
    imageUrl: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1800",
    gallery: ["https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg"],
    quantity: 50, capacity: "10T - 16T",
    description: "Heavy-duty tipper trucks for efficient material transport across construction sites and long-distance logistics.",
    detailedDescription: "Designed for rigorous heavy lifting and robust dirt relocation, our fleet of 50+ tipper trucks handles industrial-scale material logistics.",
    application: "Material Transport",
    manufacturer: "Tata / Ashok Leyland", year: 2022, status: "Active", sortOrder: 1, featured: true
  },
  {
    id: "equip-2", name: "Excavators", slug: "excavators",
    imageUrl: "https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=1800",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
      "https://images.pexels.com/photos/19543169/pexels-photo-19543169/free-photo-of-excavators-on-construction-site.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    quantity: 10, capacity: "20T - 30T",
    description: "Powerful excavators for earthmoving, trenching, foundation work and large-scale site preparation.",
    detailedDescription: "Empowered by advanced hydraulics and heavy-duty chassis structures, our excavators orchestrate deep trenching and foundation establishment.",
    application: "Earthmoving",
    manufacturer: "CAT / JCB / Komatsu", year: 2021, status: "Active", sortOrder: 2, featured: true
  },
  {
    id: "equip-3", name: "Motor Graders", slug: "motor-graders",
    imageUrl: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=1800",
    gallery: ["https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg"],
    quantity: 5, capacity: "140 HP",
    description: "Precision motor graders for road construction, surface leveling and maintenance of gradients.",
    detailedDescription: "Our motor graders offer unparalleled precision during road base construction and fine terrain grading.",
    application: "Road Construction",
    manufacturer: "Volvo / CASE", year: 2021, status: "Active", sortOrder: 3, featured: true
  },
  {
    id: "equip-4", name: "Vibro Rollers", slug: "vibro-rollers",
    imageUrl: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1800",
    gallery: ["https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg"],
    quantity: 8, capacity: "10T - 12T",
    description: "Vibratory rollers for high-efficiency compaction of soil, base and asphalt layers.",
    detailedDescription: "Deploying high-frequency vibratory forces, our heavy compacting rollers ensure absolute solidity for asphalt bindings.",
    application: "Compaction",
    manufacturer: "HAMM / Dynapac", year: 2020, status: "Active", sortOrder: 4, featured: true
  },
  {
    id: "equip-5", name: "JCB Backhoe Loaders", slug: "jcb-backhoe-loaders",
    imageUrl: "https://images.pexels.com/photos/11181206/pexels-photo-11181206.jpeg?auto=compress&cs=tinysrgb&w=1800",
    gallery: ["https://images.pexels.com/photos/11181206/pexels-photo-11181206.jpeg"],
    quantity: 6, capacity: "1.0 m³",
    description: "Versatile backhoe loaders for excavation, loading, trenching and utility construction works.",
    detailedDescription: "The absolute multi-purpose workforce of any site, navigating utility corridors and agile terrain modifications.",
    application: "Excavation / Loading",
    manufacturer: "JCB", year: 2022, status: "Active", sortOrder: 5, featured: true
  },
  {
    id: "equip-6", name: "Water Tankers", slug: "water-tankers",
    imageUrl: "/home-reference/industry-utilities.jpg",
    gallery: ["/home-reference/industry-utilities.jpg"],
    quantity: 12, capacity: "10,000L - 15,000L",
    description: "Water tankers for dust suppression, compaction support and general site maintenance operations.",
    detailedDescription: "High-capacity fluid transports regulating site atmospherics through active dust suppression protocols.",
    application: "Water Management",
    manufacturer: "Tata / Leyland", year: 2021, status: "Active", sortOrder: 6, featured: true
  },
];

export const getEquipment = cache(async (): Promise<EquipmentItem[]> => {
  if (!canUseDatabase()) return seedEquipmentFallback;

  return withDatabaseFallback(async () => {
    const items = await getPrisma().equipment.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.map((item: Equipment) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      imageUrl: item.imageUrl,
      gallery: item.gallery || [],
      quantity: item.quantity,
      capacity: item.capacity,
      description: item.description,
      detailedDescription: item.detailedDescription || item.description,
      application: item.application || "General Deployment",
      manufacturer: item.manufacturer,
      year: item.year,
      status: item.status,
      sortOrder: item.sortOrder,
      featured: item.featured ?? false,
    })) as EquipmentItem[];
  }, seedEquipmentFallback);
});

// ─── Downloads ────────────────────────────────────────────────────────────────

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileType: string;
  sortOrder: number;
}

export interface DownloadGroup {
  category: string;
  items: DownloadItem[];
}

const seedDownloadsFallback: DownloadGroup[] = [
  {
    category: "Company Documents",
    items: [
      {
        id: "dl-1",
        title: "Company Profile",
        category: "Company Documents",
        fileUrl: "/Dockside Business Profile.pdf",
        fileType: "pdf",
        sortOrder: 1,
      },
    ],
  },
];

export const getDownloads = cache(async (): Promise<DownloadGroup[]> => {
  if (!canUseDatabase()) return seedDownloadsFallback;

  return withDatabaseFallback(async () => {
    const rows = await getPrisma().download.findMany({
      where: {
        published: true,
        downloadEnabled: true
      },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    const grouped: Record<string, DownloadItem[]> = {};
    for (const row of rows) {
      if (!grouped[row.category]) grouped[row.category] = [];
      grouped[row.category].push({
        id: row.id,
        title: row.title,
        category: row.category,
        fileUrl: row.fileUrl,
        fileType: row.fileType,
        sortOrder: row.sortOrder,
      });
    }
    return Object.entries(grouped).map(([category, items]) => ({ category, items }));
  }, seedDownloadsFallback);
});

// ─── Site Settings ────────────────────────────────────────────────────────────

export type SiteSettingsMap = Record<string, string>;

const defaultSiteSettingsMap: SiteSettingsMap = {
  company_name: "Dockside Constructions Private Limited",
  company_tagline: "Engineering-Led Construction. Trusted Since 2015.",
  phone_primary: "+91 88259 22737",
  phone_alternate: "",
  email: "admin@docksideconstructions.com",
  address: "Villupuram, Tamil Nadu, India",
  maps_url: "",
  working_hours: "Mon – Sat: 9:00 AM – 6:00 PM",
  gst_number: "",
  pan_number: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
  seo_meta_title: "Dockside Constructions – Industrial & Infrastructure Projects",
  seo_meta_description: "Delivering industrial facilities, logistics parks, commercial developments and infrastructure projects through disciplined execution and engineering excellence.",
  seo_og_image: "",
};

export const getSiteSettings = cache(async (): Promise<SiteSettingsMap> => {
  if (!canUseDatabase()) return defaultSiteSettingsMap;

  return withDatabaseFallback(async () => {
    const rows = await getPrisma().siteSetting.findMany();
    const map: SiteSettingsMap = { ...defaultSiteSettingsMap };
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  }, defaultSiteSettingsMap);
});

export async function getSiteSetting(key: string): Promise<string> {
  const settings = await getSiteSettings();
  return settings[key] ?? "";
}

// ─── Job Openings ─────────────────────────────────────────────────────────────

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  skills: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const seedJobOpenings: JobOpening[] = [
  {
    id: "seed-1",
    title: "Senior Civil Engineer",
    department: "Civil Engineering",
    experience: "5-8 years",
    location: "Mumbai, Maharashtra",
    type: "Full-Time",
    skills: ["AutoCAD", "Project Management", "Structural Design", "Site Supervision", "Contract Management"],
    published: true,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "seed-2",
    title: "Site Engineer",
    department: "Civil Engineering",
    experience: "2-4 years",
    location: "Pune, Maharashtra",
    type: "Full-Time",
    skills: ["Site Management", "Quality Control", "BOQ Preparation", "Total Station", "MS Project"],
    published: true,
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-06-10"),
  },
  {
    id: "seed-3",
    title: "Planning Engineer",
    department: "Planning & Estimation",
    experience: "3-5 years",
    location: "Bangalore, Karnataka",
    type: "Full-Time",
    skills: ["Primavera P6", "MS Project", "Resource Planning", "Cost Estimation", "Progress Monitoring"],
    published: true,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    id: "seed-4",
    title: "QA/QC Engineer",
    department: "Quality & Safety",
    experience: "3-6 years",
    location: "Chennai, Tamil Nadu",
    type: "Full-Time",
    skills: ["Quality Auditing", "ISO Standards", "Material Testing", "NDT Methods", "Inspection Planning"],
    published: true,
    createdAt: new Date("2024-06-20"),
    updatedAt: new Date("2024-06-20"),
  },
  {
    id: "seed-5",
    title: "Safety Engineer",
    department: "Quality & Safety",
    experience: "2-5 years",
    location: "Hyderabad, Telangana",
    type: "Full-Time",
    skills: ["Safety Audits", "Risk Assessment", "NEBOSH", "Emergency Response", "PPE Management"],
    published: true,
    createdAt: new Date("2024-06-25"),
    updatedAt: new Date("2024-06-25"),
  },
];

export const getJobOpenings = cache(async (): Promise<JobOpening[]> => {
  if (!canUseDatabase()) return seedJobOpenings;

  return withDatabaseFallback(async () => {
    const jobs = await getPrisma().jobOpening.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
    });
    return jobs;
  }, seedJobOpenings);
});

// ─── Career Settings ──────────────────────────────────────────────────────────

export interface CareerSetting {
  id: string;
  internshipButtonText: string;
  internshipActionType: string;
  internshipActionUrl: string;
  updatedAt: Date;
}

const defaultCareerSetting: CareerSetting = {
  id: "default",
  internshipButtonText: "Apply for Internship",
  internshipActionType: "modal",
  internshipActionUrl: "",
  updatedAt: new Date(),
};

export const getCareerSetting = cache(async (): Promise<CareerSetting> => {
  if (!canUseDatabase()) return defaultCareerSetting;

  return withDatabaseFallback(async () => {
    const setting = await getPrisma().careerSetting.findFirst();
    return setting || defaultCareerSetting;
  }, defaultCareerSetting);
});
