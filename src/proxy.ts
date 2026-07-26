import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const allowedAdminRoles = new Set(["SUPER_ADMIN", "ADMIN", "EDITOR"]);

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  if (!token || !allowedAdminRoles.has(String(token.role ?? ""))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
