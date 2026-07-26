"use client";

import { motion, type Variants } from "framer-motion";
import {
  UsersRound,
  ShieldCheck,
  Cog,
  Timer,
} from "lucide-react";

const reasonCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const reasons = [
  {
    title: "Expert Team",
    text: "Experienced professionals ready to understand your requirements.",
    icon: UsersRound,
  },
  {
    title: "Reliable Support",
    text: "Prompt responses and dedicated support at every step.",
    icon: ShieldCheck,
  },
  {
    title: "Tailored Solutions",
    text: "Customized solutions that fit your project and goals.",
    icon: Cog,
  },
  {
    title: "On-Time Delivery",
    text: "Commitment to deadlines and efficient execution always.",
    icon: Timer,
  },
  {
    title: "Quality Assured",
    text: "Highest standards of quality, safety and compliance.",
    icon: ShieldCheck,
  },
];

export function ContactReasons() {
  return (
    <section className="shot-contact-reasons">
      <span>Why connect with us?</span>
      <h2>We're committed to your success</h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <motion.article key={reason.title} variants={reasonCardVariants}>
              <Icon aria-hidden="true" />
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
