"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, type LucideIcon } from "lucide-react";

type DeliveryStepProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + index * 0.09,
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fillVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (index: number) => ({
    scaleX: 1,
    transition: {
      delay: 0.35 + index * 0.09,
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function DeliveryStep({
  number,
  title,
  description,
  icon: Icon,
  index,
}: DeliveryStepProps) {
  return (
    <motion.li
      className="delivery-step"
      custom={index}
      variants={stepVariants}
    >
      {/* Horizontal timeline tracks (visible on md+) */}
      <div className="delivery-step__track-h" aria-hidden="true" />
      <motion.div
        className="delivery-step__track-h-fill"
        aria-hidden="true"
        custom={index}
        variants={fillVariants}
      />

      {/* Mobile uses one continuous rail (DeliveryRail) instead of per-step segments */}

      {/* Timeline dot replaced with trustable icon */}
      <motion.div
        className="delivery-step__dot flex items-center justify-center bg-[#8B1E2D] border-[3px] border-[#FAF8F7] rounded-full shadow-[0_0_0_1px_rgba(139,30,45,0.22)] absolute z-20 transition-all duration-300"
        style={{ width: '22px', height: '22px', left: '22px', top: '8px' }}
        aria-hidden="true"
        whileHover={{ scale: 1.25, backgroundColor: "#B3263B" }}
        transition={{ duration: 0.28 }}
      >
        <ShieldCheck className="w-3 h-3 text-[#FAF8F7]" strokeWidth={2.5} />
      </motion.div>

      {/* Step number above the circle (visible on md+) */}
      <span className="delivery-step__number" aria-hidden="true">
        {number}
      </span>

      {/* Icon circle */}
      <motion.div
        className="delivery-step__circle"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="delivery-step__circle-outer" aria-hidden="true" />
        {index < 5 && (
          <div className="connector-premium-flow" aria-hidden="true">
            {[1, 2, 3].map((segment) => (
              <motion.div
                key={segment}
                className="connector-premium-flow-segment"
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, rotate: 45, opacity: 1 }}
                transition={{
                  delay: 0.3 + index * 0.1 + segment * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 50,
                  transition: { duration: 0.2 }
                }}
              />
            ))}
            <motion.div
              className="connector-premium-flow-arrow"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          </div>
        )}
        <motion.span
          className="delivery-step__circle-inner"
          whileHover={{ rotate: 6 }}
          transition={{ duration: 0.28 }}
        >
          <Icon className="delivery-step__icon" strokeWidth={1.9} aria-hidden="true" />
        </motion.span>
      </motion.div>

      {/* Text content card */}
      <article className="delivery-step__content">
        {/* Mobile-only number inside content card */}
        <span className="delivery-step__number--mobile" aria-hidden="true">
          {number}
        </span>
        <h4 className="delivery-step__title">{title}</h4>
        <span className="delivery-step__divider" aria-hidden="true" />
        <p className="delivery-step__desc">{description}</p>
      </article>
    </motion.li>
  );
}
