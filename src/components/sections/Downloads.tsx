import Link from "next/link";
import { FileText, Download, FolderOpen, ArrowRight } from "lucide-react";
import { getDownloads, type DownloadGroup } from "@/lib/repositories";

const categoryIcons: Record<string, React.ElementType> = {
  "Company Profile": FileText,
  "Brochure": FileText,
  "Certifications": FileText,
  "Registration Documents": FolderOpen,
  "Tender Documents": FolderOpen,
  "GST Certificate": FileText,
  "PAN": FileText,
  "Vendor Registration Forms": FolderOpen,
};

function DownloadGroupCard({ group }: { group: DownloadGroup }) {
  const Icon = categoryIcons[group.category] ?? FileText;

  return (
    <div className="downloads-group">
      <div className="downloads-group__head">
        <Icon className="size-5" aria-hidden="true" />
        <h3>{group.category}</h3>
      </div>
      <ul>
        {group.items.map((item) => (
          <li key={item.id} className="download-item">
            <FileText className="size-4" aria-hidden="true" />
            <span>{item.title}</span>
            <a
              href={item.fileUrl}
              download
              className="download-item__btn"
              aria-label={`Download ${item.title}`}
            >
              <Download className="size-4" aria-hidden="true" />
              <span>Download</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Downloads() {
  const groups = await getDownloads();

  if (groups.length === 0) {
    // Still show section structure with a "coming soon" empty state
    return (
      <section id="downloads" className="downloads-section" aria-label="Downloads">
        <div className="downloads-section__inner">
          <div className="downloads-section__head">
            <span className="downloads-section__eyebrow">Documents &amp; Resources</span>
            <h2>Downloads</h2>
            <p>
              Company profile, certifications, registration documents and tender forms — all in one
              place.
            </p>
          </div>
          <div className="downloads-empty">
            <FolderOpen className="size-10" aria-hidden="true" />
            <p>Documents are being uploaded. Check back shortly.</p>
            <Link href="/#contact" className="studio-button studio-button--outline">
              Request Documents <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="downloads" className="downloads-section" aria-label="Downloads">
      <div className="downloads-section__inner">
        <div className="downloads-section__head">
          <span className="downloads-section__eyebrow">Documents &amp; Resources</span>
          <h2>Downloads</h2>
          <p>
            Company profile, certifications, registration documents and tender forms — all in one
            place for your procurement &amp; vendor onboarding process.
          </p>
        </div>
        <div className="downloads-grid">
          {groups.map((group) => (
            <DownloadGroupCard key={group.category} group={group} />
          ))}
        </div>
        <p className="downloads-section__note">
          Need a specific document not listed here?{" "}
          <Link href="/#contact">Contact us directly</Link> and we will send it within 24 hours.
        </p>
      </div>
    </section>
  );
}
