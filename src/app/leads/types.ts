export type Tier = "hot" | "warm" | "cold";

export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  status: string | null;
  dialed_count: number | null;
  list_name: string | null;
  date_last_touched: string | null;
  last_call_id: string | null;
  source: string | null;
  motivation: number | null;
  tier: Tier | null;
  summary: string | null;
  signals: string | null;
  scored_by: string | null;
  scored_at: string | null;
  has_audio: number;
  has_transcript: number;
  duration_sec: number | null;
  disposition: string | null;
}

export interface Stats {
  leads: number;
  calls: number;
  with_audio: number;
  transcribed: number;
  scored: number;
  hot: number;
  warm: number;
  alerts_sent: number;
  alerts_24h: number;
  last_runs: { job: string; finished_at: string; ok: number; detail: string }[];
}
