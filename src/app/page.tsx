import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-8">
          <Building2 className="w-12 h-12 text-emerald-400" />
          <h1 className="text-4xl sm:text-5xl font-bold">Eula Properties</h1>
        </div>

        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Real Estate Investment and Development in Houston, Texas
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-400">Current Investment Opportunities</h2>

          <Link
            href="/pembrook"
            className="block max-w-lg mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">Pembrook 3-Unit Compound</h3>
                <p className="text-slate-400">9132-9136 Pembrook St, Houston TX</p>
                <p className="text-emerald-400 mt-2 font-medium">$1.095M Capital Stack</p>
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        <footer className="mt-20 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Eula Properties LLC. All rights reserved.</p>
          <p className="mt-2">
            <a href="mailto:dbutler@eulaproperties.com" className="hover:text-emerald-400 transition-colors">
              dbutler@eulaproperties.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
