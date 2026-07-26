import { AuthError } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowRight, Building2, HardHat, ShieldCheck } from "lucide-react";
import { signIn } from "@/auth";
import { DOCKSIDE_LOGO_SRC } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Admin Login" };

async function login(formData: FormData) {
  "use server";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    redirect("/admin");
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=CredentialsSignin");
    throw error;
  }
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="admin-login-page">
      <section className="admin-login-hero" aria-label="Dockside operations access">
        <div className="admin-login-hero__brand">
          <div className="admin-login-hero__mark">
            <Image src={DOCKSIDE_LOGO_SRC} alt="Dockside logo" fill sizes="96px" className="object-contain" priority />
          </div>
          <div>
            <p>Dockside Constructions</p>
            <span>Operations Control</span>
          </div>
        </div>
        <div className="admin-login-hero__copy">
          <h1>Secure CMS command center.</h1>
          <p>Manage project content, client proof, media and page updates from one focused Dockside workspace.</p>
        </div>
        <div className="admin-login-proof">
          <article>
            <ShieldCheck aria-hidden="true" />
            <span>Protected Access</span>
          </article>
          <article>
            <Building2 aria-hidden="true" />
            <span>Live Site Content</span>
          </article>
          <article>
            <HardHat aria-hidden="true" />
            <span>Project Operations</span>
          </article>
        </div>
      </section>

      <Card className="admin-login-card">
        <CardHeader>
          <div className="admin-login-card__mark">
            <Image src={DOCKSIDE_LOGO_SRC} alt="Dockside logo" fill sizes="72px" className="object-contain" priority />
          </div>
          <div>
            <p className="admin-login-card__label">Authorized personnel</p>
            <CardTitle>CMS Login</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form action={login} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@docksideconstructions.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="admin-login-submit">
              Sign in
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
          <LoginError searchParams={searchParams} />
        </CardContent>
      </Card>
    </main>
  );
}

async function LoginError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return <p className="admin-login-error">Invalid credentials or database not configured.</p>;
}
