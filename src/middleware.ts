import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * /practice is deliberately public: a visitor should be able to see which
 * situations exist before deciding to make an account. The individual
 * situation page redirects to login itself, because playing one writes
 * progress against a user.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/assistant"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/assistant/:path*"],
};
