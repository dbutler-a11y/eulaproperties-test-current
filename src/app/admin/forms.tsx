"use client";

import { useActionState, useState } from "react";
import { createCharge, login, type DeskResult } from "./actions";

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8976A]/40";
const label = "block text-xs font-medium text-gray-600 mb-1";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="space-y-3">
      <label className={label} htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-lg bg-[#B8976A] text-white py-2.5 text-sm font-medium disabled:opacity-60">
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}

export function ChargeForm() {
  const [mode, setMode] = useState<"invoice" | "link">("invoice");
  const [state, action, pending] = useActionState<DeskResult | null, FormData>(createCharge, null);
  const [copied, setCopied] = useState(false);

  return (
    <section className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex gap-2 mb-5" role="tablist">
        {(["invoice", "link"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${mode === m ? "bg-[#B8976A] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {m === "invoice" ? "Email an invoice" : "Make a payment link"}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-5">
        {mode === "invoice"
          ? "Stripe emails the client an invoice they can pay by card or bank, with automatic reminders."
          : "Get a link to text or DM. The client enters their own details and gets a receipt."}
      </p>

      <form action={action} className="grid sm:grid-cols-2 gap-4">
        <input type="hidden" name="mode" value={mode} />
        <div>
          <label className={label} htmlFor="name">Client name</label>
          <input id="name" name="name" className={input} placeholder="Jane Smith" />
        </div>
        <div>
          <label className={label} htmlFor="email">Client email{mode === "invoice" ? " *" : ""}</label>
          <input id="email" name="email" type="email" required={mode === "invoice"} className={input} placeholder="jane@company.com" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="description">What it&apos;s for *</label>
          <input id="description" name="description" required className={input} placeholder="AI Mentorship Package" />
        </div>
        <div>
          <label className={label} htmlFor="amount">Amount (USD) *</label>
          <input id="amount" name="amount" inputMode="decimal" required className={input} placeholder="3500" />
        </div>
        {mode === "invoice" ? (
          <div>
            <label className={label} htmlFor="dueDays">Due in (days)</label>
            <input id="dueDays" name="dueDays" type="number" min={1} max={60} defaultValue={7} className={input} />
          </div>
        ) : (
          <div>
            <label className={label} htmlFor="phone">Client phone</label>
            <input id="phone" name="phone" className={input} placeholder="optional" />
          </div>
        )}
        {mode === "invoice" && (
          <div className="sm:col-span-2">
            <label className={label} htmlFor="memo">Note on the invoice</label>
            <input id="memo" name="memo" className={input} placeholder="optional, e.g. 8 weekly sessions starting Dec 1" />
          </div>
        )}
        <div className="sm:col-span-2">
          <button disabled={pending} className="rounded-lg bg-[#B8976A] text-white px-6 py-3 text-sm font-medium disabled:opacity-60">
            {pending ? "Working…" : mode === "invoice" ? "Send invoice" : "Create link"}
          </button>
        </div>
      </form>

      {state && !state.ok && <p className="mt-4 text-sm text-red-600">{state.error}</p>}
      {state?.ok && (
        <div className="mt-5 rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-sm">
          <p className="font-medium text-emerald-800 mb-2">
            {state.kind === "invoice" ? `Invoice ${state.number ?? ""} emailed.` : "Payment link ready."}{" "}
            {state.kind === "invoice" && "You can also text this link:"}
          </p>
          <div className="flex gap-2 items-center">
            <input readOnly value={state.url} className={`${input} font-mono text-xs`} onFocus={(e) => e.currentTarget.select()} />
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(state.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="shrink-0 rounded-lg border border-emerald-300 px-3 py-2 text-emerald-800"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
