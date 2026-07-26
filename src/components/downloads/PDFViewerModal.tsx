"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
  downloadEnabled: boolean;
}

export function PDFViewerModal({
  isOpen,
  onClose,
  fileUrl,
  title,
  downloadEnabled,
}: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on both html and body elements
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Prevent scroll on mobile devices
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/80 backdrop-blur-sm pt-24 pb-8">
      <div className="relative w-full max-w-5xl max-h-full bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
            {numPages > 0 && (
              <p className="text-sm text-gray-500">{numPages} pages</p>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {/* Zoom controls */}
            <div className="flex items-center gap-1 mr-2">
              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="px-3 py-1 text-sm text-gray-700 min-w-[4rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(2.0, s + 0.25))}
                className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {downloadEnabled && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#8A3841] rounded hover:bg-[#6B2F33] transition-colors shadow-sm"
                style={{ color: '#ffffff' }}
              >
                <Download className="w-4 h-4 text-white stroke-white" />
                <span style={{ color: '#ffffff' }}>Download</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer - Continuous scroll through all pages */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-[600px]">
                  <div className="text-gray-500">Loading PDF...</div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-[600px]">
                  <div className="text-red-500">Failed to load PDF. Please try again.</div>
                </div>
              }
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="mb-4 shadow-lg"
                />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
