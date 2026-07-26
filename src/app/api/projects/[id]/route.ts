import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  formatZodIssues,
  isUniqueConstraintError,
  prepareProjectJsonInput,
  projectPatchJsonSchema,
} from "@/lib/cms-validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canUseDatabase()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { id } = await params;
  const body = await request.json();
  const parsed = projectPatchJsonSchema.safeParse(prepareProjectJsonInput(body, false));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: formatZodIssues(parsed.error) },
      { status: 400 },
    );
  }

  const db = getPrisma();
  const existing = await db.project.findUnique({ where: { id }, select: { slug: true } });
  try {
    const project = await db.project.update({ where: { id }, data: parsed.data });
    revalidatePath("/");
    revalidatePath("/projects");
    if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
    revalidatePath(`/projects/${project.slug}`);
    return NextResponse.json(project);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ error: "A project with this slug already exists." }, { status: 409 });
    }
    throw error;
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canUseDatabase()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { id } = await params;
  const db = getPrisma();
  const existing = await db.project.findUnique({ where: { id }, select: { slug: true } });
  await db.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
  return NextResponse.json({ ok: true });
}
