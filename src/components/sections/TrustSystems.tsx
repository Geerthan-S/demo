"use client";

import { Building2, Landmark, Pickaxe, Users } from "lucide-react";
import { HeroMetrics } from "@/components/sections/HeroMetrics";

export const trustMetrics = [
  { icon: Building2, value: 25, suffix: "+", label: "Projects Delivered" },
  { icon: Landmark, value: 100, suffix: " CR+", label: "Project Exposure" },
  { icon: Pickaxe, value: 500000, suffix: "+ M³", label: "Earthwork Executed" },
  { icon: Users, value: 10, suffix: "+", label: "Major Clients" },
];

export function TrustSystems() {
  return <HeroMetrics metrics={trustMetrics} />;
}
