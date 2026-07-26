import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Gauge, CheckCircle2, PhoneCall, Truck, ShieldCheck, Tractor } from "lucide-react";
import { getEquipment, type EquipmentItem } from "@/lib/repositories";
import { EquipmentFleetHero } from "./equipment-fleet-hero";
import { FleetCapabilityOverview } from "@/components/sections/FleetCapabilityOverview";
import { EquipmentShowcase } from "@/components/equipment/EquipmentShowcase";
import { FleetAtAGlance } from "@/components/sections/FleetAtAGlance";
import { FleetDeploymentProcess } from "@/components/sections/FleetDeploymentProcess";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Equipment Fleet | Dockside Constructions",
  description:
    "Explore Dockside Constructions' owned heavy equipment fleet — tipper trucks, excavators, motor graders, vibro rollers, JCB backhoe loaders, and water tankers deployed across all active project sites.",
};

const fleetBadgeMap: Record<string, string> = {
  "tipper-trucks": "50+ Units",
  "excavators": "10+ Units",
  "motor-graders": "5+ Units",
  "vibro-rollers": "8+ Units",
  "jcb-backhoe-loaders": "6+ Units",
  "water-tankers": "12+ Units",
};

const fleetDescMap: Record<string, string> = {
  "tipper-trucks": "Heavy-duty tipper trucks for efficient material transport across construction sites.",
  "excavators": "Powerful excavators for earthmoving, trenching, and site preparation.",
  "motor-graders": "Precision motor graders for road construction and surface leveling.",
  "vibro-rollers": "Vibratory rollers for soil and asphalt compaction.",
  "jcb-backhoe-loaders": "Versatile JCB backhoe loaders for excavation and loading operations.",
  "water-tankers": "Water tankers for dust suppression and site maintenance.",
};

export default async function EquipmentFleetPage() {
  const equipment = await getEquipment();

  return (
    <div className="min-h-screen bg-white">
      <EquipmentFleetHero />

      {/* ══ FLEET CAPABILITY OVERVIEW ════════════════════════════════════ */}
      <FleetCapabilityOverview />

      {/* ══ INTERACTIVE EDITORIAL SHOWCASE ════════════════════════════════════ */}
      <EquipmentShowcase equipment={equipment} />

      {/* ══ FLEET AT A GLANCE ═══════════════════════════════════════════════ */}
      <FleetAtAGlance />

      {/* ══ FLEET DEPLOYMENT PROCESS ════════════════════════════════════════ */}
      <FleetDeploymentProcess />

      {/* ══ FLEET PREMIUM CTA ═══════════════════════════════════════════════ */}
      <ContactCTA
        eyebrow="Equipment Leasing & Mobilisation"
        heading="Need Equipment For Your Project?"
        description="Share your project requirements and our fleet team will coordinate rapid mobilisation for industrial, infrastructure and commercial developments."
        primaryButton={{ label: "Request Fleet Availability", href: "/contact" }}
        secondaryButton={{ label: "Call Fleet Team", href: "tel:+918925922737" }}
      />

    </div>
  );
}
