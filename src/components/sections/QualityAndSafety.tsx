import { ShieldCheck, Award, ClipboardCheck, HardHat, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management",
    description:
      "Systematic approach to quality — every process documented, measured and continuously improved.",
    icon: Award,
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    description:
      "Responsible site management that minimises environmental impact across all project phases.",
    icon: ShieldCheck,
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Safety",
    description:
      "Workers go home safe. Every site runs under a structured safety management system.",
    icon: HardHat,
  },
];

const safetyProcedures = [
  "Daily toolbox talks before every shift",
  "Site-specific HSE plans and method statements",
  "PPE compliance enforced at all entry points",
  "Weekly safety audits and non-conformance reporting",
  "Incident investigation and corrective action tracking",
  "Emergency evacuation and first aid protocols",
  "Subcontractor safety induction and compliance checks",
  "Monthly HIRA (Hazard Identification & Risk Assessment) reviews",
];

const complianceItems = [
  "BOCW Act Compliance",
  "Workmen Compensation Insurance",
  "PF & ESI for all workers",
  "Labour Licence & Contract compliance",
  "Statutory registers maintained on site",
];

export function QualityAndSafety() {
  return (
    <section id="quality" className="quality-section" aria-label="Quality and Safety">
      <div className="quality-section__inner">
        <div className="quality-section__head">
          <span className="quality-section__eyebrow">Standards We Hold</span>
          <h2>Quality &amp; Safety</h2>
          <p>
            Triple ISO certification backed by active compliance systems — not certificates on a wall,
            but working processes on every site.
          </p>
        </div>

        {/* ISO Certifications */}
        <div className="cert-grid">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <article key={cert.code} className="cert-card">
                <div className="cert-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <div className="cert-card__body">
                  <span className="cert-card__code">{cert.code}</span>
                  <h3>{cert.title}</h3>
                  <p>{cert.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="quality-two-col">
          {/* Safety Procedures */}
          <div className="quality-procedures">
            <div className="quality-procedures__head">
              <ClipboardCheck aria-hidden="true" />
              <h3>Site Safety Procedures</h3>
            </div>
            <ul>
              {safetyProcedures.map((procedure) => (
                <li key={procedure}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {procedure}
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div className="quality-compliance">
            <div className="quality-compliance__head">
              <ShieldCheck aria-hidden="true" />
              <h3>Statutory Compliance</h3>
            </div>
            <ul>
              {complianceItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="quality-compliance__badge">
              <ShieldCheck aria-hidden="true" />
              <div>
                <strong>Zero compromise on compliance</strong>
                <p>All statutory obligations maintained across every project site.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
