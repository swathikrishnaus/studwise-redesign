import type { Metadata } from "next";
import RevealRoot from "@/components/shared/RevealRoot";
import { gutter } from "@/components/shared/PageKit";
import TestimonialsHero from "@/components/testimonials-page/TestimonialsHero";
import FeaturedStories from "@/components/testimonials-page/FeaturedStories";
import TestimonialWall from "@/components/testimonials-page/TestimonialWall";
import MeetTeamCta from "@/components/testimonials-page/MeetTeamCta";
import TestimonialsCta from "@/components/testimonials-page/TestimonialsCta";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Studwise students share their study-abroad journeys to universities in the UK and Germany.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <RevealRoot>
      <TestimonialsHero />
      <div className="bg-[#F1F5F9]">
        <div className={`${gutter} pt-16 sm:pt-24`}>
          <FeaturedStories />
          <div className="py-16 sm:py-24">
            <TestimonialWall />
          </div>
          <MeetTeamCta />
          <div className="py-3 sm:py-4 lg:py-6 pb-16 sm:pb-20 lg:pb-24">
            <TestimonialsCta />
          </div>
        </div>
      </div>
    </RevealRoot>
  );
}
