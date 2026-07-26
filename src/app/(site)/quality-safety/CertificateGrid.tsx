"use client";

import Image from "next/image";
import { Download, ZoomIn } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  fileUrl: string;
}

const certificates: Certificate[] = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    subtitle: "ISO 9001:2015 Certification",
    description: "Ensures disciplined project planning, rigorous material inspections, document traceability, and continuous process improvements for consistent delivery excellence.",
    imageSrc: "/certificates/iso-9001-quality-management-system.jpg",
    fileUrl: "/certificates/iso-9001-quality-management-system.jpg",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management System",
    subtitle: "ISO 14001:2015 Certification",
    description: "Defines environmental standards across all sites, including waste reduction, resources conservation, and mitigation of ecological footprints during execution.",
    imageSrc: "/certificates/iso-14001-environmental-management-system.jpg",
    fileUrl: "/certificates/iso-14001-environmental-management-system.jpg",
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety System",
    subtitle: "ISO 45001:2018 Certification",
    description: "Maintains a zero-compromise safe work environment through proactive risk assessment, regular hazard identification, and site-wide safety training.",
    imageSrc: "/certificates/iso-45001-occupational-health-and-safety-management-system.jpg",
    fileUrl: "/certificates/iso-45001-occupational-health-and-safety-management-system.jpg",
  },
];

export function CertificateGrid() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openPreview = (cert: Certificate) => {
    setActiveCert(cert);
    dialogRef.current?.showModal();
  };

  const closePreview = () => {
    dialogRef.current?.close();
    setActiveCert(null);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleBackdropClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        closePreview();
      }
    };
    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  return (
    <>
      <div data-stagger-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <article
            key={cert.code}
            onClick={() => openPreview(cert)}
            className="group flex flex-col bg-white border border-gray-250 hover:border-[#783138]/40 hover:shadow-[0_16px_48px_rgba(138,56,65,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer rounded-none"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[16/10] flex-shrink-0 overflow-hidden bg-gray-100 border-b border-gray-100">
              <Image
                src={cert.imageSrc}
                alt={cert.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Unit Badge (like Equipment fleet cards) */}
              <span className="absolute top-0 left-0 bg-[#783138] !text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 z-10">
                {cert.code}
              </span>
              {/* Hover Preview Overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-20">
                <ZoomIn className="w-5 h-5 text-white/90" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Click to Preview</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-1 p-5">
              <h3 className="font-display text-[17px] font-extrabold uppercase tracking-wide text-gray-900 mb-3 leading-tight">
                {cert.title}
              </h3>
              <p className="text-[12.5px] leading-[1.75] text-gray-500 mb-6">
                {cert.description}
              </p>

              {/* Card Actions Footer */}
              <div
                className="flex items-center justify-between pt-3.5 mt-auto border-t border-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => openPreview(cert)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gray-400 hover:text-[#783138] uppercase transition-colors duration-200"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <a
                  href={cert.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#783138] hover:text-[#5A2229] uppercase tracking-wider transition-colors duration-200"
                >
                  <span>Download JPG</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Dialog (Styled via globals.css .cert-lightbox classes) */}
      <dialog
        ref={dialogRef}
        className="cert-lightbox"
        aria-label={activeCert ? `${activeCert.title} certificate` : "Certificate preview"}
      >
        {activeCert && (
          <button
            className="cert-lightbox__close"
            onClick={closePreview}
            aria-label="Close certificate view"
            type="button"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              key="cert-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="cert-lightbox__inner"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-lightbox__image relative w-full h-[70vh] max-h-[600px] md:h-[75vh]">
                <Image
                  src={activeCert.imageSrc}
                  alt={`${activeCert.title} — ${activeCert.subtitle}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <p className="cert-lightbox__caption text-center mt-4 font-semibold text-white">
                {activeCert.title} · {activeCert.code}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
