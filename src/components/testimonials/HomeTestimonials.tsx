import Image from "next/image";
import CloudButton from "@/components/ui/CloudButton";
import { Icon } from "@/components/shared/PageKit";
import LoopCarousel from "@/components/shared/LoopCarousel";
import { testimonials, testimonialsIntro } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

const CAP = "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4";
const QUOTE =
  "M9.6 6C6.5 7.3 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.6 6Z";

// Reviews that speak about Studwise by name (three on the live page name
// "Edwise" instead, so they stay on the testimonials page only)
const reviews = testimonials.filter((t) => /studwise/i.test(t.quote));

function ReviewCard({ t, copy }: { t: Testimonial; copy?: boolean }) {
  return (
    <li className="shrink-0 w-[20.5rem] sm:w-[28rem] lg:w-[32rem] xl:w-[34rem] pr-3 sm:pr-5">
      <figure className="flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 lg:p-9 ring-1 ring-slate-900/[0.04] [font-optical-sizing:none]">
        <div className="flex items-start justify-between gap-4">
          <span className="relative w-16 h-16 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-4 ring-[#F1F5F9]">
            <Image src={t.photo} alt="" fill sizes="64px" draggable={false} className="object-cover" style={{ objectPosition: t.focus }} />
          </span>
          <svg className="w-7 h-7 text-[#009cd9]/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={QUOTE} />
          </svg>
        </div>
        <blockquote className="mt-5 flex-1 text-base sm:text-lg lg:text-xl leading-[1.6] tracking-[-0.01em] text-slate-800 line-clamp-5">
          {t.quote}
        </blockquote>
        <figcaption className="mt-6 pt-5 border-t border-slate-100">
          <span className="block text-[1.0625rem] leading-tight text-slate-900">{t.name}</span>
          <span className="mt-1 block text-sm leading-snug text-slate-500 truncate">{t.course}</span>
          <span className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs leading-tight text-[#0a7fb3] ring-1 ring-sky-100">
            <Icon d={CAP} className="w-3.5 h-3.5 shrink-0" />
            {!copy && <span className="sr-only">University: </span>}
            <span className="truncate">{t.university.name}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/* --------------------------------------------------------------------------
   HomeTestimonials — student reviews gliding past in one auto-scrolling row
   (components/shared/LoopCarousel, also scrollable by hand), with a link to the full page
   -------------------------------------------------------------------------- */
export default function HomeTestimonials() {
  const [first, ...rest] = testimonialsIntro.title.split(" what ");
  return (
    <section aria-labelledby="home-testimonials-heading" className="bg-[#F1F5F9] py-14 sm:py-24 lg:py-32">
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">{testimonialsIntro.eyebrow}</p>
            <h2
              id="home-testimonials-heading"
              className="section-title mt-5 text-slate-900"
            >
              {rest.length ? (
                <>
                  {first} what <span className="text-[#0a7fb3]">{rest.join(" what ")}</span>
                </>
              ) : (
                testimonialsIntro.title
              )}
            </h2>
            <p className="mt-5 body-lead text-slate-600">{testimonialsIntro.text}</p>
          </div>
          <div className="shrink-0">
            <CloudButton href="/testimonials" className="mt-0">
              View all testimonials
            </CloudButton>
          </div>
        </div>
      </div>

      <LoopCarousel
        duration={90}
        className="mt-12 sm:mt-16 py-4 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        trackClassName="items-stretch pl-5 sm:pl-8 lg:pl-12 xl:pl-16"
      >
        <ul className="flex" aria-label="Student reviews">
          {reviews.map((t) => (
            <ReviewCard key={t.slug} t={t} />
          ))}
        </ul>
        <ul data-loop-copy className="flex" aria-hidden="true">
          {reviews.map((t) => (
            <ReviewCard key={t.slug} t={t} copy />
          ))}
        </ul>
      </LoopCarousel>
    </section>
  );
}
