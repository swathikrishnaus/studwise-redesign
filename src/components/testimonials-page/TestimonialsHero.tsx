import Image from "next/image";
import HeroHeader from "@/components/hero/HeroHeader";
import SoftCloud, { CLOUD_PUFF } from "@/components/hero/SoftCloud";
import CloudButton from "@/components/ui/CloudButton";
import { gutter } from "@/components/shared/PageKit";
import { testimonials, testimonialsIntro } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

const universities = new Set(testimonials.map((t) => t.university.short)).size;
const colA = testimonials.filter((_, i) => i % 2 === 0);
const colB = testimonials.filter((_, i) => i % 2 === 1);

/** Photo card used in the scrolling columns */
function PhotoCard({ t, className = "" }: { t: Testimonial; className?: string }) {
  return (
    <figure className={`relative shrink-0 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/25 ${className}`}>
      <Image src={t.photo} alt="" fill sizes="(min-width: 1024px) 220px, 180px" className="object-cover" style={{ objectPosition: t.focus }} />
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#06243d]/80 to-transparent" />
      <figcaption className="absolute inset-x-3 bottom-3 text-white">
        <span className="block text-sm leading-tight">{t.name}</span>
        <span className="block text-[11px] text-white/75">{t.university.short}</span>
      </figcaption>
    </figure>
  );
}

/* --------------------------------------------------------------------------
   TestimonialsHero — headline and social proof beside two columns of
   student photos drifting in opposite directions (a horizontal strip on
   phones). The moving photos are decorative; every story is on the page.
   Motion styles live in globals.css under "Testimonials page".
   -------------------------------------------------------------------------- */
export default function TestimonialsHero() {
  return (
    <section aria-labelledby="tm-hero-heading" className="relative bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-3 sm:pb-4 lg:pb-6`}>
        <div
          className="relative isolate overflow-hidden rounded-3xl text-white lg:min-h-[calc(100svh-7rem)] lg:grid lg:grid-cols-12"
          style={{
            background: `
              radial-gradient(ellipse at 92% 4%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 52%),
              radial-gradient(ellipse at 0% 100%, rgba(22,98,170,0.4) 0%, rgba(22,98,170,0) 55%),
              linear-gradient(160deg, #3a88cf 0%, #4794d5 42%, #5ea8df 100%)
            `,
          }}
        >
          <div className="absolute -bottom-[4%] -left-[8%] -z-10 w-[80%] sm:w-[52%] lg:w-[40%] opacity-45" aria-hidden="true">
            <SoftCloud shape={CLOUD_PUFF} seed={31} className="w-full h-auto" />
          </div>

          {/* Copy */}
          <div className="relative lg:col-span-7 flex flex-col justify-center p-6 pt-12 sm:p-10 sm:pt-14 lg:p-12 xl:p-16">
            <p className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-sky-100/90">
              {testimonialsIntro.eyebrow}
            </p>
            <h1
              id="tm-hero-heading"
              className="banner-title mt-6 [text-shadow:0_2px_24px_rgba(10,60,120,0.2)]"
            >
              Check out
              <span className="block">
                what <em className="not-italic text-[#d7f1ff]">clients</em> say
              </span>
            </h1>
            <p className="mt-6 max-w-md body-lead text-white/90">{testimonialsIntro.text}</p>

            {/* Social proof */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {testimonials.slice(0, 5).map((t) => (
                  <span key={t.slug} className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4794d5]">
                    <Image src={t.photo} alt="" fill sizes="40px" className="object-cover" style={{ objectPosition: t.focus }} />
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/90 leading-snug">
                <span className="block text-white">
                  {testimonials.length} student stories · {universities} universities
                </span>
                <span className="text-white/75">UK &amp; Germany · 550+ students guided</span>
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CloudButton href="#stories" variant="white">
                Read their stories
              </CloudButton>
              <a
                href="#consultation-panel"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-full ring-1 ring-white/40 text-sm text-white hover:bg-white/10 transition-colors"
              >
                Book free advisory
              </a>
            </div>
          </div>

          {/* Desktop: two drifting columns */}
          <div className="tm-columns relative hidden lg:block lg:col-span-5" aria-hidden="true">
            <div className="absolute inset-0 grid grid-cols-2 gap-4 overflow-hidden pr-6 xl:pr-10 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
              {[colA, colB].map((col, ci) => (
                <div key={ci} className={`tm-col flex flex-col gap-4 ${ci === 1 ? "tm-col--down" : ""}`}>
                  {[...col, ...col].map((t, i) => (
                    <PhotoCard key={`${t.slug}-${i}`} t={t} className="w-full aspect-[4/5]" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Phones and tablets: one drifting strip */}
          <div
            className="lg:hidden relative overflow-hidden pb-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-hidden="true"
          >
            <div className="tm-row flex w-max gap-3">
              {[...testimonials, ...testimonials].map((t, i) => (
                <PhotoCard key={`${t.slug}-${i}`} t={t} className="w-36 sm:w-44 aspect-[4/5]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
