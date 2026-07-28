"use client";

import { Truck, Tractor, HardHat, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";
import { HeroStatsStrip } from "@/components/sections/HeroStatsStrip";

const fleetMetrics: HeroMetric[] = [
  { icon: Truck, value: 50, suffix: "+", label: "Tipper Trucks" },
  { icon: Tractor, value: 20, suffix: "+", label: "Heavy Equipment" },
  { icon: HardHat, value: 100, suffix: "%", label: "Deployment Ready" },
];

export function EquipmentFleetHero() {
  return (
    <>
      <style>{`
        /* ── Equipment Fleet hero: mobile-first layout ── */
        .ef-hero-wrapper {
          position: relative;
        }

        /* Desktop: keep the original absolute positioning of the metrics card */
        .ef-metrics-desktop {
          display: block;
        }
        .ef-image-mobile {
          display: none;
        }

        @media (max-width: 760px) {
          /* Hide the desktop floating metrics card */
          .ef-metrics-desktop {
            display: none !important;
          }

          /* Show the mobile image+stats block */
          .ef-image-mobile {
            display: block !important;
            position: relative;
            width: 100%;
            /* Full-bleed: negate any inherited padding */
            margin: 0;
          }

          .ef-image-mobile__img {
            display: block;
            width: 100%;
            height: 56vw;
            min-height: 200px;
            max-height: 300px;
            object-fit: cover;
            object-position: center 60%;
          }

          /* Horizontal stats strip pinned to the bottom of the image */
          .ef-stats-overlay {
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

          .ef-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            padding: 6px 8px;
          }

          .ef-stat-item + .ef-stat-item {
            border-left: 1px solid rgba(139, 58, 74, 0.12);
          }

          .ef-stat-value {
            font-family: var(--font-display);
            font-size: 22px;
            font-weight: 900;
            line-height: 1;
            color: #8B2332;
          }

          .ef-stat-label {
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

      <div className="ef-hero-wrapper">
        <Hero
          mobileFirstLayout
          statsSlot={<HeroStatsStrip metrics={fleetMetrics} />}
          eyebrow="Our Fleet"
          badgeIcon={ShieldCheck}
          title="Heavy|Equipment|Fleet."
          description="A modern fleet of heavy equipment maintained for rapid mobilisation, operational reliability, and seamless execution across infrastructure and civil construction projects."
          shortDescription="Modern heavy equipment fleet — rapid mobilisation, certified operators, pan-India deployment."
          slides={[
            {
              src: "/hero/equipment-fleet-generated-hero.png",
              alt: "Dockside equipment fleet and heavy machinery at construction site",
            },
          ]}
          primaryLabel="VIEW PROJECTS"
          primaryHref="/projects"
          secondaryLabel="CONTACT US"
          secondaryHref="/contact"
        />

        {/* Desktop: floating metrics card (same as homepage pattern) */}
        <div className="ef-metrics-desktop absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
          <HeroMetrics metrics={fleetMetrics} />
        </div>

        {/* Mobile: full-width image with horizontal stats overlay at bottom */}
        <div className="ef-image-mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/equipment-fleet-generated-hero.png"
            alt="Dockside heavy equipment fleet at construction site"
            className="ef-image-mobile__img"
          />
          <div className="ef-stats-overlay">
            {fleetMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="ef-stat-item">
                  <div className="ef-stat-value">
                    {metric.value}{metric.suffix ?? ""}
                  </div>
                  <div className="ef-stat-label">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
