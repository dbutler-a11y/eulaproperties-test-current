import { isAuthed } from "@/lib/adminAuth";
import { stripe } from "@/lib/stripe";
import { logout, resendInvoice, voidInvoice } from "./actions";
import { ChargeForm, LoginForm } from "./forms";

export const dynamic = "force-dynamic";

const usd = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "usd" });

const STATUS: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  open: "bg-amber-50 text-amber-700",
  draft: "bg-gray-100 text-gray-600",
  void: "bg-gray-100 text-gray-400 line-through",
  uncollectible: "bg-red-50 text-red-700",
};

async function recentInvoices() {
  try {
    const res = await stripe().invoices.list({ limit: 25 });
    const since = Date.now() / 1000 - 30 * 86400;
    const owed = res.data.filter((i) => i.status === "open").reduce((s, i) => s + i.amount_remaining, 0);
    const paid30 = res.data
      .filter((i) => i.status === "paid" && (i.status_transitions.paid_at ?? 0) > since)
      .reduce((s, i) => s + i.amount_paid, 0);
    return { data: res.data, owed, paid30, error: null as string | null };
  } catch (e) {
    return { data: [], owed: 0, paid30: 0, error: e instanceof Error ? e.message : "Could not load invoices" };
  }
}

export default async function AdminPage() {
  if (!(await isAuthed())) {
    return (
      <main className="max-w-sm mx-auto px-6 py-24">
        <h1 className="text-2xl font-light mb-6">Invoice Desk</h1>
        <LoginForm />
      </main>
    );
  }

  const { data: invoices, owed, paid30, error } = await recentInvoices();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light">
          Invoice Desk <span className="text-sm text-gray-400 ml-2">Eula Labs · live</span>
        </h1>
        <form action={logout}>
          <button className="text-sm text-gray-500 hover:text-gray-900">Sign out</button>
        </form>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="text-xs uppercase tracking-widest text-gray-400">Outstanding</div>
          <div className="text-3xl font-light mt-1">{usd(owed)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="text-xs uppercase tracking-widest text-gray-400">Paid by invoice, last 30 days</div>
          <div className="text-3xl font-light mt-1">{usd(paid30)}</div>
        </div>
      </div>

      <ChargeForm />

      <section className="mt-10">
        <h2 className="text-lg font-medium mb-3">Recent invoices</h2>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
          {invoices.length === 0 && !error && <p className="p-5 text-sm text-gray-500">No invoices yet.</p>}
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex-1 min-w-[200px]">
                <div className="font-medium">{inv.customer_name || inv.customer_email || "—"}</div>
                <div className="text-gray-500">
                  {inv.number ?? "draft"} · {inv.lines.data[0]?.description ?? ""}
                </div>
              </div>
              <div className="font-medium w-28 text-right">{usd(inv.total)}</div>
              <span className={`text-xs px-2 py-1 rounded-full ${STATUS[inv.status ?? "draft"] ?? STATUS.draft}`}>{inv.status}</span>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                {inv.hosted_invoice_url && (
                  <a className="text-[#8a6d43] hover:underline" href={inv.hosted_invoice_url} target="_blank" rel="noreferrer">
                    View
                  </a>
                )}
                {inv.status === "open" && (
                  <>
                    <form action={resendInvoice}>
                      <input type="hidden" name="id" value={inv.id} />
                      <button className="text-[#8a6d43] hover:underline">Resend</button>
                    </form>
                    <form action={voidInvoice}>
                      <input type="hidden" name="id" value={inv.id} />
                      <button className="text-gray-400 hover:text-red-600">Void</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Refunds: open the payment in the Stripe dashboard and click Refund.</p>
      </section>
    </main>
  );
}
