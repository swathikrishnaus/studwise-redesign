import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms that apply to the Studwise website and to Studwise International's study-abroad counselling, application and visa-support services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return <LegalPage doc={termsAndConditions} other={{ href: "/privacy-policy", label: "Privacy Policy" }} />;
}
