import {
  TrendingUp,
  Award,
  Users,
  Lightbulb,
  Target,
  Shield,
  FileText,
  Video,
  UserCheck,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TimelineStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    icon: TrendingUp,
    title: "Real Project Exposure",
    description:
      "Work on live ₹10+ Crore industrial and infrastructure projects from day one. No simulation—just real scope, real stakes, and real learning.",
  },
  {
    icon: Award,
    title: "Accelerated Growth",
    description:
      "Junior engineers become site-in-charge in 18-24 months. We promote based on demonstrated capability, not tenure.",
  },
  {
    icon: Users,
    title: "Mentorship Culture",
    description:
      "Learn directly from Project Directors and senior civil engineers with 15-25 years of on-ground construction experience.",
  },
  {
    icon: Lightbulb,
    title: "Technical Mastery",
    description:
      "Master total station setups, DGPS surveys, concrete mix design, advanced bar-bending schedules, and quality control protocols.",
  },
  {
    icon: Target,
    title: "Multi-Domain Exposure",
    description:
      "Rotate across earthwork, structural steel, civil finishing, RCC, roads, and MEP systems to build comprehensive expertise.",
  },
  {
    icon: Shield,
    title: "Safety-First Culture",
    description:
      "Certified safety training, PPE enforcement, and zero-tolerance for shortcuts. We build careers, not casualties.",
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    icon: FileText,
    title: "Application Review",
    description:
      "Submit your résumé highlighting relevant project experience, technical skills, and academic credentials. We review within 3-5 business days.",
  },
  {
    step: "02",
    icon: Video,
    title: "Technical Screening",
    description:
      "A 30-45 minute video call with our Engineering Manager covering fundamentals: RCC design, site surveying, and construction sequencing.",
  },
  {
    step: "03",
    icon: UserCheck,
    title: "Project Director Interview",
    description:
      "Meet a Project Director to discuss real project scenarios, safety protocols, and your approach to on-site problem-solving.",
  },
  {
    step: "04",
    icon: Briefcase,
    title: "Offer & Onboarding",
    description:
      "Receive your formal offer letter with compensation breakdown, benefits, and site assignment. Onboarding begins with safety certification.",
  },
];
