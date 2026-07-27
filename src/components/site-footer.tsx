import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  Download,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { DOCKSIDE_LOGO_SRC, Logo } from "@/components/ui/logo";

const companyLinks = [
  ["About Us", "/#about"],
  ["Services", "/#services"],
  ["Equipment Fleet", "/equipment-fleet"],
  ["Quality & Safety", "/quality-safety"],
  ["Projects", "/projects"],
  ["Downloads", "/downloads"],
  ["Contact Us", "/contact"],
] as const;

const resourceLinks = [
  ["Privacy Policy", "mailto:admin@docksideconstructions.com?subject=Privacy%20Policy"],
  ["Terms & Conditions", "mailto:admin@docksideconstructions.com?subject=Terms%20%26%20Conditions"],
  ["ISO Certification", "/Dockside%20Business%20Profile.pdf"],
  ["Safety Policy", "mailto:admin@docksideconstructions.com?subject=Safety%20Policy"],
  ["Quality Policy", "mailto:admin@docksideconstructions.com?subject=Quality%20Policy"],
  ["Company Profile", "/Dockside%20Business%20Profile.pdf"],
] as const;

export function SiteFooter() {
  return (
    <footer className="industrial-footer bg-[#15090b] border-t border-white/5 text-white text-left" id="site-footer">
      <div className="industrial-footer__main bg-transparent border-none shadow-none text-left">
        <Image
          src={DOCKSIDE_LOGO_SRC}
          alt=""
          width={420}
          height={420}
          className="industrial-footer__watermark opacity-5"
          style={{ width: "auto", height: "auto" }}
          aria-hidden="true"
        />

        <div className="industrial-footer__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 max-w-[1500px] mx-auto px-4 md:px-8 text-left items-start justify-items-start">
          {/* Brand Column */}
          <div className="industrial-footer__brand col-span-1 sm:col-span-2 lg:col-span-1 text-left items-start">
            <Logo className="industrial-wordmark--footer" />
            <p className="industrial-footer__tagline text-[13px] text-white/70 leading-relaxed mt-4 mb-5 max-w-sm text-left">
              Dockside Constructions is a professionally driven infrastructure
              and construction company delivering industrial, commercial and
              public sector projects with engineering excellence and disciplined
              execution.
            </p>

            <a href="/Dockside%20Business%20Profile.pdf" download className="industrial-footer__download inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B2332] px-4 py-2.5 rounded-lg hover:bg-[#a32a3d] transition-colors mb-5">
              <Download className="w-4 h-4" aria-hidden="true" />
              Download Company Profile
            </a>

            <div className="industrial-footer__socials flex items-center gap-3" aria-label="Social links">
              <a
                href="https://www.linkedin.com/search/results/companies/?keywords=Dockside%20Constructions"
                target="_blank"
                rel="noreferrer"
                aria-label="Dockside on LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/explore/search/keyword/?q=Dockside%20Constructions"
                target="_blank"
                rel="noreferrer"
                aria-label="Dockside on Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="mailto:admin@docksideconstructions.com" aria-label="Email Dockside" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Company Column - Left aligned */}
          <FooterColumn title="COMPANY" links={companyLinks} />

          {/* Resources Column - Left aligned */}
          <FooterColumn title="RESOURCES" links={resourceLinks} downloadPdfs />

          {/* Legal Column */}
          <div className="industrial-footer__column industrial-footer__column--desktop col-span-1 text-left items-start w-full justify-self-start">
            <h3 className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#d4707c] uppercase mb-3 text-left">LEGAL</h3>
            <nav aria-label="Legal information" className="flex flex-col gap-2 text-left items-start">
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">CIN:</span>
                <span className="font-mono text-[11px] text-white/90 tracking-tight">U45309TN2022PTC153673</span>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">Registered Office:</span>
                <span className="text-white/80">No 58, V.G.P Nagar, Salamedu, Villupuram – 605401</span>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">Incorporated:</span>
                <span className="text-white/80">2022 · Private Limited</span>
              </div>
            </nav>
          </div>

          <details className="industrial-footer__accordion industrial-footer__accordion--legal col-span-1 text-left w-full justify-self-start">
            <summary>
              <BadgeCheck className="industrial-footer__accordion-badge" aria-hidden="true" />
              <span>LEGAL</span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <nav aria-label="Legal information mobile" className="industrial-footer__accordion-links industrial-footer__accordion-links--legal">
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">CIN:</span>
                <span className="font-mono text-[11px] text-white/90 tracking-tight">U45309TN2022PTC153673</span>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">Registered Office:</span>
                <span className="text-white/80">No 58, V.G.P Nagar, Salamedu, Villupuram - 605401</span>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="text-[#d4707c] font-bold shrink-0">Incorporated:</span>
                <span className="text-white/80">2022 - Private Limited</span>
              </div>
            </nav>
          </details>

          {/* Contact Column */}
          <div className="industrial-footer__column industrial-footer__contact-col col-span-1 text-left items-start w-full justify-self-start">
            <h3 className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#d4707c] uppercase mb-3 text-left">CONTACT</h3>
            <nav aria-label="Contact information" className="flex flex-col gap-2 text-left items-start">
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="footer-info-icon hidden" aria-hidden="true"><Phone /></span>
                <span className="text-[#d4707c] font-bold shrink-0">Phone:</span>
                <a href="tel:+918825922737" className="text-white/90 hover:text-white transition-colors">
                  +91 88259 22737
                </a>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="footer-info-icon hidden" aria-hidden="true"><Mail /></span>
                <span className="text-[#d4707c] font-bold shrink-0">Email:</span>
                <a href="mailto:admin@docksideconstructions.com" className="text-white/90 hover:text-white transition-colors break-all">
                  admin@docksideconstructions.com
                </a>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="footer-info-icon hidden" aria-hidden="true"><Clock3 /></span>
                <span className="text-[#d4707c] font-bold shrink-0">Hours:</span>
                <span className="text-white/80">Mon – Sat, 9:00 AM – 6:00 PM</span>
              </div>
              <div className="footer-info-row flex flex-row items-baseline justify-start gap-2 text-[12px] text-white/70 text-left">
                <span className="footer-info-icon hidden" aria-hidden="true"><MapPin /></span>
                <span className="text-[#d4707c] font-bold shrink-0">Address:</span>
                <span className="text-white/80">No 58, V.G.P Nagar, Salamedu, Villupuram – 605401</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Legal Copyright Bar - Clean Horizontal Row, NO Mark Icon */}
        <div className="industrial-footer__bar mt-10 pt-6 pb-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium text-white/50 text-center sm:text-left">
          <span>&copy; 2025 Dockside Constructions Private Limited</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>Precision in Engineering. Confidence in Delivery.</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  downloadPdfs = false,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
  downloadPdfs?: boolean;
}) {
  const renderLinks = () =>
    links.map(([label, href]) => {
        const isDownload = downloadPdfs && href.includes(".pdf");

        if (href.startsWith("mailto:")) {
          return (
            <a href={href} key={label} style={{ textAlign: "left" }} className="text-[12px] text-white/70 hover:text-white transition-colors !text-left w-full block">
              {label}
            </a>
          );
        }

        if (isDownload) {
          return (
            <a href={href} download key={label} style={{ textAlign: "left" }} className="text-[12px] text-white/70 hover:text-white transition-colors !text-left w-full block">
              {label}
            </a>
          );
        }

        return (
          <Link href={href} key={label} style={{ textAlign: "left" }} className="text-[12px] text-white/70 hover:text-white transition-colors !text-left w-full block">
            {label}
          </Link>
        );
      });

  return (
    <>
      <div className="industrial-footer__column industrial-footer__column--desktop col-span-1 text-left items-start w-full justify-self-start">
        <h3 className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#d4707c] uppercase mb-3 text-left">{title}</h3>
        <nav aria-label={title} className="flex flex-col gap-2 text-left items-start w-full">
          {renderLinks()}
        </nav>
      </div>

      <details className="industrial-footer__accordion col-span-1 text-left w-full justify-self-start">
        <summary>
          <BadgeCheck className="industrial-footer__accordion-badge" aria-hidden="true" />
          <span>{title}</span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <nav aria-label={`${title} mobile`} className="industrial-footer__accordion-links">
          {renderLinks()}
        </nav>
      </details>
    </>
  );
}
