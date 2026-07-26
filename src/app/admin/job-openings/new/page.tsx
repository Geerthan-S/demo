import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase } from "@/lib/prisma";
import { createJobOpening } from "@/app/admin/actions";
import { redirect } from "next/navigation";

export const metadata = { title: "New Job Opening | CMS" };

export default async function NewJobOpeningPage() {
    await requireAdmin();

    if (!canUseDatabase()) {
        redirect("/admin/job-openings");
    }

    return (
        <div className="max-w-4xl space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/admin/job-openings">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-white">Create Job Opening</h1>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-[#111111] overflow-hidden">
                <form action={createJobOpening} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 col-span-2">
                            <label className="block text-sm font-medium text-zinc-300">Position Title</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="e.g. Senior Site Engineer"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Department</label>
                            <input
                                name="department"
                                type="text"
                                placeholder="e.g. Civil Execution"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Location</label>
                            <input
                                name="location"
                                type="text"
                                placeholder="e.g. Chennai, Tamil Nadu"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Employment Type</label>
                            <input
                                name="type"
                                type="text"
                                placeholder="e.g. Full-Time"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Experience Required</label>
                            <input
                                name="experience"
                                type="text"
                                placeholder="e.g. 5-8 Years"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Vacancies</label>
                            <input
                                name="vacancies"
                                type="number"
                                min="1"
                                defaultValue={1}
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8B3A4A]"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Internal Status</label>
                            <select
                                name="status"
                                defaultValue="Active"
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
                                placeholder="Briefly describe the day-to-day role and overall objective."
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A] resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-4 col-span-2">
                            <label className="block text-sm font-medium text-zinc-300">Requirements (Separate closely with newlines)</label>
                            <textarea
                                name="requirements"
                                rows={6}
                                placeholder="B.Tech in Civil Engineering&#10;Expertise in AutoCAD&#10;Willingness to travel"
                                required
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8B3A4A] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked={true}
                            className="w-5 h-5 accent-[#8B3A4A]"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer select-none">
                            Publish to public Careers portal immediately (Visible to applicants)
                        </label>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-zinc-800">
                        <Link href="/admin/job-openings">
                            <Button variant="ghost" className="text-zinc-400 hover:text-white">Cancel</Button>
                        </Link>
                        <Button type="submit" className="bg-[#8B3A4A] hover:bg-[#6e2e3a] text-white">
                            <Save className="mr-2 h-4 w-4" />
                            Launch Position
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
