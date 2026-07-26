import { CountUp } from "@/components/ui/CountUp";
import { BadgeCheck, Building2, Clock3, Factory } from "lucide-react";

const stats = [
  { icon: Factory, number: <CountUp end={65} suffix="+" />, label: "Executed works", descriptor: "Repeat projects across industrial, logistics and public-sector scopes" },
  { icon: Building2, number: <CountUp end={60} prefix="INR " suffix="Cr+" />, label: "Featured value", descriptor: "Profile-backed Lodha and Adani project values" },
  { icon: BadgeCheck, number: <CountUp end={3} suffix=" ISO" />, label: "Management systems", descriptor: "Quality, environment and occupational health governance" },
  { icon: Clock3, number: <CountUp end={0} text="24/7" />, label: "Site rhythm", descriptor: "Planning, supervision, documentation and handover discipline" },
];

export function Stats() {
  return (
    <section className="premium-stats" aria-label="Company statistics">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article key={stat.label} className="premium-stats__cell">
            <div className="flex w-[56px] h-[56px] shrink-0 items-center justify-center rounded-[14px] bg-[#f4ecea] border-white/60 border-[1.5px] shadow-sm text-[#8B3A4A] mx-auto mb-3">
              <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
            <em>{stat.descriptor}</em>
          </article>
        );
      })}
    </section>
  );
}
