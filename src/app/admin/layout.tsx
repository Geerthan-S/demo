import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Briefcase, Download, FileCog, FileText, LayoutDashboard, LogOut, Settings, ShieldCheck, Truck, Users, Wrench, type LucideIcon } from "lucide-react";
import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/admin";
import { DOCKSIDE_LOGO_SRC } from "@/components/ui/logo";

const adminNav: Array<[string, string, LucideIcon]> = [
  ["Projects", "/admin/projects", Wrench],
  ["Equipment Fleet", "/admin/equipment", Truck],
  ["Job Openings", "/admin/job-openings", Briefcase],
  ["Applications", "/admin/job-applications", FileText],
  ["Downloads", "/admin/downloads", Download],
  ["Clients", "/admin/clients", Users],
  ["Site Settings", "/admin/site-settings", Settings],
];

async function logout() {
  "use server";
  await signOut({ redirect: false });
  redirect("/");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <main className="admin-shell">
      <div className="admin-shell__grid">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-brand">
            <span className="admin-brand__mark" aria-hidden="true">
              <Image src={DOCKSIDE_LOGO_SRC} alt="" fill sizes="54px" className="object-contain" priority />
            </span>
            <div>
              <p className="font-semibold uppercase tracking-[0.12em]">Dockside Ops</p>
              <p className="text-xs text-muted-foreground">{session.user.role} control surface</p>
            </div>
          </Link>
          <p className="admin-sidebar__label">Control modules</p>
          <nav className="admin-nav" aria-label="Admin navigation">
            {adminNav.map(([label, href, Icon]) => (
              <Link key={href as string} href={href as string} className="admin-nav-link">
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar__status" aria-label="Admin workspace status">
            <span />
            <div>
              <strong>Live CMS</strong>
              <p>Public-site control layer</p>
            </div>
          </div>
          <form action={logout} className="admin-logout-form">
            <button className="admin-nav-link admin-nav-link--danger w-full" type="submit">
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </aside>
        <section className="admin-content">{children}</section>
      </div>
    </main>
  );
}
