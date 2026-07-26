import { createClient } from "@/app/admin/actions";
import { ClientForm } from "@/components/admin/client-form";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add Client" };

export default async function NewClientPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Client</h1>
        <p className="mt-2 text-muted-foreground">Create a client profile for logos, industries and homepage trust signals.</p>
      </div>
      {params?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {params.error}
        </p>
      ) : null}
      {params?.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Connect PostgreSQL and run migrations to persist client changes.
        </p>
      ) : null}
      <div className="mt-8">
        <ClientForm action={createClient} />
      </div>
    </div>
  );
}
