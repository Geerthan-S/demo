import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { seedClients } from "@/lib/content";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  clientJsonSchema,
  formatZodIssues,
  isUniqueConstraintError,
  prepareClientJsonInput,
} from "@/lib/cms-validation";

export async function GET() {
  if (!canUseDatabase()) return NextResponse.json(seedClients);
  return NextResponse.json(await getPrisma().client.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canUseDatabase()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await request.json();
  const parsed = clientJsonSchema.safeParse(prepareClientJsonInput(body));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: formatZodIssues(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const client = await getPrisma().client.create({ data: parsed.data });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/contact");
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ error: "A client with this slug already exists." }, { status: 409 });
    }
    throw error;
  }
}
