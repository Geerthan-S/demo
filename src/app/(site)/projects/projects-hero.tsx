"use client";

import { Building2, Timer, BadgeCheck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const projectMetrics: HeroMetric[] = [
  { icon: Building2, value: 25, suffix: "+", label: "Projects Delivered" },
  { icon: Timer, value: 100, suffix: " CR+", label: "Project Exposure" },
  { icon: BadgeCheck, value: 100, suffix: "%", label: "Quality Assured" },
];

export function ProjectsHero() {
  return (
    <>
      <style>{`
        .pj-hero-wrapper {
          position: relative;
        }

        .pj-metrics-desktop {
          display: block;
        }
        .pj-image-mobile {
          display: none;
        }

        @media (max-width: 760px) {
          .pj-metrics-desktop {
            display: none !important;
          }

          .pj-image-mobile {
            display: block !important;
            position: relative;
            width: 100%;
            margin: 0;
          }

          .pj-image-mobile__img {
            display: block;
            width: 100%;
            height: 56vw;
            min-height: 200px;
            max-height: 300px;
            object-fit: cover;
            object-position: center 50%;
          }

          .pj-stats-overlay {
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

          .pj-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            padding: 6px 8px;
          }

          .pj-stat-item + .pj-stat-item {
            border-left: 1px solid rgba(139, 58, 74, 0.12);
          }

          .pj-stat-value {
            font-family: var(--font-display);
            font-size: 20px;
            font-weight: 900;
            line-height: 1;
            color: #8B2332;
          }

          .pj-stat-label {
            margin-top: 3px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #6A6B72;
            text-align: center;
          }
        }
      `}</style>

      <div className="pj-hero-wrapper">
        <Hero
          eyebrow="Our Portfolio"
          badgeIcon={Building2}
          title="Projects That|Demonstrate|Capability."
          description="Explore a portfolio of industrial, commercial and infrastructure projects delivered through careful planning, technical expertise and a relentless focus on quality."
          shortDescription="25+ delivered projects — industrial infrastructure, commercial complexes, public sector."
          slides={[
            {
              src: "/hero/projects-construction-site.jpg",
              alt: "Dockside construction projects portfolio",
            },
          ]}
          primaryLabel="GET A QUOTE"
          primaryHref="/contact"
          secondaryLabel="CONTACT US"
          secondaryHref="/contact"
        />

        <div className="pj-metrics-desktop absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
          <HeroMetrics metrics={projectMetrics} />
        </div>

        <div className="pj-image-mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/projects-construction-site.jpg"
            alt="Dockside construction projects portfolio"
            className="pj-image-mobile__img"
          />
          <div className="pj-stats-overlay">
            {projectMetrics.map((metric) => (
              <div key={metric.label} className="pj-stat-item">
                <div className="pj-stat-value">
                  {metric.value}{metric.suffix ?? ""}
                </div>
                <div className="pj-stat-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
