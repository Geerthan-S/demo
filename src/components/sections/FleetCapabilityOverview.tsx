"use client";

import { motion, type Variants } from "framer-motion";
import { Truck, Tractor, Waves, Pickaxe, Map, ShieldCheck } from "lucide-react"; // Using native Lucide icons to approximate the custom vectors

const capabilities = [
    {
        icon: Truck,
        title: "MATERIAL\nTRANSPORT",
        description: "Reliable transport fleet for bulk material movement.",
    },
    {
        icon: Pickaxe,
        title: "EARTHMOVING",
        description: "Powerful machines for excavation and site preparation.",
        hasUnderline: true,
    },
    {
        icon: Map,
        title: "ROAD\nCONSTRUCTION",
        description: "Advanced equipment for road formation and surfacing.",
    },
    {
        icon: Tractor,
        title: "COMPACTION",
        description: "High-performance rollers for soil and asphalt compaction.",
        hasUnderline: true,
    },
    {
        icon: Waves,
        title: "WATER\nMANAGEMENT",
        description: "Water tankers for dust suppression and site care.",
    },
    {
        icon: ShieldCheck,
        title: "SITE\nPREPARATION",
        description: "Versatile equipment for multiple site operations.",
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

export function FleetCapabilityOverview() {
    return (
        <section className="bg-[#FAF9F8] py-24 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">

                {/* Section Header */}
                <div className="flex items-center justify-center gap-6 mb-20">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#8A3841]/30" />
                    <h2 className="font-display text-[15px] font-extrabold tracking-[0.15em] text-[#8A3841] uppercase m-0 leading-none">
                        OUR FLEET CAPABILITIES
                    </h2>
                    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#8A3841]/30" />
                </div>

                {/* 6 Column Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b border-t border-gray-200/50 lg:border-none"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {capabilities.map((cap, index) => {
                        const Icon = cap.icon;
                        return (
                            <motion.div
                                key={index}
                                className={`relative flex flex-col items-center text-center p-8 lg:px-6 lg:py-4 transition-all duration-300 hover:-translate-y-2 group ${index !== capabilities.length - 1 ? 'lg:border-r border-gray-200/60' : ''
                                    } ${index % 2 !== 0 ? 'border-l border-gray-200/50 lg:border-l-0' : ''} ${index > 1 ? 'border-t border-gray-200/50 lg:border-t-0' : ''
                                    }`}
                                variants={itemVariants}
                            >
                                {/* Icon Container */}
                                <div className="relative mb-6 text-[#8A3841] transition-transform duration-500 group-hover:scale-110">
                                    <Icon className="w-10 h-10" strokeWidth={1.5} />

                                    {/* Subtle red background glow on hover to replace the requested 'glassmorphism background' from prompt */}
                                    <div className="absolute inset-0 bg-[#8A3841]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-[13px] font-extrabold tracking-widest text-gray-900 uppercase leading-snug whitespace-pre-line mb-3">
                                    {cap.title}
                                </h3>

                                {/* Decorative dashed underline (as requested via image) */}
                                {cap.hasUnderline && (
                                    <div className="flex gap-[3px] mb-4">
                                        {[0, 1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-1.5 h-[2px] bg-[#8A3841]/60" />
                                        ))}
                                    </div>
                                )}

                                {/* For non-underlined, preserve spacing natively if needed, but the image shows them without dashed lines so we just push margin */}
                                {!cap.hasUnderline && <div className="mb-4" />}

                                {/* Description */}
                                <p className="text-[12px] font-medium leading-[1.6] text-gray-500 max-w-[200px]">
                                    {cap.description}
                                </p>

                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
