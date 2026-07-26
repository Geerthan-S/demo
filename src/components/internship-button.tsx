"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, X } from "lucide-react";
import type { CareerSetting, JobOpening } from "@/lib/repositories";

interface InternshipButtonProps {
  settings: CareerSetting;
  jobOpenings: JobOpening[];
}

export function InternshipButton({ settings, jobOpenings }: InternshipButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (settings.internshipActionType === "modal") {
      setShowModal(true);
    } else if (settings.internshipActionType === "link" && settings.internshipActionUrl) {
      window.open(settings.internshipActionUrl, "_blank");
    }
  };

  const internshipJobs = jobOpenings.filter((job) =>
    job.title.toLowerCase().includes("intern")
  );

  if (settings.internshipActionType === "link" && settings.internshipActionUrl) {
    return (
      <Link
        href={settings.internshipActionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cv2-btn cv2-btn--fill cv2-btn--icon"
      >
        <GraduationCap aria-hidden="true" />
        {settings.internshipButtonText}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="cv2-btn cv2-btn--fill cv2-btn--icon"
      >
        <GraduationCap aria-hidden="true" />
        {settings.internshipButtonText}
      </button>

      {showModal && (
        <div
          className="cv2-modal-overlay"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="internship-modal-title"
        >
          <div
            className="cv2-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cv2-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X aria-hidden="true" />
            </button>

            <div className="cv2-modal-header">
              <GraduationCap className="cv2-modal-icon" aria-hidden="true" />
              <h2 id="internship-modal-title">Internship Opportunities</h2>
            </div>

            <div className="cv2-modal-body">
              {internshipJobs.length > 0 ? (
                <div className="cv2-internship-list">
                  <p className="cv2-modal-intro">
                    We have {internshipJobs.length} internship{" "}
                    {internshipJobs.length === 1 ? "position" : "positions"}{" "}
                    currently available:
                  </p>
                  {internshipJobs.map((job) => (
                    <div key={job.id} className="cv2-internship-card">
                      <h3>{job.title}</h3>
                      <div className="cv2-internship-meta">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                      {job.skills.length > 0 && (
                        <div className="cv2-internship-skills">
                          {job.skills.map((skill) => (
                            <span key={skill} className="cv2-skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="cv2-modal-footer">
                    <Link href="/contact" className="cv2-btn cv2-btn--fill">
                      Apply Now
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="cv2-modal-empty">
                  <p>
                    No internship positions are currently available, but we're
                    always looking for talented individuals to join our team.
                  </p>
                  <p>
                    Please send your resume to{" "}
                    <a href="mailto:admin@docksideconstructions.com">
                      admin@docksideconstructions.com
                    </a>{" "}
                    and we'll keep it on file for future opportunities.
                  </p>
                  <div className="cv2-modal-footer">
                    <Link href="/contact" className="cv2-btn cv2-btn--outline">
                      Contact Us
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
