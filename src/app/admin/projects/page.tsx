import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProject } from "@/app/admin/actions";
import { getPrisma, runSafeQuery } from "@/lib/prisma";
import { seedProjects } from "@/lib/content";
import { requireAdmin } from "@/lib/admin";
import { normalizeProject } from "@/lib/repositories";

export const metadata = { title: "Project CMS" };

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const projects = (
    await runSafeQuery<Parameters<typeof normalizeProject>[0][]>(
      () => getPrisma().project.findMany({ orderBy: { updatedAt: "desc" } }),
      seedProjects,
    )
  ).map(normalizeProject);

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Project control</h1>
          <p className="mt-3">Create, edit, delete and publish project case studies with portfolio-grade metadata.</p>
        </div>
        <Button asChild><Link href="/admin/projects/new"><Plus className="size-4" /> Add Project</Link></Button>
      </div>
      {params.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Configure DATABASE_URL and run Prisma migrations to enable writes.
        </p>
      ) : null}
      <div className="admin-table-shell">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.clientName}</TableCell>
                <TableCell><Badge variant="outline">{project.clientType}</Badge></TableCell>
                <TableCell><Badge>{project.status.replace("_", " ")}</Badge></TableCell>
                <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline"><Link href={`/admin/projects/${project.id}/edit`}>Edit</Link></Button>
                  <form action={deleteProject.bind(null, project.id)}>
                    <Button variant="destructive" size="icon" aria-label="Delete project"><Trash2 className="size-4" /></Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
