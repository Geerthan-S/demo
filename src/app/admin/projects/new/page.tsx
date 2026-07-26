import { createProject } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add Project" };

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Project</h1>
        <p className="mt-2 text-muted-foreground">Publish a new CMS-powered case study.</p>
      </div>
      {params?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {params.error}
        </p>
      ) : null}
      {params?.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Configure DATABASE_URL and run Prisma migrations to enable writes.
        </p>
      ) : null}
      <div className="mt-8">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
