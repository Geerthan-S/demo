import { notFound } from "next/navigation";
import { updateClient } from "@/app/admin/actions";
import { ClientForm } from "@/components/admin/client-form";
import { requireAdmin } from "@/lib/admin";
import { seedClients } from "@/lib/content";
import { canUseDatabase, getPrisma, runSafeQuery } from "@/lib/prisma";

export const metadata = { title: "Edit Client" };

export default async function EditClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string; database?: string }>;
}) {
  await requireAdmin();
  const [{ id }, flags] = await Promise.all([params, searchParams]);
  const client = await runSafeQuery<any>(
    () => getPrisma().client.findUnique({ where: { id } }),
    seedClients.find((item) => item.id === id),
  );

  if (!client) notFound();

  return (
    <div>
      <div className="admin-page-title">
        <h1>Edit Client</h1>
        <p className="mt-2 text-muted-foreground">Update client details used across the public site.</p>
      </div>
      {flags?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {flags.error}
        </p>
      ) : null}
      {flags?.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Connect PostgreSQL and run migrations to persist client changes.
        </p>
      ) : null}
      <div className="mt-8">
        <ClientForm action={updateClient.bind(null, id)} client={client} />
      </div>
    </div>
  );
}
