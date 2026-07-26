import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { updateJobOpening, deleteJobOpening } from "@/app/admin/actions";

export const metadata = { title: "Edit Job Opening | CMS" };

export default async function EditJobOpeningPage({ params }: { params: { id: string } | any }) {
    await requireAdmin();

    if (!canUseDatabase()) {
        redirect("/admin/job-openings");
    }

    // Next.js 15 generic param resolution
    const resolvedParams = await params;
    const targetId = String(resolvedParams?.id || "");

    const db = getPrisma();
    const job = await db.jobOpening.findUnique({
        where: { id: targetId },
    });

    if (!job) {
        redirect("/admin/job-openings");
    }

    const updateAction = updateJobOpening.bind(null, job.id);
    const deleteAction = deleteJobOpening.bind(null, job.id);

    return (
        <div className="max-w-4xl space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/admin/job-openings">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-white">Edit Job Opening</h1>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-[#111111] overflow-hidden">
                <form action={updateAction} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 col-span-2">
                            <label className="block text-sm font-medium text-zinc-300">Position Title</label>
                            <input
                                name="title"
                                type="text"
                                defaultValue={job.title}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Department</label>
                            <input
                                name="department"
                                type="text"
                                defaultValue={job.department}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Location</label>
                            <input
                                name="location"
                                type="text"
                                defaultValue={job.location}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Employment Type</label>
                            <input
                                name="type"
                                type="text"
                                defaultValue={job.type}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Experience Required</label>
                            <input
                                name="experience"
                                type="text"
                                defaultValue={job.experience}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Vacancies</label>
                            <input
                                name="vacancies"
                                type="number"
                                min="1"
                                defaultValue={job.vacancies}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Internal Status</label>
                            <select
                                name="status"
                                defaultValue={job.status}
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            >
                                <option value="Active">Active</option>
                                <option value="Filled">Filled</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div className="space-y-4 col-span-2">
                            <label className="block text-sm font-medium text-zinc-300">Job Description (Brief)</label>
                            <textarea
                                name="description"
                                rows={4}
                                defaultValue={job.description ?? ""}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A] resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-4 col-span-2">
                            <label className="block text-sm font-medium text-zinc-300">Requirements (Separate closely with newlines)</label>
                            <textarea
                                name="requirements"
                                rows={6}
                                defaultValue={job.requirements ?? ""}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked={job.published}
                            className="w-5 h-5 accent-[#8B3A4A]"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer select-none">
                            Publish to public Careers portal (Visible to applicants)
                        </label>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                        <Button
                            formAction={deleteAction}
                            variant="destructive"
                            className="bg-red-900/40 text-red-400 hover:bg-red-900/60 border border-red-900/50"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Listing
                        </Button>

                        <div className="flex items-center gap-4">
                            <Link href="/admin/job-openings">
                                <Button variant="ghost" className="text-zinc-400 hover:text-white">Cancel</Button>
                            </Link>
                            <Button type="submit" className="bg-[#8B3A4A] hover:bg-[#6e2e3a] text-white">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
