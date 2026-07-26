"use client";

import { motion, type Variants } from "framer-motion";
import { Truck, Tractor, Clock, ShieldCheck, MapPin } from "lucide-react";

export function FleetAtAGlance() {
    const metrics = [
        {
            icon: Truck,
            value: "50+",
            label: "Vehicles",
        },
        {
            icon: Tractor,
            value: "20+",
            label: "Heavy Equipment",
        },
        {
            icon: Clock,
            value: "24 HRS",
            label: "Mobilisation",
        },
        {
            icon: ShieldCheck,
            value: "100%",
            label: "Deployment Ready",
        },
        {
            icon: MapPin,
            value: "500+",
            label: "Projects Supported",
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="bg-white py-14 px-4 md:px-8 border-y border-[#8B3A4A]/10">
            <div className="max-w-[1500px] mx-auto">

                <div className="text-center mb-8 md:mb-10">
                    <h2 className="font-display text-[13px] md:text-[15px] font-extrabold tracking-[0.25em] text-[#8B3A4A] uppercase m-0 leading-none">
                        FLEET AT A GLANCE
                    </h2>
                </div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        const isLastOdd = idx === metrics.length - 1 && metrics.length % 2 !== 0;

                        return (
                            <motion.div
                                key={idx}
                                className={`flex flex-col items-center justify-center text-center p-5 md:p-6 rounded-2xl bg-[#FBF7F8] transition-all duration-300 ${
                                    isLastOdd ? "col-span-2 md:col-span-1" : "col-span-1"
                                }`}
                                variants={itemVariants}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#8B3A4A]/10 flex items-center justify-center text-[#8B3A4A] mb-3">
                                    <Icon className="w-5 h-5 text-[#8B3A4A]" strokeWidth={1.8} />
                                </div>
                                <span className="font-display text-[26px] sm:text-[30px] md:text-[36px] font-black text-[#8B3A4A] leading-tight tracking-tight">
                                    {metric.value}
                                </span>
                                <span className="text-[#6A6B72] text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase mt-1">
                                    {metric.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
