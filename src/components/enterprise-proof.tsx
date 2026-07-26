"use client";

import Link from "next/link";
import { ArrowRight, Award, Building2, Factory, HardHat, Landmark, ShieldCheck, Wrench } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";

type TrustedClient = {
  name: string;
  logo?: string;
  sublabel?: string;
  showLabel?: boolean;
};

export const trustedClients: TrustedClient[] = [
  {
    name: "WHIRLPOOL",
    logo: "/client-logos/whirlpool.svg",
  },
  {
    name: "PWD",
    logo: "/client-logos/pwd-puducherry.png",
    sublabel: "Public Works Department",
  },
  {
    name: "DRDA",
    logo: "/client-logos/tnrd.gif",
    sublabel: "District Rural Development Agency",
  },
  {
    name: "TAHDCO",
    logo: "/client-logos/tahdco.png",
    sublabel: "Tamil Nadu Development Corporation",
  },
  {
    name: "LODHA",
    logo: "/client-logos/lodha.png",
  },
  {
    name: "ADANI",
    logo: "/client-logos/adani.svg",
  },
  {
    name: "CHENNAI ONE",
    logo: "/client-logos/chennai-one.jpg",
  },
  {
    name: "ANABOND",
    logo: "/client-logos/anabond.svg",
  },
  {
    name: "AKSHAYA PATRA",
    logo: "/client-logos/akshaya-patra.png",
  },
  {
    name: "GODREJ CONSUMER PRODUCTS",
    logo: "/client-logos/godrej-consumer-products.jpg",
  },
];

export const certificationBadges = [
  {
    code: "ISO 9001",
    label: "Quality Management",
    text: "Documented quality systems for inspection-led delivery.",
  },
  {
    code: "ISO 14001",
    label: "Environmental Management",
    text: "Responsible site practices and environmental control discipline.",
  },
  {
    code: "ISO 45001",
    label: "Occupational Health & Safety",
    text: "Safety governance for field execution and worksite control.",
  },
];

export const enterpriseMetrics = [
  { label: "Works Delivered", value: 65, suffix: "+", icon: Building2 },
  { label: "Core Service Lines", value: 8, suffix: "", icon: Wrench },
  { label: "Key Client References", value: 10, suffix: "", icon: HardHat },
  { label: "Industrial Works", value: 20, suffix: "+", icon: Factory },
  { label: "ISO Certifications", value: 3, suffix: "", icon: ShieldCheck },
];

export const departmentContacts = [
  {
    title: "Project Enquiries",
    text: "Industrial, commercial, infrastructure and site-development discussions.",
    href: "mailto:admin@docksideconstructions.com",
  },
  {
    title: "Engineering Review",
    text: "Drawings, scope clarifications, quantities and technical feasibility.",
    href: "mailto:admin@docksideconstructions.com",
  },
];

export function TrustedByStrip() {
  const clients = trustedClients.map((client) => ({
    name: client.name,
    slug: client.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    logoUrl: client.logo,
    industry: client.sublabel,
  }));

  return (
    <section className="trusted-by-strip" aria-label="Trusted by">
      <h2 data-text-reveal>Supporting industrial, logistics, commercial and infrastructure developments across South India.</h2>
      <ClientLogoMarquee clients={clients} />
    </section>
  );
}

export function EnterpriseMetrics({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`enterprise-metrics ${compact ? "enterprise-metrics--compact" : ""}`} data-stagger-reveal>
      {enterpriseMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label}>
            <Icon className="size-5" aria-hidden="true" />
            <strong>
              <CountUp end={metric.value} suffix={metric.suffix} />
            </strong>
            <span>{metric.label}</span>
          </article>
        );
      })}
    </div>
  );
}

export function CertificationBadges() {
  return (
    <div className="certification-badges" data-stagger-reveal>
      {certificationBadges.map((cert) => (
        <article key={cert.code}>
          <Award className="size-5" aria-hidden="true" />
          <strong>{cert.code}</strong>
          <span>{cert.label}</span>
          <p>{cert.text}</p>
        </article>
      ))}
    </div>
  );
}

export function EnterpriseTrustBar() {
  return (
    <section className="enterprise-trust-bar" aria-label="Enterprise trust indicators">
      <div className="enterprise-trust-bar__copy">
        <ShieldCheck className="size-5" aria-hidden="true" />
        <div>
          <span>Certified delivery systems</span>
          <p>Quality, environment and occupational safety controls visible across the project lifecycle.</p>
        </div>
      </div>
      <CertificationBadges />
    </section>
  );
}

export function DepartmentContacts() {
  return (
    <div className="department-contact-grid">
      {departmentContacts.map((contact) => (
        <Link href={contact.href} key={contact.title}>
          <Landmark className="size-5" aria-hidden="true" />
          <strong>{contact.title}</strong>
          <span>{contact.text}</span>
          <em>
            Contact team <ArrowRight className="size-3.5" aria-hidden="true" />
          </em>
        </Link>
      ))}
    </div>
  );
}
