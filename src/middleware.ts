import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "cyberlex_admin_token";
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "cyberlex-production-secret-key-salt-2026-min32chars"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page without token
  if (pathname === "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        // Already authenticated, redirect to /admin dashboard
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch {
        // Token invalid, proceed to login page
      }
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-login", "1");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // For all other /admin routes, verify token
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload || payload.role === "READER") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
