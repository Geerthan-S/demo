"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ArrowRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { RevealText } from "@/components/motion/reveal";
import { homeReferenceImages, type ProjectView } from "@/lib/content";
import { projectCategoryFilters, projectCategoryHref } from "@/lib/project-categories";
import { ProjectModal } from "@/components/projects/project-modal";

const projectCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};


const categoryPills = projectCategoryFilters.map((label) => ({
  label,
  href: projectCategoryHref(label),
}));

const homeFeaturedProjects = [
  {
    slug: "whirlpool-industrial-works-program",
    client: "WHIRLPOOL INDIA",
    type: "Industrial Facility",
    area: "250,000 Sq.ft",
    value: "INR 4+ Cr",
    timeline: "Completed 2024",
    note: "20+ repeat works across warehouse, lab, utility, mezzanine, civil and electrical scopes.",
    image: homeReferenceImages.projects.whirlpool,
  },
  {
    slug: "lodha-industrial-park-chennai",
    client: "LODHA INDUSTRIAL PARK",
    type: "Industrial Infrastructure",
    area: "500,000 Sq.ft",
    value: "INR 50+ Cr",
    timeline: "Completed 2023",
    note: "Earthwork, land grading, material supply and common-area development at industrial park scale.",
    image: homeReferenceImages.projects.lodha,
  },
  {
    slug: "adani-logistics-civil-structural-works",
    client: "ADANI LOGISTICS",
    type: "Logistics Infrastructure",
    area: "300,000 Sq.ft",
    value: "INR 10 Cr",
    timeline: "2025 Onwards",
    note: "Civil, RCC, drainage and structural works supporting logistics infrastructure at Malur.",
    image: homeReferenceImages.projects.adani,
  },
  {
    slug: "chennai-one-it-sez-land-development",
    client: "CHENNAI ONE IT SEZ",
    type: "Commercial Campus",
    area: "200,000 Sq.ft",
    value: "INR 300+ Cr Overall",
    timeline: "2025 Onwards",
    note: "Survey-led land development, soil filling, site preparation and DGPS works for the campus.",
    image: homeReferenceImages.projects.chennaiOne,
  },
];

export function Projects({ projects }: { projects: ProjectView[] }) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const orderedProjects = homeFeaturedProjects
    .map((featured) => {
      const project = projects.find((entry) => entry.slug === featured.slug);
      return project ? { project, featured } : null;
    })
    .filter((entry): entry is { project: ProjectView; featured: (typeof homeFeaturedProjects)[number] } => Boolean(entry));

  const fallbackProjects = projects
    .filter((project) => !orderedProjects.some((entry) => entry.project.slug === project.slug))
    .slice(0, 4 - orderedProjects.length)
    .map((project) => ({
      project,
      featured: {
        slug: project.slug,
        client: project.clientName.toUpperCase(),
        type: project.industry,
        area: project.scopeOfWork,
        value: project.contractValue ?? project.projectValue,
        timeline: project.timeline,
        note: project.summary,
        image: project.featuredImage,
      },
    }));

  const displayProjects = [...orderedProjects, ...fallbackProjects].slice(0, 5);
  const featuredHero = displayProjects[0];
  const gridProjects = displayProjects.slice(1, 4);

  return (
    <>
      <section className="premium-projects relative pb-32 pt-10 md:pt-16" id="featured-projects">
        {/* Background with subtle structural grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#8B3A4A 1px, transparent 1px), linear-gradient(90deg, #8B3A4A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-[1360px] mx-auto w-full px-6 lg:px-8">
          <div className="project-delivery__header flex flex-col items-center text-center">
            <div className="project-delivery__kicker mx-auto flex items-center justify-center">
              <span className="project-delivery__kicker-line w-12 h-px bg-[#8B3A4A]/20" aria-hidden="true" />
              <span className="project-delivery__kicker-text px-4 text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A]">Featured projects</span>
              <span className="project-delivery__kicker-line w-12 h-px bg-[#8B3A4A]/20" aria-hidden="true" />
            </div>
            <RevealText>
              <h2 className="project-delivery__title mt-4 text-[clamp(28px,3vw,44px)] font-bold uppercase leading-[1.05] tracking-tight text-[#101211]">
                <span className="text-[#8B3A4A]">PROJECTS THAT DEFINE</span><br />
                OUR CAPABILITY.
              </h2>
            </RevealText>
          </div>

          <nav className="premium-projects__filters relative z-20 mt-6 flex flex-wrap justify-center gap-2" aria-label="Featured project categories">
            {categoryPills.map((pill, index) => (
              <Link
                key={pill.label}
                href={pill.href}
                className={`rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${index === 0
                  ? 'border-[#8B3A4A] bg-[#8B3A4A] text-white shadow-md'
                  : 'border-[#8B3A4A]/20 bg-white/80 text-[#5E645F] hover:border-[#8B3A4A]/50 hover:text-[#8B3A4A]'
                  }`}
              >
                {pill.label}
              </Link>
            ))}
          </nav>

          {/* ── Editorial Hero Project (65/35 Split) ── */}
          {featuredHero && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative mt-10 flex w-full flex-col overflow-hidden rounded-[16px] border border-[#8B3A4A]/10 bg-white shadow-[0_24px_64px_rgba(139,58,74,0.06)] lg:flex-row xl:w-[calc(100%+100px)] xl:-ml-[50px] 2xl:w-[calc(100%+140px)] 2xl:-ml-[70px]"
            >
              {/* Vertical Banner */}
              <div className="hidden lg:flex w-[46px] bg-[#FAF8F8] border-r border-[#8B3A4A]/10 items-center justify-center shrink-0 z-20 relative">
                <span className="whitespace-nowrap -rotate-90 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B3A4A]/70">
                  FEATURED LANDMARK
                </span>
              </div>

              {/* Left: 65% Image Panel (Offset for banner) */}
              <div
                className="relative w-full min-h-[380px] lg:w-[calc(65%-46px)] lg:min-h-[580px] overflow-hidden cursor-pointer"
                onClick={() => {
                  const projectIndex = projects.findIndex((p) => p.id === featuredHero.project.id);
                  setSelectedProjectIndex(projectIndex);
                }}
              >
                <Image
                  src={featuredHero.featured.image}
                  alt={featuredHero.project.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80" />

                {/* Badges */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center rounded bg-[#8B3A4A]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF] backdrop-blur-md">
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                    {featuredHero.project.status === "COMPLETED" ? "Completed" : "In Progress"}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 z-10 flex items-center pointer-events-none">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-white">
                      <path d="M5 0C2.23858 0 0 2.23858 0 5C0 8.75 5 12 5 12C5 12 10 8.75 10 5C10 2.23858 7.76142 0 5 0ZM5 7.5C3.61929 7.5 2.5 6.38071 2.5 5C2.5 3.61929 3.61929 2.5 5 2.5C6.38071 2.5 7.5 3.61929 7.5 5C7.5 6.38071 6.38071 7.5 5 7.5Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[#FDFDFD] drop-shadow-md">
                    {featuredHero.project.location}
                  </span>
                </div>
              </div>

              {/* Right: 35% Info Panel */}
              <div className="relative flex w-full flex-col justify-center bg-[#FDFDFD] p-8 lg:w-[35%] lg:p-12 relative z-20 overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A]/70 mb-2">
                  {featuredHero.featured.type}
                </span>
                <h3 className="font-display text-[clamp(24px,2vw,36px)] font-bold uppercase leading-tight text-[#101211] mb-8">
                  {featuredHero.featured.client}
                </h3>

                {/* Highlighted Value Array */}
                <div className="mb-6 pb-6 border-b border-[#8B3A4A]/10">
                  <div className="flex flex-col">
                    {/* Extracting '300+' and 'CR' organically */}
                    {(() => {
                      const val = featuredHero.featured.value || "";
                      const crMatch = val.match(/(.*?)\s*(Cr|Crores?)\b/i);
                      if (crMatch) {
                        return (
                          <div className="flex items-baseline font-display text-[#8B3A4A]">
                            <span className="text-[clamp(54px,5vw,72px)] font-light leading-none">{crMatch[1].replace(/INR/i, '').trim()}</span>
                            <span className="ml-2 text-[20px] font-medium tracking-widest uppercase">{crMatch[2]}</span>
                          </div>
                        )
                      }
                      return <span className="font-display text-[44px] font-light text-[#8B3A4A] leading-none">{val}</span>;
                    })()}
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#5E645F]">
                      Project Value
                    </span>
                  </div>
                </div>

                <p className="text-[13px] leading-relaxed text-[#5E645F] mb-8 line-clamp-4">
                  {featuredHero.featured.note}
                </p>

                {/* Quantitative Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 mb-10">

                  {/* 1. Timeline */}
                  <div className="flex flex-col items-center text-center gap-2 group/icon">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8B3A4A]/15 bg-white text-[#8B3A4A] transition-colors group-hover/icon:bg-[#8B3A4A] group-hover/icon:text-white shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-[#5E645F] leading-tight opacity-70">
                      {featuredHero.featured.timeline}
                    </span>
                  </div>

                  {/* 2. Area */}
                  <div className="flex flex-col items-center text-center gap-2 group/icon">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8B3A4A]/15 bg-white text-[#8B3A4A] transition-colors group-hover/icon:bg-[#8B3A4A] group-hover/icon:text-white shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M4 14l-2 6 6-2M20 10l2-6-6 2M14 4l6-2-2 6M10 20l-6 2 2-6" />
                        <rect x="7" y="7" width="10" height="10" rx="1" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-[#5E645F] leading-tight opacity-70">
                      {featuredHero.featured.area}
                    </span>
                  </div>

                  {/* 3. Location */}
                  <div className="flex flex-col items-center text-center gap-2 group/icon">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8B3A4A]/15 bg-white text-[#8B3A4A] transition-colors group-hover/icon:bg-[#8B3A4A] group-hover/icon:text-white shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-[#5E645F] leading-tight opacity-70 px-1">
                      {featuredHero.project.location.split(',')[0]}
                    </span>
                  </div>

                  {/* 4. Value */}
                  <div className="flex flex-col items-center text-center gap-2 group/icon">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8B3A4A]/15 bg-white text-[#8B3A4A] transition-colors group-hover/icon:bg-[#8B3A4A] group-hover/icon:text-white shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-[#5E645F] leading-tight opacity-70 px-1 text-center">
                      {featuredHero.featured.value}
                    </span>
                  </div>

                </div>

                <button
                  onClick={() => {
                    const projectIndex = projects.findIndex((p) => p.id === featuredHero.project.id);
                    setSelectedProjectIndex(projectIndex);
                  }}
                  className="mt-auto group/btn flex items-center text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] transition-colors hover:text-[#6b1f2e]"
                >
                  View Case Study
                  <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Compact Sub-grid (4 Cards) ── */}
          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {gridProjects.map(({ project, featured }, index) => (
              <motion.div key={project.id} variants={projectCardVariants} className="h-full">
                <div
                  onClick={() => {
                    const projectIndex = projects.findIndex((p) => p.id === project.id);
                    setSelectedProjectIndex(projectIndex);
                  }}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-[#8B3A4A]/10 bg-[#FDFDFD] shadow-[0_12px_32px_rgba(139,58,74,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(139,58,74,0.08)]"
                >
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="flex items-center rounded bg-[#8B3A4A]/90 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FDFDFD] backdrop-blur-md shadow-sm">
                        <span className="mr-1.5 h-1 w-1 rounded-full bg-white/80" />
                        {project.status === "COMPLETED" ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-6">
                    <h4 className="font-display text-[16px] font-bold uppercase leading-tight text-[#101211] mb-1">
                      {featured.client}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B3A4A]/60">
                      {featured.type}
                    </span>

                    <div className="mt-auto pt-5">
                      <div className="h-px w-full bg-[#8B3A4A]/10 mb-4" />
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[15px] font-medium text-[#101211]">
                          {featured.value}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8B3A4A]/20 bg-white text-[#8B3A4A] transition-all group-hover:bg-[#8B3A4A] group-hover:text-white">
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Projects Redirect Card */}
            <motion.div variants={projectCardVariants} className="h-full">
              <Link
                href="/projects"
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-[#8B3A4A]/10 bg-[#FAF7F7] shadow-[0_12px_32px_rgba(139,58,74,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(139,58,74,0.08)] items-center text-center justify-center p-8 lg:p-10"
              >
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#8B3A4A]/90 text-white shadow-md mb-8 transform transition-transform duration-500 group-hover:scale-[1.15]">
                  <Building2 strokeWidth={1.25} className="size-[32px] opacity-100" />
                </div>

                <h4 className="font-display text-[15.5px] font-bold uppercase tracking-wide leading-tight text-[#8B3A4A] mb-4">
                  VIEW ALL PROJECTS
                </h4>

                <p className="text-[12.5px] leading-[1.65] text-[#5E645F] mb-10 max-w-[210px] opacity-90 tracking-wide">
                  Explore our complete portfolio of industrial, commercial & infrastructure projects.
                </p>

                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#8B3A4A]/25 bg-transparent text-[#8B3A4A] transition-all duration-300 group-hover:bg-[#8B3A4A] group-hover:text-white group-hover:border-[#8B3A4A]">
                  <ArrowRight strokeWidth={1.5} className="size-[18px] transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProjectIndex !== null ? projects[selectedProjectIndex] : null!}
        allProjects={projects}
        currentIndex={selectedProjectIndex ?? 0}
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        onNavigate={(newIndex) => setSelectedProjectIndex(newIndex)}
      />
    </>
  );
}
