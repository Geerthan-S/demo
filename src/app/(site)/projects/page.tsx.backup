import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Landmark,
  ShieldCheck,
  Timer,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { seedClients, seedProjects } from "@/lib/content";
import { getClients, getProjects } from "@/lib/repositories";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";
import { CountUp } from "@/components/ui/CountUp";
import { ProjectsFilterGrid } from "@/components/projects-filter-grid";
import { FloatingCTA } from "@/components/ui/floating-cta";
import { projectCategoryFromParam } from "@/lib/project-categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects",
  description:
    "Project showcase for Dockside Constructions across industrial, public infrastructure, logistics, roads, drainage and civil works.",
};

type ProofItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

const metrics = [
  { end: 65, suffix: "+", label: "Works Delivered", icon: Building2 },
  { prefix: "INR ", end: 60, suffix: "+ Cr", label: "Featured Value", icon: TrendingUp },
  { end: 8, label: "Core Services", icon: Wrench },
  { end: 10, label: "Key References", icon: Landmark },
];

const projectsHeroImage = "/hero/projects.jpg";

const proofItems: ProofItem[] = [
  { title: "Engineering Led", text: "Technical expertise at every stage.", icon: BadgeCheck },
  { title: "On-Time Delivery", text: "Milestone driven execution.", icon: Timer },
  { title: "Quality Assured", text: "Strict quality control processes.", icon: BadgeCheck },
  { title: "Safety First", text: "Safety integrated across all sites.", icon: ShieldCheck },
];

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
      <section
        className="shot-subhero shot-subhero--projects"
        style={{ backgroundImage: `url(${projectsHeroImage})` }}
      >
        <div className="shot-subhero__inner">
          <span className="shot-kicker">OUR PORTFOLIO</span>
          <h1>
            Projects That Demonstrate Capability, Precision and Scale<em>.</em>
          </h1>
          <p>
            Explore a portfolio of industrial, commercial and infrastructure projects delivered
            through careful planning, technical expertise and a relentless focus on quality.
          </p>
          <div className="shot-subhero__actions">
            <Link href="#featured-projects" className="shot-button shot-button--fill">
              Browse Projects <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="shot-button shot-button--outline">
              Discuss Your Project <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="shot-project-metrics" aria-label="Project metrics">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label}>
              <Icon aria-hidden="true" />
              <strong>
                <CountUp end={metric.end} prefix={metric.prefix} suffix={metric.suffix} />
              </strong>
              <span>{metric.label}</span>
            </article>
          );
        })}
      </section>

      <section className="shot-section shot-projects-main premium-projects" id="featured-projects">
        <ProjectsFilterGrid projects={projects} initialFilter={initialFilter} />

        <section className="shot-delivery-panel">
          <div>
            <span>Delivering Excellence</span>
            <h2>Large enough to deliver. Agile enough to care.</h2>
            <p>
              Every project is managed with a commitment to quality, safety,
              transparency and reliability.
            </p>
          </div>
          <div>
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </section>

      <section className="shot-project-cta">
        <div>
          <span>Start your project</span>
          <h2>Ready to build something extraordinary?</h2>
          <p>Connect directly with our team to discuss your project requirements.</p>
        </div>
        <div>
          <Link href="/contact" className="shot-button shot-button--fill">
            Get a Quote <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/contact" className="shot-button shot-button--outline">
            Contact Us <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="shot-client-strip shot-client-strip--projects">
        <span>Trusted by industrial leaders & public sector organizations</span>
        <ClientLogoMarquee clients={clients} />
      </section>

      <FloatingCTA />
    </div>
  );
}
