import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";
import { CareersFilterGrid } from "@/components/careers-filter-grid";
import { motion } from "framer-motion";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { industrialImages } from "@/lib/content";
import { valueProps, timelineSteps } from "@/lib/careers-data";
import { getJobOpenings, getCareerSetting } from "@/lib/repositories";
import { InternshipButton } from "@/components/internship-button";
import { ContactCTA } from "@/components/sections/ContactCTA";
import CareersHero from "./careers-hero";
import { CareersStatisticsStrip } from "./careers-statistics-strip";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers | Dockside Constructions",
  description:
    "Build your career at Dockside Constructions. Explore open opportunities for Civil, Site, Planning, QA/QC and Safety Engineers. Real site exposure, professional growth, and safety-first culture.",
  keywords: [
    "Construction careers",
    "Civil Engineer jobs",
    "Site Engineer openings",
    "Dockside Constructions careers",
    "Infrastructure jobs India",
    "Planning Engineer vacancies",
  ],
  openGraph: {
    title: "Careers | Dockside Constructions",
    description:
      "Join a leading infrastructure and industrial civil engineering team. Build landmark projects, learn from veterans, and fast-track your career.",
    type: "website",
  },
};

export default async function CareersPage() {
  const jobOpenings = await getJobOpenings();
  const careerSetting = await getCareerSetting();

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Careers at Dockside Constructions",
    description:
      "Explore professional career pathways for engineers, project managers, and interns in civil and industrial construction.",
    publisher: {
      "@type": "Organization",
      name: "Dockside Constructions Private Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://docksideconstructions.com/favicon-96x96.png",
      },
    },
  };

  return (
    <div className="careers-page-v2 overflow-hidden relative z-0">
      <CareersHero />
      <CareersStatisticsStrip />

      {/* ── 2. WHY DOCKSIDE? ── */}
      <section className="cv2-section relative z-10 pt-24 mt-12" id="why-dockside">
        <Reveal className="cv2-section__head">
          <span className="cv2-eyebrow">WHY BUILD YOUR FUTURE WITH</span>
          <h2 className="cv2-section__title">DOCKSIDE?</h2>
        </Reveal>

        <div className="cv2-values-grid">
          {valueProps.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Reveal key={idx} delay={idx * 0.06} className="cv2-value-card">
                <div className="cv2-value-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 4. AVAILABLE POSITIONS ── */}
      <section className="cv2-section cv2-section--positions" id="open-positions">
        <Reveal className="cv2-section__head">
          <span className="cv2-eyebrow">OPEN OPPORTUNITIES</span>
          <h2 className="cv2-section__title cv2-section__title--large">AVAILABLE POSITIONS</h2>
        </Reveal>
        <CareersFilterGrid jobOpenings={jobOpenings} />
      </section>

      {/* ── 5. INTERNSHIP BANNER ── */}
      <section className="cv2-internship" id="internships">
        <div className="cv2-internship__inner">
          <div className="cv2-internship__copy">
            <div className="cv2-internship__tag">
              <GraduationCap aria-hidden="true" />
              Nurturing Civil Talent
            </div>
            <h2>DOCKSIDE ENGINEERING INTERNSHIPS</h2>
            <p>
              Are you a recent graduate or final-year Civil Engineering student? Our intensive
              internship program places you directly under senior site engineers on active ₹10+
              Crore projects. You won&apos;t just observe; you will measure, inspect, record, and
              execute.
            </p>
            <ul className="cv2-internship__bullets">
              <li>
                <strong>Real Site Exposure:</strong> Learn advanced total station setups, DGPS
                surveys, and lab concrete compressive tests.
              </li>
              <li>
                <strong>Structured Mentorship:</strong> Weekly reviews with Project Directors and QA
                leads.
              </li>
              <li>
                <strong>Completion Certificate:</strong> Earn a tier-1 reference letter and site
                certification.
              </li>
            </ul>
            <InternshipButton settings={careerSetting} jobOpenings={jobOpenings} />
          </div>
          <div className="cv2-internship__image">
            <Image
              src={industrialImages.safety}
              alt="Intern learning on-site safety and concrete checks"
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
            />
          </div>
        </div>
      </section>

      {/* ── 6. HOW WE SELECT ── */}
      <section className="cv2-section" id="process">
        <Reveal className="cv2-section__head cv2-section__head--center">
          <h2 className="cv2-section__title">HOW WE SELECT</h2>
        </Reveal>

        <div className="cv2-process">
          <div className="cv2-process__line" aria-hidden="true" />
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={idx} delay={idx * 0.1} className="cv2-process__step">
                <div className="cv2-process__icon">
                  <Icon aria-hidden="true" />
                </div>
                <span className="cv2-process__num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactCTA
        eyebrow="Join The Force"
        heading="Ready to Build Your Future?"
        description="We are open to talented individuals. Submit your résumé and our team will be in touch."
        primaryButton={{ label: "View Open Roles", href: "#open-positions" }}
        secondaryButton={{ label: "Contact Recruitment", href: "/contact" }}
      />

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </div>
  );
}
