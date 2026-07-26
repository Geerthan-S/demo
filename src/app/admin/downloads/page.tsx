import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { DownloadsTable } from "@/components/admin/downloads-table";

export const metadata = { title: "Downloads CMS" };

export default async function AdminDownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const items = canUseDatabase()
    ? await getPrisma().download.findMany({
        orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      })
    : [];

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Downloads</h1>
          <p className="mt-3">
            Manage downloadable documents shown on the public Downloads section — company profile,
            certifications, tender documents and more.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/downloads/new">
            <Plus className="size-4" /> Add Document
          </Link>
        </Button>
      </div>

      {params.saved && (
        <p className="mt-4 rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700">
          Download saved successfully.
        </p>
      )}

      <div className="admin-table-shell mt-6">
        <DownloadsTable items={items} />
      </div>
    </div>
  );
}
