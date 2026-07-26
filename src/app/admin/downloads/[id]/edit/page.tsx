import { notFound } from "next/navigation";
import { updateDownload } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { DownloadFormFields } from "@/app/admin/downloads/new/page";

export const metadata = { title: "Edit Download" };

const downloadCategories = [
  "Company Profile", "Brochure", "Certifications", "Registration Documents",
  "Tender Documents", "GST Certificate", "PAN", "Vendor Registration Forms", "Other",
];

export default async function EditDownloadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;

  if (!canUseDatabase()) notFound();
  const item = await getPrisma().download.findUnique({ where: { id } });
  if (!item) notFound();

  const updateWithId = updateDownload.bind(null, id);

  return (
    <div>
      <div className="admin-page-title">
        <h1>Edit Download</h1>
        <p className="mt-2">{item.title}</p>
      </div>

      {sp.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(sp.error)}
        </p>
      )}

      <form action={updateWithId} className="admin-form mt-6">
        <DownloadFormFields categories={downloadCategories} defaults={item} />
        <div className="admin-form__actions">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
