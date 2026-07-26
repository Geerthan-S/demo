import {
  employeeBenefits,
  faqs,
  homeReferenceImages,
  industrialImages,
  projectReferenceImages,
  certificationCertificates,
  leadershipProfiles,
  serviceCategories,
  technicalCapabilityCards,
} from "@/lib/content";

export type SitePageItem = {
  title: string;
  text?: string;
  meta?: string;
  href?: string;
  image?: string;
  items?: string[];
};

export type SitePageSection = {
  id: string;
  label: string;
  heading: string;
  body?: string;
  layout?:
    | "grid"
    | "split"
    | "timeline"
    | "gallery"
    | "faq"
    | "cta"
    | "list"
    | "metrics"
    | "intro"
    | "approach"
    | "leadership"
    | "certifications"
    | "industries"
    | "project-exposure"
    | "why-trust"
    | "profile-download"
    | "final-cta";
  media?: string;
  items?: SitePageItem[];
  faqs?: Array<{ question: string; answer: string }>;
  cta?: {
    label: string;
    href: string;
    download?: boolean;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
};

export type EditableSitePage = {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  sections: SitePageSection[];
  published: boolean;
};

const serviceSectionItems = serviceCategories.map((service) => ({
  title: service.title,
  text: service.shortDescription,
  href: "/#services",
  image: service.image,
  meta: "Service line",
  items: [
    `Benefit: ${service.benefits[0]}`,
    `Typical scope: ${service.deliverables.slice(0, 2).join(", ")}`,
    `Example deliverables: ${service.deliverables.slice(2, 4).join(", ")}`,
  ],
}));

const defaultTopLevelPages: EditableSitePage[] = [
  {
    slug: "home",
    title: "Home",
    description:
      "Premium enterprise homepage for Dockside Constructions Private Limited.",
    heroTitle: "ENGINEERING-LED|INFRASTRUCTURE|DELIVERED WITH|DISCIPLINE.",
    heroDescription:
      "Industrial, commercial and infrastructure projects executed through engineering expertise, structured planning and proven delivery systems.",
    heroImage: homeReferenceImages.hero,
    published: true,
    sections: [
      {
        id: "company-introduction",
        label: "About Dockside",
        heading: "PRECISION IN ENGINEERING. CONFIDENCE IN DELIVERY.",
        body:
          "Dockside Constructions helps owners move from scope to handover with disciplined planning, documented systems and accountable site execution.",
        layout: "split",
        media: homeReferenceImages.about,
        cta: { label: "ABOUT US", href: "/#about" },
        items: [
          { title: "Engineering-led planning" },
          { title: "ISO-certified processes" },
          { title: "Dedicated project controls" },
          { title: "On-time delivery culture" },
          { title: "Experienced site teams" },
          { title: "Transparent reporting" },
        ],
      },
      {
        id: "core-services-overview",
        label: "Core Services Overview",
        heading: "OUR CORE CAPABILITIES",
        body:
          "Civil construction, roads, railway siding support, electrical works, industrial projects, project management, drainage and road safety systems.",
        layout: "grid",
        items: serviceSectionItems,
      },
      {
        id: "why-choose-us",
        label: "Why Dockside",
        heading: "WHY CLIENTS CHOOSE DOCKSIDE.",
        body:
          "Dockside is built for clients who expect engineering leadership, disciplined safety and dependable delivery.",
        layout: "why-trust",
        items: [
          {
            title: "ENGINEERING",
            text: "Technical planning, design coordination and execution control.",
          },
          {
            title: "SAFETY",
            text: "ISO-compliant systems with disciplined site practices.",
          },
          {
            title: "DELIVERY",
            text: "Milestone-driven execution with transparent reporting.",
          },
        ],
      },
      {
        id: "faqs",
        label: "FAQs",
        heading: "Common questions before engaging Dockside.",
        layout: "faq",
        faqs,
      },
      {
        id: "get-a-quote-cta",
        label: "Final CTA",
        heading: "READY TO DISCUSS YOUR NEXT PROJECT?",
        body:
          "Connect with Dockside's engineering and project delivery teams.",
        layout: "cta",
        media: industrialImages.crane,
        cta: { label: "GET A QUOTE", href: "/contact" },
      },
    ],
  },
  {
    slug: "projects",
    title: "Projects",
    description:
      "Portfolio overview and client success stories.",
    heroTitle: "Project Proof Across Industrial, Commercial And Infrastructure Work",
    heroDescription:
      "Selected programs for Whirlpool, Lodha Industrial Park, Adani Logistics, Chennai One IT SEZ and public infrastructure clients.",
    heroImage: industrialImages.heroCinematic,
    published: true,
    sections: [
      {
        id: "portfolio-overview",
        label: "Portfolio Overview",
        heading: "A portfolio shaped by repeat industrial works and large-format site development.",
        body:
          "The project library highlights execution across active facilities, logistics assets, commercial campus development, public works and civil infrastructure.",
        layout: "split",
        media: projectReferenceImages.lodha,
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description:
      "Contact form, phone number, email, office location, maps, social links and WhatsApp.",
    heroTitle: "Speak With Dockside About Your Next Project",
    heroDescription:
      "Connect with DCPL for civil construction, roads, railway works, electrical works, industrial projects, project management, drainage and road safety inquiries.",
    heroImage: industrialImages.hero,
    published: true,
    sections: [
      {
        id: "office-information",
        label: "Office Location",
        heading: "Registered office, response promise and direct contact channels.",
        body: "No.56, V.G.P. Nagar East, Salamedu, Villupuram - 605401",
        layout: "grid",
        items: [
          { title: "Phone Number", text: "+91 89259 22737", href: "tel:+918925922737" },
          { title: "Email Address", text: "admin@docksideconstructions.com", href: "mailto:admin@docksideconstructions.com" },
          { title: "Response Time Promise", text: "Every serious project enquiry is reviewed by the appropriate engineering or delivery team." },
          { title: "Business Hours", text: "Monday to Saturday, 9:30 AM to 6:30 PM IST." },
          { title: "WhatsApp Chat", text: "+91 89259 22737", href: "https://wa.me/918925922737" },
          { title: "Google Maps", text: "Open Dockside's registered office location.", href: "https://www.google.com/maps/search/?api=1&query=No.56%20V.G.P.%20Nagar%20East%20Salamedu%20Villupuram%20605401" },
          { title: "Social Media Links", text: "LinkedIn, Instagram and corporate updates." },
        ],
      },
      {
        id: "department-contacts",
        label: "Direct Department Contacts",
        heading: "Route your enquiry to the right team faster.",
        layout: "grid",
        items: [
          { title: "Project Enquiries", text: "Industrial, commercial, infrastructure and site-development discussions.", href: "mailto:admin@docksideconstructions.com" },
          { title: "Engineering Review", text: "Drawings, quantities, technical scope and feasibility clarifications.", href: "mailto:admin@docksideconstructions.com" },
        ],
      },
    ],
  },
];

export const defaultSitePages = defaultTopLevelPages;

export const sitePageRouteBySlug = new Map<string, string>([
  ["home", "/"],
  ["projects", "/projects"],
  ["contact", "/contact"],
]);

export function getDefaultSitePage(slug: string) {
  return defaultSitePages.find((page) => page.slug === slug) ?? null;
}

export function getSitePageRoute(slug: string) {
  return sitePageRouteBySlug.get(slug) ?? `/${slug}`;
}
