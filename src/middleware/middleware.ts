import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get JWT token from cookies or localStorage (cookies preferred)
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // ✅ Allow public routes (auth pages, static files, etc.)
  if (
    pathname.startsWith("/auth") || // login/register
    pathname.startsWith("/_next") || // nextjs internals
    pathname.startsWith("/api") || // api routes
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // 🚫 If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
