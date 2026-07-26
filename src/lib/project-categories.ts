import type { ProjectView } from "@/lib/content";

export const projectCategoryFilters = ["All", "Government", "Private Sector"] as const;
export const editableProjectCategories = ["Government", "Private Sector"] as const;

export type ProjectCategory = (typeof editableProjectCategories)[number];
export type ProjectCategoryFilter = (typeof projectCategoryFilters)[number];

export function normalizeProjectCategory(value?: string | null): ProjectCategory {
  const text = String(value ?? "").toLowerCase();

  if (
    text.includes("government") ||
    text.includes("public") ||
    text.includes("pwd") ||
    text.includes("drda") ||
    text.includes("tahdco")
  ) {
    return "Government";
  }

  return "Private Sector";
}

export function getProjectCategory(project: ProjectView): ProjectCategory {
  return normalizeProjectCategory(
    project.clientType ||
      `${project.clientName} ${project.industry} ${project.servicesUsed.join(" ")} ${project.scopeOfWork}`,
  );
}

export function projectCategoryFromParam(value?: string | string[] | null): ProjectCategoryFilter {
  const first = Array.isArray(value) ? value[0] : value;
  const text = String(first ?? "").toLowerCase();

  if (text === "government") return "Government";
  if (text === "private-sector" || text === "private_sector" || text === "private") return "Private Sector";

  return "All";
}

export function projectCategoryHref(category: ProjectCategoryFilter) {
  if (category === "Government") return "/projects?category=government";
  if (category === "Private Sector") return "/projects?category=private-sector";
  return "/projects";
}
