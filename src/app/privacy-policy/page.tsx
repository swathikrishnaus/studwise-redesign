import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Studwise International collects, uses, shares and protects the personal information of students and visitors who use our website and study-abroad services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} other={{ href: "/terms-and-conditions", label: "Terms and Conditions" }} />;
}
