"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Lead, Stats, Tier } from "./types";
import { T, scoreColor, tierColor, timeAgo } from "./theme";

const REFRESH_MS = 20_000;

type Filter = "all" | Tier | "audio";

export default function LeadBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const tierParam = filter === "hot" || filter === "warm" || filter === "cold"
        ? `&tier=${filter}` : "";
      const q = query.trim() ? `&q=${encodeURIComponent(query.trim())}` : "";
      const [lr, sr] = await Promise.all([
        fetch(`/api/rla/leads?limit=250${tierParam}${q}`, { cache: "no-store" }),
        fetch(`/api/rla/stats`, { cache: "no-store" }),
      ]);
      if (!lr.ok) throw new Error(`leads: HTTP ${lr.status}`);
      const ld = await lr.json();
      setLeads(ld.leads ?? []);
      if (sr.ok) setStats(await sr.json());
      setError(null);
      setLastSync(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [filter, query]);

  useEffect(() => {
    load();
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(load, REFRESH_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [load]);

  const shown = useMemo(
    () => (filter === "audio" ? leads.filter((l) => l.has_audio) : leads),
    [leads, filter],
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text,
                  font: "15px/1.45 ui-sans-serif, -apple-system, system-ui, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: T.bg,
                       borderBottom: `1px solid ${T.border}`, padding: "16px 20px",
                       display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Lead Alerts</h1>
        <span style={{ color: T.muted, fontSize: 13 }}>
          {lastSync ? `synced ${lastSync.toLocaleTimeString()}` : "connecting…"}
        </span>
        <div style={{ flex: 1 }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="name, phone, address, city…"
          style={{ background: T.panel, border: `1px solid ${T.border}`, color: T.text,
                   borderRadius: 6, padding: "7px 11px", fontSize: 14, minWidth: 260 }}
        />
      </header>

      {error && (
        <div style={{ margin: "16px 20px", padding: "10px 14px", borderRadius: 6,
                      background: "#2d1618", border: `1px solid ${T.red}`, color: T.red,
                      fontSize: 14 }}>
          Lead engine unreachable — {error}
        </div>
      )}

      <section style={{ display: "grid", gap: 12, padding: "18px 20px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        <Tile label="Hot" value={stats?.hot} color={T.red} />
        <Tile label="Warm" value={stats?.warm} color={T.yellow} />
        <Tile label="Leads" value={stats?.leads} />
        <Tile label="Calls" value={stats?.calls} />
        <Tile label="Recordings" value={stats?.with_audio} color={T.purple} />
        <Tile label="Transcribed" value={stats?.transcribed} color={T.accent} />
        <Tile label="Alerts 24h" value={stats?.alerts_24h} color={T.green} />
      </section>

      <nav style={{ display: "flex", gap: 8, padding: "0 20px 14px", flexWrap: "wrap" }}>
        {(["all", "hot", "warm", "cold", "audio"] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter === f ? T.accent : T.panel,
                     border: `1px solid ${filter === f ? T.accent : T.border}`,
                     color: filter === f ? "#fff" : T.text, borderRadius: 6,
                     padding: "6px 14px", fontSize: 14, cursor: "pointer",
                     textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </nav>

      <main style={{ padding: "0 20px 40px" }}>
        {loading ? (
          <p style={{ color: T.muted }}>Loading…</p>
        ) : shown.length === 0 ? (
          <EmptyState filter={filter} stats={stats} />
        ) : (
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
            {shown.map((l, i) => (
              <LeadRow key={l.id} lead={l} striped={i % 2 === 1}
                       playing={playing} setPlaying={setPlaying} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Tile({ label, value, color = T.text }: { label: string; value?: number; color?: string }) {
  return (
    <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 8,
                  padding: "14px 16px" }}>
      <div style={{ color: T.muted, fontSize: 12, textTransform: "uppercase",
                    letterSpacing: ".04em" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, color, marginTop: 4,
                    fontVariantNumeric: "tabular-nums" }}>
        {value ?? "—"}
      </div>
    </div>
  );
}

function LeadRow({ lead, striped, playing, setPlaying }: {
  lead: Lead; striped: boolean; playing: string | null;
  setPlaying: (v: string | null) => void;
}) {
  const name = [lead.first_name, lead.last_name].filter(Boolean).join(" ") || "Unknown";
  const addr = [lead.address, lead.city, lead.state, lead.postal_code].filter(Boolean).join(", ");
  const isOpen = playing === lead.id;

  return (
    <div style={{ background: striped ? T.panel2 : T.panel,
                  borderBottom: `1px solid ${T.border}`, padding: "12px 14px" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 54, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                        color: scoreColor(lead.motivation) }}>
            {lead.motivation ?? "—"}
          </div>
          <div style={{ fontSize: 10, color: tierColor(lead.tier), textTransform: "uppercase",
                        letterSpacing: ".05em" }}>
            {lead.tier ?? "unscored"}
          </div>
        </div>

        <div style={{ flex: "1 1 240px", minWidth: 0 }}>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ color: T.muted, fontSize: 13, overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {addr || "no address"}
          </div>
        </div>

        <a href={`tel:${lead.phone ?? ""}`}
           style={{ color: T.accent, fontFamily: "ui-monospace, monospace", fontSize: 14,
                    textDecoration: "none" }}>
          {lead.phone || "—"}
        </a>

        <div style={{ color: T.muted, fontSize: 13, minWidth: 90 }}>
          {lead.dialed_count ?? 0} dial{(lead.dialed_count ?? 0) === 1 ? "" : "s"}
        </div>
        <div style={{ color: T.muted, fontSize: 13, minWidth: 80 }}>
          {timeAgo(lead.date_last_touched)}
        </div>

        {lead.has_audio ? (
          <button onClick={() => setPlaying(isOpen ? null : lead.id)}
            style={{ background: isOpen ? T.purple : T.panel2, color: isOpen ? "#fff" : T.purple,
                     border: `1px solid ${T.purple}`, borderRadius: 6, padding: "5px 12px",
                     fontSize: 13, cursor: "pointer" }}>
            {isOpen ? "Hide" : "▶ Recording"}
          </button>
        ) : (
          <span style={{ color: T.border, fontSize: 13 }}>no audio</span>
        )}

        <a href={`/leads/${encodeURIComponent(lead.id)}`}
           style={{ color: T.muted, fontSize: 13 }}>details →</a>
      </div>

      {lead.summary && (
        <div style={{ marginTop: 8, marginLeft: 68, color: T.text, fontSize: 13.5 }}>
          {lead.summary}
          {lead.scored_by && (
            <span style={{ color: T.muted, fontSize: 12 }}> · via {lead.scored_by}</span>
          )}
        </div>
      )}

      {isOpen && lead.last_call_id && (
        <audio controls autoPlay src={`/api/rla/audio/${lead.last_call_id}`}
               style={{ width: "100%", marginTop: 10 }} />
      )}
    </div>
  );
}

function EmptyState({ filter, stats }: { filter: Filter; stats: Stats | null }) {
  const noScores = (stats?.scored ?? 0) === 0;
  return (
    <div style={{ border: `1px dashed ${T.border}`, borderRadius: 8, padding: "28px 22px",
                  color: T.muted }}>
      <p style={{ margin: 0, color: T.text, fontWeight: 600 }}>
        No {filter === "all" ? "" : filter} leads to show.
      </p>
      {noScores && (
        <p style={{ marginTop: 10, lineHeight: 1.6 }}>
          {stats?.leads ?? 0} leads and {stats?.calls ?? 0} calls are ingested, but nothing is
          scored yet — scoring needs call transcripts, and transcripts need recordings.
          BatchDialer&apos;s API key has no recordings scope on this account, so the recording
          extractor is waiting on either that scope being enabled or the UI backend
          credentials.
        </p>
      )}
    </div>
  );
}
