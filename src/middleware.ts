import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("dss_vault_session");
  const isAuthenticated = sessionCookie?.value === "dss-authenticated-vault-session-2026";

  // Protect /dss-admin/dashboard and any sub-routes
  if (pathname.startsWith("/dss-admin/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/dss-admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // If already authenticated and visiting the login page /dss-admin, redirect to dashboard
  if (pathname === "/dss-admin" && isAuthenticated) {
    const dashboardUrl = new URL("/dss-admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dss-admin/:path*", "/dss-admin"],
};
