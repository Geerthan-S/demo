"use client";

import { FileText, Award, FileCheck, Download } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";
import { HeroStatsStrip } from "@/components/sections/HeroStatsStrip";

const downloadMetrics: HeroMetric[] = [
  { icon: FileText, value: 15, suffix: "+", label: "Documents" },
  { icon: Award, value: 100, suffix: "%", label: "Certified" },
  { icon: FileCheck, value: 100, suffix: "%", label: "Verified" },
];

export default function DownloadsHero() {
  return (
    <>
      <style>{`
        .dl-hero-wrapper {
          position: relative;
        }

        .dl-metrics-desktop {
          display: block;
        }
        .dl-image-mobile {
          display: none;
        }

        @media (max-width: 760px) {
          .dl-metrics-desktop {
            display: none !important;
          }

          .dl-image-mobile {
            display: block !important;
            position: relative;
            width: 100%;
            margin: 0;
          }

          .dl-image-mobile__img {
            display: block;
            width: 100%;
            height: 56vw;
            min-height: 200px;
            max-height: 300px;
            object-fit: cover;
            object-position: center 50%;
          }

          .dl-stats-overlay {
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

          .dl-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            padding: 6px 8px;
          }

          .dl-stat-item + .dl-stat-item {
            border-left: 1px solid rgba(139, 58, 74, 0.12);
          }

          .dl-stat-value {
            font-family: var(--font-display);
            font-size: 20px;
            font-weight: 900;
            line-height: 1;
            color: #8B2332;
          }

          .dl-stat-label {
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

      <div className="dl-hero-wrapper">
        <Hero
          mobileFirstLayout
          statsSlot={<HeroStatsStrip metrics={downloadMetrics} />}
          eyebrow="Download Center"
          badgeIcon={Download}
          title="Business|Credentials|& Resources."
          description="Download our company credentials, certifications, policies, and documentation. All resources are verified and up-to-date for your business needs."
          shortDescription="Verified corporate credentials, certifications, policies and compliance resources."
          slides={[
            {
              src: "/hero/downloads.png",
              alt: "Dockside business credentials and documentation center",
            },
          ]}
          primaryLabel="DOWNLOAD PROFILE"
          primaryHref="/dockside-business-profile.pdf"
          secondaryLabel="CONTACT US"
          secondaryHref="/contact"
        />

        <div className="dl-metrics-desktop absolute bottom-[80px] left-0 right-0 z-50">
          <HeroMetrics metrics={downloadMetrics} />
        </div>

        <div className="dl-image-mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/downloads.png"
            alt="Dockside business credentials and documentation center"
            className="dl-image-mobile__img"
          />
          <div className="dl-stats-overlay">
            {downloadMetrics.map((metric) => (
              <div key={metric.label} className="dl-stat-item">
                <div className="dl-stat-value">
                  {metric.value}{metric.suffix ?? ""}
                </div>
                <div className="dl-stat-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
