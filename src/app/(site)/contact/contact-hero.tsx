"use client";

import { Clock, Phone, ShieldCheck, MessageSquare, Handshake, Headset, MessageCircle, HardHat } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const contactMetrics: HeroMetric[] = [
  { icon: Clock, value: 24, suffix: "h", label: "Response Time" },
  { icon: Phone, value: 100, suffix: "%", label: "Direct Access" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Expert Guidance" },
];

export default function ContactHero() {
  return (
    <div className="relative">
      <Hero
        eyebrow="Get In Touch"
        badgeIcon={MessageSquare}
        title="Let's Build|Your Vision|Together."
        description="Whether you're planning an industrial facility, commercial development, or infrastructure project, our team is ready to discuss your requirements and help bring your vision to life."
        slides={[
          {
            src: "/hero/contacts.png",
            alt: "Dockside Constructions office and team ready to assist",
          },
        ]}
      >
        <div className="pt-2">
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A] mb-4">
            Why Contact Dockside?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <Handshake className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Dedicated Project Consultation</span>
            </div>
            <div className="flex items-center gap-3">
              <Headset className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Fast Response Team</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Transparent Communication</span>
            </div>
            <div className="flex items-center gap-3">
              <HardHat className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Engineering Expertise</span>
            </div>
          </div>
        </div>
      </Hero>
      <div className="absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
        <HeroMetrics metrics={contactMetrics} />
      </div>
    </div>
  );
}
