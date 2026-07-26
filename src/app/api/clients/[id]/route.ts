import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  clientPatchJsonSchema,
  formatZodIssues,
  isUniqueConstraintError,
  prepareClientJsonInput,
} from "@/lib/cms-validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canUseDatabase()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { id } = await params;
  const body = await request.json();
  const parsed = clientPatchJsonSchema.safeParse(prepareClientJsonInput(body, false));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: formatZodIssues(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const client = await getPrisma().client.update({ where: { id }, data: parsed.data });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/contact");
    return NextResponse.json(client);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ error: "A client with this slug already exists." }, { status: 409 });
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
  await getPrisma().client.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/contact");
  return NextResponse.json({ ok: true });
}
