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
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 order-2 lg:order-1">
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

            {/* Founder */}
            <figure
              data-reveal
              style={{ "--d": "0.16s" } as CSSProperties}
              className="mt-8 max-w-xl rounded-2xl bg-white ring-1 ring-slate-900/5 p-5 sm:p-6"
            >
              <blockquote className="body-text text-slate-700">
                All of this has been made possible by{" "}
                <strong className="font-medium text-slate-900">{solution.founder}</strong>, the company&apos;s{" "}
                <em>Founder</em> and <em>CEO</em>, and his visionary leadership.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3.5 pt-5 border-t border-slate-100">
                <span
                  className="grid place-items-center w-11 h-11 rounded-full bg-sky-50 text-[#0a7fb3] ring-1 ring-sky-100 text-sm tracking-wide"
                  aria-hidden="true"
                >
                  PM
                </span>
                <span>
                  <span className="block text-[15px] text-slate-900 leading-tight">{solution.founder}</span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-[#0a7fb3]">{solution.founderRole}</span>
                </span>
              </figcaption>
            </figure>

            <div data-reveal style={{ "--d": "0.24s" } as CSSProperties} className="mt-8">
              <CloudButton href={solution.ctaHref} target="_blank" rel="noopener noreferrer">
                Learn More
              </CloudButton>
            </div>
          </div>

          {/* Photo */}
          <div className="relative lg:col-span-6 order-1 lg:order-2">
            <div data-reveal="clip" className="relative aspect-[1024/769] overflow-hidden rounded-2xl">
              <Image
                src="/images/about/study-abroad-students.webp"
                alt="Studwise counsellors reviewing university options together"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
