import Link from "next/link";
import { Building2, ArrowRight, Brain, Target, Zap, Users, TrendingUp, DollarSign } from "lucide-react";

export default function LegacyHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-emerald-400" />
          <span className="text-xl font-bold">Eula Properties</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#portfolio" className="hover:text-emerald-400 transition-colors">Portfolio</a>
          <a href="#institute" className="hover:text-emerald-400 transition-colors">Institute</a>
          <a href="#pembrook" className="hover:text-emerald-400 transition-colors">Pembrook</a>
          <a href="#investors" className="hover:text-emerald-400 transition-colors">Investors</a>
          <a href="#mission" className="hover:text-emerald-400 transition-colors">Mission</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-3 mb-8">
          <Building2 className="w-16 h-16 text-emerald-400" />
          <h1 className="text-5xl sm:text-6xl font-bold">Eula Properties</h1>
        </div>

        <h2 className="text-2xl sm:text-3xl text-emerald-400 mb-8 font-medium">
          Applied AI. Real Assets. Real Impact.
        </h2>

        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Strategic investments in AI-powered businesses and real estate. Technology-driven solutions
          creating measurable impact in workforce development and property investment.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400">$1.1M</h3>
            <p className="text-slate-300">in Real Estate</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <Target className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400">20+</h3>
            <p className="text-slate-300">Digital Properties</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400">50+</h3>
            <p className="text-slate-300">Jobs Target</p>
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section id="investors" className="py-20 bg-gradient-to-r from-emerald-900/20 to-green-900/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Investment Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">$1M</h3>
              <p className="text-slate-300">Investment</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <Target className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">$2M</h3>
              <p className="text-slate-300">Target Return</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <Zap className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">12</h3>
              <p className="text-slate-300">Month Timeline</p>
            </div>
          </div>
          <p className="text-lg text-slate-300 mb-8">Secured by $1.1M in appraised real estate</p>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Institute of AI Innovation */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Brain className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Institute of AI Innovation</h3>
              <p className="text-slate-400 text-sm mb-4">Workforce-approved AI training facility</p>
              <a href="#institute" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Learn More →
              </a>
            </div>

            {/* Pembrook Campus */}
            <Link href="/pembrook" className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
              <Building2 className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Pembrook Campus</h3>
              <p className="text-slate-400 text-sm mb-4">$1.1M real estate property</p>
              <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                View Details →
              </span>
            </Link>

            {/* Butler AI Academy */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Users className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Butler AI Academy</h3>
              <p className="text-slate-400 text-sm mb-4">AI tutoring platform</p>
              <span className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Coming Soon →
              </span>
            </div>

            {/* BrandVoice Studio */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Zap className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">BrandVoice Studio</h3>
              <p className="text-slate-400 text-sm mb-4">Enterprise voice cloning platform</p>
              <span className="text-emerald-400 hover:text-emerald-300 transition-colors">
                In Development →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Institute Section */}
      <section id="institute" className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Brain className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-8">Institute of AI Innovation</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            A workforce-approved AI training facility focused on practical skills development
            and industry-ready certification programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">AI Fundamentals</h3>
              <p className="text-slate-300 text-sm">Core AI concepts and applications</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Industry Applications</h3>
              <p className="text-slate-300 text-sm">Real-world AI implementation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Workforce Ready</h3>
              <p className="text-slate-300 text-sm">Job placement assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & About */}
      <section id="mission" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            To bridge the gap between artificial intelligence innovation and practical business applications,
            while creating sustainable value through strategic real estate investments.
          </p>
          <div id="about" className="mt-16">
            <h3 className="text-2xl font-semibold mb-6 text-emerald-400">About Eula Properties</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Based in Houston, Texas, we combine technology expertise with real estate acumen to create
              diversified investment opportunities. Our approach focuses on measurable outcomes and
              sustainable growth across both digital and physical assets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-slate-300 mb-8">
            Ready to explore investment opportunities or learn more about our AI initiatives?
          </p>
          <a
            href="mailto:dbutler@eulaproperties.com"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="mt-12 pt-8 border-t border-slate-700 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Eula Properties LLC. All rights reserved.</p>
            <p className="mt-2">Houston, Texas</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
