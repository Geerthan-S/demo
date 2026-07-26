import Link from "next/link";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { type JobOpening } from "@prisma/client";

export const metadata = { title: "Job Openings CMS" };

export default async function AdminJobOpeningsPage() {
    await requireAdmin();

    let jobOpenings: JobOpening[] = [];
    let dbAvailable = canUseDatabase();

    if (dbAvailable) {
        try {
            const db = getPrisma();
            jobOpenings = await db.jobOpening.findMany({
                orderBy: { createdAt: "desc" },
            });
        } catch (err) {
            console.error("Error fetching job openings:", err);
            dbAvailable = false;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Job Openings</h1>
                <Link href="/admin/job-openings/new">
                    <Button className="bg-[#8B3A4A] hover:bg-[#6e2e3a] text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Job
                    </Button>
                </Link>
            </div>
            <p className="text-zinc-400 max-w-2xl mb-8">
                Manage active job listings, set requirements, and control visibility across the recruitment portal.
            </p>

            {!dbAvailable ? (
                <div className="rounded-lg border border-red-800 bg-red-900/20 p-6 text-red-200">
                    <h3 className="text-lg font-medium mb-2">Database Connection Required</h3>
                    <p>
                        The Recruitment Management System requires a configured PostgreSQL database to store and serve job postings securely.
                    </p>
                </div>
            ) : jobOpenings.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center text-zinc-400">
                    <Search className="mx-auto h-12 w-12 opacity-20 mb-4" />
                    <h3 className="text-lg font-medium text-zinc-300">No Job Openings Yet</h3>
                    <p className="mt-2 text-sm">Post a new position to start collecting applications from the careers portal.</p>
                    <div className="mt-6">
                        <Link href="/admin/job-openings/new">
                            <Button className="bg-[#8B3A4A] hover:bg-[#6e2e3a] text-white">Create First Job Opening</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="rounded-lg border border-zinc-800 overflow-hidden bg-[#111111]">
                    <Table>
                        <TableHeader className="bg-[#1a1a1a]">
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="text-zinc-400 font-medium h-12 px-6 w-[250px]">Position / Dept</TableHead>
                                <TableHead className="text-zinc-400 font-medium h-12 px-6">Location</TableHead>
                                <TableHead className="text-zinc-400 font-medium h-12 px-6">Details</TableHead>
                                <TableHead className="text-zinc-400 font-medium h-12 px-6">Status</TableHead>
                                <TableHead className="text-zinc-400 font-medium h-12 px-6 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobOpenings.map((job) => (
                                <TableRow key={job.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                                    <TableCell className="p-6">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{job.title}</span>
                                            <span className="text-xs text-zinc-500 mt-1">{job.department}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-6 text-zinc-300">{job.location}</TableCell>
                                    <TableCell className="p-6 text-zinc-400">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span>Exp: {job.experience}</span>
                                            <span>Type: {job.type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                {job.published ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-900/30 text-green-400 border border-green-800">
                                                        Live
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                        Draft
                                                    </span>
                                                )}
                                                <span className="text-xs text-zinc-500">
                                                    {job.vacancies} slot{job.vacancies !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/job-openings/${job.id}/edit`}>
                                                <Button variant="outline" size="sm" className="bg-transparent border-zinc-800 hover:bg-zinc-800 hover:text-white h-8">
                                                    <Edit className="h-3.5 w-3.5 mr-2" />
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
