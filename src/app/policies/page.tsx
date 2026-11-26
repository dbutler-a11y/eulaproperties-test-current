import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies | Eula Labs",
  description: "Refund, cancellation, terms and privacy policies for Eula Labs services.",
};

const EMAIL = "dbutler@eulaproperties.com";
const UPDATED = "November 25, 2026";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-8">
      <h2 className="text-2xl font-light text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Policies() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="flex justify-between items-center px-6 sm:px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold tracking-wide">
          EULA <span className="font-light" style={{ color: "#B8976A" }}>Labs</span>
        </Link>
        <a href={`mailto:${EMAIL}`} className="text-sm font-medium" style={{ color: "#B8976A" }}>Contact</a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-2">Policies</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated {UPDATED}</p>

        <nav className="flex flex-wrap gap-4 text-sm mb-12" style={{ color: "#B8976A" }}>
          <a href="#refunds">Refunds</a>
          <a href="#cancellation">Cancellation</a>
          <a href="#terms">Terms of service</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </nav>

        <Section id="refunds" title="Refund policy — satisfaction guarantee">
          <p>
            If you are not satisfied with our work, we will refund you. Email{" "}
            <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> within 30 days of the charge, tell us what
            fell short, and we will refund that charge in full to the original payment method.
          </p>
          <p>Refunds are issued within 5 business days of approval. Your bank may take an additional 5–10 business days to post them.</p>
        </Section>

        <Section id="cancellation" title="Cancellation">
          <p>
            Monthly plans (AI Front Desk, Content Engine, AI Ops Partner) can be cancelled at any time by email. Cancellation
            stops the next renewal; you keep service through the end of the period already paid for.
          </p>
          <p>Project work (Opportunity Audit, Automation Build) can be cancelled before delivery; work completed so far is covered by the refund policy above.</p>
        </Section>

        <Section id="terms" title="Terms of service">
          <p>
            Services are provided by Eula Properties LLC, a Texas limited liability company based in Houston, Texas. Each project
            starts with a written scope and price, sent with the invoice or payment link. Paying the invoice or link accepts that
            scope and these terms.
          </p>
          <p>
            Payments are processed by Stripe by card or ACH. Monthly plans renew automatically each month until cancelled. Once
            paid for, you own the deliverables made specifically for you; we keep ownership of our underlying tools and code.
          </p>
          <p>
            We work to deliver what the scope describes, but we do not guarantee specific revenue, lead or sales results.
            Nothing we publish on your behalf goes live without your approval.
          </p>
        </Section>

        <Section id="privacy" title="Privacy">
          <p>
            We collect only what we need to deliver the work and bill for it: your contact details, business information you
            share with us, and payment details, which are handled by Stripe and never stored on our servers.
          </p>
          <p>We do not sell your information. We share it only with the service providers needed to do the work, such as payment processing and hosting.</p>
        </Section>

        <Section id="contact" title="Contact">
          <p>
            Eula Properties LLC · Houston, Texas
            <br />
            <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </Section>
      </div>
    </main>
  );
}
