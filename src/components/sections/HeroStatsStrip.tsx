"use client";

import { CountUp } from "@/components/ui/CountUp";

type HeroStat = {
  value: number | string;
  suffix?: string;
  label: string;
};

type HeroStatsStripProps = {
  metrics: HeroStat[];
};

/**
 * Compact stats block for the mobile hero. The desktop floating metrics card
 * is far too wide for a phone, so the same numbers are shown as a rule-bounded
 * grid that sits directly under the hero CTAs to establish trust immediately.
 */
export function HeroStatsStrip({ metrics }: HeroStatsStripProps) {
  return (
    <div className="hero-stats-strip">
      {metrics.map((metric) => (
        <div className="hero-stats-strip__item" key={metric.label}>
          <div className="hero-stats-strip__value">
            {typeof metric.value === "number" ? (
              <CountUp end={metric.value} suffix={metric.suffix || ""} />
            ) : (
              <>{metric.value}</>
            )}
          </div>
          <div className="hero-stats-strip__label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
