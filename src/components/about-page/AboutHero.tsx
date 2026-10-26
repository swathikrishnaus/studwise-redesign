import Image from "next/image";
import Link from "next/link";
import HeroHeader from "@/components/hero/HeroHeader";
import { aboutHero, aboutHighlights } from "@/data/aboutPage";
import { Icon, StatCards, gutter } from "@/components/shared/PageKit";
import CloudButton from "@/components/ui/CloudButton";

/* One icon per highlight: founded, experience, students, universities */
const HIGHLIGHT_ICONS = [
  "M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2",
  "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
];

/* Soft sky wash behind the copy, as on the service pages' hero */
const HERO_WASH =
  "radial-gradient(ellipse at 0% 0%, #bfe3f7 0%, rgba(191,227,247,0) 55%), radial-gradient(ellipse at 100% 0%, #d9effb 0%, rgba(217,239,251,0) 50%), radial-gradient(ellipse at 100% 100%, #c6e6f8 0%, rgba(198,230,248,0) 60%), radial-gradient(ellipse at 0% 100%, #dceefa 0%, rgba(220,238,250,0) 55%), #eef7fd";

/* --------------------------------------------------------------------------
   AboutHero — site header, then a two-column first screen on the
   homepage's grid (7/12 + 5/12, 8/12 + 4/12 from 2xl), styled like the
   service pages' hero: breadcrumb, headline, intro and actions on a soft
   sky panel on the left, the graduate photo on the right; the highlight
   figures follow below the banner. The consultation form lives in the
   closing "Start your journey" section.
   -------------------------------------------------------------------------- */
export default function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="relative bg-[#F1F5F9]">
      {/* Header and banner fill the first screen, as on the homepage */}
      <div className="flex flex-col min-h-svh">
        <HeroHeader />

        <div className={`${gutter} w-full flex-1 flex flex-col pb-3 sm:pb-4 lg:pb-6`}>
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-stretch">
            {/* ============== LEFT: copy ============== */}
            <div
              style={{ background: HERO_WASH }}
              className="lg:col-span-7 xl:col-span-7 2xl:col-span-8 flex flex-col rounded-3xl lg:rounded-[2rem] ring-1 ring-slate-900/5 px-6 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-14 lg:px-14 lg:pt-10 lg:pb-14 min-h-[30rem]"
            >

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">{aboutHero.eyebrow}</p>
                <h1
                  id="about-hero-heading"
                  className="banner-title mt-4 text-slate-900"
                >
                  <span className="block text-balance">{aboutHero.titleLead}</span>
                  <span className="block mt-1 text-balance text-[#0a7fb3]">{aboutHero.titleRest}</span>
                </h1>
                <p className="mt-6 sm:mt-8 max-w-[34rem] body-lead text-slate-600">{aboutHero.text}</p>
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                  <CloudButton href="#who-we-are" className="mt-0">
                    Our story
                  </CloudButton>
                  <Link
                    href="/team"
                    className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full bg-white ring-1 ring-slate-900/5 text-[15px] text-slate-800 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
                  >
                    Meet the team
                    <Icon d="M5 12h14m-6-6 6 6-6 6" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ============== RIGHT: photo ============== */}
            <div className="relative lg:col-span-5 xl:col-span-5 2xl:col-span-4 min-h-[22rem] sm:min-h-[30rem] overflow-hidden rounded-3xl lg:rounded-[2rem] bg-slate-200">
              <Image
                src="/images/services/about-banner.jpg"
                alt="A Studwise graduate in cap and gown holding her degree outside a university building"
                fill
                priority
                sizes="(min-width: 1536px) 34vw, (min-width: 1024px) 42vw, 100vw"
                className="about-hero-img object-cover object-[34%_30%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights, just below the banner */}
      <div className={`${gutter} pb-3 sm:pb-4 lg:pb-6`}>
        <StatCards
          reveal
          className="grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3"
          items={aboutHighlights.map((h, i) => ({ ...h, icon: HIGHLIGHT_ICONS[i] }))}
        />
      </div>
    </section>
  );
}
