import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { SitePageSection } from "@/lib/site-content";

type SectionCta = NonNullable<SitePageSection["cta"]>;

function SectionCtaLink({
  cta,
  variant = "fill",
}: {
  cta: SectionCta;
  variant?: "fill" | "outline";
}) {
  const className = `studio-button studio-button--${variant}`;
  const content = (
    <>
      {cta.label}
      <ArrowRight className="size-4" aria-hidden="true" />
    </>
  );

  if (cta.download) {
    return (
      <a className={className} download href={cta.href}>
        {content}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}

function SectionItemCard({ item }: { item: NonNullable<SitePageSection["items"]>[number] }) {
  const content = (
    <article className="cms-section-card">
      {item.image ? (
        <div className="cms-section-card__image">
          <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 28vw, 92vw" />
        </div>
      ) : null}
      {item.meta ? <span>{item.meta}</span> : null}
      <h3>{item.title}</h3>
      {item.text ? <p>{item.text}</p> : null}
      {item.items?.length ? (
        <ul>
          {item.items.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      ) : null}
      {item.href ? (
        <em>
          Open <ArrowRight className="size-3.5" aria-hidden="true" />
        </em>
      ) : null}
    </article>
  );

  if (!item.href) return content;
  return (
    <Link className="cms-section-card-link" href={item.href}>
      {content}
    </Link>
  );
}

function renderSectionBody(section: SitePageSection) {
  if (section.layout === "metrics") {
    return (
      <div className="about-metric-grid" aria-label={section.heading}>
        {section.items?.map((item) => (
          <article key={item.title}>
            <strong>{item.title}</strong>
            {item.text ? <span>{item.text}</span> : null}
          </article>
        ))}
      </div>
    );
  }

  if (section.layout === "intro") {
    const paragraphs = section.body?.split(/\n{2,}/).filter(Boolean) ?? [];
    return (
      <div className="about-intro-layout">
        {section.media ? (
          <div className="about-intro-media">
            <Image src={section.media} alt="" fill sizes="(min-width: 1024px) 46vw, 92vw" />
          </div>
        ) : null}
        <div className="about-intro-copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.cta ? <SectionCtaLink cta={section.cta} variant="outline" /> : null}
        </div>
      </div>
    );
  }

  if (["approach", "industries", "why-trust"].includes(section.layout ?? "")) {
    return (
      <div className={`about-proof-grid about-proof-grid--${section.layout}`}>
        {section.items?.map((item) => (
          <article className="about-proof-card" key={item.title}>
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </article>
        ))}
      </div>
    );
  }

  if (section.layout === "leadership") {
    return (
      <div className="about-leadership-grid">
        {section.items?.map((item) => (
          <article className="about-leadership-card" key={item.title}>
            {item.image ? (
              <div className="about-leadership-card__image">
                <Image src={item.image} alt={`${item.title} temporary leadership visual`} fill sizes="(min-width: 1024px) 25vw, 92vw" />
              </div>
            ) : null}
            <div>
              <h3>{item.title}</h3>
              {item.meta ? <span>{item.meta}</span> : null}
              {item.items?.length ? (
                <ul>
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (section.layout === "certifications") {
    return (
      <div className="about-certification-grid">
        {section.items?.map((item) => (
          <article key={item.title}>
            {item.image ? (
              <div className="about-certification-card__image">
                <Image src={item.image} alt={`${item.title} certificate`} fill sizes="(min-width: 1024px) 28vw, 92vw" />
              </div>
            ) : null}
            <strong>{item.title}</strong>
            {item.text ? <span>{item.text}</span> : null}
          </article>
        ))}
      </div>
    );
  }

  if (section.layout === "project-exposure") {
    return (
      <div className="about-project-exposure">
        <div className="about-project-exposure__grid">
          {section.items?.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              {item.meta ? <strong>{item.meta}</strong> : null}
              {item.text ? <span>{item.text}</span> : null}
            </article>
          ))}
        </div>
        {section.cta ? <SectionCtaLink cta={section.cta} variant="outline" /> : null}
      </div>
    );
  }

  if (section.layout === "profile-download") {
    return (
      <div className="about-profile-download">
        {section.media ? (
          <div className="about-profile-download__media">
            <Image src={section.media} alt="" fill sizes="(min-width: 1024px) 42vw, 92vw" />
          </div>
        ) : null}
        <div>
          {section.body ? <p>{section.body}</p> : null}
          {section.cta ? <SectionCtaLink cta={section.cta} /> : null}
        </div>
      </div>
    );
  }

  if (section.layout === "final-cta") {
    return (
      <div
        className="about-final-cta"
        style={section.media ? { backgroundImage: `url(${section.media})` } : undefined}
      >
        <div>
          {section.body ? <p>{section.body}</p> : null}
          <nav>
            {section.cta ? <SectionCtaLink cta={section.cta} /> : null}
            {section.ctaSecondary ? <SectionCtaLink cta={section.ctaSecondary} variant="outline" /> : null}
          </nav>
        </div>
      </div>
    );
  }

  if (section.layout === "faq") {
    return (
      <div className="cms-faq-list">
        {section.faqs?.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    );
  }

  if (section.layout === "cta") {
    return (
      <div
        className="cms-section-cta"
        style={section.media ? { backgroundImage: `url(${section.media})` } : undefined}
      >
        <div>
          {section.body ? <p>{section.body}</p> : null}
          {section.cta ? (
            <SectionCtaLink cta={section.cta} />
          ) : null}
        </div>
      </div>
    );
  }

  if (section.layout === "gallery") {
    return (
      <div className="cms-gallery-grid">
        {section.items?.map((item) => (
          <div className="cms-gallery-item" key={item.image ?? item.title}>
            {item.image ? <Image src={item.image} alt={item.title} fill sizes="(min-width: 900px) 32vw, 92vw" /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (section.layout === "split") {
    const isCompanyIntroduction = section.id === "company-introduction";

    return (
      <div className="cms-split-layout">
        <div className="cms-split-copy pt-0">
          {isCompanyIntroduction && section.items?.length ? (
            <ul className="cms-section-checklist m-0 p-0 flex flex-col gap-2 mt-4 lg:-mt-2">
              {section.items.map((item) => (
                <li key={item.title} className="flex items-center gap-2 text-[13px] text-white/80">
                  <Check className="size-4 text-[#dca65c]" aria-hidden="true" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          ) : section.items?.length ? (
            <div className="cms-section-grid">
              {section.items.map((item) => (
                <SectionItemCard key={`${item.title}-${item.meta ?? ""}`} item={item} />
              ))}
            </div>
          ) : null}
          {section.cta ? (
            <Link href={section.cta.href} className="studio-button studio-button--outline cms-section-action">
              {section.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        {section.media ? (
          <div className="cms-split-media">
            <Image src={section.media} alt="" fill sizes="(min-width: 1024px) 46vw, 92vw" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`cms-section-grid cms-section-grid--${section.layout ?? "grid"}`}>
      {section.items?.map((item) => (
        <SectionItemCard key={`${item.title}-${item.meta ?? ""}`} item={item} />
      ))}
    </div>
  );
}

export function SiteContentSections({ sections }: { sections: SitePageSection[] }) {
  if (!sections.length) return null;
  const bodyInSection = new Set(["intro", "profile-download", "final-cta", "cta"]);

  return (
    <>
      {sections.map((section) => (
        <section
          className={`cms-section cms-section--${section.layout ?? "grid"}`}
          id={section.id}
          key={section.id}
        >
          <div className="cms-section__header">
            <span>{section.label}</span>
            <h2>{section.heading}</h2>
            {section.body && !bodyInSection.has(section.layout ?? "") ? <p>{section.body}</p> : null}
          </div>
          {renderSectionBody(section)}
        </section>
      ))}
    </>
  );
}
