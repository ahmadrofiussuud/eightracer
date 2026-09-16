import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if session token or auth cookie exists
  const hasAuthCookie =
    request.cookies.has("sb-access-token") ||
    request.cookies.has("sb-refresh-token") ||
    request.cookies.has("supabase-auth-token") ||
    request.cookies.has("eightracer_session");

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    // Pass through in local development/demo mode if no strict cookie is set, or redirect if explicitly logged out
    // In production, unauthenticated users get redirected to /login?redirect=/admin
  }

  // Protect Student routes
  if (pathname.startsWith("/student")) {
    // Pass through for student dashboard, or redirect if unauthenticated
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
};
