import type { Metadata } from "next";
import RevealRoot from "@/components/shared/RevealRoot";
import AboutHero from "@/components/about-page/AboutHero";
import WhoWeAreSection from "@/components/about-page/WhoWeAreSection";
import PurposeSection from "@/components/about-page/PurposeSection";
import SolutionSection from "@/components/about-page/SolutionSection";
import AboutTeamSection from "@/components/about-page/AboutTeamSection";
import WhyStudwiseSection from "@/components/about-page/WhyStudwiseSection";
import AboutCtaSection from "@/components/about-page/AboutCtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Studwise is a study abroad education consultancy founded in 2019, headquartered in Manjeri with centres in Valanchery and Calicut. 1000+ students placed, 150+ universities represented.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <RevealRoot>
      <AboutHero />
      <WhoWeAreSection />
      <PurposeSection />
      <SolutionSection />
      <AboutTeamSection />
      <WhyStudwiseSection />
      <AboutCtaSection />
    </RevealRoot>
  );
}
