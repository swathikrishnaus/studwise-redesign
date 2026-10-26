import type { Metadata } from "next";
import Link from "next/link";
import HeroHeader from "@/components/hero/HeroHeader";
import CloudButton from "@/components/ui/CloudButton";
import { Eyebrow, gutter } from "@/components/shared/PageKit";
import TeamMemberCard from "@/components/team-page/TeamMemberCard";
import { teamGroups } from "@/data/team";
import { bookAppointmentHref } from "@/data/whyChooseUs";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Studwise team: branch heads, the application team, student counsellors and coordinators who guide students through their study-abroad journey.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div className="bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        <header className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 pt-12 pb-10 sm:px-10 sm:pt-16 lg:px-14 lg:pt-20 lg:pb-14">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>The people behind Studwise</Eyebrow>
              <h1 className="banner-title mt-6 text-slate-900">
                Meet the team that <span className="text-[#0a7fb3]">supports your journey</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="body-lead text-slate-600">
                Get to know the people who help students navigate their study-abroad journey, from applications and guidance to the next
                steps toward their goals.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-14 sm:mt-20 space-y-16 sm:space-y-20 px-0 sm:px-2">
          {teamGroups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-6">
              <h2
                id={`${group.id}-heading`}
                className="border-b border-slate-200 pb-4 text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900"
              >
                {group.title}
              </h2>
              <ul className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {group.members.map((m) => (
                  <li key={m.name}>
                    <TeamMemberCard member={m} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="team-cta-heading"
          className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-br from-[#0aa6e3] via-[#009cd9] to-[#0a7fb3] text-white px-6 py-12 sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">Talk to us</Eyebrow>
              <h2 id="team-cta-heading" className="section-title mt-5">
                Ready to plan your next step?
              </h2>
              <p className="mt-5 max-w-lg body-lead text-white/85">
                Book a free advisory session and a Studwise counsellor will guide you through your options.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <CloudButton href={bookAppointmentHref} variant="white" size="lg" target="_blank" rel="noopener noreferrer">
                Book free advisory
              </CloudButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-6 rounded-full ring-1 ring-white/45 text-sm uppercase tracking-[0.06em] text-white hover:bg-white/10 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
