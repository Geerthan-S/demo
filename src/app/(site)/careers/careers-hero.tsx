import { HardHat, TrendingUp, Users, ShieldCheck, MapPin, Clock } from "lucide-react";
import { RecruitmentForm } from "./recruitment-form";

export default function CareersHero() {
  return (
    <div className="relative bg-[#fdfaf7] pt-[120px] pb-[100px] lg:pt-[160px] lg:pb-[140px] overflow-hidden min-h-[90vh] flex items-center">
      {/* ─── ARCHITECTURAL BACKGROUND ────────────────────────────────────────── */}
      {/* Subtle radial lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-70 pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c8924a] rounded-full blur-[140px] opacity-[0.03] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Engineering Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2d3748 1px, transparent 1px),
            linear-gradient(to bottom, #2d3748 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Structural Beam Outlines */}
      <svg className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02]" aria-hidden="true">
        <path d="M 0 100 L 1000 100 L 1200 400 L 1800 400" fill="none" stroke="#2d3748" strokeWidth="2" />
        <path d="M 800 100 L 800 1000" fill="none" stroke="#2d3748" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="1000" cy="100" r="4" fill="none" stroke="#2d3748" strokeWidth="2" />
        <circle cx="1200" cy="400" r="4" fill="none" stroke="#2d3748" strokeWidth="2" />
      </svg>
      {/* Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[30%] rotate-90 origin-right opacity-[0.012] pointer-events-none flex whitespace-nowrap">
        <span className="text-[280px] font-display font-extrabold leading-none tracking-tight text-gray-900">
          DOCKSIDE
        </span>
      </div>
      {/* ──────────────────────────────────────────────────────────────────────── */}

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 2xl:px-16 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 xl:gap-16 items-start">

          {/* LEFT PANEL: Recruitment Storytelling (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] pt-4 lg:pr-6">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] md:text-[11.5px] font-bold uppercase tracking-[0.25em] text-[#8B3A4A] mb-6">
              <span className="w-8 h-[2px] bg-[#8B3A4A]" />
              Join Our Team
            </span>

            <h1 className="font-display text-4xl md:text-5xl xl:text-[56px] font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Build Infrastructure.<br />
              <span className="text-[#8B3A4A]">Build Your Career.</span>
            </h1>

            <p className="text-base md:text-[17px] text-gray-600 font-medium leading-relaxed mb-12">
              Take technical ownership of high-impact industrial facilities, logistics corridors, and civil infrastructure. We build careers with uncompromising scale, quality, and discipline.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8 mb-12">
              <FeatureItem
                icon={HardHat}
                title="Real Projects Day One"
                desc="Work on active, large-scale infrastructure deployments."
              />
              <FeatureItem
                icon={TrendingUp}
                title="Career Growth Path"
                desc="Structured advancements and technical upskilling protocols."
              />
              <FeatureItem
                icon={Users}
                title="Expert Mentorship"
                desc="Direct field guidance from seasoned industry veterans."
              />
              <FeatureItem
                icon={ShieldCheck}
                title="Safety Culture"
                desc="Zero-tolerance injury mandates across every site."
              />
            </div>
          </div>

          {/* RIGHT PANEL: Floating Application Form (7 Columns) */}
          <div className="lg:col-span-7 flex justify-end w-full" id="recruitment-form-anchor">
            <RecruitmentForm />
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex flex-shrink-0 items-center justify-center group-hover:border-[#8B3A4A]/20 transition-colors">
        <Icon className="w-5 h-5 text-[#8B3A4A]" strokeWidth={2} />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-gray-900 tracking-tight leading-tight mb-1">
          {title}
        </h4>
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed pr-8">
          {desc}
        </p>
      </div>
    </div>
  );
}
