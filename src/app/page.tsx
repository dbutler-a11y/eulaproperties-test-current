import { ArrowRight, Check, Building2 } from "lucide-react";
import Station from "./Station";

const GOLD = "#B8976A";
const EMAIL = "dbutler@eulaproperties.com";

// Real, checkable numbers only. Update the as-of date when they change.
const STATS_AS_OF = "November 2026";
const STATS = [
  { value: "40+", label: "Apps & sites deployed" },
  { value: "13", label: "Shipped or updated in the last 30 days" },
  { value: "5", label: "Client businesses served" },
  { value: "2020", label: "Operating in Houston since" },
];

type Service = {
  name: string;
  price: string;
  unit: string;
  pitch: string;
  includes: string[];
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    name: "AI Opportunity Audit",
    price: "$1,500",
    unit: "one-time",
    pitch: "We map your operation and show exactly where AI saves time or brings in revenue.",
    includes: ["Process walkthrough with your team", "Ranked list of automations with ROI", "Credited in full toward any build"],
  },
  {
    name: "AI Front Desk",
    price: "$2,500",
    unit: "setup + $300/mo",
    pitch: "Every new lead gets a reply in under a minute and a time on your calendar.",
    includes: ["Text and email follow-up", "Calendar booking", "Monthly report on leads and bookings"],
    featured: true,
  },
  {
    name: "Content Engine",
    price: "$997",
    unit: "per month",
    pitch: "Reels, reactions and carousels produced from your footage and scheduled for you.",
    includes: ["Short-form video and carousels", "Captions and scheduling", "Your approval before anything posts"],
  },
  {
    name: "Automation Build",
    price: "From $5,000",
    unit: "per project",
    pitch: "Custom software and agent workflows built around how your business already runs.",
    includes: ["Scoped, fixed-price build", "Integrations with your CRM, payments and calendar", "Handoff docs and training"],
  },
  {
    name: "AI Ops Partner",
    price: "$2,500",
    unit: "per month",
    pitch: "An ongoing AI team: we run, monitor and improve your systems every month.",
    includes: ["Monitoring and fixes", "New automations each month", "Priority support"],
  },
];

const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="flex justify-between items-center px-6 sm:px-8 py-6 max-w-7xl mx-auto">
        <span className="text-xl font-bold tracking-wide">
          EULA <span className="font-light" style={{ color: GOLD }}>Labs</span>
        </span>
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <a href="#station" className="text-gray-600 hover:text-gray-900">The Station</a>
          <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#assets" className="text-gray-600 hover:text-gray-900">Real Assets</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
        </div>
        <a href={mailto("Eula Labs inquiry")} className="text-sm font-medium" style={{ color: GOLD }}>Contact</a>
      </nav>

      <section className="text-center pt-16 pb-12 max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Eula Labs · Houston, Texas</p>
        <h1 className="text-5xl sm:text-7xl font-light leading-tight mb-6">
          Applied AI.
          <br />
          <span style={{ color: GOLD }}>Real Assets.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          An applied AI research and development firm. We build AI agents and automation that answer
          leads, produce content and run back-office work for real businesses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white text-sm font-medium hover:opacity-90" style={{ backgroundColor: GOLD }}>
            See services &amp; pricing <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#station" className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-medium border hover:bg-gray-50" style={{ borderColor: GOLD, color: GOLD }}>
            Tour the station
          </a>
        </div>
      </section>

      <section aria-label="By the numbers" className="py-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-light text-gray-900">{s.value}</div>
              <div className="text-xs tracking-widest text-gray-400 mt-2 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">As of {STATS_AS_OF}.</p>
      </section>

      <section id="station" className="py-20 bg-[#030805]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light text-white mb-3">The Station</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every room is a system we run today. Select one to see what it does.
            </p>
          </div>
          <Station />
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-light text-gray-900 mb-3">Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Clear scopes, published prices. Billed by invoice or card. Not satisfied? <a href="/policies#refunds" className="underline">We refund you.</a></p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className={`rounded-2xl p-7 flex flex-col border ${s.featured ? "shadow-lg" : "border-gray-100"}`}
                style={s.featured ? { borderColor: GOLD } : undefined}
              >
                {s.featured && <span className="self-start text-[11px] tracking-widest uppercase font-semibold mb-3" style={{ color: GOLD }}>Most requested</span>}
                <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-light">{s.price}</span>
                  <span className="text-sm text-gray-500 ml-2">{s.unit}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.pitch}</p>
                <ul className="space-y-2 mb-7">
                  {s.includes.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} /> {i}
                    </li>
                  ))}
                </ul>
                <a
                  href={mailto(`${s.name} — get started`)}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium hover:opacity-90"
                  style={s.featured ? { backgroundColor: GOLD, color: "white" } : { border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  Get started <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assets" className="py-20 bg-gray-50/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${GOLD}15` }}>
            <Building2 className="w-6 h-6" style={{ color: GOLD }} />
          </div>
          <h2 className="text-4xl font-light text-gray-900 mb-4">Real Assets</h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Eula Properties LLC invests in and develops residential real estate in Houston, Texas.
          </p>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl font-light text-gray-700 leading-relaxed">
            Our vision is to build a self-sustaining economic ecosystem where education fuels innovation,
            innovation creates opportunity, and opportunity generates wealth. We are creating an environment
            where participants don&apos;t just acquire knowledge&mdash;they apply it to build businesses, create
            jobs, generate income, and become contributors to an economy that continuously grows and reinvests
            in its own success.
          </p>
        </div>
      </section>

      <footer id="contact" className="py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Start a project</h2>
          <a href={mailto("Eula Labs inquiry")} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white text-sm font-medium hover:opacity-90" style={{ backgroundColor: GOLD }}>
            Email {EMAIL} <ArrowRight className="w-4 h-4" />
          </a>
          <div className="mt-12 pt-8 border-t border-gray-100 text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Eula Properties LLC. Houston, Texas.</p>
            <div className="mt-3 flex justify-center gap-6 text-xs">
              <a href="/policies#refunds" className="hover:text-gray-600">Refund policy</a>
              <a href="/policies#terms" className="hover:text-gray-600">Terms</a>
              <a href="/policies#privacy" className="hover:text-gray-600">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
