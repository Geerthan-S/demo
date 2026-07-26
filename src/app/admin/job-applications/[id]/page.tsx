import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Download, ExternalLink, Mail, MapPin, Phone, User, Building, Clock, Link as LinkIcon, Edit, UserPlus } from "lucide-react";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin";
import { getPrisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/app/admin/actions";

const STATUS_OPTIONS = [
    { value: "New", label: "New", color: "bg-blue-100 text-blue-800" },
    { value: "Under Review", label: "Under Review", color: "bg-orange-100 text-orange-800" },
    { value: "Shortlisted", label: "Shortlisted", color: "bg-yellow-100 text-yellow-800" },
    { value: "Interview Scheduled", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800" },
    { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    { value: "Offered", label: "Offered", color: "bg-green-100 text-green-800" },
    { value: "Hired", label: "Hired", color: "bg-[#8B3A4A]/20 text-[#8B3A4A]" },
];

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
    await requireAdmin();

    const db = getPrisma();

    // Use any bypass for TS schema lag
    const application = await (db.jobApplication as any).findUnique({
        where: { id: params.id },
        include: {
            jobOpening: true,
        },
    });

    if (!application) {
        notFound();
    }

    const getStatusStyle = (status: string) => {
        const option = STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.color || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="max-w-5xl mx-auto pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button asChild variant="outline" size="sm" className="h-9 px-3">
                    <Link href="/admin/job-applications">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Pipeline
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-between bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{application.fullName}</h1>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#8B3A4A]" /> {application.jobOpening.title}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {application.city || application.jobOpening.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href={`mailto:${application.email}`} className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
                            <Mail className="w-4 h-4" /> {application.email}
                        </a>
                        <a href={`tel:${application.phone}`} className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors">
                            <Phone className="w-4 h-4" /> {application.phone}
                        </a>
                        {application.linkedin && (
                            <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
                                <UserPlus className="w-4 h-4" /> LinkedIn
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[240px]">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Application Pipeline</p>
                        <form action={updateApplicationStatus} className="w-full">
                            <input type="hidden" name="applicationId" value={application.id} />
                            <select
                                name="status"
                                defaultValue={application.status || "New"}
                                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                                className={`w-full rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider shadow-sm ring-1 ring-inset ring-gray-900/10 cursor-pointer focus:outline-none transition-all ${getStatusStyle(application.status || "New")}`}
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>

                    <Button asChild className="w-full h-12 bg-[#8B3A4A] hover:bg-[#6b2a37] text-white rounded-xl shadow-[0_8px_20px_rgba(139,58,74,0.2)]">
                        <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" /> Download Resume
                        </a>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B3A4A] mb-6 border-b border-gray-100 pb-3 flex items-center justify-between">
                            Professional Background
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">Total Experience</p>
                                <p className="text-lg font-bold text-gray-900">{application.experience || "Not Provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">Current Employer</p>
                                <p className="text-lg font-bold text-gray-900">{application.currentEmployer || "Not Provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">Current CTC</p>
                                <p className="text-lg font-bold text-gray-900">{application.currentCTC ? `₹${application.currentCTC} LPA` : "Not Provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">Expected CTC</p>
                                <p className="text-lg font-bold text-gray-900">{application.expectedCTC ? `₹${application.expectedCTC} LPA` : "Not Provided"}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-semibold text-gray-400 mb-1 flex items-center gap-2"><Clock className="w-4 h-4" /> Notice Period</p>
                                <p className="text-lg font-bold text-gray-900 capitalize">{application.noticePeriod?.replace('-', ' ') || "Not Provided"}</p>
                            </div>
                        </div>
                    </div>

                    {application.coverLetter && (
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B3A4A] mb-6 border-b border-gray-100 pb-3">
                                Cover Letter
                            </h3>
                            <p className="text-gray-700 leading-relaxed max-w-prose whitespace-pre-wrap">
                                {application.coverLetter}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-0" />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B3A4A] mb-6 border-b border-gray-100 pb-3 relative z-10">
                            Metadata
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 mb-1">Reference ID</p>
                                <p className="text-sm font-mono text-gray-900">{application.applicationId}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 mb-1">Date Submitted</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {new Date(application.submittedAt).toLocaleString("en-US", {
                                        dateStyle: "medium", timeStyle: "short"
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 mb-1">Source</p>
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{application.source}</span>
                            </div>
                        </div>
                    </div>

                    {application.portfolio && (
                        <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="block bg-[#8B3A4A] p-6 rounded-3xl text-white hover:bg-[#6b2a37] transition-all group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center justify-between mb-2 relative z-10">
                                <LinkIcon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                                <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1 relative z-10">External Link</p>
                            <p className="text-lg font-bold relative z-10">View Portfolio</p>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
