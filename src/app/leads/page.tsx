import type { Metadata } from "next";
import LeadBoard from "./LeadBoard";

export const metadata: Metadata = {
  title: "Lead Alerts | Eula Properties",
  description: "Live motivated-seller leads, call recordings, and alert history.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LeadsPage() {
  return <LeadBoard />;
}
