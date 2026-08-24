// Same palette as call-tracker.html so every ops surface reads as one system.
export const T = {
  bg: "#0d1117",
  panel: "#161b22",
  panel2: "#1c2128",
  border: "#30363d",
  text: "#e6edf3",
  muted: "#8b949e",
  accent: "#2f81f7",
  green: "#3fb950",
  yellow: "#d29922",
  red: "#f85149",
  purple: "#a371f7",
} as const;

export function tierColor(tier: string | null): string {
  if (tier === "hot") return T.red;
  if (tier === "warm") return T.yellow;
  return T.muted;
}

export function scoreColor(n: number | null): string {
  if (n == null) return T.muted;
  if (n >= 70) return T.red;
  if (n >= 45) return T.yellow;
  return T.muted;
}

export function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
