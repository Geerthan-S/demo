"use client";

import { useState, useRef, useEffect } from "react";
import { X, UploadCloud, CheckCircle2, Loader2, Send } from "lucide-react";
import type { JobOpening } from "@/lib/repositories";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobOpening: JobOpening;
  onSuccess: () => void;
}

export function JobApplicationModal({ isOpen, onClose, jobOpening, onSuccess }: JobApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    currentEmployer: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume file size must be less than 5MB.");
      return false;
    }
    setError("");
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (validateFile(e.dataTransfer.files[0])) {
        setResumeFile(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (validateFile(e.target.files[0])) {
        setResumeFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!resumeFile) {
      setError("Please upload your resume to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("jobOpeningId", jobOpening.id);

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("resume", resumeFile);

      const res = await fetch("/api/careers/submit", {
        method: "POST",
        body: payload, // Browser automatically sets multipart/form-data boundary
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <div
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#8B3A4A]/10 text-[#8B3A4A] text-xs font-bold tracking-widest uppercase mb-2">
              Applying For
            </span>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {jobOpening.title} <CheckCircle2 className="w-5 h-5 text-green-500" />
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-12">

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Personal Details */}
          <section>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput id="fullName" label="Full Name *" type="text" value={formData.fullName} onChange={handleChange} required />
              <FloatingInput id="email" label="Email Address *" type="email" value={formData.email} onChange={handleChange} required />
              <FloatingInput id="phone" label="Phone Number *" type="tel" value={formData.phone} onChange={handleChange} required />
              <FloatingInput id="city" label="Current City *" type="text" value={formData.city} onChange={handleChange} required />
            </div>
          </section>

          {/* Professional Details */}
          <section>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
              Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput id="experience" label="Years Experience *" type="number" value={formData.experience} onChange={handleChange} required />
              <FloatingInput id="currentEmployer" label="Current Employer" type="text" value={formData.currentEmployer} onChange={handleChange} />
              <FloatingInput id="currentCTC" label="Current CTC (LPA)" type="text" value={formData.currentCTC} onChange={handleChange} />
              <FloatingInput id="expectedCTC" label="Expected CTC (LPA)" type="text" value={formData.expectedCTC} onChange={handleChange} />
              <FloatingSelect id="noticePeriod" label="Notice Period *" value={formData.noticePeriod} onChange={handleChange} required>
                <option value="" disabled></option>
                <option value="immediate">Immediate Joiner</option>
                <option value="15-days">15 Days</option>
                <option value="30-days">30 Days</option>
                <option value="60-days">60 Days</option>
                <option value="90-days">90 Days</option>
              </FloatingSelect>
            </div>
          </section>

          {/* Resume Upload */}
          <section>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
              Upload Resume *
            </h3>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-[16px] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 bg-gray-50/50
                ${dragActive ? "border-[#8B3A4A] bg-[#8B3A4A]/5" : "border-gray-200 hover:border-[#8B3A4A]/40"}
              `}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />

              {resumeFile ? (
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{resumeFile.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setResumeFile(null); }}
                    className="mt-2 text-xs font-semibold text-[#8B3A4A] hover:underline z-10 relative"
                  >
                    Remove & Upload Different File
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-[#8B3A4A]" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Drag & drop your resume here
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    or click to browse files
                  </p>
                  <div className="flex items-center gap-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                    <span>PDF, DOC, DOCX</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>Max 5MB</span>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Optional Info */}
          <section>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
              Additional Info (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FloatingInput id="linkedin" label="LinkedIn Profile" type="url" value={formData.linkedin} onChange={handleChange} />
              <FloatingInput id="portfolio" label="Portfolio / Website" type="url" value={formData.portfolio} onChange={handleChange} />
            </div>
            <div className="relative group">
              <textarea
                id="coverLetter"
                rows={3}
                value={formData.coverLetter}
                onChange={handleChange}
                className="peer w-full px-5 pt-8 pb-4 border-2 border-gray-100 rounded-[12px] bg-white focus:border-[#8B3A4A] focus:ring-4 focus:ring-[#8B3A4A]/10 focus:outline-none transition-all resize-none text-[15px] font-medium text-gray-800 placeholder-transparent"
                placeholder=" "
              />
              <label
                htmlFor="coverLetter"
                className="absolute left-5 top-4 text-xs font-semibold text-gray-400 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-4 peer-focus:text-xs peer-focus:text-[#8B3A4A] transition-all pointer-events-none"
              >
                Cover Letter
              </label>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="sticky bottom-0 -mx-8 -mb-8 p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4 rounded-b-[24px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 h-12 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 h-12 bg-[#8B3A4A] text-white rounded-full font-bold text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-[#6b2a37] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(139,58,74,0.3)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Helper Components 
   ────────────────────────────────────────────────────────────────────────────── */

function FloatingInput({ id, label, type, value, onChange, required }: any) {
  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full h-[64px] px-5 pt-6 pb-2 border-2 border-gray-100 rounded-[12px] bg-white focus:border-[#8B3A4A] focus:ring-4 focus:ring-[#8B3A4A]/10 focus:outline-none transition-all text-[15px] font-medium text-gray-800 placeholder-transparent"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-5 text-sm font-semibold text-gray-400 peer-placeholder-shown:top-[22px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[12px] peer-focus:text-[11px] peer-focus:text-[#8B3A4A] transition-all pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({ id, label, children, value, onChange, required }: any) {
  return (
    <div className="relative group">
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full h-[64px] px-5 pt-6 pb-2 border-2 border-gray-100 rounded-[12px] bg-white focus:border-[#8B3A4A] focus:ring-4 focus:ring-[#8B3A4A]/10 focus:outline-none transition-all text-[15px] font-medium text-gray-800 appearance-none cursor-pointer"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="absolute left-5 top-[12px] text-[11px] font-semibold text-[#8B3A4A] transition-all pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
