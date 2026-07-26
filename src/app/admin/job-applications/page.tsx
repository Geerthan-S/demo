import Link from "next/link";
import { ExternalLink, Calendar, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { updateApplicationStatus } from "@/app/admin/actions";
import { Prisma } from "@prisma/client";

export const metadata = { title: "Job Applications CMS" };

const STATUS_OPTIONS = [
  { value: "New", label: "New", color: "bg-blue-100 text-blue-800" },
  { value: "Under Review", label: "Under Review", color: "bg-orange-100 text-orange-800" },
  { value: "Shortlisted", label: "Shortlisted", color: "bg-yellow-100 text-yellow-800" },
  { value: "Interview Scheduled", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800" },
  { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  { value: "Offered", label: "Offered", color: "bg-green-100 text-green-800" },
  { value: "Hired", label: "Hired", color: "bg-[#8B3A4A]/20 text-[#8B3A4A]" },
];

type JobApplicationWithOpening = Prisma.JobApplicationGetPayload<{
  include: {
    jobOpening: {
      select: {
        title: true;
        department: true;
      };
    };
  };
}>;

export default async function AdminJobApplicationsPage() {
  await requireAdmin();

  let applications: JobApplicationWithOpening[] = [];
  let dbAvailable = canUseDatabase();

  if (dbAvailable) {
    try {
      const db = getPrisma();
      applications = await db.jobApplication.findMany({
        include: {
          jobOpening: {
            select: {
              title: true,
              department: true,
            },
          },
        },
        orderBy: { submittedAt: "desc" },
      });
    } catch (error) {
      console.error("Failed to fetch job applications:", error);
      dbAvailable = false;
    }
  }

  const getStatusStyle = (status: string) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Recruitment Pipeline</h1>
          <p className="mt-2 text-muted-foreground">
            Review and manage candidate applications deployed from the Recruitment Portal.
          </p>
        </div>
      </div>

      {!dbAvailable ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Connect PostgreSQL and run migrations to view job applications.
        </p>
      ) : null}

      {applications.length === 0 && dbAvailable ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No Applications Yet</h3>
          <p className="text-sm text-gray-600">
            When candidates apply via the careers portal, they will appear securely here.
          </p>
        </div>
      ) : null}

      {applications.length > 0 ? (
        <div className="admin-table-shell overflow-x-auto w-full">
          <div className="mb-4 flex items-center justify-between min-w-max pr-4">
            <p className="text-sm text-muted-foreground">
              {applications.length} {applications.length === 1 ? "application" : "applications"} total
            </p>
          </div>
          <Table className="min-w-max">
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="text-xs font-mono text-gray-400 truncate max-w-[80px]">
                    {app.applicationId.substring(0, 8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{app.fullName}</span>
                      <span className="text-xs text-muted-foreground">{app.email}</span>
                      <span className="text-xs text-muted-foreground">{app.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-800">{app.jobOpening.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{app.experience}</span>
                      {app.currentEmployer && <span className="text-xs text-muted-foreground truncate max-w-[150px]">{app.currentEmployer}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(app.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <form action={updateApplicationStatus} className="inline">
                      <input type="hidden" name="applicationId" value={app.id} />
                      <select
                        name="status"
                        defaultValue={app.status || "New"}
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm ring-1 ring-inset ring-gray-900/10 cursor-pointer focus:outline-none transition-colors ${getStatusStyle(app.status || "New")}`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </form>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 items-center">
                    <Button asChild variant="outline" size="sm" className="h-8 shadow-sm">
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="size-3 mr-1.5 text-[#8B3A4A]" />
                        Resume
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-8 shadow-sm">
                      <Link href={`/admin/job-applications/${app.id}`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
