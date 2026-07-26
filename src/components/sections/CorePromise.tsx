import React from "react";
import Image from "next/image";
import { ShieldCheck, Timer, BadgeCheck, Users } from "lucide-react";

const corePromises = [
    {
        title: "SAFETY FIRST",
        text: "Zero compromise on safety across every site and system.",
        icon: ShieldCheck,
    },
    {
        title: "ON-TIME DELIVERY",
        text: "We respect deadlines and build on commitments.",
        icon: Timer,
    },
    {
        title: "QUALITY ASSURED",
        text: "Driven by standards that ensure lasting performance.",
        icon: BadgeCheck,
    },
    {
        title: "PEOPLE POWERED",
        text: "Skilled teams. Strong values. Shared vision.",
        icon: Users,
    },
];

export function CorePromise() {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#faf8f7]">
            <div className="max-w-[1600px] w-full mx-auto">
                {/* Main Card Container */}
                <div className="relative bg-[#F9F7F5] rounded-[32px] md:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden flex flex-col xl:flex-row">

                    {/* Background Textures */}
                    {/* Subtle marble / crane overlay could be injected here if available, falling back to a CSS pattern or simple gradient */}
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
                        backgroundImage: 'url("/textures/marble-light.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'multiply'
                    }} />
                    <div className="absolute bottom-0 left-10 w-96 h-96 opacity-[0.03] z-0 pointer-events-none bg-[url('/textures/crane-silhouette.png')] bg-no-repeat bg-contain bg-bottom" />

                    {/* Left Side: Header & Copy */}
                    <div className="relative z-10 p-8 lg:p-10 xl:p-14 flex-1 xl:max-w-[38%] flex flex-col justify-center">

                        {/* Eyebrow */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#8A3841] uppercase">
                                Our Core Promise
                            </span>
                            <span className="w-10 h-[1px] bg-[#8A3841]" />
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6">
                            LARGE ENOUGH <br />
                            <span className="text-[#8A3841]">TO DELIVER.</span> <br />
                            AGILE ENOUGH <br />
                            <span className="text-[#8A3841]">TO CARE.</span>
                        </h2>

                        {/* Divider */}
                        <div className="w-10 h-[3px] bg-[#8A3841] mb-6" />

                        {/* Paragraph */}
                        <p className="text-gray-600 text-[15px] md:text-[17px] leading-[1.7] max-w-[420px] font-medium">
                            Our people, processes and performance enable us to build with precision and deliver with purpose.
                        </p>
                    </div>

                    {/* Right Side: Metrics Grid & Chevrons */}
                    <div className="relative z-10 flex-1 flex">
                        {/* 4 Column Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr] w-full h-full xl:border-l border-gray-200/60 bg-white/40 backdrop-blur-sm">
                            {corePromises.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`relative overflow-hidden flex flex-col items-center justify-center text-center py-10 px-4 xl:px-6 2xl:px-8 ${index > 1 ? 'border-t sm:border-t-0 border-gray-200/60' : ''}`}
                                    >
                                        {/* Watermark Logo perfectly replicating the user's reference under the first column */}
                                        {index === 0 && (
                                            <div className="absolute top-1/2 -translate-y-1/2 -left-[140px] w-[350px] h-[350px] opacity-[0.05] pointer-events-none mix-blend-multiply z-0">
                                                <Image src="/brand/dockside-company-logo.png" alt="Dockside Watermark" fill className="object-contain" />
                                            </div>
                                        )}

                                        {/* Centered vertical divider (only 50% height) */}
                                        {index !== corePromises.length - 1 && (
                                            <div className="hidden sm:block absolute right-0 top-1/4 h-2/4 w-[1px] bg-gray-200/60 z-10" />
                                        )}

                                        <div className="relative z-10 flex flex-col items-center">
                                            {/* Circle Icon */}
                                            <div className="w-[60px] h-[60px] rounded-[16px] bg-[#f4ecea] border border-white shadow-sm flex items-center justify-center text-[#8A3841] mb-6">
                                                <Icon className="w-7 h-7" strokeWidth={1.5} />
                                            </div>

                                            <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase">
                                                {item.title}
                                            </h3>

                                            <div className="w-6 h-[2px] bg-[#8A3841]/80 my-4" />

                                            <p className="text-gray-500 text-[12px] leading-[1.6] font-medium px-2 w-full">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
