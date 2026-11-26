"use client";

import { useState, useSyncExternalStore } from "react";

type Room = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  does: string;
  fact: string;
};

// Each room is a system Eula Labs actually runs today. Facts are real and conservative.
const ROOMS: Room[] = [
  {
    id: "command",
    name: "Ops Command",
    x: 400, y: 200, w: 200, h: 140,
    color: "#B8976A",
    does: "Coordinates every other room: scheduled jobs, health checks, and alerts when something needs a human.",
    fact: "Scheduled jobs run around the clock and post status to the team chat.",
  },
  {
    id: "frontdesk",
    name: "Front Desk",
    x: 80, y: 60, w: 210, h: 120,
    color: "#4ade80",
    does: "Answers new leads by text and email in under a minute and books them onto the calendar.",
    fact: "Live in a client's lead follow-up and new-buyer onboarding.",
  },
  {
    id: "content",
    name: "Content Engine",
    x: 400, y: 30, w: 200, h: 110,
    color: "#60a5fa",
    does: "Turns raw clips and trending links into reels, reactions and carousels, then schedules them.",
    fact: "Multi-client workspaces, covered by 121 automated tests.",
  },
  {
    id: "ads",
    name: "Ad Engine",
    x: 710, y: 60, w: 210, h: 120,
    color: "#f59e0b",
    does: "Researches, writes, compliance-checks and renders ad batches, then uploads them paused for approval.",
    fact: "Nothing goes live without a human pressing go.",
  },
  {
    id: "film",
    name: "Film Studio",
    x: 710, y: 380, w: 210, h: 120,
    color: "#f472b6",
    does: "AI video production: spokesperson videos, narrated promos and short-form series.",
    fact: "Delivers finished 9:16 and 16:9 cuts with captions.",
  },
  {
    id: "clientops",
    name: "Client Ops",
    x: 80, y: 380, w: 210, h: 120,
    color: "#a78bfa",
    does: "Back-office automation: document checks, report pulls and client status tracking.",
    fact: "Built for a credit restoration firm; every document is checked by a vision model, not by filename.",
  },
  {
    id: "research",
    name: "Research Lab",
    x: 400, y: 410, w: 200, h: 110,
    color: "#2dd4bf",
    does: "Tests ideas before money goes behind them, and logs every result, including the failures.",
    fact: "22 market hypotheses tested and recorded so far.",
  },
];

const cx = (r: Room) => r.x + r.w / 2;
const cy = (r: Room) => r.y + r.h / 2;
const HUB = ROOMS[0];

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const allowsMotion = () => !window.matchMedia(REDUCED).matches;

export default function Station() {
  const [active, setActive] = useState<Room>(HUB);
  const motion = useSyncExternalStore(subscribeMotion, allowsMotion, () => false);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="rounded-2xl bg-[#07100b] border border-[#1f3b2a] p-3 sm:p-4 shadow-[0_0_60px_-20px_rgba(74,222,128,0.35)]">
        <div className="flex items-center justify-between px-2 pb-3 font-mono text-[11px] tracking-widest text-[#4ade80]/80 uppercase">
          <span>Eula Labs · Station Map</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" /> {ROOMS.length} rooms online
          </span>
        </div>
        <svg viewBox="0 0 1000 540" className="w-full h-auto" role="group" aria-label="Map of Eula Labs systems. Select a room to see what it does.">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#123020" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="540" fill="url(#grid)" />

          {ROOMS.slice(1).map((r) => (
            <g key={`c-${r.id}`}>
              <path
                id={`path-${r.id}`}
                d={`M${cx(HUB)},${cy(HUB)} L${cx(r)},${cy(r)}`}
                stroke="#1f5135"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path d={`M${cx(HUB)},${cy(HUB)} L${cx(r)},${cy(r)}`} stroke="#0c2416" strokeWidth="4" strokeDasharray="2 8" />
              {motion &&
                [0, 1].map((k) => (
                  <circle key={k} r="4" fill={r.color}>
                    <animateMotion
                      dur={`${3 + (r.x % 3)}s`}
                      begin={`${k * 1.6}s`}
                      repeatCount="indefinite"
                      keyPoints={k ? "1;0" : "0;1"}
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#path-${r.id}`} />
                    </animateMotion>
                  </circle>
                ))}
            </g>
          ))}

          {ROOMS.map((r) => {
            const on = active.id === r.id;
            return (
              <g
                key={r.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={r.name}
                onClick={() => setActive(r)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(r);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>rect:nth-child(2)]:stroke-white"
              >
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="10" fill="#0b1a12" />
                <rect
                  x={r.x} y={r.y} width={r.w} height={r.h} rx="10"
                  fill={on ? `${r.color}22` : "transparent"}
                  stroke={r.color}
                  strokeWidth={on ? 3 : 1.5}
                />
                {[0, 1, 2, 3].map((i) => (
                  <rect
                    key={i}
                    x={r.x + 16 + i * ((r.w - 32) / 4)}
                    y={r.y + r.h - 34}
                    width={(r.w - 32) / 4 - 8}
                    height="14"
                    rx="2"
                    fill={r.color}
                    opacity={on ? 0.55 : 0.25}
                  >
                    {motion && <animate attributeName="opacity" values="0.15;0.6;0.15" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />}
                  </rect>
                ))}
                <text x={r.x + 16} y={r.y + 30} fill={r.color} fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="700" letterSpacing="1">
                  {r.name.toUpperCase()}
                </text>
                <text x={r.x + 16} y={r.y + 50} fill="#6b8f78" fontFamily="ui-monospace, monospace" fontSize="11">
                  {on ? "▶ selected" : "select room"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <aside
        aria-live="polite"
        className="rounded-2xl bg-[#07100b] border border-[#1f3b2a] p-6 font-mono text-sm text-[#c9e8d3] flex flex-col"
      >
        <div className="text-[11px] tracking-widest uppercase text-[#4ade80]/70 mb-2">Room</div>
        <h3 className="text-xl font-bold mb-4" style={{ color: active.color }}>
          {active.name}
        </h3>
        <div className="text-[11px] tracking-widest uppercase text-[#4ade80]/70 mb-1">What it does</div>
        <p className="leading-relaxed mb-5">{active.does}</p>
        <div className="text-[11px] tracking-widest uppercase text-[#4ade80]/70 mb-1">On record</div>
        <p className="leading-relaxed text-[#e7f5ec]">{active.fact}</p>
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className="text-[11px] px-2 py-1 rounded border transition-colors"
              style={{
                borderColor: r.color,
                color: active.id === r.id ? "#07100b" : r.color,
                backgroundColor: active.id === r.id ? r.color : "transparent",
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
