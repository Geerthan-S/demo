import type { MetadataRoute } from "next";
import { seedProjects } from "@/lib/content";

const siteUrl = "https://docksideconstructions.com";

const staticRoutes = [
  "",
  "/projects",
  "/equipment-fleet",
  "/quality-safety",
  "/downloads",
  "/careers",
  "/contact",
] as const;

function sitemapEntry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => sitemapEntry(path, path === "" ? 1 : 0.8)),
    ...seedProjects.map((project) => sitemapEntry(`/projects/${project.slug}`, 0.65)),
  ];
}
