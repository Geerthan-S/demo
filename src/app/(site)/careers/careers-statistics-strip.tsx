import { Users, HardHat, Activity, Clock } from "lucide-react";

const stats = [
    { value: "100+", label: "Engineers & Staff", icon: Users },
    { value: "25+", label: "Major Projects", icon: HardHat },
    { value: "10+", label: "Active Deployments", icon: Activity },
    { value: "2-3 Days", label: "Hiring Response", icon: Clock },
];

export function CareersStatisticsStrip() {
    return (
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 mt-[-40px] md:mt-[-60px] z-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(45,24,28,0.06)] border border-[#8B3A4A]/10 p-4 md:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 p-3 sm:p-4 rounded-xl bg-[#FBF7F8] transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#8B3A4A]/10 flex items-center justify-center flex-shrink-0 text-[#8B3A4A]">
                                    <Icon className="w-5 h-5 text-[#8B3A4A]" strokeWidth={1.8} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[20px] sm:text-[22px] md:text-2xl font-black text-[#8B3A4A] tracking-tight leading-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest text-[#6A6B72] mt-0.5">
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
