import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { deleteClient } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { seedClients, type ClientView } from "@/lib/content";
import { canUseDatabase, getPrisma, runSafeQuery } from "@/lib/prisma";

export const metadata = { title: "Client CMS" };

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const clients = await runSafeQuery<ClientView[]>(
    () => getPrisma().client.findMany({ orderBy: { updatedAt: "desc" } }) as any,
    seedClients,
  );

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Clients</h1>
          <p className="mt-2 text-muted-foreground">Edit client logos, industries, website links and testimonial notes.</p>
        </div>
        <Button asChild><Link href="/admin/clients/new"><Plus className="size-4" /> Add Client</Link></Button>
      </div>
      {params.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Connect PostgreSQL and run migrations to persist client changes.
        </p>
      ) : null}
      <div className="admin-table-shell">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.industry ?? "Not set"}</TableCell>
                <TableCell>{client.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline"><Link href={`/admin/clients/${client.id}/edit`}>Edit</Link></Button>
                  <form action={deleteClient.bind(null, client.id)}>
                    <Button variant="destructive" size="icon" aria-label="Delete client"><Trash2 className="size-4" /></Button>
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
