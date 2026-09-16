import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie names that indicate an active authenticated session
const ADMIN_SESSION_COOKIE = "eightracer_admin_session";
const SUPABASE_COOKIE_NAMES = [
  "sb-access-token",
  "sb-refresh-token",
  "supabase-auth-token",
];

function getLoginRedirect(request: NextRequest, reason?: string): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  if (reason) loginUrl.searchParams.set("reason", reason);
  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin Routes: /admin/* ────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Admin must have the dedicated httpOnly admin session cookie
    const hasAdminSession = request.cookies.has(ADMIN_SESSION_COOKIE);

    if (!hasAdminSession) {
      return getLoginRedirect(request, "session_expired");
    }
  }

  // ── Student Routes: /student/* ────────────────────────────────────────────
  if (pathname.startsWith("/student")) {
    // Students authenticate via Supabase Auth (OTP flow)
    const hasSupabaseSession = SUPABASE_COOKIE_NAMES.some((name) =>
      request.cookies.has(name)
    );

    // Also accept Supabase's dynamic cookie format: sb-<project-ref>-auth-token
    const hasDynamicSupabaseCookie = request.cookies
      .getAll()
      .some(
        (cookie) =>
          cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")
      );

    if (!hasSupabaseSession && !hasDynamicSupabaseCookie) {
      return getLoginRedirect(request, "unauthenticated");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
};
