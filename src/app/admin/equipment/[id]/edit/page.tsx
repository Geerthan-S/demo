import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateEquipment } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { EquipmentFormFields } from "@/app/admin/equipment/new/page";

export const metadata = { title: "Edit Equipment | Admin" };

export default async function EditEquipmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;

  if (!canUseDatabase()) notFound();
  const item = await getPrisma().equipment.findUnique({ where: { id } });
  if (!item) notFound();

  const updateWithId = updateEquipment.bind(null, id);

  return (
    <div>
      {/* Back link */}
      <div className="mb-4">
        <Link
          href="/admin/equipment"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Equipment Fleet
        </Link>
      </div>

      <div className="admin-page-title">
        <h1>Edit Equipment</h1>
        <p className="mt-1 text-sm text-muted-foreground">{item.name}</p>
      </div>

      {sp.saved && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          ✓ Equipment updated successfully.
        </div>
      )}

      {sp.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(sp.error)}
        </p>
      )}

      <form action={updateWithId} className="admin-form mt-6">
        <EquipmentFormFields defaults={item} />
        <div className="admin-form__actions">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
