"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Pencil, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PDFViewerModal } from "@/components/downloads/PDFViewerModal";
import { deleteDownload } from "@/app/admin/actions";

type Download = {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileUrl: string;
  published: boolean;
  downloadEnabled: boolean;
  sortOrder: number;
};

type DownloadsTableProps = {
  items: Download[];
};

// Convert Google Drive links to direct download format, then proxy
function convertToProxyUrl(url: string): string {
  let finalUrl = url;

  // Extract Google Drive file ID from various URL formats
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const queryIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = fileIdMatch?.[1] || queryIdMatch?.[1];

  if (fileId) {
    // Convert to direct download URL for Google Drive
    finalUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // Use proxy API to bypass CORS
  return `/api/pdf-proxy?url=${encodeURIComponent(finalUrl)}`;
}

export function DownloadsTable({ items }: DownloadsTableProps) {
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    title: string;
    downloadEnabled: boolean;
  } | null>(null);

  const handlePreview = (item: Download) => {
    const pdfUrl = convertToProxyUrl(item.fileUrl);
    setSelectedPdf({
      url: pdfUrl,
      title: item.title,
      downloadEnabled: item.downloadEnabled,
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Download</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No documents added yet. Click &quot;Add Document&quot; to get started.
              </TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.fileType.toUpperCase()}</Badge>
              </TableCell>
              <TableCell>{item.published ? "Yes" : "No"}</TableCell>
              <TableCell>{item.downloadEnabled ? "Yes" : "No"}</TableCell>
              <TableCell>{item.sortOrder}</TableCell>
              <TableCell className="flex justify-end gap-2">
                {item.fileType.toLowerCase() === "pdf" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(item)}
                  >
                    <Eye className="size-3 mr-1" /> Preview
                  </Button>
                )}
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/downloads/${item.id}/edit`}>
                    <Pencil className="size-3 mr-1" /> Edit
                  </Link>
                </Button>
                <form action={deleteDownload.bind(null, item.id)}>
                  <Button variant="destructive" size="icon" aria-label="Delete download">
                    <Trash2 className="size-4" />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPdf && (
        <PDFViewerModal
          isOpen={true}
          onClose={() => setSelectedPdf(null)}
          fileUrl={selectedPdf.url}
          title={selectedPdf.title}
          downloadEnabled={selectedPdf.downloadEnabled}
        />
      )}
    </>
  );
}
