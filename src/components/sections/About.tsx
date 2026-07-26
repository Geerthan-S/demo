"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { RevealText } from "@/components/motion/reveal";
import { homeReferenceImages } from "@/lib/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const aboutCards = [
  {
    step: "01",
    title: "Engineering planning",
    desc: "Scope, sequence, survey and milestone governance before mobilization.",
    image: homeReferenceImages.industries.institutional,
    status: "Preparation",
    features: ["Scope Definition", "Site Survey", "Milestone Planning"]
  },
  {
    step: "02",
    title: "Controlled execution",
    desc: "Civil, structural, utilities and site logistics coordinated through QA gates.",
    image: homeReferenceImages.about,
    status: "Active Delivery",
    features: ["Civil Works", "QA Gates", "Logistics Control"]
  },
  {
    step: "03",
    title: "Safety & Quality",
    desc: "Executive-grade safety systems and rigorous quality inspections across operations.",
    image: homeReferenceImages.industries.manufacturing,
    status: "Site Operations",
    features: ["Safety Checks", "Quality Controls", "Risk Management"]
  },
  {
    step: "04",
    title: "Handover confidence",
    desc: "Documentation, safety systems and owner-ready closeout discipline.",
    image: homeReferenceImages.industries.commercial,
    status: "Completion",
    features: ["Documentation", "Systems Testing", "Final Closeout"]
  }
];

export function About() {
  return (
    <section className="premium-projects" id="about-dockside">
      <div className="max-w-[1360px] mx-auto w-full">
        <div className="project-delivery__header">
          <div className="project-delivery__kicker">
            <span className="project-delivery__kicker-line" aria-hidden="true" />
            <span className="project-delivery__kicker-text">02 / COMPANY</span>
            <span className="project-delivery__kicker-line" aria-hidden="true" />
          </div>
          <RevealText>
            <h2 className="project-delivery__title">
              <span style={{ whiteSpace: "nowrap" }}>BUILDING SERIOUS</span><br />
              INFRASTRUCTURE.
            </h2>
          </RevealText>
        </div>

        <div className="premium-projects__case-label mt-8">
          <span>Execution Partner</span>
          <Link href="/quality-safety" className="studio-link premium-projects__view-all">
            View quality controls <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          className="premium-project-rail"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          aria-label="About Dockside"
        >
          {aboutCards.map((card, index) => (
            <motion.div key={card.step} variants={cardVariants} className="h-full">
              <div
                className="premium-project-card h-full flex flex-col"
                style={{ ["--index" as string]: index }}
              >
                <div className="premium-project-card__image shrink-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    data-parallax-media
                    loading="lazy"
                    sizes="(min-width: 1200px) 24vw, (min-width: 760px) 45vw, 92vw"
                  />
                  <span>{card.status}</span>
                  <div className="premium-project-card__hover">
                    <strong>Phase {card.step}</strong>
                  </div>
                </div>
                <div className="premium-project-card__glass flex flex-col flex-grow">
                  <h3>{card.title}</h3>
                  <p className="premium-project-card__type">{card.desc}</p>
                  
                  <div className="premium-project-card__delivered mt-auto">
                    <span>Key Focus</span>
                    <ul>
                      {card.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
