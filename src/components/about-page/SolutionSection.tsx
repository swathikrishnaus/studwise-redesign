import Image from "next/image";
import type { CSSProperties } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { solution } from "@/data/aboutPage";
import { Eyebrow, gutter } from "@/components/shared/PageKit";
import ScrollWords from "@/components/shared/ScrollWords";

export default function SolutionSection() {
  return (
    <section id="our-approach" aria-labelledby="solution-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={`${gutter} py-14 sm:py-20 lg:py-28`}>
        {/* Phones read top to bottom: intro, the founder's portrait, his words,
            then the link. From lg the portrait moves to the right column,
            spanning the three rows of copy beside it. */}
        <div className="grid lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] gap-y-8 lg:gap-x-14 xl:gap-x-20">
          <div className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow>Our Approach</Eyebrow>
              <h2
                id="solution-heading"
                className="section-title mt-5 text-slate-900"
              >
                A Comprehensive Solution <span className="text-[#0a7fb3]">for Your Dreams</span>
              </h2>
            </div>
            <ScrollWords text={solution.text} className="mt-6 max-w-xl body-text text-slate-600" />
          </div>

          {/* Founder portrait */}
          <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-3 lg:self-center">
            <div data-reveal="clip" className="relative mx-auto lg:mr-0 max-w-[34rem] aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/about/founder-ceo-waist.webp"
                alt={`${solution.founder}, Founder and CEO of Studwise`}
                fill
                sizes="(min-width: 640px) 544px, 92vw"
                className="object-cover"
              />
              {/* Branded name plate, so the portrait reads as the founder at a glance */}
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 flex items-center gap-3 sm:gap-4 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4 shadow-[0_12px_30px_-18px_rgba(10,40,70,0.6)]">
                <Image src="/images/studwise-mark.png" alt="" width={668} height={665} sizes="44px" className="shrink-0 w-10 h-10 sm:w-11 sm:h-11" />
                <span className="min-w-0">
                  <span className="block truncate text-lg sm:text-xl leading-tight tracking-[-0.02em] text-slate-900">{solution.founder}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-slate-500">
                    <span className="text-[#0a7fb3]">{solution.founderRole}</span>, Studwise International
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* The founder's credit; the name plate on the portrait says who he is */}
          <figure
            data-reveal
            style={{ "--d": "0.16s" } as CSSProperties}
            className="lg:col-span-6 mx-auto lg:mx-0 w-full max-w-[34rem] lg:max-w-xl rounded-3xl bg-white ring-1 ring-slate-900/5 p-6 sm:p-8"
          >
            <blockquote className="body-text text-slate-700">
              All of this has been made possible by <strong className="font-medium text-slate-900">{solution.founder}</strong>, the
              company&apos;s Founder and CEO, and his visionary leadership.
            </blockquote>
          </figure>

          <div data-reveal style={{ "--d": "0.24s" } as CSSProperties} className="lg:col-span-6">
            <CloudButton href={solution.ctaHref} target="_blank" rel="noopener noreferrer">
              Learn More
            </CloudButton>
          </div>
        </div>
      </div>
    </section>
  );
}
