import { createDownload } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add Download" };

const downloadCategories = [
  "Company Profile",
  "Brochure",
  "Certifications",
  "Registration Documents",
  "Tender Documents",
  "GST Certificate",
  "PAN",
  "Vendor Registration Forms",
  "Other",
];

export default async function NewDownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Download</h1>
        <p className="mt-2">Upload a new document to the Downloads section.</p>
      </div>

      {params.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(params.error)}
        </p>
      )}

      <form action={createDownload} className="admin-form mt-6">
        <DownloadFormFields categories={downloadCategories} />
        <div className="admin-form__actions">
          <Button type="submit">Add Document</Button>
        </div>
      </form>
    </div>
  );
}

export function DownloadFormFields({
  categories,
  defaults,
}: {
  categories: string[];
  defaults?: Partial<{
    title: string;
    category: string;
    fileUrl: string;
    fileType: string;
    sortOrder: number;
    published: boolean;
    downloadEnabled: boolean;
  }>;
}) {
  return (
    <div className="admin-form__grid">
      <div className="admin-form__field admin-form__field--full">
        <label htmlFor="dl-title">Document Title *</label>
        <input
          id="dl-title"
          name="title"
          type="text"
          required
          defaultValue={defaults?.title ?? ""}
          placeholder="e.g. ISO 9001:2015 Certificate"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="dl-category">Category *</label>
        <select id="dl-category" name="category" required defaultValue={defaults?.category ?? ""}>
          <option value="" disabled>
            Select category…
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-form__field">
        <label htmlFor="dl-type">File Type</label>
        <select id="dl-type" name="fileType" defaultValue={defaults?.fileType ?? "pdf"}>
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
          <option value="xlsx">XLSX</option>
          <option value="zip">ZIP</option>
        </select>
      </div>

      <div className="admin-form__field admin-form__field--full">
        <label htmlFor="dl-file">File URL *</label>
        <input
          id="dl-file"
          name="fileUrl"
          type="text"
          required
          defaultValue={defaults?.fileUrl ?? ""}
          placeholder="https://... or /path/to/file.pdf"
        />
        <small>Upload the file using the Media panel, then paste the URL here.</small>
      </div>

      <div className="admin-form__field">
        <label htmlFor="dl-sort">Sort Order</label>
        <input
          id="dl-sort"
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={defaults?.sortOrder ?? 0}
        />
        <small>Lower number = displayed first within its category</small>
      </div>

      <div className="admin-form__field">
        <label className="admin-checkbox">
          <input
            name="published"
            type="checkbox"
            defaultChecked={defaults?.published ?? true}
          />
          Published (visible on website)
        </label>
      </div>

      <div className="admin-form__field">
        <label className="admin-checkbox">
          <input
            name="downloadEnabled"
            type="checkbox"
            defaultChecked={defaults?.downloadEnabled ?? true}
          />
          Download Enabled (allow visitors to download)
        </label>
      </div>
    </div>
  );
}
