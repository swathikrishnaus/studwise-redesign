import type { Metadata } from "next";
import StudyAbroadHero from "@/components/hero/StudyAbroadHero";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import WhyChooseSection from "@/components/why/WhyChooseSection";
import StudentsSection from "@/components/students/StudentsSection";
import UniversitiesSection from "@/components/universities/UniversitiesSection";
import OfficesSection from "@/components/offices/OfficesSection";
import FlightPlane from "@/components/flight/FlightPlane";

export const metadata: Metadata = {
  title: "Studwise — Study Abroad Consultants",
  description:
    "Studwise helps students find the right universities, courses, and study destinations abroad. Expert guidance from application to arrival.",
};

export default function HomePage() {
  return (
    <>
      <StudyAbroadHero />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <StudentsSection />
      <UniversitiesSection />
      <OfficesSection />
      {/* Airplane that flies the About route on scroll */}
      <FlightPlane />
    </>
  );
}
