"use client";

import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle2, ChevronDown, Send } from "lucide-react";

const SKILLS = [
    "AutoCAD",
    "Primavera",
    "MS Project",
    "STAAD Pro",
    "Survey",
    "RCC",
    "Steel",
    "QA/QC",
    "Safety",
    "Planning",
    "Billing",
    "Contracts",
    "Revit",
    "Site Management",
];

export function RecruitmentForm() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const [positionType, setPositionType] = useState("");
    const [departmentType, setDepartmentType] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");

    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [customSkill, setCustomSkill] = useState("");

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
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

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setResumeFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const handlePopulate = (e: any) => {
            const { position, department } = e.detail;
            const posSelect = document.getElementById("position") as HTMLSelectElement | null;
            const deptSelect = document.getElementById("department") as HTMLSelectElement | null;

            if (posSelect && position) {
                let exists = Array.from(posSelect.options).some(opt => opt.value === position);
                if (!exists) {
                    const newOpt = new Option(position, position);
                    posSelect.add(newOpt);
                }
                setPositionType(position); // Ensure React tracks the change
            }

            if (deptSelect && department) {
                let exists = Array.from(deptSelect.options).some(opt => opt.value === department);
                if (!exists) {
                    const newOpt = new Option(department, department);
                    deptSelect.add(newOpt);
                }
                setDepartmentType(department); // Ensure React tracks the change
            }
        };

        window.addEventListener("populateRecruitmentForm", handlePopulate);
        return () => window.removeEventListener("populateRecruitmentForm", handlePopulate);
    }, []);

    return (
        <form className="bg-white rounded-[24px] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(139,58,74,0.04)] border border-gray-100 p-8 md:p-12 w-full mx-auto relative overflow-hidden backdrop-blur-xl">
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#8B3A4A] to-[#C8924A]" />

            <div className="mb-10">
                <h2 className="font-display text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#8B3A4A]/10 flex items-center justify-center flex-shrink-0 text-[#8B3A4A]">
                        <UploadCloud className="w-5 h-5" strokeWidth={2.5} />
                    </span>
                    Apply for a Role
                </h2>
                <p className="text-sm text-gray-500 mt-2 ml-[52px]">
                    Fill in your details below and submit your application securely.
                </p>
            </div>

            <div className="space-y-12">
                {/* PERSONAL DETAILS */}
                <section>
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
                        Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FloatingInput id="fullName" label="Full Name *" type="text" />
                        <FloatingInput id="email" label="Email Address *" type="email" />
                        <FloatingInput id="phone" label="Phone Number *" type="tel" />
                        <FloatingInput id="city" label="Current City *" type="text" />
                    </div>
                </section>

                {/* PROFESSIONAL DETAILS */}
                <section>
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
                        Professional Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FloatingSelect
                            id="position"
                            label="Position Applying For *"
                            value={positionType}
                            onChange={(e: any) => setPositionType(e.target.value)}
                        >
                            <option value="" disabled></option>
                            <option value="civil-engineer">Sr. Civil Engineer</option>
                            <option value="project-mgr">Project Manager</option>
                            <option value="qc-inspector">QA/QC Inspector</option>
                            <option value="safety-officer">Safety Officer</option>
                            <option value="other">Other (Please Specify)</option>
                        </FloatingSelect>

                        {positionType === "other" && (
                            <FloatingInput id="position-custom" label="Specify Position *" type="text" />
                        )}

                        <FloatingSelect
                            id="department"
                            label="Department *"
                            value={departmentType}
                            onChange={(e: any) => setDepartmentType(e.target.value)}
                        >
                            <option value="" disabled></option>
                            <option value="engineering">Engineering</option>
                            <option value="management">Project Management</option>
                            <option value="quality">Quality Assurance</option>
                            <option value="safety">HSE / Safety</option>
                            <option value="other">Other (Please Specify)</option>
                        </FloatingSelect>

                        {departmentType === "other" && (
                            <FloatingInput id="department-custom" label="Specify Department *" type="text" />
                        )}

                        <FloatingInput id="experience" label="Years Experience *" type="number" />
                        <FloatingInput id="employer" label="Current Employer" type="text" />
                        <FloatingInput id="currCtc" label="Current CTC (LPA)" type="text" />
                        <FloatingInput id="expCtc" label="Expected CTC (LPA)" type="text" />

                        <FloatingSelect
                            id="notice"
                            label="Notice Period *"
                            value={noticePeriod}
                            onChange={(e: any) => setNoticePeriod(e.target.value)}
                        >
                            <option value="" disabled></option>
                            <option value="immediate">Immediate Joiner</option>
                            <option value="15">15 Days</option>
                            <option value="30">30 Days</option>
                            <option value="60">60 Days</option>
                            <option value="90">90 Days</option>
                        </FloatingSelect>
                    </div>
                </section>

                {/* SKILLS */}
                <section>
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
                        Skills <span className="text-gray-400 font-normal ml-2 lowercase tracking-normal">(Select all that apply)</span>
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {Array.from(new Set([...SKILLS, ...selectedSkills])).map((skill) => {
                            const matches = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => toggleSkill(skill)}
                                    className={`
                    px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border
                    ${matches
                                            ? "bg-[#8B3A4A] text-white hover:text-white hover:bg-[#6b2a37] border-[#8B3A4A] shadow-[0_4px_12px_rgba(139,58,74,0.25)] scale-[1.02]"
                                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-[#8B3A4A]/40 hover:bg-[#8B3A4A]/5 hover:text-[#8B3A4A]"
                                        }
                  `}
                                >
                                    {skill}
                                </button>
                            );
                        })}

                        {/* Interactive "Other" Skill Entry */}
                        {!isAddingSkill ? (
                            <button
                                type="button"
                                onClick={() => setIsAddingSkill(true)}
                                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide border border-dashed border-gray-300 text-gray-400 hover:border-[#8B3A4A] hover:bg-[#8B3A4A]/5 hover:text-[#8B3A4A] transition-colors"
                            >
                                + Add Custom Skill
                            </button>
                        ) : (
                            <input
                                type="text"
                                autoFocus
                                placeholder="Type & press Enter..."
                                value={customSkill}
                                onChange={(e) => setCustomSkill(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
                                            setSelectedSkills((prev) => [...prev, customSkill.trim()]);
                                        }
                                        setCustomSkill("");
                                        setIsAddingSkill(false);
                                    }
                                    if (e.key === 'Escape') {
                                        setCustomSkill("");
                                        setIsAddingSkill(false);
                                    }
                                }}
                                onBlur={() => {
                                    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
                                        setSelectedSkills((prev) => [...prev, customSkill.trim()]);
                                    }
                                    setCustomSkill("");
                                    setIsAddingSkill(false);
                                }}
                                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-[#8B3A4A] text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#8B3A4A]/10 transition-all w-[180px] bg-white shadow-sm"
                            />
                        )}
                    </div>
                </section>

                {/* UPLOAD RESUME */}
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

                {/* ADDITIONAL INFO */}
                <section>
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B3A4A] mb-5 border-b border-gray-100 pb-2">
                        Additional Information
                    </h3>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FloatingInput id="linkedin" label="LinkedIn Profile (Optional)" type="url" />
                            <FloatingInput id="portfolio" label="Portfolio / Website (Optional)" type="url" />
                        </div>

                        <div className="relative group">
                            <textarea
                                id="why-join"
                                rows={4}
                                className="peer w-full px-5 pt-8 pb-4 border-2 border-gray-100 rounded-[12px] bg-white focus:border-[#8B3A4A] focus:ring-4 focus:ring-[#8B3A4A]/10 focus:outline-none transition-all resize-none text-[15px] font-medium text-gray-800 placeholder-transparent"
                                placeholder=" "
                            />
                            <label
                                htmlFor="why-join"
                                className="absolute left-5 top-4 text-xs font-semibold text-gray-400 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-4 peer-focus:text-xs peer-focus:text-[#8B3A4A] transition-all pointer-events-none"
                            >
                                Why do you want to join Dockside Constructions? (Optional)
                            </label>
                            <div className="absolute right-4 bottom-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                                500 Max
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONSENT & SUBMIT */}
                <section className="pt-6 border-t border-gray-100">
                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded shrink-0 bg-white checked:bg-[#8B3A4A] checked:border-[#8B3A4A] focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]/20 transition-all" required />
                                <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                I hereby declare that the information provided is true to the best of my knowledge.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded shrink-0 bg-white checked:bg-[#8B3A4A] checked:border-[#8B3A4A] focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]/20 transition-all" required />
                                <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                I agree to be contacted by Dockside Constructions regarding my application and future opportunities.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-[#8B3A4A] text-white rounded-[12px] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#6b2a37] hover:shadow-[0_12px_32px_rgba(139,58,74,0.3)] transition-all duration-300 active:scale-[0.98]"
                        onClick={(e) => e.preventDefault()}
                    >
                        Submit Application
                        <Send className="w-4 h-4 ml-1" />
                    </button>
                </section>

            </div>
        </form>
    );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Floating Input Helper Component
   ────────────────────────────────────────────────────────────────────────────── */
function FloatingInput({ id, label, type }: { id: string; label: string; type: string }) {
    return (
        <div className="relative group">
            <input
                type={type}
                id={id}
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

/* ──────────────────────────────────────────────────────────────────────────────
   Floating Select Helper Component
   ────────────────────────────────────────────────────────────────────────────── */
function FloatingSelect({ id, label, children, ...props }: any) {
    return (
        <div className="relative group">
            <select
                id={id}
                className="peer w-full h-[64px] px-5 pt-6 pb-2 border-2 border-gray-100 rounded-[12px] bg-white focus:border-[#8B3A4A] focus:ring-4 focus:ring-[#8B3A4A]/10 focus:outline-none transition-all text-[15px] font-medium text-gray-800 appearance-none cursor-pointer"
                {...props}
            >
                {children}
            </select>
            <label
                htmlFor={id}
                className="absolute left-5 top-[12px] text-[11px] font-semibold text-[#8B3A4A] transition-all pointer-events-none"
            >
                {label}
            </label>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={2} />
        </div>
    );
}
