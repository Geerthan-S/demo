import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}) {
  const titleLines = title.split(/\s*\|\s*|\n/).filter(Boolean);

  return (
    <section className={`premium-page-hero${className ? ` ${className}` : ""}`}>
      <div className="premium-page-hero__media">
        <Image src={image} alt="" fill priority className="object-cover" />
      </div>
      <div className="premium-page-hero__content">
        <span>{eyebrow}</span>
        <h1 aria-label={titleLines.join(" ")}>
          {titleLines.map((line, index) => (
            <span className="premium-page-hero__title-line" aria-hidden="true" key={`${line}-${index}`}>
              {line}
            </span>
          ))}
        </h1>
        <p>{description}</p>
        {(ctaLabel && ctaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
          <div className="premium-page-hero__actions">
            {ctaLabel && ctaHref ? (
              <Link href={ctaHref} className="studio-button studio-button--fill premium-page-hero__cta">
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <Link href={secondaryCtaHref} className="studio-button studio-button--outline premium-page-hero__cta">
                {secondaryCtaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
