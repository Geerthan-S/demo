"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gauge, CheckCircle2, Factory } from "lucide-react";
import type { EquipmentItem } from "@/lib/repositories";

function EquipmentImage({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={() => setImgSrc("/home-reference/industry-utilities.jpg")}
        />
    );
}

export function EquipmentShowcase({ equipment }: { equipment: EquipmentItem[] }) {
    if (!equipment || equipment.length === 0) return null;

    return (
        <section className="bg-white py-24 overflow-hidden relative">
            <div className="max-w-[1700px] mx-auto flex flex-col gap-12 md:gap-20 px-4 md:px-8">
                {equipment.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const number = String(index + 1).padStart(2, "0");

                    return (
                        <div key={item.id} className="relative flex flex-col lg:flex-row w-full bg-white group min-h-[400px]">

                            {/* IMAGE BLOCK (60%) */}
                            <div className={`relative w-full lg:w-[55%] h-[300px] lg:h-auto overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-3'}`}>
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                {item.imageUrl && (
                                    <EquipmentImage src={item.imageUrl} alt={item.name} />
                                )}
                            </div>

                            {/* CONTENT BLOCK (40%) */}
                            <div className={`flex flex-col flex-1 bg-white relative z-20 ${isEven ? 'lg:order-2' : 'lg:order-2'}`}>

                                <div className="flex w-full h-full">
                                    {/* The White Content Panel */}
                                    <div className={`flex flex-1 flex-col justify-center p-8 lg:p-14 ${isEven ? 'lg:pl-16' : 'lg:pr-16 order-2 lg:order-1'}`}>

                                        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center h-full">

                                            {/* Left side of content panel: Title and Desc */}
                                            <div className="flex-1 space-y-4">
                                                <h2 className="font-display text-[26px] md:text-[34px] font-extrabold uppercase tracking-wide text-gray-900 leading-tight">
                                                    {item.name}
                                                </h2>
                                                <div className="text-[#8A3841] font-bold text-[15px] tracking-widest uppercase mb-4">
                                                    {item.quantity}+ Units
                                                </div>
                                                <p className="text-gray-500 text-[14px] leading-[1.7] max-w-[400px]">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Right side of content panel: Metrics */}
                                            <div className="flex flex-col gap-6 lg:w-[220px] flex-shrink-0">
                                                {item.capacity && (
                                                    <div className="flex items-start gap-4">
                                                        <Gauge className="w-5 h-5 text-[#8A3841] mt-0.5" strokeWidth={1.5} />
                                                        <div>
                                                            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Capacity</div>
                                                            <div className="text-[13px] font-bold text-gray-800">{item.capacity}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 className="w-5 h-5 text-[#8A3841] mt-0.5" strokeWidth={1.5} />
                                                    <div>
                                                        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Status</div>
                                                        <div className="text-[13px] font-bold text-gray-800">{item.status || "Active"}</div>
                                                    </div>
                                                </div>
                                                {item.application && (
                                                    <div className="flex items-start gap-4">
                                                        <Factory className="w-5 h-5 text-[#8A3841] mt-0.5" strokeWidth={1.5} />
                                                        <div>
                                                            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Application</div>
                                                            <div className="text-[13px] font-bold text-gray-800 leading-tight">{item.application}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    {/* Dark Maroon Numeral Identity Strip (5%) */}
                                    <div className={`hidden lg:flex flex-col items-center justify-center w-[80px] bg-[#5f1f29] relative overflow-hidden flex-shrink-0 ${isEven ? 'order-2' : 'order-1'} shadow-2xl`}>
                                        <span
                                            className="text-white/20 font-display font-black tracking-tighter absolute rotate-90 whitespace-nowrap"
                                            style={{ fontSize: '70px', letterSpacing: '-0.05em' }}
                                        >
                                            {number}
                                        </span>
                                        <span className="text-white/80 font-mono text-[12px] font-bold absolute bottom-8 tracking-widest">
                                            {number}
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
