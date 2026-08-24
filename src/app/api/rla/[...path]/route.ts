import { NextRequest } from "next/server";

// Proxy to the lead engine on the VM. The API token stays server-side — the browser
// only ever talks to this route, so the board can poll without shipping a credential.
const BASE = process.env.RLA_API_URL ?? "http://127.0.0.1:8210";
const TOKEN = process.env.RLA_API_TOKEN ?? "";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const qs = req.nextUrl.search;
  const url = `${BASE}/api/${path.map(encodeURIComponent).join("/")}${qs}`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "lead engine unreachable", url: BASE },
      { status: 502 },
    );
  }

  // Audio streams through untouched so <audio> can play it directly.
  const type = upstream.headers.get("content-type") ?? "application/json";
  if (type.startsWith("audio/")) {
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "content-type": type, "cache-control": "private, max-age=3600" },
    });
  }
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
