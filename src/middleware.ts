import { NextRequest, NextResponse } from "next/server";

// The lead board carries names, phone numbers, and property addresses for thousands of
// people. It lives on the public marketing domain, so it gets its own gate — without
// this, /leads is world-readable to anyone who guesses the path.
//
// Basic auth over HTTPS, checked on every request. Set LEADS_USER / LEADS_PASSWORD in
// the Vercel project; if LEADS_PASSWORD is unset the routes are refused outright rather
// than served open, so a missing env var can never fail open.
const PROTECTED = ["/leads", "/api/rla"];

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // On the dedicated subdomain the board IS the site, so / lands on it directly
  // instead of the marketing home page.
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("leads.") && (pathname === "/" || pathname === "")) {
    const url = req.nextUrl.clone();
    url.pathname = "/leads";
    return NextResponse.rewrite(url);
  }
  if (!PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const user = process.env.LEADS_USER ?? "eula";
  const pass = process.env.LEADS_PASSWORD;
  if (!pass) {
    return new NextResponse("Lead board is not configured (LEADS_PASSWORD unset).", {
      status: 503,
    });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (timingSafeEqual(u, user) && timingSafeEqual(p, pass)) {
        return NextResponse.next();
      }
    } catch {
      // fall through to challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Eula Lead Board", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/", "/leads/:path*", "/api/rla/:path*"],
};
