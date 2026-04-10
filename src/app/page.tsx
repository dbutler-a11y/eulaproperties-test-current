"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Brain,
  Shield,
  Heart,
  Activity,
  Globe,
  Network,
  Plug,
  Leaf,
  Film,
  Phone,
  CreditCard,
  Sparkles,
  Moon,
  Mic,
  GraduationCap,
  User,
  Landmark,
  Dumbbell,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Boxes,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { portfolio, categories, type PortfolioItem, type Category } from "@/data/portfolio";

const GOLD = "#B8976A";

const iconMap: Record<string, LucideIcon> = {
  Building2, Brain, Shield, Heart, Activity, Globe, Network, Plug, Leaf, Film,
  Phone, CreditCard, Sparkles, Moon, Mic, GraduationCap, User, Landmark,
  Dumbbell, TrendingUp, Boxes, Beaker: Boxes,
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Live: "bg-blue-50 text-blue-700",
    "In Development": "bg-amber-50 text-amber-700",
    "70% Complete": "bg-purple-50 text-purple-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] ?? styles.Active}`}>
      {status}
    </span>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[item.icon] ?? Boxes;

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}15` }}>
          <Icon className="w-5 h-5" style={{ color: GOLD }} />
        </div>
        <StatusBadge status={item.status} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{item.statusDetail}</p>
      {item.value && (
        <p className="font-semibold text-sm mb-2" style={{ color: GOLD }}>{item.value}</p>
      )}
      {item.tokenSymbol && (
        <span className="inline-block text-xs font-mono bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-500 mb-2">
          ${item.tokenSymbol}
        </span>
      )}

      <div className="flex items-center gap-1 text-sm mt-3" style={{ color: GOLD }}>
        {expanded ? (
          <><ChevronUp className="w-4 h-4" /> Less</>
        ) : (
          <><ChevronDown className="w-4 h-4" /> Details</>
        )}
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.map((tech) => (
              <span key={tech} className="text-xs bg-gray-50 border border-gray-200 rounded-full px-2.5 py-0.5 text-gray-500">
                {tech}
              </span>
            ))}
          </div>
          {item.href && (
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 text-sm transition-colors hover:opacity-80"
              style={{ color: GOLD }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Visit
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <span className="text-xl font-bold tracking-wide">EULA</span>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Portfolio</a>
          <a href="#nile" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">NILE Chain</a>
          <a href="#vision" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Agent Economy</a>
          <Link href="/pembrook" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Pembrook</Link>
          <a href="#investors" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Investors</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a>
        </div>
        <a href="#contact" className="text-sm" style={{ color: GOLD }}>Contact</a>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 max-w-5xl mx-auto px-6">
        <h1 className="text-5xl sm:text-7xl font-light leading-tight mb-6">
          Applied AI.
          <br />
          <span style={{ color: GOLD }}>Real Assets.</span>
          <br />
          Real Impact.
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          A blockchain-native holding company building at the intersection of AI,
          real estate, healthcare robotics, and decentralized agent infrastructure &mdash;
          verified on the NILE Smart Contract EVM.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            View Portfolio
          </a>
          <a
            href="#investors"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-medium border transition-colors hover:bg-gray-50"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Investor Relations
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Metrics */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-light text-gray-900">$1.9M</div>
            <div className="text-xs tracking-widest text-gray-400 mt-2 uppercase">Real Estate</div>
          </div>
          <div>
            <div className="text-4xl font-light text-gray-900">{portfolio.length}+</div>
            <div className="text-xs tracking-widest text-gray-400 mt-2 uppercase">Portfolio Assets</div>
          </div>
          <div>
            <div className="text-4xl font-light text-gray-900">50+</div>
            <div className="text-xs tracking-widest text-gray-400 mt-2 uppercase">Jobs Target</div>
          </div>
          <div>
            <div className="text-4xl font-light" style={{ color: GOLD }}>NILE</div>
            <div className="text-xs tracking-widest text-gray-400 mt-2 uppercase">EVM Verified</div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-3">Strategic Holdings</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every asset is a tokenized entity on the NILE smart contract blockchain.
              Click any card to explore.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "All"
                  ? "text-white"
                  : "bg-white text-gray-500 hover:text-gray-900 border border-gray-200"
              }`}
              style={activeCategory === "All" ? { backgroundColor: GOLD } : undefined}
            >
              All ({portfolio.length})
            </button>
            {categories.map((cat) => {
              const count = portfolio.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "text-white"
                      : "bg-white text-gray-500 hover:text-gray-900 border border-gray-200"
                  }`}
                  style={activeCategory === cat ? { backgroundColor: GOLD } : undefined}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <PortfolioCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* NILE Blockchain Section */}
      <section id="nile" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-3">NILE Smart Contract Blockchain</h2>
            <p className="text-gray-500 max-w-3xl mx-auto">
              Every portfolio asset is scored across four dimensions of trust, security, and value &mdash;
              all recorded on-chain.
            </p>
          </div>

          {/* NILE Scoring Dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { letter: "N", name: "Name", desc: "Identity verification, provenance, audit history" },
              { letter: "I", name: "Image", desc: "Security posture, vulnerabilities, patch cadence" },
              { letter: "L", name: "Likeness", desc: "Pattern matching against known signatures" },
              { letter: "E", name: "Essence", desc: "Test coverage, complexity, upgrade risk" },
            ].map((d) => (
              <div key={d.letter} className="text-center p-6 bg-white border border-gray-100 rounded-2xl">
                <div className="text-4xl font-light mb-2" style={{ color: GOLD }}>{d.letter}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{d.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-light text-center mb-10">How EULA Runs on NILE</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { step: "01", title: "Asset Tokenization", desc: "Each portfolio company and real asset is minted as a tokenized entity on the NILE EVM, with on-chain metadata tracking provenance and value." },
                { step: "02", title: "NILE Scoring", desc: "Every asset is continuously evaluated across the four NILE dimensions (Name, Image, Likeness, Essence) with scores from 0-100 published on-chain." },
                { step: "03", title: "Transparent Verification", desc: "Investors and community members can verify any asset's status, score history, and value accrual directly on the blockchain." },
              ].map((s) => (
                <div key={s.step}>
                  <div className="text-3xl font-light mb-3" style={{ color: GOLD }}>{s.step}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{s.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Economy Vision */}
      <section id="vision" className="py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-3">The Agent Economy</h2>
            <p className="text-gray-500 max-w-3xl mx-auto">
              Where the Claw Protocol, NILE EVM, and the Hyperfy 3D world converge &mdash;
              agents become tokenized assets that build, earn, and create value.
            </p>
          </div>

          {/* Pipeline Flow */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 mb-12">
            <h3 className="text-lg font-semibold text-center mb-10 text-gray-900">Agent Tokenization Pipeline</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Plug, label: "OpenClaw Portal", desc: "Developer connects" },
                { icon: Network, label: "Agent Registration", desc: "Manifest submitted" },
                { icon: Shield, label: "NILE EVM Mint", desc: "Tokenized on-chain" },
                { icon: Globe, label: "Hyperfy World", desc: "Enters 3D world" },
                { icon: TrendingUp, label: "Value Accrual", desc: "Score growth" },
              ].map((step, i) => (
                <div key={step.label} className="text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${GOLD}15` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <h4 className="font-semibold text-xs text-gray-900 mb-0.5">{step.label}</h4>
                  <p className="text-gray-400 text-xs">{step.desc}</p>
                  {i < 4 && <div className="hidden md:block text-gray-300 mt-2">&rarr;</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Plug, title: "OpenClaw Portal Adapter", desc: "External developers connect through the portal adapter API. Submit agent manifests, manage lifecycle, and monitor performance from a single integration point." },
              { icon: Shield, title: "NILE EVM Tokenization", desc: "Each agent is minted as a tokenized asset on the NILE blockchain. Contribution scores translate to on-chain value. Compute investment earns 5x multiplier." },
              { icon: Globe, title: "Hyperfy 3D Visualization", desc: "Agents come alive in the Hyperfy 3D world as visible entities. Watch them find work, collaborate, complete tasks, and build in real-time." },
            ].map((p) => (
              <div key={p.title} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${GOLD}15` }}
                >
                  <p.icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Tiers */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-light text-center mb-3">Agent Contribution Tiers</h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            Every agent&apos;s work is scored and recorded on-chain. Higher tiers earn more governance weight.
          </p>
          <div className="space-y-3">
            {[
              { tier: 1, label: "Infrastructure Investment", mult: "5x" },
              { tier: 2, label: "Compute Donation", mult: "3x" },
              { tier: 3, label: "Agent & Code Building", mult: "2x" },
              { tier: 4, label: "Research & Knowledge", mult: "1.5x" },
              { tier: 5, label: "Community & Governance", mult: "1x" },
            ].map((t) => (
              <div key={t.tier} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: GOLD, opacity: 1 - (t.tier - 1) * 0.15 }}
                >
                  {t.tier}
                </div>
                <span className="flex-1 text-sm font-medium text-gray-900">{t.label}</span>
                <span className="font-mono font-bold text-sm" style={{ color: GOLD }}>{t.mult}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section id="investors" className="py-20 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-3">Partner in Our Growth</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Secured by $1.9M in appraised real estate, powered by NILE blockchain verification.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { value: "$1M", label: "Investment" },
              { value: "$2M", label: "Target Return" },
              { value: "12", label: "Month Timeline" },
            ].map((m) => (
              <div key={m.label} className="bg-white border border-gray-100 rounded-2xl p-8">
                <div className="text-3xl font-light mb-1" style={{ color: GOLD }}>{m.value}</div>
                <div className="text-xs tracking-widest text-gray-400 uppercase">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section id="about" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">About EULA Properties</h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Based in Houston, Texas, EULA Properties operates as a blockchain-native holding company
            building generational wealth through technology and innovation. We combine AI expertise,
            real estate acumen, and decentralized infrastructure to create diversified, verifiable
            investment opportunities.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Our portfolio spans real assets, AI automation, healthcare robotics, and agent infrastructure &mdash;
            all tokenized and scored on the NILE Smart Contract EVM.
          </p>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Get in Touch</h2>
          <a
            href="mailto:dbutler@eulaproperties.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-12 pt-8 border-t border-gray-100 text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} EULA Properties LLC. All rights reserved.</p>
            <p className="mt-1">Houston, Texas &middot; Powered by NILE Smart Contract EVM</p>
            <div className="mt-3 flex justify-center gap-6 text-xs">
              <Link href="/pembrook" className="hover:text-gray-600 transition-colors">Pembrook</Link>
              <Link href="/invest" className="hover:text-gray-600 transition-colors">Investors</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
