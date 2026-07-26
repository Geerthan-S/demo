"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
    ClipboardList,
    Users,
    CalendarDays,
    Truck,
    MapPin,
    CheckCircle2
} from "lucide-react";
import { DeliveryStep } from "@/components/home/DeliveryStep";

const fleetSteps = [
    {
        number: "01",
        title: "Requirement Received",
        description: "We evaluate site infrastructure needs and log your specific heavy machinery requests.",
        icon: ClipboardList,
    },
    {
        number: "02",
        title: "Fleet Planning",
        description: "Our specialists formulate the optimal deployment strategy and resource mapping for efficiency.",
        icon: Users,
    },
    {
        number: "03",
        title: "Allocation & Scheduling",
        description: "Assigning exact machinery units and synchronising transport logistics for precise arrival.",
        icon: CalendarDays,
    },
    {
        number: "04",
        title: "Transport & Mobilisation",
        description: "Safe, rapid transit of heavy equipment directly to your designated operational site.",
        icon: Truck,
    },
    {
        number: "05",
        title: "Site Deployment",
        description: "Immediate unloading, safety inspections and positioning for active construction duties.",
        icon: MapPin,
    },
    {
        number: "06",
        title: "Ready For Operations",
        description: "Units are fully fueled, serviced and handed over for immediate site execution.",
        icon: CheckCircle2,
    },
];

/* ── animation variants ── */
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

export function FleetDeploymentProcess() {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <motion.section
            id="process"
            className="project-delivery"
            aria-labelledby="fleet-deployment-title"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={sectionFade}
        >
            <div className="project-delivery__inner">
                {/* ── header ── */}
                <motion.div
                    className="project-delivery__header"
                    initial={initial}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                    style={{ paddingTop: '60px' }}
                >
                    <div className="project-delivery__kicker">
                        <span className="project-delivery__kicker-line" aria-hidden="true" />
                        <span className="project-delivery__kicker-text">
                            OUR FLEET DEPLOYMENT PROCESS
                        </span>
                        <span className="project-delivery__kicker-line" aria-hidden="true" />
                    </div>
                </motion.div>

                {/* ── timeline + steps ── */}
                <div className="project-delivery__stage" style={{ marginTop: "80px", paddingBottom: "24px" }}>
                    <motion.ol
                        className="project-delivery__steps"
                        aria-label="Fleet deployment steps"
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={staggerContainer}
                    >
                        {fleetSteps.map((step, index) => (
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
                        <CheckCircle2 className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <p className="project-delivery__pill-text">
                        PRECISION LOGISTICS. RAPID MOBILISATION. SITE-READY RELIABILITY.
                    </p>
                </motion.div>

            </div>
        </motion.section>
    );
}
