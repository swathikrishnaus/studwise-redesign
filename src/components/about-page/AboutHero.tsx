import Image from "next/image";
import Link from "next/link";
import HeroHeader from "@/components/hero/HeroHeader";
import CloudButton from "@/components/ui/CloudButton";
import { aboutHero, aboutHighlights } from "@/data/aboutPage";
import { StatCards, gutter } from "@/components/shared/PageKit";

/* One icon per highlight: founded, experience, students, universities */
const HIGHLIGHT_ICONS = [
  "M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2",
  "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
];

/* --------------------------------------------------------------------------
   AboutHero — site header, then a rounded photo panel with the headline
   and a quote card, and a row of highlight figures below it
   -------------------------------------------------------------------------- */
export default function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="relative bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-3 sm:pb-4 lg:pb-6`}>
        <div className="relative isolate overflow-hidden rounded-3xl min-h-[36rem] lg:min-h-[calc(100svh-12.5rem)] flex flex-col justify-end text-white">
          <Image
            src="/images/about/study-abroad-hero.webp"
            alt="Studwise counsellors working with students at the Manjeri office"
            fill
            priority
            sizes="(min-width: 1728px) 1680px, 100vw"
            className="about-hero-img -z-10 object-cover object-[60%_30%]"
          />
          {/* Deep-blue wash, heavier at the foot where the copy sits */}
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[#042a46] via-[#043656]/70 to-[#043656]/10"
            aria-hidden="true"
          />
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#042a46]/70 via-transparent to-transparent"
            aria-hidden="true"
          />

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="absolute top-5 left-6 sm:top-7 sm:left-9 lg:left-12 xl:left-14">
            <ol className="flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md ring-1 ring-white/20 px-3.5 py-1.5 text-xs text-white/85">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">/</li>
              <li aria-current="page" className="text-white">About Us</li>
            </ol>
          </nav>

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-6 items-end p-6 pt-24 sm:p-9 sm:pt-28 lg:p-12 xl:p-14">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-sky-100/90">
                {aboutHero.eyebrow}
              </p>
              <h1
                id="about-hero-heading"
                className="mt-5 font-normal tracking-[-0.04em] leading-[0.98] text-[clamp(2.3rem,8.4vw,3.4rem)] sm:text-[clamp(3rem,6.4vw,4.6rem)] lg:text-[min(4.7vw,8.2vh)] text-balance"
              >
                {aboutHero.titleLead}
                <span className="block text-[#7fd6f7]">{aboutHero.titleRest}</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] sm:text-lg leading-relaxed text-white/85">{aboutHero.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CloudButton href="#consultation-panel" variant="white">
                  Book Free Advisory
                </CloudButton>
                <a
                  href="#who-we-are"
                  className="inline-flex items-center gap-2 h-12 px-5 rounded-full ring-1 ring-white/35 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Our story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6 6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quote card */}
            <figure className="lg:col-span-4 lg:justify-self-end max-w-sm rounded-2xl bg-white/12 backdrop-blur-xl ring-1 ring-white/20 p-5 sm:p-6">
              <svg className="w-8 h-8 text-[#7fd6f7]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.6 6C6.5 7.3 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.6 6Z" />
              </svg>
              <blockquote className="mt-3 text-lg sm:text-xl leading-snug tracking-tight">{aboutHero.quote}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                <Image src="/images/studwise-wings-logo.png" alt="" width={28} height={28} className="rounded-full bg-[#009cd9] p-1" />
                Team Studwise
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Highlights */}
        <StatCards
          reveal
          className="mt-3 sm:mt-4 grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3"
          items={aboutHighlights.map((h, i) => ({ ...h, icon: HIGHLIGHT_ICONS[i] }))}
        />
      </div>
    </section>
  );
}
