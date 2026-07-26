"use client";

import { CountUp } from "@/components/ui/CountUp";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type HeroMetric = {
  icon: LucideIcon | React.ElementType;
  value: number | string;
  suffix?: string;
  label: string;
};

type HeroMetricsProps = {
  metrics: HeroMetric[];
};

const metricVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function HeroMetrics({ metrics }: HeroMetricsProps) {
  return (
    <div className="relative w-full px-[4.05vw] flex justify-end z-[100] pointer-events-none">
      <motion.div
        className="w-full max-w-fit pointer-events-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
      >
        <div className={`flex flex-col ${metrics.length === 4 ? 'lg:flex-row' : 'md:flex-row'} overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_22px_62px_rgba(42,26,29,0.12)] divide-y ${metrics.length === 4 ? 'lg:divide-y-0 lg:divide-x' : 'md:divide-y-0 md:divide-x'} divide-[#8B3A4A]/10`}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={metricVariants}
                className="flex flex-1 items-center gap-3 py-4 px-4"
              >
                <div className="flex w-[48px] h-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#f4ecea] border-white/60 border-[1.5px] shadow-sm text-[#8B3A4A]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <div className={`font-display font-black uppercase leading-tight text-[#8B3A4A] ${typeof metric.value === "number" ? "text-[20px] whitespace-nowrap" : "text-[14px] lg:text-[15px] max-w-[125px]"}`}>
                    {typeof metric.value === "number" ? (
                      <CountUp end={metric.value} suffix={metric.suffix || ""} />
                    ) : (
                      <>{metric.value}</>
                    )}
                  </div>
                  <div className="mt-0.5 text-[12px] font-medium leading-snug text-[#666971] max-w-[125px]">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
