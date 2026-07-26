import { getDownloads } from "@/lib/repositories";
import { DownloadsPageClient } from "@/components/downloads/DownloadsPageClient";
import "./downloads.css";

// Force dynamic rendering to prevent SSR issues with PDF viewer
export const dynamic = 'force-dynamic';

export default async function DownloadsPage() {
  const groups = await getDownloads();

  return <DownloadsPageClient groups={groups} />;
}
