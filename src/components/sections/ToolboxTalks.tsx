"use client";

import { motion } from "framer-motion";
import { ArrowUpFromLine, Truck, Zap, Wrench, Flame, ShieldAlert } from "lucide-react";

export function ToolboxTalks() {
    const safetyTalks = [
        {
            title: "Working at Heights",
            desc: "Rigorous safety harness compliance, guardrail installations, and scaffold integrity inspections.",
            icon: ArrowUpFromLine,
            stat: "100%",
            statLabel: "Harness Compliance",
        },
        {
            title: "Equipment Safety",
            desc: "Pre-operational checks, exclusion zone enforcement, and certified heavy machinery operators.",
            icon: Truck,
            stat: "Daily",
            statLabel: "Operator Checks",
        },
        {
            title: "Electrical Safety",
            desc: "Insulated tools verification, temporary wiring compliance, and lockout/tagout (LOTO) protocols.",
            icon: Zap,
            stat: "LOTO",
            statLabel: "Protocol Enforced",
        },
        {
            title: "Excavation Safety",
            desc: "Soil profiling, shoring and trench protection, and underground utility clearance checking.",
            icon: Wrench,
            stat: "Zero",
            statLabel: "Trench Incidents",
        },
        {
            title: "Fire Prevention",
            desc: "Hot work permit enforcement, firefighting equipment checks, and combustible separation.",
            icon: Flame,
            stat: "100%",
            statLabel: "Permit Coverage",
        },
        {
            title: "Incident Prevention",
            desc: "Near-miss reporting, hazard logging, and immediate root-cause mitigation procedures.",
            icon: ShieldAlert,
            stat: "Active",
            statLabel: "Reporting System",
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 bg-[#FAF9F8]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="w-8 h-[1px] bg-[#8A3841]/40" />
                        <span className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase font-bold">
                            Continual Learning
                        </span>
                        <div className="w-8 h-[1px] bg-[#8A3841]/40" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
                        Toolbox Talks
                    </h2>
                    <p className="text-gray-500 max-w-[560px] mx-auto text-[13.5px] leading-[1.75]">
                        Regular toolbox talks reinforce safe work practices and improve safety awareness across all teams working on site.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-200 border border-gray-200">
                    {safetyTalks.map((talk, idx) => {
                        const Icon = talk.icon;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                key={talk.title}
                                className="bg-white p-8 md:p-10 flex flex-col relative overflow-hidden group"
                            >
                                {/* Minimalist Watermark */}
                                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-gray-50 leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-gray-100">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>

                                {/* Left Minimalist Border Indicator on Hover */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8A3841] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-[0.22,1,0.36,1]" />

                                <div className="mb-6">
                                    <Icon className="w-6 h-6 text-[#8A3841]" strokeWidth={1.5} />
                                </div>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="font-display text-2xl font-black text-[#8A3841] leading-none">
                                        {talk.stat}
                                    </span>
                                    <span className="font-mono text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                                        {talk.statLabel}
                                    </span>
                                </div>

                                <h3 className="font-display text-[15px] font-extrabold uppercase tracking-widest text-gray-900 mb-3 leading-snug">
                                    {talk.title}
                                </h3>

                                <p className="text-[14px] leading-[1.7] text-gray-500 max-w-[280px]">
                                    {talk.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
