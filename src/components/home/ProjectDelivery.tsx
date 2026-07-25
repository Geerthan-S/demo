"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  KeyRound,
  MonitorCog,
  ShieldCheck,
  ShoppingCart,
  TowerControl,
} from "lucide-react";
import { useRef } from "react";
import { DeliveryRail } from "@/components/home/DeliveryRail";
import { DeliveryStep } from "@/components/home/DeliveryStep";
import { RevealText } from "@/components/motion/reveal";

const deliverySteps = [
  {
    number: "01",
    title: "Survey & Planning",
    description:
      "We assess site conditions, client requirements and potential risks to build a strong project foundation.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Engineering Design",
    description:
      "Our engineers create detailed, buildable designs that balance function, safety and cost efficiency.",
    icon: MonitorCog,
  },
  {
    number: "03",
    title: "Procurement",
    description:
      "We source the right materials and partners, ensuring quality, value and timely delivery.",
    icon: ShoppingCart,
  },
  {
    number: "04",
    title: "Site Execution",
    description:
      "Our experienced teams manage construction with precision, safety and continuous progress monitoring.",
    icon: TowerControl,
  },
  {
    number: "05",
    title: "Quality Assurance",
    description:
      "Rigorous inspections and compliance checks ensure every deliverable meets the highest quality standards.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Handover",
    description:
      "We ensure a smooth transition with complete documentation, training and post-project support.",
    icon: KeyRound,
  },
];

/* ── animation variants ────────────────────────────────────── */

const sectionFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProjectDelivery() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id="process"
      className="project-delivery"
      aria-labelledby="project-delivery-title"
      initial={initial}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionFade}
    >


      {/* ── header ── */}
      <div className="project-delivery__inner">
        <motion.div
          className="project-delivery__header"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          <div className="project-delivery__kicker">
            <span className="project-delivery__kicker-line" aria-hidden="true" />
            <span className="project-delivery__kicker-text">
              PROJECT DELIVERY PROCESS
            </span>
            <span className="project-delivery__kicker-line" aria-hidden="true" />
          </div>

          <RevealText>
            <h2
              id="project-delivery-title"
              className="project-delivery__title"
            >
              <span style={{ whiteSpace: "nowrap" }}>HOW WE DELIVER</span><br />
              COMPLEX PROJECTS.
            </h2>
          </RevealText>
        </motion.div>

        <motion.p
          className="project-delivery__subtitle"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={subtitleVariants}
        >
          A disciplined, end-to-end approach that ensures every project is delivered{" "}
          <strong>safely, on time</strong> and to the{" "}
          <strong>highest standards.</strong>
        </motion.p>

        {/* ── timeline + steps ── */}
        <div className="project-delivery__stage" ref={stageRef}>
          <DeliveryRail stageRef={stageRef} />

          <motion.ol
            className="project-delivery__steps"
            aria-label="Project delivery steps"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
          >
            {deliverySteps.map((step, index) => (
              <DeliveryStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                index={index}
              />
            ))}
          </motion.ol>
        </div>

        {/* ── bottom pill ── */}
        <motion.div
          className="project-delivery__pill"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={pillVariants}
        >
          <span className="project-delivery__pill-icon">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="project-delivery__pill-text">
            BUILT ON SAFETY. DRIVEN BY QUALITY. DELIVERED WITH COMMITMENT.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
