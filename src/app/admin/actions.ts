"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { endSession, isAuthed, passwordMatches, startSession } from "@/lib/adminAuth";

export type DeskResult =
  | { ok: true; kind: "invoice" | "link"; url: string; number?: string | null; emailed: boolean }
  | { ok: false; error: string };

const attempts = new Map<string, { n: number; until: number }>();

export async function login(_: unknown, form: FormData): Promise<{ error?: string }> {
  const key = "global"; // single-owner desk: one shared throttle
  const a = attempts.get(key);
  if (a && a.until > Date.now()) return { error: "Too many attempts. Try again in a few minutes." };
  if (!passwordMatches(String(form.get("password") ?? ""))) {
    const n = (a?.n ?? 0) + 1;
    attempts.set(key, { n, until: n >= 5 ? Date.now() + 5 * 60_000 : 0 });
    return { error: "Wrong password." };
  }
  attempts.delete(key);
  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin");
}

async function requireAuth() {
  if (!(await isAuthed())) throw new Error("Not signed in");
}

function parseAmount(raw: FormDataEntryValue | null): number | null {
  const n = Number(String(raw ?? "").replace(/[$,\s]/g, ""));
  if (!Number.isFinite(n) || n < 1 || n > 100_000) return null;
  return Math.round(n * 100);
}

async function findOrCreateCustomer(email: string, name: string, phone: string) {
  const s = stripe();
  const existing = await s.customers.list({ email, limit: 1 });
  if (existing.data[0]) {
    const c = existing.data[0];
    if ((name && c.name !== name) || (phone && c.phone !== phone)) {
      return s.customers.update(c.id, { ...(name && { name }), ...(phone && { phone }) });
    }
    return c;
  }
  return s.customers.create({ email, name: name || undefined, phone: phone || undefined, metadata: { source: "invoice-desk" } });
}

export async function createCharge(_: unknown, form: FormData): Promise<DeskResult> {
  try {
    await requireAuth();
    const mode = form.get("mode") === "link" ? "link" : "invoice";
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const phone = String(form.get("phone") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const memo = String(form.get("memo") ?? "").trim();
    const amount = parseAmount(form.get("amount"));
    const dueDays = Math.min(60, Math.max(1, Number(form.get("dueDays") ?? 7) || 7));

    if (!description) return { ok: false, error: "Add what the charge is for." };
    if (amount === null) return { ok: false, error: "Enter an amount between $1 and $100,000." };
    const s = stripe();

    if (mode === "link") {
      const price = await s.prices.create({
        currency: "usd",
        unit_amount: amount,
        product_data: { name: description, tax_code: "txcd_20030000", metadata: { source: "invoice-desk" } },
      });
      const link = await s.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
        invoice_creation: { enabled: true },
        phone_number_collection: { enabled: true },
        metadata: { source: "invoice-desk", client: name || email || "unspecified" },
        after_completion: {
          type: "hosted_confirmation",
          hosted_confirmation: { custom_message: "Thank you! Your payment is confirmed. We'll be in touch within one business day." },
        },
      });
      revalidatePath("/admin");
      return { ok: true, kind: "link", url: link.url, emailed: false };
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "A valid client email is required for an invoice." };
    const customer = await findOrCreateCustomer(email, name, phone);
    const invoice = await s.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: dueDays,
      auto_advance: true,
      description: memo || undefined,
      footer: "Questions? Reply to this email or contact dbutler@eulaproperties.com. Refund policy: eulaproperties.com/policies",
      metadata: { source: "invoice-desk" },
    });
    await s.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount,
      currency: "usd",
      description,
      tax_code: "txcd_20030000",
    });
    const finalized = await s.invoices.finalizeInvoice(invoice.id!);
    const sent = await s.invoices.sendInvoice(finalized.id!);
    revalidatePath("/admin");
    return { ok: true, kind: "invoice", url: sent.hosted_invoice_url ?? "", number: sent.number, emailed: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function resendInvoice(form: FormData): Promise<void> {
  await requireAuth();
  await stripe().invoices.sendInvoice(String(form.get("id")));
  revalidatePath("/admin");
}

export async function voidInvoice(form: FormData): Promise<void> {
  await requireAuth();
  await stripe().invoices.voidInvoice(String(form.get("id")));
  revalidatePath("/admin");
}
