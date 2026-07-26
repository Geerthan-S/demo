import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPrisma().project.findUnique({ where: { slug } });
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPrisma().project.findUnique({ where: { slug } });
  if (!project) notFound();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
      <p className="mb-2">Status: {project.status}</p>
      <p>{project.summary}</p>
    </main>
  );
}
