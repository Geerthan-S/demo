import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
} from "lucide-react";
import { seedClients, seedProjects } from "@/lib/content";
import { getClients, getProjects } from "@/lib/repositories";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";
import { ProjectsFilterGrid } from "@/components/projects-filter-grid";
import { FloatingCTA } from "@/components/ui/floating-cta";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CorePromise } from "@/components/sections/CorePromise";
import { projectCategoryFromParam } from "@/lib/project-categories";
import { ProjectsHero } from "./projects-hero";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects",
  description:
    "Project showcase for Dockside Constructions across industrial, public infrastructure, logistics, roads, drainage and civil works.",
};

const projectsHeroImage = "/hero/projects.jpg";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialFilter = projectCategoryFromParam(params?.category);
  const [projects, clients] = await Promise.all([
    getProjects().catch(() => seedProjects),
    getClients().catch(() => seedClients),
  ]);

  return (
    <div className="shot-page shot-page--projects">
      <ProjectsHero />

      <section className="shot-section shot-projects-main premium-projects" id="featured-projects">
        <ProjectsFilterGrid projects={projects} initialFilter={initialFilter} />
      </section>

      <CorePromise />

      <ContactCTA
        eyebrow="Start your project"
        heading="Ready to build something extraordinary?"
        description="Connect directly with our team to discuss your project requirements."
        primaryButton={{ label: "Get a Quote", href: "/contact" }}
        secondaryButton={{ label: "Contact Us", href: "/contact" }}
      />

      <section className="shot-client-strip shot-client-strip--projects">
        <span>Trusted by industrial leaders & public sector organizations</span>
        <ClientLogoMarquee clients={clients} />
      </section>

      <FloatingCTA />
    </div>
  );
}
