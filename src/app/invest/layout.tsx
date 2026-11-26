import type { Metadata } from "next";

// Hidden page: reachable by direct link only, not linked from the site and not indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InvestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
