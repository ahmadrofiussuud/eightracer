import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "eightracer_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. Enforce HTTP Security Headers on all responses
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // 2. Protect Admin Portal Routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    const adminSessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check if live Supabase validation is enabled
    const isLiveAuth = Boolean(
      supabaseUrl &&
      serviceRoleKey &&
      !supabaseUrl.includes("placeholder")
    );

    if (isLiveAuth && supabaseUrl && serviceRoleKey) {
      if (!adminSessionToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        loginUrl.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(loginUrl);
      }

      try {
        // Direct REST query to Supabase from edge runtime to verify active session
        // (Enforces Single Device Login: previous device will have is_active = false)
        const sessionCheckRes = await fetch(
          `${supabaseUrl}/rest/v1/admin_sessions?session_token=${encodeURIComponent(adminSessionToken)}&select=id,user_id,is_active,expires_at`,
          {
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
            },
            cache: "no-store",
          }
        );

        if (!sessionCheckRes.ok) {
          throw new Error("Session check query failed");
        }

        const sessions = await sessionCheckRes.json();
        const activeSession = sessions?.[0];

        // If no record found or session marked inactive (superseded by Device B)
        if (!activeSession || !activeSession.is_active) {
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("error", "session_superseded");
          const redirectRes = NextResponse.redirect(loginUrl);
          redirectRes.cookies.delete(ADMIN_SESSION_COOKIE);
          return redirectRes;
        }

        // Check if 72-hour session expired
        if (new Date(activeSession.expires_at) < new Date()) {
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("error", "session_expired");
          const redirectRes = NextResponse.redirect(loginUrl);
          redirectRes.cookies.delete(ADMIN_SESSION_COOKIE);
          return redirectRes;
        }
      } catch (err) {
        console.error("[Middleware Error] Session validation error:", err);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
