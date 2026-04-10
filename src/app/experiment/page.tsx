"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Brain,
  Target,
  Zap,
  Users,
  TrendingUp,
  DollarSign,
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
  ChevronRight,
  ExternalLink,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { portfolio, categories, type PortfolioItem, type Category } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  Building2, Brain, Target, Zap, Users, TrendingUp, DollarSign,
  Shield, Heart, Activity, Globe, Network, Plug, Leaf, Film,
  Phone, CreditCard, Sparkles, Moon, Mic, GraduationCap, User,
  Landmark, Dumbbell, Boxes, Beaker: Boxes,
};

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: "bg-emerald-400",
    Live: "bg-blue-400",
    "In Development": "bg-amber-400",
    "70% Complete": "bg-purple-400",
  };
  return (
    <span className="flex items-center gap-2 text-sm text-slate-400">
      <span className={`w-2 h-2 rounded-full ${colors[status] ?? colors.Active}`} />
      {status}
    </span>
  );
}

function BlogCard({ item }: { item: PortfolioItem }) {
  const Icon = iconMap[item.icon] ?? Boxes;

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all">
      <div className="flex items-start gap-4 p-5">
        <div className="shrink-0 w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-base font-bold truncate">{item.name}</h3>
            {item.tokenSymbol && (
              <span className="shrink-0 text-xs font-mono bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-emerald-400">
                ${item.tokenSymbol}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <StatusDot status={item.status} />
            <span className="text-xs text-slate-500">{item.category}</span>
            {item.value && <span className="text-xs font-semibold text-emerald-400">{item.value}</span>}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex flex-wrap gap-1">
              {item.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[10px] bg-white/5 rounded px-1.5 py-0.5 text-slate-500">
                  {tech}
                </span>
              ))}
              {item.techStack.length > 3 && (
                <span className="text-[10px] text-slate-500">+{item.techStack.length - 3}</span>
              )}
            </div>
            {item.href && (
              <Link
                href={item.href}
                className="ml-auto flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
      </div>
    </div>
  );
}

export default function ExperimentPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  const activeCount = portfolio.filter((p) => p.status === "Active" || p.status === "Live").length;
  const devCount = portfolio.filter((p) => p.status === "In Development").length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Experiment Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-center py-2 px-4">
        <span className="text-amber-400 text-sm font-medium">
          UI Experiment &mdash; Design Sandbox &middot;{" "}
          <Link href="/" className="underline hover:text-amber-300">Back to Main</Link>
        </span>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">NILE Smart Contract EVM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">EULA Properties</h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl">
          Blockchain-native holding company. {portfolio.length} portfolio assets
          across real estate, AI, healthcare, and decentralized infrastructure.
        </p>

        {/* Compact stats */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-emerald-400 font-bold text-xl">$1.1M</span>
            <span className="text-slate-500 ml-2">Real Estate</span>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <span className="text-emerald-400 font-bold text-xl">{activeCount}</span>
            <span className="text-slate-500 ml-2">Active</span>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <span className="text-amber-400 font-bold text-xl">{devCount}</span>
            <span className="text-slate-500 ml-2">In Development</span>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <span className="text-blue-400 font-bold text-xl">NILE</span>
            <span className="text-slate-500 ml-2">EVM Verified</span>
          </div>
        </div>
      </header>

      {/* Filter + List */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        {/* Sidebar-style category filter */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/10">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeCategory === "All"
                ? "bg-emerald-500 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog-style list */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <BlogCard key={item.name} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          Showing {filtered.length} of {portfolio.length} assets
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="ml-2 text-emerald-400 hover:text-emerald-300"
            >
              Show all
            </button>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-slate-700 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} EULA Properties LLC &middot; Houston, TX &middot; NILE EVM</p>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <Link href="/" className="hover:text-slate-400">Main Site</Link>
          <Link href="/legacy" className="hover:text-slate-400">Legacy</Link>
          <a href="mailto:dbutler@eulaproperties.com" className="hover:text-slate-400">Contact</a>
        </div>
      </footer>
    </main>
  );
}
