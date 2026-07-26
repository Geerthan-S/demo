"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, ShieldAlert, CheckCircle2 } from "lucide-react";

export function QualityKPIStrip() {
    const metrics = [
        {
            icon: BadgeCheck,
            value: "TRIPLE",
            label: "ISO Certified (9001/14001/45001)",
        },
        {
            icon: CheckCircle2,
            value: "100%",
            label: "Quality Audits & Verification",
        },
        {
            icon: ShieldAlert,
            value: "ZERO",
            label: "Accident Proactive Culture",
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="bg-[#2D1217] border-y border-[#4a1d25]">
            <motion.div
                className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#4a1d25]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;

                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex-1 flex items-center justify-start sm:justify-center gap-5 py-7 px-6 md:py-9 md:px-8 transition-colors hover:bg-[#38161c]"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#E8CDD1]">
                                <Icon className="w-6 h-6 text-[#E8CDD1]" strokeWidth={1.8} />
                            </div>

                            <div className="flex flex-col">
                                <span className="font-display text-3xl md:text-[38px] font-black text-white tracking-tight leading-none mb-1">
                                    {metric.value}
                                </span>
                                <span className="font-mono text-[10.5px] md:text-[11px] font-bold text-[#D8C3C6] tracking-[0.12em] uppercase">
                                    {metric.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
