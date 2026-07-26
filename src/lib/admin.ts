import { redirect } from "next/navigation";
import { auth } from "@/auth";

const allowedRoles = new Set(["SUPER_ADMIN", "ADMIN", "EDITOR"]);

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !allowedRoles.has(session.user.role)) {
    redirect("/login");
  }

  return session;
}

export async function requireManager() {
  const session = await requireAdmin();
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/admin");
  }

  return session;
}

