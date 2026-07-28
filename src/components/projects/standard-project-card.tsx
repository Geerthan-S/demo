"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type StandardProjectCardProps = {
  project: {
    title: string;
    status: string;
  };
  featured: {
    image: string;
    client: string;
    type: string;
    value: string;
  };
  onOpen: () => void;
};

/**
 * The regular project card used across the project grids.
 *
 * Shared so the featured project can fall back to it on phones, where the
 * editorial 65/35 layout — with its oversized project-value hook — reads as a
 * different component sitting among uniform cards.
 */
export function StandardProjectCard({ project, featured, onOpen }: StandardProjectCardProps) {
  return (
    <div
      onClick={onOpen}
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
  );
}
