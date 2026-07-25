import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { ProjectDelivery } from "@/components/home/ProjectDelivery";
import { Services } from "@/components/sections/Services";
import { TrustSystems, trustMetrics } from "@/components/sections/TrustSystems";
import { HeroStatsStrip } from "@/components/sections/HeroStatsStrip";
import { TrustedByStrip } from "@/components/enterprise-proof";
import { SiteContentSections } from "@/components/site-content-sections";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { homeReferenceImages } from "@/lib/content";
import { getFeaturedProjects, getSitePage } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, page] = await Promise.all([
    getFeaturedProjects(),
    getSitePage("home"),
  ]);

  const sections = (page?.sections ?? []).map((section) =>
    section.id === "company-introduction"
      ? {
        ...section,
        body: "",
        media: homeReferenceImages.about,
        items: [
          { title: "Engineering-led planning" },
          { title: "ISO-certified processes" },
          { title: "Dedicated project controls" },
          { title: "On-time delivery culture" },
          { title: "Experienced site teams" },
          { title: "Transparent reporting" },
        ],
        cta: undefined,
      }
      : section,
  );
  const pick = (...ids: string[]) => sections.filter((section) => ids.includes(section.id));

  return (
    <>
      {/* 1 — Hero */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Hero
          eyebrow="INDUSTRIAL • COMMERCIAL • INFRASTRUCTURE"
          title="From Land|Development|to Large-Scale|Infrastructure|Execution."
          description="Dockside Constructions delivers earthworks, industrial infrastructure, road construction, site development and project management services across India with engineering precision, safety compliance and reliable execution."
          shortDescription="Engineering infrastructure built with precision, safety and reliability."
          trustBadges={["Safety Compliant", "Pan India", "Industrial Experts"]}
          statsSlot={<HeroStatsStrip metrics={trustMetrics} />}
          mobileFirstLayout

          primaryLabel="VIEW PROJECTS"
          primaryHref="/projects"
          secondaryLabel="CONTACT US"
          secondaryHref="/contact"
        />
        <div className="absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
          <TrustSystems />
        </div>
      </div>

      {/* 3 — About Dockside */}
      <div className="relative -mt-8 z-40">
        <div id="about" className="absolute top-[40px]" />
        <SiteContentSections sections={pick("company-introduction")} />
      </div>

      {/* 4 — Services */}
      <div id="services" className="scroll-mt-[90px]">
        <Services />
      </div>

      {/* 5 — Featured Projects */}
      <div id="clients" className="hidden">
        <TrustedByStrip />
      </div>

      <Projects projects={projects} />

      {/* 5.5 — Project Delivery Process */}
      <ProjectDelivery />

      {/* 6 — Contact CTA */}
      <ContactCTA
        eyebrow="Start Your Project"
        heading="Ready to Build With Confidence?"
        description="Partner with Dockside Constructions for engineering-led execution, disciplined safety standards, and reliable project delivery."
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={{ label: "View Projects", href: "/projects" }}
      />
    </>
  );
}
