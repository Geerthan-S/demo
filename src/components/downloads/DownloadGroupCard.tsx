"use client";

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { DownloadGroup } from "@/lib/repositories";

const categoryIcons: Record<string, React.ElementType> = {
  "Company Profile": () => <FileText className="size-5" />,
  Brochure: () => <FileText className="size-5" />,
  Certifications: () => <FileText className="size-5" />,
  "Registration Documents": () => <FileText className="size-5" />,
  "Tender Documents": () => <FileText className="size-5" />,
  "GST Certificate": () => <FileText className="size-5" />,
  PAN: () => <FileText className="size-5" />,
  "Vendor Registration Forms": () => <FileText className="size-5" />,
  Policies: () => <FileText className="size-5" />,
};

const fileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export function DownloadGroupCard({ group }: { group: DownloadGroup }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = categoryIcons[group.category];

  return (
    <motion.div
      className="downloads-group"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="downloads-group__head"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        {Icon && <Icon aria-hidden="true" />}
        <h3>{group.category}</h3>
        <span className="downloads-group__count">
          {group.items.length} file{group.items.length !== 1 ? "s" : ""}
        </span>
      </button>

      <motion.ul
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {group.items.map((item) => (
            <motion.li key={item.id} className="download-item" variants={fileItemVariants}>
              <FileText className="size-4" aria-hidden="true" />
              <span>{item.title}</span>
              <motion.a
                href={item.fileUrl}
                download
                className="download-item__btn"
                aria-label={`Download ${item.title}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="size-4" aria-hidden="true" />
                <span>Download</span>
              </motion.a>
            </motion.li>
          ))}
        </motion.div>
      </motion.ul>
    </motion.div>
  );
}
