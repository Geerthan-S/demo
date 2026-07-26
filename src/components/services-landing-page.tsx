"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Droplets,
  Factory,
  HardHat,
  IndianRupee,
  Mail,
  Phone,
  Route,
  ShieldCheck,
  TrainTrack,
  TrafficCone,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServicesLandingService = {
  title: string;
  slug: string;
  image: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  relatedProjectCount: number;
};

type ServiceCardConfig = {
  label: string;
  category: ServiceFilter;
  icon: LucideIcon;
  capabilities: [string, string, string]; // exactly 3 bullets
};

const filters = [
  "All",
  "Civil Construction",
  "Infrastructure",
  "Industrial",
  "Electrical",
  "Project Management",
] as const;

type ServiceFilter = (typeof filters)[number];

const serviceCardConfig: Record<string, ServiceCardConfig> = {
  "civil-construction": {
    label: "Civil Construction",
    category: "Civil Construction",
    icon: Building2,
    capabilities: [
      "RCC framing, slabs & structural works",
      "Industrial shed & warehouse construction",
      "Foundation works for heavy infrastructure",
    ],
  },
  "road-highways": {
    label: "Road & Highways",
    category: "Infrastructure",
    icon: Route,
    capabilities: [
      "BT & CC road construction",
      "Highway expansion & resurfacing",
      "Industrial internal road networks",
    ],
  },
  "railway-works": {
    label: "Railway Works",
    category: "Infrastructure",
    icon: TrainTrack,
    capabilities: [
      "Rail-linked civil & structural works",
      "Platform, bridge & culvert construction",
      "Railway safety & compliance support",
    ],
  },
  "electrical-works": {
    label: "Electrical Works",
    category: "Electrical",
    icon: Zap,
    capabilities: [
      "HT/LT power distribution & cabling",
      "Substation erection & commissioning",
      "Industrial lighting & control panels",
    ],
  },
  "industrial-projects": {
    label: "Industrial Projects",
    category: "Industrial",
    icon: Factory,
    capabilities: [
      "End-to-end industrial facility execution",
      "Mezzanine, lab & interior fitouts",
      "Utilities & MEP coordination",
    ],
  },
  "project-management": {
    label: "Project Management",
    category: "Project Management",
    icon: ClipboardList,
    capabilities: [
      "Owner-side project controls & reporting",
      "BOQ, procurement & milestone management",
      "Multi-contractor coordination & handover",
    ],
  },
  "water-infrastructure-drainage-works": {
    label: "Water Infrastructure & Drainage",
    category: "Infrastructure",
    icon: Droplets,
    capabilities: [
      "Storm water drainage & channel works",
      "Culvert, pipe & sewer network installation",
      "Site dewatering & flood mitigation systems",
    ],
  },
  "road-safety-traffic-management-systems": {
    label: "Road Safety & Traffic Management",
    category: "Infrastructure",
    icon: TrafficCone,
    capabilities: [
      "Traffic barrier, signage & marking systems",
      "Road safety audit & compliance works",
      "Junction & pedestrian safety infrastructure",
    ],
  },
};

// Replaced generic proof metrics with real Dockside numbers
const proofMetrics = [
  { value: 65, suffix: "+", label: "Projects Delivered", icon: Building2 },
  { value: 60, prefix: "INR ", suffix: "+ Cr", label: "Value Delivered", icon: IndianRupee },
  { value: 8, suffix: "", label: "Service Lines", icon: Wrench },
  { value: 3, suffix: "", label: "ISO Certifications", icon: ShieldCheck },
];

const processSteps = [
  {
    title: "Consultation",
    text: "Understand project needs, scope, site realities and owner priorities.",
    icon: Users,
  },
  {
    title: "Planning",
    text: "Lock methodology, BOQ inputs, milestones, procurement and site controls.",
    icon: ClipboardList,
  },
  {
    title: "Execution",
    text: "Coordinate manpower, materials, safety and daily site reporting.",
    icon: HardHat,
  },
  {
    title: "Quality Checks",
    text: "Run inspections, documentation, compliance checks and snag control.",
    icon: ShieldCheck,
  },
  {
    title: "Handover",
    text: "Complete approvals, closure records and accountable project handover.",
    icon: ClipboardCheck,
  },
];

// "Why Dockside?" section content
const whyDocksideReasons = [
  { text: "Engineering-led execution on every project" },
  { text: "ISO 9001 · 14001 · 45001 certified systems" },
  { text: "65+ works delivered across Tamil Nadu" },
  { text: "Transparent owner-side reporting" },
  { text: "Safety-first culture at every site level" },
  { text: "On-time delivery with accountability" },
] as const;

// CTA trust chips
const ctaTrustChips = [
  "Response within 24 Hours",
  "Site Evaluation Available",
  "ISO Certified",
] as const;

// ── Animated counter that handles prefix/suffix ──────────────────────────────
function CounterMetric({
  value,
  prefix = "",
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  icon: LucideIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fallback = window.setTimeout(() => setVisible(true), 900);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(fallback);
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => { window.clearTimeout(fallback); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);

  return (
    <div className="services-proof-card" ref={ref}>
      <Icon aria-hidden="true" />
      <strong>{prefix}{count}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

// ── Process timeline card with scroll-activated highlight ──────────────────
function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;
  return (
    <article
      ref={ref}
      className={`services-process-card${active ? " is-active" : ""}`}
      style={{ "--step-index": index } as React.CSSProperties}
    >
      <div className="services-process-card__number">{String(index + 1).padStart(2, "0")}</div>
      <div className="services-process-card__icon">
        <Icon aria-hidden="true" />
      </div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </article>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function ServicesLandingPage({ services }: { services: ServicesLandingService[] }) {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("All");

  const filteredServices = useMemo(() => {
    if (activeFilter === "All") return services;
    return services.filter((service) => serviceCardConfig[service.slug]?.category === activeFilter);
  }, [activeFilter, services]);

  return (
    <main className="services-conversion-page flex-1">

      {/* ── HERO — industrial drone/machinery image ─────────────────────── */}
      <section className="services-hero">
        {/* White overlay — guarantees text legibility over the background image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, rgba(249,244,239,1) 0%, rgba(249,244,239,1) 46%, rgba(249,244,239,0.9) 55%, rgba(249,244,239,0.5) 66%, rgba(249,244,239,0.1) 76%, rgba(249,244,239,0) 84%)",
          }}
        />
        <div className="services-hero__copy">
          <span className="services-hero__eyebrow">WHAT WE DELIVER</span>
          <h1>End-to-End Construction Solutions for Every Stage of Your Project.</h1>
          <p>
            From industrial facilities and warehouses to roads, utilities and infrastructure systems,
            we provide integrated construction services designed to meet complex project requirements
            with confidence.
          </p>
          <div className="services-hero__actions">
            <Link href="#services-catalog" className="services-hero__cta services-hero__cta--fill">
              Explore Services <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="services-hero__cta services-hero__cta--outline">
              Request Consultation <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="services-hero__trust" aria-label="Service delivery commitments">
            <div><ShieldCheck aria-hidden="true" /><strong>Safety First</strong><span>ISO 45001 compliant</span></div>
            <div><ClipboardCheck aria-hidden="true" /><strong>Quality Assured</strong><span>ISO 9001 certified</span></div>
            <div><CalendarCheck aria-hidden="true" /><strong>On-Time Delivery</strong><span>Deadline focused</span></div>
            <div><HardHat aria-hidden="true" /><strong>Industrial Strength</strong><span>65+ works delivered</span></div>
          </div>
        </div>
        {/* Industrial drone/large-scale infrastructure image */}
        <div className="services-hero__image" aria-hidden="true">
          <Image
            src="/services-reference/hd-industrial-projects.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </section>

      {/* ── FILTER PILLS — sticky on scroll ─────────────────────────────── */}
      <section className="services-catalog" aria-labelledby="services-catalog-title" id="services-catalog">
        <div className="services-catalog__heading">
          <span>Core Capabilities</span>
          <h2 id="services-catalog-title">Choose the service line for your project context.</h2>
        </div>

        <div className="services-filter services-filter--sticky" aria-label="Filter services">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── SERVICE CARDS — simplified structure ─────────────────────── */}
        <div className="services-card-grid">
          {filteredServices.map((service) => {
            const config = serviceCardConfig[service.slug];
            const Icon = config.icon;

            return (
              <article className="services-card" key={service.slug}>
                {/* Image */}
                <div className="services-card__media">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 29vw, (min-width: 760px) 45vw, 100vw"
                  />
                  <div className="services-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  {/* Category badge */}
                  <span className="services-card__category-badge">{config.category}</span>
                </div>
                                {/* Body */}
                <div className="services-card__body">
                  <div className="services-card__content">
                    <h3>{config.label}</h3>
                    <p>{service.description}</p>
                    {/* 3 key capabilities */}
                    <ul className="services-card__capabilities">
                      {config.capabilities.map((cap) => (
                        <li key={cap}>
                          <CheckCircle2 aria-hidden="true" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Single CTA */}
                  <div className="services-card__actions">
                    <Link href="/contact">
                      Request Consultation
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── PROOF METRICS — real Dockside numbers ────────────────────────── */}
      <section className="services-proof" aria-labelledby="services-proof-title">
        <div className="services-proof__heading">
          <span>Proven Track Record</span>
          <h2 id="services-proof-title">Built for disciplined project delivery.</h2>
        </div>
        <div className="services-proof__grid">
          {proofMetrics.map((metric) => (
            <CounterMetric key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* ── WHY DOCKSIDE — new conversion section ────────────────────────── */}
      <section className="services-why" aria-labelledby="services-why-title">
        <div className="services-why__copy">
          <span>Why Owners Choose Dockside</span>
          <h2 id="services-why-title">Project certainty starts with the right partner.</h2>
          <p>
            Industrial and infrastructure owners choose Dockside when delivery accountability,
            safety standards and engineering quality are non-negotiable.
          </p>
          <Link href="/contact" className="services-why__cta">
            Start Your Project <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="services-why__list">
          {whyDocksideReasons.map((reason) => (
            <li key={reason.text}>
              <CheckCircle2 aria-hidden="true" />
              <span>{reason.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── PROCESS TIMELINE — with scroll-activated stages ─────────────── */}
      <section className="services-process" aria-labelledby="services-process-title">
        <div className="services-process__heading">
          <span>How We Deliver Projects</span>
          <h2 id="services-process-title">A controlled path from consultation to handover.</h2>
        </div>
        <div className="services-process__timeline">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA — with trust chips ────────────────────────────────── */}
      <section className="services-lead">
        <div>
          <span>Project Consultation</span>
          <h2>Need Support For Your Next Infrastructure Project?</h2>
          <p>
            Let&apos;s understand your scope, site requirements and delivery timeline, then route
            your enquiry to the right engineering team.
          </p>
        </div>
        <div className="services-lead__actions">
          <Link href="/contact">
            Discuss Your Project
            <ArrowRight aria-hidden="true" />
          </Link>
          <a href="tel:+918825922737">
            <Phone aria-hidden="true" />
            Call Now
          </a>
          <span>
            <Phone aria-hidden="true" />
            +91 88259 22737
          </span>
          <span>
            <Mail aria-hidden="true" />
            admin@docksideconstructions.com
          </span>
        </div>
        {/* Trust chips below buttons */}
        <ul className="services-lead__trust-chips">
          {ctaTrustChips.map((chip) => (
            <li key={chip}>
              <BadgeCheck aria-hidden="true" />
              {chip}
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
