"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Download,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  FileText,
  Wrench,
  Zap,
  Flame,
  ShieldAlert,
  ArrowUpFromLine,
  Truck,
  ClipboardCheck,
  FlaskConical,
  HardHat,
  FolderOpen,
  Award,
  Eye,
  Leaf,
  Clock3,
  Building2,
  BadgeCheck,
  Sprout,
} from "lucide-react";
import { CertificateGrid } from "./CertificateGrid";
import { DeliveryRail } from "@/components/home/DeliveryRail";
import { DeliveryStep } from "@/components/home/DeliveryStep";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";
import { HeroStatsStrip } from "@/components/sections/HeroStatsStrip";
import { QualityKPIStrip } from "@/components/sections/QualityKPIStrip";
import { ToolboxTalks } from "@/components/sections/ToolboxTalks";

export const dynamic = "force-dynamic";

const safetyTalks = [
  {
    title: "Working at Heights",
    desc: "Rigorous safety harness compliance, guardrail installations, and scaffold integrity inspections.",
    icon: ArrowUpFromLine,
    stat: "100%",
    statLabel: "Harness Compliance",
  },
  {
    title: "Equipment Safety",
    desc: "Pre-operational checks, exclusion zone enforcement, and certified heavy machinery operators.",
    icon: Truck,
    stat: "Daily",
    statLabel: "Operator Checks",
  },
  {
    title: "Electrical Safety",
    desc: "Insulated tools verification, temporary wiring compliance, and lockout/tagout (LOTO) protocols.",
    icon: Zap,
    stat: "LOTO",
    statLabel: "Protocol Enforced",
  },
  {
    title: "Excavation Safety",
    desc: "Soil profiling, shoring and trench protection, and underground utility clearance checking.",
    icon: Wrench,
    stat: "Zero",
    statLabel: "Trench Incidents",
  },
  {
    title: "Fire Prevention",
    desc: "Hot work permit enforcement, firefighting equipment checks, and combustible separation.",
    icon: Flame,
    stat: "100%",
    statLabel: "Permit Coverage",
  },
  {
    title: "Incident Prevention",
    desc: "Near-miss reporting, hazard logging, and immediate root-cause mitigation procedures.",
    icon: ShieldAlert,
    stat: "Active",
    statLabel: "Reporting System",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Material Receipt",
    desc: "Verification and testing of incoming construction materials against approved technical specifications.",
    icon: FlaskConical,
  },
  {
    step: "02",
    title: "Site Preparation",
    desc: "Site preparation inspections, layout markers verification, and safety checklist completion before work starts.",
    icon: ClipboardCheck,
  },
  {
    step: "03",
    title: "Work-In-Progress",
    desc: "Stage-wise audits during structural execution, concrete pours, reinforcing layout, and earthwork stages.",
    icon: HardHat,
  },
  {
    step: "04",
    title: "Consultant Sign-off",
    desc: "Collaborative checks with project consultants to secure necessary phase approvals and sign-offs.",
    icon: FileText,
  },
  {
    step: "05",
    title: "Final Inspection",
    desc: "Comprehensive visual and dimensional verification, commissioning checks, and snag-list closure.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Project Handover",
    desc: "Verification of all quality registers, preparation of as-built records, and official client handover.",
    icon: Award,
  },
];

const materialTests = [
  {
    title: "Concrete Testing",
    desc: "Regular casting of cubes for compressive strength verification, slump tests, and thermal monitoring.",
    standard: "IS 516",
    icon: ClipboardCheck, // Using ClipboardCheck as a placeholder for concrete testing icon
  },
  {
    title: "Reinforcement Steel Testing",
    desc: "Tensile strength checks, elongation, bend tests, and physical dimension verification against IS standards.",
    standard: "IS 1786",
    icon: Wrench, // Using Wrench as a placeholder for rebar testing icon
  },
  {
    title: "Aggregate Testing",
    desc: "Sieve grading analysis, aggregate impact values, flakiness indices, and moisture level verification.",
    standard: "IS 2386",
    icon: FlaskConical, // Using FlaskConical as a placeholder for aggregate testing icon
  },
  {
    title: "Brick & Block Verification",
    desc: "Compressive load resistance testing, dimension consistency mapping, and water absorption checks.",
    standard: "IS 1077",
    icon: HardHat, // Using HardHat as a placeholder for brick testing icon
  },
  {
    title: "Water Quality Testing",
    desc: "Chemical testing of construction water to verify neutral pH, salinity limits, and organic impurity thresholds.",
    standard: "IS 456",
    icon: Zap, // Using Zap as a placeholder for water quality testing icon
  },
  {
    title: "Supplier Certification Review",
    desc: "Regular validation of manufacturer mill certificates, third-party lab checks, and origin audits.",
    standard: "ISO 9001",
    icon: ShieldCheck, // Using ShieldCheck as a placeholder for supplier certification icon
  },
];


const heroFeatures = [
  { icon: ShieldCheck, title: "Zero Harm", desc: "Zero-incident commitment" },
  { icon: Award, title: "Certified Quality", desc: "International standards" },
  { icon: Clock3, title: "On-Time Delivery", desc: "Reliable. Every time." },
  { icon: Building2, title: "Built To Last", desc: "Engineering for the future" },
];


/* ── animation variants ────────────────────────────────────── */

const sectionFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const qualityMetrics: HeroMetric[] = [
  { icon: ShieldCheck, value: "Zero Harm", label: "No incidents." },
  { icon: Award, value: "Certified Quality", label: "ISO Standards" },
  { icon: Clock3, value: "On-Time Delivery", label: "Always on schedule" },
  { icon: Building2, value: "Built To Last", label: "Engineered to endure" },
];

function QualitySafetyHero() {
  return (
    <>
      <style>{`
        .qs-hero-wrapper {
          position: relative;
        }

        .qs-metrics-desktop {
          display: block;
        }
        .qs-image-mobile {
          display: none;
        }

        @media (max-width: 760px) {
          .qs-metrics-desktop {
            display: none !important;
          }

          .qs-image-mobile {
            display: block !important;
            position: relative;
            width: 100%;
            margin: 0;
          }

          .qs-image-mobile__img {
            display: block;
            width: 100%;
            height: 56vw;
            min-height: 200px;
            max-height: 300px;
            object-fit: cover;
            object-position: center 50%;
          }

          .qs-stats-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1px solid rgba(139, 58, 74, 0.12);
            padding: 10px 12px;
            gap: 0;
          }

          .qs-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            padding: 6px 8px;
          }

          .qs-stat-item + .qs-stat-item {
            border-left: 1px solid rgba(139, 58, 74, 0.12);
          }

          .qs-stat-value {
            font-family: var(--font-display);
            font-size: 14px;
            font-weight: 900;
            line-height: 1;
            color: #8B2332;
            text-align: center;
          }

          .qs-stat-label {
            margin-top: 3px;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #6A6B72;
            text-align: center;
          }
        }
      `}</style>

      <div className="qs-hero-wrapper">
        <Hero
          mobileFirstLayout
          statsSlot={<HeroStatsStrip metrics={qualityMetrics} />}
          eyebrow="Certified Excellence"
          badgeIcon={ShieldCheck}
          title="Quality &|Safety First.|Always."
          description="Every project delivered through internationally recognized standards, rigorous multi-stage inspections, certified material testing, and an unwavering commitment to zero-incident operations."
          shortDescription="ISO 9001 & 45001 certified — multi-stage quality controls, zero-incident safety commitments."
          slides={[
            {
              src: "/hero/quality_safety.png",
              alt: "Dockside engineers reviewing quality and safety work at a construction site",
            },
          ]}
          primaryLabel="VIEW PROJECTS"
          primaryHref="/projects"
          secondaryLabel="CONTACT US"
          secondaryHref="/contact"
        />

        <div className="qs-metrics-desktop absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
          <HeroMetrics metrics={qualityMetrics} />
        </div>

        <div className="qs-image-mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/quality_safety.png"
            alt="Dockside quality and safety team"
            className="qs-image-mobile__img"
          />
          <div className="qs-stats-overlay">
            {qualityMetrics.map((metric) => (
              <div key={metric.label} className="qs-stat-item">
                <div className="qs-stat-value">{metric.value}</div>
                <div className="qs-stat-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function QualityAndSafetyPage() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";
  const qualityStageRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-screen">
      <QualitySafetyHero />

      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-8 h-[1px] bg-[#783138]/40" />
              <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#783138] uppercase font-bold">
                Standards &amp; Culture
              </span>
              <div className="w-8 h-[1px] bg-[#783138]/40" />
            </div>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
              International Standards We Follow
            </h2>
            <p data-text-reveal className="text-gray-500 max-w-[640px] mx-auto text-[13.5px] leading-[1.75]">
              Dockside Constructions operates under globally recognised management systems that ensure
              quality delivery, environmental responsibility, and occupational health &amp; safety across every project.
            </p>
          </div>
          <CertificateGrid />
        </div>
      </section>


      {/* ── 3. KPI STATS STRIP ── */}
      <QualityKPIStrip />


      {/* ── 4. DAILY SAFETY BRIEFING ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#fdfaf7] border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative overflow-hidden bg-gray-100 group">
            <div className="aspect-[4/3] relative">
              <Image
                src="/about-reference/hd-hero-site-team.jpg"
                alt="Dockside team attending morning safety briefing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 46vw, 92vw"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Floating label */}
              <div className="absolute bottom-4 left-4 bg-[#783138] text-white font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                Zero Harm
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#783138] uppercase block mb-3 font-bold">
              Mandatory Site Start
            </span>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-6">
              Daily Safety Briefing
            </h2>
            <p data-text-reveal className="text-gray-600 text-[15px] leading-[1.8] mb-8">
              Every shift begins with a structured safety briefing to review work activities, site
              conditions, hazards, and preventive measures before execution begins.
            </p>

            <ul className="cms-section-checklist">
              {[
                "Daily work scope review",
                "Hazard identification",
                "PPE verification",
                "Equipment readiness checks",
                "Emergency response awareness",
                "Workforce responsibility allocation",
              ].map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── 5. TOOLBOX TALKS ── */}
      <ToolboxTalks />


      {/* ── 6. QUALITY INSPECTION PROCESS ── */}
      <motion.section
        className="py-24 px-6 md:px-12 lg:px-16 bg-[#fdfaf7] border-b border-gray-100"
        initial={initial}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={sectionFade}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={headerVariants}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-8 h-[1px] bg-[#783138]/40" />
              <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#783138] uppercase font-bold">
                Execution Control
              </span>
              <div className="w-8 h-[1px] bg-[#783138]/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
              Quality Inspection Process
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-500 max-w-[560px] mx-auto text-[14px] leading-[1.75] text-center mb-16"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={subtitleVariants}
          >
            A structured, step-by-step verification pipeline enforcing specifications and controls at every phase.
          </motion.p>

          {/* Timeline with animated steps */}
          <div className="project-delivery__stage" ref={qualityStageRef}>
            <DeliveryRail stageRef={qualityStageRef} />
            <motion.ol
              className="project-delivery__steps"
              aria-label="Quality inspection process steps"
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={staggerContainer}
            >
              {processSteps.map((step, index) => (
                <DeliveryStep
                  key={step.step}
                  number={step.step}
                  title={step.title}
                  description={step.desc}
                  icon={step.icon}
                  index={index}
                />
              ))}
            </motion.ol>
          </div>
        </div>
      </motion.section>


      {/* ── 7. MATERIAL TESTING ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
            <div className="lg:max-w-[500px]">
              <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#783138] uppercase block mb-3 font-bold">
                Lab &amp; Site Tests
              </span>
              <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#783138]">
                Material Testing &amp; Verification
              </h2>
            </div>
            <p data-text-reveal className="text-gray-500 max-w-[480px] text-[13px] leading-[1.75] lg:text-right">
              All critical construction materials undergo testing and verification to ensure compliance with project specifications.
            </p>
          </div>

          <div data-stagger-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialTests.map((test) => {
              const Icon = test.icon;
              return (
                <div
                  key={test.title}
                  className="group relative flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#783138] text-[#783138] group-hover:bg-[#783138] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-[13px] font-bold uppercase tracking-wide text-gray-900">
                        {test.title}
                      </h3>
                      <span className="font-mono text-[11px] font-bold text-gray-400 tracking-wider flex-shrink-0">
                        {test.standard}
                      </span>
                    </div>
                    <p className="text-[12px] leading-[1.7] text-gray-500">
                      {test.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      <ContactCTA
        eyebrow="Quality Standards"
        heading="Need More Information?"
        description="Contact our team to learn more about our quality management and safety practices, or download our company profile."
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={{ label: "Download Profile", href: "/dockside-business-profile.pdf" }}
      />

    </div>
  );
}
