import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const industrialImages = {
  structure:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
  site:
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=85",
  crane:
    "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1600&q=85",
  safety:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
  warehouseDusk:
    "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1800",
  logisticsAerial:
    "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  industrialCampus:
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1800",
  steelExecution:
    "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1800",
};

const projectImages = {
  whirlpool: "/home-reference/project-whirlpool-facility.jpg",
  lodha: "/home-reference/project-lodha-industrial-park.jpg",
  adani: "/home-reference/project-adani-logistics.jpg",
  chennaiOne: "/home-reference/project-chennai-one-sez.jpg",
  stateHighway: "/home-reference/industry-infrastructure.jpg",
  manufacturingPlant: "/home-reference/industry-manufacturing.jpg",
  waterSupply: "/home-reference/industry-utilities.jpg",
};

const seedClients = [
  {
    id: "client-1",
    name: "Whirlpool of India Ltd",
    slug: "whirlpool-of-india",
    industry: "Industrial manufacturing",
    testimonial:
      "20+ executed works covering warehouse, packaging lab, reliability lab, fire hydrant pipeline, mezzanine, civil, electrical and interior scopes.",
    featured: true,
  },
  {
    id: "client-2",
    name: "Public Works Department, Puducherry",
    slug: "pwd-puducherry",
    industry: "Public infrastructure",
    testimonial:
      "15+ works across road strengthening, renewal, BT and CC road formation, drainage and infrastructure works.",
    featured: true,
  },
  {
    id: "client-3",
    name: "Lodha Industrial Park",
    slug: "lodha-industrial-park",
    industry: "Logistics parks",
    featured: true,
  },
  {
    id: "client-4",
    name: "Adani Logistics Limited",
    slug: "adani-logistics-limited",
    industry: "Logistics",
    featured: true,
  },
  {
    id: "client-5",
    name: "Chennai One IT SEZ",
    slug: "chennai-one-it-sez",
    industry: "Commercial campus",
    featured: true,
  },
  {
    id: "client-6",
    name: "Anabond Limited",
    slug: "anabond-limited",
    industry: "Industrial manufacturing",
    featured: true,
  },
  {
    id: "client-7",
    name: "Akshaya Patra Foundation",
    slug: "akshaya-patra-foundation",
    industry: "Institutional infrastructure",
    featured: true,
  },
  {
    id: "client-8",
    name: "Godrej Consumer Products Ltd",
    slug: "godrej-consumer-products",
    industry: "FMCG manufacturing",
    featured: true,
  },
];

const seedProjects = [
  {
    id: "seed-1",
    title: "Whirlpool Industrial Works Program",
    slug: "whirlpool-industrial-works-program",
    clientName: "Whirlpool of India Ltd",
    clientType: "Private Sector",
    clientLogo: null,
    featuredImage: projectImages.whirlpool,
    gallery: [projectImages.whirlpool, projectImages.manufacturingPlant, projectImages.waterSupply],
    location: "Puducherry",
    scopeOfWork:
      "Warehouse and packaging lab construction, reliability lab renovation, fire hydrant pipeline work, mezzanine floor construction, civil, electrical and interior works.",
    timeline: "20+ works completed in the last 5 years",
    projectValue: "INR 400+ Lakhs",
    status: "COMPLETED",
    servicesUsed: ["Industrial projects", "Civil construction", "Electrical works", "Interior works"],
    industry: "Industrial manufacturing",
    summary:
      "A multi-scope industrial execution program covering production support buildings, renovation, utilities and civil-electrical works.",
    seoTitle: "Whirlpool Puducherry Industrial Works",
    seoDescription:
      "Dockside Constructions industrial works program for Whirlpool of India Ltd in Puducherry.",
    featured: true,
    published: true,
    testimonial: {
      id: "testimonial-seed-1",
      quote:
        "DCPL's repeat industrial works show reliable site discipline, coordinated execution and practical engineering management.",
      personName: "Client Project Team",
      designation: "Industrial Works",
      company: "Whirlpool of India Ltd",
    },
  },
  {
    id: "seed-2",
    title: "Lodha Industrial Park - Chennai",
    slug: "lodha-industrial-park-chennai",
    clientName: "Lodha Industrial Park",
    clientType: "Private Sector",
    clientLogo: null,
    featuredImage: projectImages.lodha,
    gallery: [projectImages.lodha, projectImages.stateHighway, projectImages.manufacturingPlant],
    location: "Eichoor, Chennai",
    scopeOfWork:
      "Earthwork, land grading, material supply, site development and common area development works.",
    timeline: "Program delivery",
    projectValue: "INR 50+ Crores",
    status: "COMPLETED",
    servicesUsed: ["Earthwork", "Land grading", "Site development", "Infrastructure works"],
    industry: "Logistics parks",
    summary:
      "Large-format industrial park development with land grading, site development and common infrastructure scope.",
    seoTitle: "Lodha Industrial Park Chennai Case Study",
    seoDescription:
      "Earthwork, land grading and site development works by Dockside Constructions at Lodha Industrial Park Chennai.",
    featured: true,
    published: true,
    testimonial: {
      id: "testimonial-seed-2",
      quote:
        "The works required reliable equipment deployment, grading discipline and common infrastructure coordination at scale.",
      personName: "Project Controls Team",
      designation: "Industrial Park Development",
      company: "Lodha Industrial Park",
    },
  },
  {
    id: "seed-3",
    title: "Adani Logistics Civil & Structural Works",
    slug: "adani-logistics-civil-structural-works",
    clientName: "Adani Logistics Limited",
    clientType: "Private Sector",
    clientLogo: null,
    featuredImage: projectImages.adani,
    gallery: [projectImages.adani, projectImages.waterSupply, projectImages.stateHighway],
    location: "Malur, Karnataka",
    scopeOfWork: "Miscellaneous civil works, RCC works, drainage and structural works.",
    timeline: "Ongoing",
    projectValue: "INR 10 Crores",
    status: "IN_PROGRESS",
    servicesUsed: ["Civil construction", "RCC works", "Structural works"],
    industry: "Logistics",
    summary:
      "Ongoing civil, RCC, drainage and structural works for logistics infrastructure in Karnataka.",
    seoTitle: "Adani Logistics Malur Civil Works",
    seoDescription:
      "Ongoing civil, RCC, drainage and structural works by Dockside Constructions for Adani Logistics Limited in Malur, Karnataka.",
    featured: true,
    published: true,
  },
  {
    id: "seed-4",
    title: "Chennai One IT SEZ Land Development",
    slug: "chennai-one-it-sez-land-development",
    clientName: "Chennai One IT SEZ",
    clientType: "Private Sector",
    clientLogo: null,
    featuredImage: projectImages.chennaiOne,
    gallery: [projectImages.chennaiOne, projectImages.stateHighway, projectImages.manufacturingPlant],
    location: "Mandra City Project, Chennai",
    scopeOfWork:
      "Large-scale land development, soil filling, site preparation, DGPS and survey works.",
    timeline: "Ongoing",
    projectValue: "INR 300+ Crores overall project value",
    status: "IN_PROGRESS",
    servicesUsed: ["Land development", "Soil filling", "Survey works", "Site preparation"],
    industry: "Commercial campus",
    summary:
      "Large-scale campus land development and site preparation scope for a major Chennai commercial development.",
    seoTitle: "Chennai One IT SEZ Land Development",
    seoDescription:
      "Land development, soil filling, DGPS and survey works by Dockside Constructions for Chennai One IT SEZ.",
    featured: true,
    published: true,
  },
];

function splitId(record) {
  const { id, ...data } = record;
  return { id, data };
}

async function seedAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@docksideconstructions.com").toLowerCase();
  const password =
    process.env.SEED_ADMIN_PASSWORD ??
    process.env.FALLBACK_ADMIN_PASSWORD ??
    "DocksideAdmin#2026";

  const isDefaultPassword =
    !process.env.SEED_ADMIN_EMAIL &&
    !process.env.SEED_ADMIN_PASSWORD &&
    !process.env.FALLBACK_ADMIN_PASSWORD;

  const passwordHash = isDefaultPassword
    ? "$2b$10$107sr.Ad7tQpAwz1egVvRuyKDvs8xzEMcN0VlzQkT5UV4qFv75IFG"
    : await bcrypt.hash(password, 4);

  return prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "SUPER_ADMIN" },
    create: {
      name: "Dockside Super Admin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
}

async function seedClientsTable() {
  for (const client of seedClients) {
    const { id, data } = splitId(client);
    await prisma.client.upsert({
      where: { slug: client.slug },
      update: data,
      create: { id, ...data },
    });
  }
}

async function seedProjectsTable(authorId) {
  for (const project of seedProjects) {
    const { testimonial, ...projectRecord } = project;
    const { id, data } = splitId(projectRecord);
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...data, authorId },
      create: { id, ...data, authorId },
    });
  }
}

const seedJobOpenings = [
  {
    id: "project-manager-industrial",
    title: "Project Manager – Industrial Civil",
    department: "Project Management",
    experience: "8+ Years",
    location: "Chennai",
    type: "Full-Time",
    skills: ["Project Scheduling", "Client Management", "Subcontractor Coordination", "Billing & Cost Control", "EHS Compliance"],
  },
  {
    id: "planning-engineer",
    title: "Planning Engineer",
    department: "Engineering",
    experience: "3-5 Years",
    location: "Bengaluru",
    type: "Full-Time",
    skills: ["Primavera P6", "MS Project (MSP)", "Progress Reports", "Delay Analysis", "Resource Allocation"],
  },
  {
    id: "qa-qc-engineer",
    title: "QA/QC Engineer",
    department: "QA/QC",
    experience: "3-5 Years",
    location: "Site-based",
    type: "Full-Time",
    skills: ["Concrete Testing", "NDT Testing", "Method Statements", "Quality Documentation", "ISO Audits"],
  },
  {
    id: "safety-officer",
    title: "Safety Officer",
    department: "Safety",
    experience: "2-5 Years",
    location: "Site-based",
    type: "Full-Time",
    skills: ["NEBOSH IGC", "EHS Audits", "Toolbox Talks", "Incident Investigation", "Risk Assessment"],
  },
  {
    id: "site-engineer",
    title: "Site Engineer – Civil",
    department: "Engineering",
    experience: "0-2 Years",
    location: "Chennai",
    type: "Full-Time",
    skills: ["Site Supervision", "Drawing Interpretation", "Labor Management", "Quantity Measurement", "Quality Checks"],
  },
];

async function seedCareers() {
  for (const job of seedJobOpenings) {
    const { id, ...data } = job;
    await prisma.jobOpening.upsert({
      where: { id },
      update: data,
      create: { id, ...data },
    });
  }

  const firstSetting = await prisma.careerSetting.findFirst();
  if (!firstSetting) {
    await prisma.careerSetting.create({
      data: {
        id: "default",
        internshipButtonText: "Apply for Internship",
        internshipActionType: "modal",
        internshipActionUrl: "",
      },
    });
  }
}

const seedEquipmentItems = [
  {
    id: "equip-1",
    name: "Hydraulic Excavator",
    slug: "hydraulic-excavator",
    imageUrl: "https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=800",
    quantity: 4,
    capacity: "20T – 30T",
    manufacturer: "CAT / JCB",
    year: 2020,
    status: "Active",
    sortOrder: 1,
    published: true,
  },
  {
    id: "equip-2",
    name: "Motor Grader",
    slug: "motor-grader",
    imageUrl: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=800",
    quantity: 2,
    capacity: "140 HP",
    manufacturer: "Volvo / CASE",
    year: 2021,
    status: "Active",
    sortOrder: 2,
    published: true,
  },
  {
    id: "equip-3",
    name: "Vibratory Roller",
    slug: "vibratory-roller",
    imageUrl: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    quantity: 3,
    capacity: "10T – 12T",
    manufacturer: "HAMM / Dynapac",
    year: 2019,
    status: "Active",
    sortOrder: 3,
    published: true,
  },
  {
    id: "equip-4",
    name: "Transit Mixer",
    slug: "transit-mixer",
    imageUrl: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800",
    quantity: 5,
    capacity: "6 m³",
    manufacturer: "Ajax / Schwing Stetter",
    year: 2020,
    status: "Active",
    sortOrder: 4,
    published: true,
  },
  {
    id: "equip-5",
    name: "Bulldozer",
    slug: "bulldozer",
    imageUrl: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    quantity: 2,
    capacity: "D6 Series",
    manufacturer: "CAT",
    year: 2022,
    status: "Active",
    sortOrder: 5,
    published: true,
  },
  {
    id: "equip-6",
    name: "Mobile Crane",
    slug: "mobile-crane",
    imageUrl: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=800&q=80",
    quantity: 1,
    capacity: "50T",
    manufacturer: "Liebherr",
    year: 2021,
    status: "Active",
    sortOrder: 6,
    published: true,
  },
];

const defaultSiteSettings = [
  { key: "company_name", value: "Dockside Constructions Private Limited" },
  { key: "company_tagline", value: "Engineering-Led Construction. Trusted Since 2015." },
  { key: "phone_primary", value: "+91 88259 22737" },
  { key: "phone_alternate", value: "" },
  { key: "email", value: "admin@docksideconstructions.com" },
  { key: "address", value: "Villupuram, Tamil Nadu, India" },
  { key: "maps_url", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62756.08744!2d79.4832!3d11.9396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536d5b5b5b5b5b%3A0x0!2sVillupuram%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1" },
  { key: "working_hours", value: "Mon – Sat: 9:00 AM – 6:00 PM" },
  { key: "gst_number", value: "33AABCD1234E1Z5" },
  { key: "pan_number", value: "AABCD1234E" },
  { key: "facebook_url", value: "" },
  { key: "instagram_url", value: "" },
  { key: "linkedin_url", value: "" },
  { key: "youtube_url", value: "" },
  { key: "seo_meta_title", value: "Dockside Constructions – Industrial & Infrastructure Projects" },
  { key: "seo_meta_description", value: "Delivering industrial facilities, logistics parks, commercial developments and infrastructure projects through disciplined execution and engineering excellence." },
  { key: "seo_og_image", value: "/home-reference/hero-industrial.jpg" },
];

async function seedEquipment() {
  for (const item of seedEquipmentItems) {
    const { id, ...data } = item;
    await prisma.equipment.upsert({
      where: { slug: item.slug },
      update: data,
      create: { id, ...data },
    });
  }
}

async function seedSiteSettings() {
  for (const setting of defaultSiteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
}

async function main() {
  const admin = await seedAdmin();
  await seedClientsTable();
  await seedProjectsTable(admin.id);
  await seedCareers();
  await seedEquipment();
  await seedSiteSettings();

  console.log("Seeded Dockside backend data");
  console.log(`Seeded SUPER_ADMIN user: ${admin.email}`);
  console.log(`Seeded ${seedEquipmentItems.length} equipment items`);
  console.log(`Seeded ${defaultSiteSettings.length} site settings`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
