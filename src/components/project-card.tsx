import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectView } from "@/lib/content";

export function ProjectCard({ project }: { project: ProjectView }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="premium-list-card group"
    >
      <div className="premium-list-card__image">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>
      <div className="premium-list-card__body">
        <div>
          <span>{project.clientName}</span>
          <em>{project.status.replace("_", " ")}</em>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <footer>
          <span>{project.location}</span>
          <span>{project.contractValue ?? project.projectValue}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </footer>
      </div>
    </Link>
  );
}
