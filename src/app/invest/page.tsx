"use client";

import Link from "next/link";
import { ArrowRight, Shield, Clock, TrendingUp, Building2, ChevronRight } from "lucide-react";

const GOLD = "#B8976A";

export default function InvestPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-light tracking-wide" style={{ color: GOLD }}>
            EULA Properties
          </Link>
          <a
            href="mailto:dbutler@eulaproperties.com?subject=Investment%20Inquiry%20-%20Pembrook%20Note"
            className="px-5 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Asset-Backed Private Note
          </div>
          <h1 className="text-5xl font-light leading-tight mb-4">
            Pembrook Townhouse
            <br />
            <span style={{ color: GOLD }}>Investment Opportunity</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Short-term, asset-backed private note secured by a Houston townhouse project
            that is 70%+ complete with $150K in remaining construction draws already approved.
            <span className="block mt-2 text-gray-600"><strong>Target repayment: 3 months</strong> &middot; Worst case: 6 months</span>
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-8">Investment Terms</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 3-Month Note */}
            <div className="border-2 rounded-2xl p-8 relative" style={{ borderColor: GOLD }}>
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: GOLD }}>
                Target Term
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400 uppercase tracking-widest">3-Month Target</span>
              </div>
              <div className="text-5xl font-light mb-2" style={{ color: GOLD }}>~50%</div>
              <p className="text-gray-500 text-sm mb-6">Annualized · Daily simple interest on outstanding balance</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">$50K held full 3 months</span>
                  <span className="font-medium">Up to $6,250</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">Daily rate</span>
                  <span className="font-medium">0.137% / day</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Pay back early?</span>
                  <span className="font-medium text-emerald-600">Interest stops immediately</span>
                </div>
              </div>
            </div>

            {/* 6-Month Note */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-colors">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                Worst Case
              </div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400 uppercase tracking-widest">6-Month Ceiling</span>
              </div>
              <div className="text-5xl font-light mb-2" style={{ color: GOLD }}>~50%</div>
              <p className="text-gray-500 text-sm mb-6">Annualized · Daily simple interest on outstanding balance</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">$50K held full 6 months</span>
                  <span className="font-medium">Up to $12,500</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">Daily rate</span>
                  <span className="font-medium">0.137% / day</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Pay back early?</span>
                  <span className="font-medium text-emerald-600">Interest stops immediately</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-8">Why This Works</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Asset-Backed Security",
                description: "Your investment is secured by a second lien on the Pembrook townhouse property in Houston, TX. Real property, real collateral."
              },
              {
                icon: Shield,
                title: "70% Already Complete",
                description: "This is a completion play, not a ground-up build. The hard part is done — permits approved, construction underway, loan in place."
              },
              {
                icon: TrendingUp,
                title: "$150K in Draws Available",
                description: "CenterStreet Lending has $150K in remaining construction draws approved and ready to disburse as milestones are hit. The project self-funds to completion."
              },
              {
                icon: Clock,
                title: "Daily Interest — Pay Less When You Pay Early",
                description: "Interest accrues daily on the outstanding balance only. Any payment reduces your principal immediately and lowers the daily interest going forward. The faster we pay it back, the less total interest is owed. No prepayment penalty."
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Structure */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-8">Deal Structure</h2>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid gap-4 text-sm">
              {[
                ["Property", "Pembrook Townhouse, Houston, TX 77016"],
                ["Current Loan", "~$515,000 (CenterStreet Lending)"],
                ["Remaining Draws", "~$150,000 approved"],
                ["Rehab Budget", "~$80,000 to complete"],
                ["Capital Raise", "$50,000"],
                ["Security", "Second lien on property"],
                ["Interest Rate", "~50% annualized (0.137% daily)"],
                ["Interest Structure", "Daily simple interest on outstanding balance only"],
                ["Partial Payments", "Reduce principal immediately — lowers daily interest"],
                ["Prepayment", "Allowed anytime, no penalty — you only pay for the days held"],
                ["Maturity", "Paid at sale or refinance (whichever comes first)"],
                ["Exit Strategy", "Sell or refinance upon completion"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Interest Works */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-3">How Interest Works</h2>
          <p className="text-sm text-gray-500 mb-8">Interest is calculated daily on the outstanding balance only. Partial payments reduce your principal immediately.</p>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-4 text-xs text-gray-400 uppercase tracking-widest pb-2 border-b border-gray-200">
                <span>Event</span>
                <span>Outstanding</span>
                <span>Daily Interest</span>
                <span>Investor Earns</span>
              </div>
              {[
                ["Day 1 — Funds deployed", "$50,000", "$68.50/day", "Accruing daily"],
                ["Day 14 — $20K returned", "$30,000", "$41.10/day", "$959 earned so far"],
                ["Day 30 — $15K returned", "$15,000", "$20.55/day", "$1,617 earned so far"],
                ["Day 45 — Paid in full", "$0", "$0", "~$1,925 total interest"],
              ].map(([event, outstanding, daily, earns]) => (
                <div key={event} className="grid grid-cols-4 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 font-medium">{event}</span>
                  <span className="text-gray-600">{outstanding}</span>
                  <span className="text-gray-600">{daily}</span>
                  <span className="text-emerald-600 font-medium">{earns}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-400">
              Compare: if held the full 6 months with no early payments, total interest would be ~$12,500.
              Early repayment saves the borrower money while the investor still earns for every day their capital is deployed.
            </p>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-8">Use of Funds</h2>

          <div className="space-y-4">
            {[
              { label: "Property rights acquisition", amount: "$30,000", width: "60%" },
              { label: "Initial rehab costs (before first draw)", amount: "$15,000", width: "30%" },
              { label: "Carrying costs (insurance, utilities, permits)", amount: "$5,000", width: "10%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: item.width, backgroundColor: GOLD }} />
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-4 border-t border-gray-200 font-medium">
              <span>Total Capital Raise</span>
              <span style={{ color: GOLD }}>$50,000</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            After the initial $50K is deployed, the remaining $150K in construction loan draws
            funds the rest of the rehab. No additional capital needed from investors.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-3">Timeline</h2>
          <p className="text-sm text-gray-500 mb-8"><strong>Target: 3 months total.</strong> 45 days to complete construction &middot; 30-60 days to sale or refinance.</p>

          <div className="space-y-0">
            {[
              { phase: "Capital secured & rights transfer", time: "Week 1" },
              { phase: "Contractors mobilized, first draw submitted", time: "Week 1-2" },
              { phase: "Interior finish, mechanical, fixtures", time: "Week 2-5" },
              { phase: "Exterior, final inspections, Certificate of Occupancy", time: "Week 5-6 (~45 days)" },
              { phase: "Listed for sale or refinance initiated", time: "Week 6-8" },
              { phase: "Sale closes or refi funds — investor payout", time: "Day 75-90 (3-month target)" },
            ].map((step, i) => (
              <div key={step.phase} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: GOLD, backgroundColor: i === 5 ? GOLD : "white" }} />
                  {i < 5 && <div className="w-px h-8 bg-gray-200" />}
                </div>
                <div className="flex justify-between w-full pb-4">
                  <span className="text-sm text-gray-700">{step.phase}</span>
                  <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4">Ready to Discuss?</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Schedule a call to review the property details, loan documentation, and finalize terms.
          </p>
          <a
            href="mailto:dbutler@eulaproperties.com?subject=Investment%20Inquiry%20-%20Pembrook%20Note"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Schedule a Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EULA Properties LLC. All rights reserved.</p>
          <p className="mt-1">Houston, Texas</p>
          <p className="mt-4 text-xs text-gray-300 max-w-2xl mx-auto leading-relaxed">
            This page is for informational purposes only and does not constitute an offer of securities.
            Investment involves risk, including the potential loss of principal. Prospective investors
            should conduct their own due diligence and consult with legal and financial advisors before investing.
          </p>
        </div>
      </footer>
    </main>
  );
}
