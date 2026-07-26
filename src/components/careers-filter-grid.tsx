"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Users } from "lucide-react";
import type { JobOpening } from "@/lib/repositories";
import { ApplicationSuccessNotification } from "@/components/application-success-notification";
import { JobApplicationModal } from "./job-application-modal";

interface CareersFilterGridProps {
  jobOpenings: JobOpening[];
}

export function CareersFilterGrid({ jobOpenings }: CareersFilterGridProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Extract unique departments and locations
  const departments = useMemo(() => {
    const depts = Array.from(new Set(jobOpenings.map((job) => job.department)));
    return ["all", ...depts.sort()];
  }, [jobOpenings]);

  const locations = useMemo(() => {
    const locs = Array.from(new Set(jobOpenings.map((job) => job.location)));
    return ["all", ...locs.sort()];
  }, [jobOpenings]);

  // Filter jobs based on selected filters
  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const matchesDepartment =
        selectedDepartment === "all" || job.department === selectedDepartment;
      const matchesLocation =
        selectedLocation === "all" || job.location === selectedLocation;
      return matchesDepartment && matchesLocation;
    });
  }, [jobOpenings, selectedDepartment, selectedLocation]);

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setShowSuccessNotification(true);
  };

  const handleDismissNotification = () => {
    setShowSuccessNotification(false);
  };

  if (jobOpenings.length === 0) {
    return (
      <div className="cv2-empty-state">
        <Briefcase className="cv2-empty-icon" aria-hidden="true" />
        <h3>No Open Positions</h3>
        <p>
          We don't have any open positions at the moment, but we're always
          looking for talented individuals. Please check back later or send your
          resume to{" "}
          <a href="mailto:admin@docksideconstructions.com">
            admin@docksideconstructions.com
          </a>
          .
        </p>
        <Link href="/contact" className="cv2-btn cv2-btn--outline">
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <div className="cv2-filter-grid">
      {/* Filters */}
      <div className="cv2-filters">
        <div className="cv2-filter-group">
          <label htmlFor="department-filter" className="cv2-filter-label">
            Department
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="cv2-filter-select"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>

        <div className="cv2-filter-group">
          <label htmlFor="location-filter" className="cv2-filter-label">
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="cv2-filter-select"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === "all" ? "All Locations" : loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="cv2-results-count">
        Showing {filteredJobs.length} of {jobOpenings.length}{" "}
        {jobOpenings.length === 1 ? "position" : "positions"}
      </div>

      {/* Job cards grid */}
      {filteredJobs.length > 0 ? (
        <div className="cv2-jobs-grid">
          {filteredJobs.map((job) => (
            <article key={job.id} className="cv2-job-card">
              <div className="cv2-job-card__header">
                <h3 className="cv2-job-card__title">{job.title}</h3>
                <span className="cv2-job-card__type">{job.type}</span>
              </div>

              <div className="cv2-job-card__meta">
                <div className="cv2-job-meta-item">
                  <Users aria-hidden="true" />
                  <span>{job.department}</span>
                </div>
                <div className="cv2-job-meta-item">
                  <MapPin aria-hidden="true" />
                  <span>{job.location}</span>
                </div>
                <div className="cv2-job-meta-item">
                  <Clock aria-hidden="true" />
                  <span>{job.experience}</span>
                </div>
              </div>

              {job.skills.length > 0 && (
                <div className="cv2-job-card__skills">
                  {job.skills.slice(0, 5).map((skill) => (
                    <span key={skill} className="cv2-skill-badge">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 5 && (
                    <span className="cv2-skill-badge cv2-skill-badge--more">
                      +{job.skills.length - 5} more
                    </span>
                  )}
                </div>
              )}

              <div className="cv2-job-card__footer">
                <button
                  onClick={() => handleApplyClick(job)}
                  className="cv2-btn cv2-btn--fill cv2-btn--sm"
                  type="button"
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="cv2-no-results">
          <p>No positions match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedDepartment("all");
              setSelectedLocation("all");
            }}
            className="cv2-btn cv2-btn--outline cv2-btn--sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Success Notification */}
      <ApplicationSuccessNotification
        isVisible={showSuccessNotification}
        onDismiss={handleDismissNotification}
      />

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobOpening={selectedJob}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
