import { notFound } from "next/navigation";
import { updateProject } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { canUseDatabase, getPrisma, runSafeQuery } from "@/lib/prisma";
import { seedProjects } from "@/lib/content";
import { requireAdmin } from "@/lib/admin";
import { normalizeProject } from "@/lib/repositories";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string; database?: string }>;
}) {
  await requireAdmin();
  const [{ id }, flags] = await Promise.all([params, searchParams]);
  const rawProject = await runSafeQuery<any>(
    () => getPrisma().project.findUnique({ where: { id } }),
    seedProjects.find((item) => item.id === id),
  );

  if (!rawProject) notFound();
  const project = normalizeProject(rawProject);

  return (
    <div>
      <div className="admin-page-title">
        <h1>Edit Project</h1>
        <p className="mt-2 text-muted-foreground">Update scope, status, gallery, SEO and publishing controls.</p>
      </div>
      {flags?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {flags.error}
        </p>
      ) : null}
      {flags?.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Configure DATABASE_URL and run Prisma migrations to enable writes.
        </p>
      ) : null}
      <div className="mt-8">
        <ProjectForm action={updateProject.bind(null, id)} project={project} />
      </div>
    </div>
  );
}
