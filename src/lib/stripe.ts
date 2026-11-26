import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/** Server-only Stripe client. Uses a restricted live key from STRIPE_SECRET_KEY. */
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key, { appInfo: { name: "eula-invoice-desk" } });
  return client;
}
