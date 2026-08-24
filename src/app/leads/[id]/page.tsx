import Link from "next/link";
import { notFound } from "next/navigation";
import { T, scoreColor, tierColor } from "../theme";

export const dynamic = "force-dynamic";

// Server-side fetch: this page is what an alert SMS deep-links into, so it must render
// the full picture (recording, transcript, why it scored, what was already sent) in one
// screen on a phone.
async function getLead(id: string) {
  const base = process.env.RLA_API_URL ?? "http://127.0.0.1:8210";
  const token = process.env.RLA_API_TOKEN ?? "";
  try {
    const r = await fetch(`${base}/api/leads/${encodeURIComponent(id)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (r.status === 404) return null;
    if (!r.ok) return { unreachable: `HTTP ${r.status}` } as const;
    return await r.json();
  } catch {
    return { unreachable: "engine unreachable" } as const;
  }
}

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getLead(decodeURIComponent(id));
  if (data === null) notFound();

  const wrap = {
    minHeight: "100vh", background: T.bg, color: T.text, padding: "22px 20px 60px",
    font: "15px/1.5 ui-sans-serif, -apple-system, system-ui, sans-serif",
  } as const;

  if ("unreachable" in data) {
    return (
      <div style={wrap}>
        <Link href="/leads" style={{ color: T.accent }}>← back</Link>
        <p style={{ color: T.red, marginTop: 20 }}>Lead engine unreachable — {data.unreachable}</p>
      </div>
    );
  }

  const lead = data.lead;
  const calls = data.calls ?? [];
  const scores = data.scores ?? [];
  const alerts = data.alerts ?? [];
  const top = scores[0];
  const name = [lead.first_name, lead.last_name].filter(Boolean).join(" ") || "Unknown";
  const addr = [lead.address, lead.city, lead.state, lead.postal_code].filter(Boolean).join(", ");
  const phones: { number: string; type: string; dnc: number }[] =
    lead.phones ? JSON.parse(lead.phones) : [];

  return (
    <div style={wrap}>
      <Link href="/leads" style={{ color: T.accent, textDecoration: "none" }}>← all leads</Link>

      <header style={{ marginTop: 18, display: "flex", gap: 18, alignItems: "baseline",
                       flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 26 }}>{name}</h1>
        {top && (
          <span style={{ fontSize: 22, fontWeight: 700, color: scoreColor(top.motivation) }}>
            {top.motivation}
            <span style={{ fontSize: 13, color: tierColor(top.tier), marginLeft: 8,
                           textTransform: "uppercase" }}>{top.tier}</span>
          </span>
        )}
      </header>
      <p style={{ color: T.muted, marginTop: 6 }}>{addr || "no address on file"}</p>

      <Panel title="Contact">
        {phones.length === 0 && <Row k="Phone" v={lead.phone || "—"} />}
        {phones.map((p, i) => (
          <Row key={i} k={p.type || "Phone"}
               v={`${p.number}${p.dnc ? "  ⛔ DNC" : ""}`}
               href={p.dnc ? undefined : `tel:${p.number}`} />
        ))}
        <Row k="List" v={lead.list_name || "—"} />
        <Row k="Dials" v={String(lead.dialed_count ?? 0)} />
        <Row k="Last worked" v={lead.date_last_touched || "—"} />
        <Row k="Source" v={lead.source || "—"} />
      </Panel>

      {top && (
        <Panel title="Why it scored">
          <p style={{ margin: "0 0 10px" }}>{top.summary}</p>
          <Row k="Scored by" v={top.scored_by} />
          <Signals json={top.signals} label="Signals" />
          <Signals json={top.keywords} label="Keyword hits" nested />
        </Panel>
      )}

      <Panel title={`Calls (${calls.length})`}>
        {calls.length === 0 && <Muted>No calls recorded yet.</Muted>}
        {calls.map((c: Record<string, unknown>) => (
          <div key={String(c.call_id)} style={{ borderTop: `1px solid ${T.border}`,
                                                padding: "12px 0" }}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <code style={{ color: T.muted }}>{String(c.call_id)}</code>
              <span style={{ color: T.muted }}>{String(c.started_at ?? "")}</span>
              {c.disposition ? <span style={{ color: T.yellow }}>{String(c.disposition)}</span> : null}
            </div>
            {c.recording_path ? (
              <audio controls src={`/api/rla/audio/${String(c.call_id)}`}
                     style={{ width: "100%", marginTop: 10 }} />
            ) : (
              <Muted>
                No audio — {String(c.fetch_error ?? "not fetched yet")}
              </Muted>
            )}
            {c.transcript ? (
              <details style={{ marginTop: 10 }}>
                <summary style={{ cursor: "pointer", color: T.accent }}>Transcript</summary>
                <p style={{ whiteSpace: "pre-wrap", marginTop: 8, color: T.text }}>
                  {String(c.transcript)}
                </p>
              </details>
            ) : null}
          </div>
        ))}
      </Panel>

      <Panel title={`Alerts sent (${alerts.length})`}>
        {alerts.length === 0 && <Muted>No alerts fired for this lead.</Muted>}
        {alerts.map((a: Record<string, unknown>) => (
          <div key={String(a.id)} style={{ borderTop: `1px solid ${T.border}`, padding: "10px 0" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ color: a.ok ? T.green : T.red }}>{a.ok ? "sent" : "not sent"}</span>
              <span style={{ color: T.muted }}>{String(a.to_number ?? "")}</span>
              <span style={{ color: T.muted }}>{String(a.created_at ?? "")}</span>
              <span style={{ color: T.muted }}>{String(a.reason ?? "")}</span>
            </div>
            {a.error ? <div style={{ color: T.yellow, fontSize: 13 }}>{String(a.error)}</div> : null}
          </div>
        ))}
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 8,
                      padding: "16px 18px", marginTop: 18 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 14, color: T.muted,
                   textTransform: "uppercase", letterSpacing: ".05em" }}>{title}</h2>
      {children}
    </section>
  );
}

function Row({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "4px 0" }}>
      <span style={{ color: T.muted, minWidth: 110 }}>{k}</span>
      {href ? <a href={href} style={{ color: T.accent }}>{v}</a> : <span>{v}</span>}
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <p style={{ color: T.muted, margin: "6px 0" }}>{children}</p>;
}

function Signals({ json, label, nested }: { json?: string; label: string; nested?: boolean }) {
  if (!json) return null;
  let parsed: unknown;
  try { parsed = JSON.parse(json); } catch { return null; }
  const items = nested && parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? Object.entries(parsed as Record<string, string[]>)
        .filter(([, v]) => v.length).map(([k, v]) => `${k}: ${v.join(", ")}`)
    : Array.isArray(parsed) ? (parsed as string[]) : [];
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", gap: 12, padding: "4px 0", flexWrap: "wrap" }}>
      <span style={{ color: T.muted, minWidth: 110 }}>{label}</span>
      <span>{items.join(" · ")}</span>
    </div>
  );
}
