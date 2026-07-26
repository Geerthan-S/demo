"use client";

import { useState } from "react";
import { FileText, FileIcon, Eye } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Convert Google Drive links to direct download format, then proxy
function convertToProxyUrl(url: string): string {
  let finalUrl = url;

  // Extract Google Drive file ID from various URL formats
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const queryIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = fileIdMatch?.[1] || queryIdMatch?.[1];

  if (fileId) {
    // Convert to direct download URL for Google Drive
    finalUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // Use proxy API to bypass CORS
  return `/api/pdf-proxy?url=${encodeURIComponent(finalUrl)}`;
}

interface DownloadCardProps {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileType: string;
  onView: () => void;
}

export function DownloadCard({
  title,
  category,
  fileUrl,
  fileType,
  onView,
}: DownloadCardProps) {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const isPDF = fileType.toLowerCase() === "pdf";
  const isDoc = fileType.toLowerCase() === "docx" || fileType.toLowerCase() === "doc";

  return (
    <motion.div
      className="download-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <button
        onClick={onView}
        className="download-card__preview"
        aria-label={`View ${title}`}
      >
        {/* PDF Thumbnail */}
        {isPDF && !thumbnailError ? (
          <div className="download-card__pdf-preview">
            <Document
              file={convertToProxyUrl(fileUrl)}
              onLoadSuccess={() => setThumbnailLoaded(true)}
              onLoadError={() => setThumbnailError(true)}
              loading={
                <div className="download-card__thumbnail-placeholder">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
              }
            >
              <Page
                pageNumber={1}
                width={280}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className={thumbnailLoaded ? "download-card__pdf-page" : "hidden"}
              />
            </Document>
            {!thumbnailLoaded && !thumbnailError && (
              <div className="download-card__thumbnail-placeholder">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        ) : (
          /* Fallback Icon for non-PDF or error */
          <div className="download-card__icon-preview">
            {isDoc ? (
              <FileText className="w-16 h-16 text-[#8A3841]" />
            ) : (
              <FileIcon className="w-16 h-16 text-[#8A3841]" />
            )}
            <span className="download-card__file-type">{fileType.toUpperCase()}</span>
          </div>
        )}

        {/* View Overlay */}
        <div className="download-card__overlay">
          <Eye className="w-6 h-6" />
          <span>View Document</span>
        </div>
      </button>

      {/* Card Info */}
      <div className="download-card__info">
        <h3 className="download-card__title">{title}</h3>
        <p className="download-card__category">{category}</p>
      </div>
    </motion.div>
  );
}
