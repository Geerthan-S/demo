import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { industrialImages } from "@/lib/content";
import { MagneticButton } from "../ui/magnetic-button";

const ctaTrustItems = [
  "Response within 24 Hours",
  "Site Evaluation Available",
  "Project Consultation Included",
] as const;

export function CTA({
  eyebrow = "Project intake",
  title = "READY TO DISCUSS YOUR NEXT PROJECT?",
  description = "Connect with Dockside's engineering and project delivery teams.",
  label = "GET A QUOTE",
  href = "/contact",
  secondaryLabel = "CONTACT US",
  secondaryHref = "/contact",
  image = industrialImages.crane,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
}) {
  return (
    <section className="premium-cta" id="start-project" style={{ backgroundImage: `url(${image})` }}>
      <div data-stagger-reveal>
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        <nav>
          <MagneticButton>
            <Link href={href} className="studio-button studio-button--fill hoverable">
              {label} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href={secondaryHref} className="studio-button studio-button--outline hoverable">
              {secondaryLabel} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </nav>
        <ul className="cta-trust-strip" aria-label="What to expect">
          {ctaTrustItems.map((item) => (
            <li key={item}>
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

