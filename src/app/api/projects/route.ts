import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { seedProjects } from "@/lib/content";
import { revalidatePath } from "next/cache";
import {
  formatZodIssues,
  isUniqueConstraintError,
  prepareProjectJsonInput,
  projectJsonSchema,
} from "@/lib/cms-validation";

export async function GET() {
  if (!canUseDatabase()) return NextResponse.json(seedProjects);
  const projects = await getPrisma().project.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canUseDatabase()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await request.json();
  const parsed = projectJsonSchema.safeParse(prepareProjectJsonInput(body));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: formatZodIssues(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const project = await getPrisma().project.create({ data: { ...parsed.data, authorId: session.user.id } });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ error: "A project with this slug already exists." }, { status: 409 });
    }
    throw error;
  }
}
