"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

interface ContactCTAProps {
  eyebrow: string;
  heading: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
}

export function ContactCTA({
  eyebrow,
  heading,
  description,
  primaryButton,
  secondaryButton,
}: ContactCTAProps) {
  return (
    <motion.section
      id="contact"
      className="relative bg-gradient-to-b from-[#F9F6F0] to-[#FAF8F7] py-4 md:py-6 overflow-hidden"
      aria-label={heading}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-12 lg:px-[64px]">
        {/* The Card */}
        <div className="relative bg-[#FCFBFA] border border-[#EAE4DD] p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-[0_20px_60px_rgba(138,56,65,0.06)]">

          {/* Decorative Geometric Background Graphic (Left) */}
          <div className="absolute left-[-40px] top-[-40px] opacity-[0.12] pointer-events-none transform -rotate-12 hidden md:block">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="#8A3841" strokeWidth="2.5" strokeLinecap="square">
              <path d="M10 -20 L60 50 L10 120" />
              <path d="M30 -20 L80 50 L30 120" />
              <path d="M50 -20 L100 50 L50 120" />
              <path d="M70 -20 L120 50 L70 120" />
              <path d="M-10 -20 L40 50 L-10 120" />
              <line x1="0" y1="50" x2="100" y2="50" strokeWidth="1" />
              <line x1="50" y1="0" x2="50" y2="100" strokeWidth="1" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="relative z-10 max-w-2xl text-left">
            <div className="mb-4">
              <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#8A3841] uppercase">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-[#8A3841] font-display text-[32px] md:text-[44px] lg:text-[48px] leading-[1.05] font-bold mb-4 uppercase tracking-wide">
              {heading}
            </h2>

            <p className="text-[rgba(26,20,22,0.78)] text-[14px] md:text-[15px] leading-[1.65] max-w-[480px]">
              {description}
            </p>
          </div>

          {/* Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 mt-6 lg:mt-0">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Link
                href={primaryButton.href}
                className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 bg-[#8A3841] hover:bg-[#6D2B32] !text-white font-bold text-[11px] tracking-widest uppercase transition-all duration-300 rounded-[4px] shadow-[0_12px_24px_rgba(138,56,65,0.25)] hover:shadow-[0_16px_32px_rgba(138,56,65,0.35)] hover:-translate-y-0.5"
              >
                {primaryButton.label} <ArrowRight className="w-[14px] h-[14px] !text-white" strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Link
                href={secondaryButton.href}
                className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 border border-[#E5DFD6] bg-[#FCFBFA] hover:bg-white text-[#8A3841] font-bold text-[11px] tracking-widest uppercase transition-all duration-300 rounded-[4px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {secondaryButton.label} <ArrowRight className="w-[14px] h-[14px]" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
