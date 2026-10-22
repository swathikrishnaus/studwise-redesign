"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eyebrow, Icon } from "@/components/shared/PageKit";
import { featuredTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

function Quote({ t }: { t: Testimonial }) {
  const at = t.highlight ? t.quote.indexOf(t.highlight) : -1;
  if (at < 0) return <>{t.quote}</>;
  return (
    <>
      {t.quote.slice(0, at)}
      <mark className="bg-transparent text-[#0a7fb3] [background-image:linear-gradient(transparent_62%,#d7f0fb_62%)]">
        {t.highlight}
      </mark>
      {t.quote.slice(at + t.highlight!.length)}
    </>
  );
}

const PREV = "M15 18l-6-6 6-6";
const NEXT = "M9 18l6-6-6-6";

export default function FeaturedStories() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const onScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  const step = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth) + 20), behavior: "smooth" });
  };
  const arrow = (disabled: boolean) =>
    `grid place-items-center w-12 h-12 rounded-full ring-1 transition-colors ${
      disabled
        ? "ring-slate-200 text-slate-300 cursor-not-allowed"
        : "bg-white ring-slate-200 text-slate-800 hover:bg-[#009cd9] hover:text-white hover:ring-[#009cd9]"
    }`;

  return (
    <section id="featured" aria-labelledby="featured-heading" className="px-2 sm:px-5 lg:px-8">
      <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <Eyebrow>Featured stories</Eyebrow>
          <h2
            id="featured-heading"
            className="mt-5 font-normal tracking-[-0.04em] leading-[1.02] text-slate-900 text-[clamp(2rem,7vw,2.8rem)] sm:text-[clamp(2.4rem,5vw,3.6rem)]"
          >
            Now studying <span className="text-[#0a7fb3]">in the UK.</span>
          </h2>
        </div>
        <div className="flex items-end gap-6">
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
            Two of our students on their journey with Studwise, in their own words.
          </p>
          <div className="hidden sm:flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edge.start}
              aria-label="Previous story"
              className={arrow(edge.start)}
            >
              <Icon d={PREV} className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next story" className={arrow(edge.end)}>
              <Icon d={NEXT} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rowRef}
        onScroll={onScroll}
        aria-label="Featured stories"
        data-reveal
        className="mt-10 sm:mt-14 -mx-2 sm:-mx-5 lg:-mx-8 px-2 sm:px-5 lg:px-8 flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-2 sm:scroll-px-5 lg:scroll-px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featuredTestimonials.map((t, i) => {
          const last = i === featuredTestimonials.length - 1;
          return (
            <figure
              key={t.slug}
              aria-label={`Story ${i + 1} of ${featuredTestimonials.length}: ${t.name}`}
              className={`group relative isolate grid lg:grid-cols-12 gap-3 sm:gap-4 shrink-0 w-[85%] sm:w-[84%] lg:w-[80%] overflow-hidden rounded-3xl bg-white p-3 sm:p-4 ring-1 ring-slate-900/5 ${last ? "snap-end" : "snap-start"}`}
            >
              <span
                className="pointer-events-none absolute -z-10 -top-24 -right-16 h-72 w-72 rounded-full bg-[#d7f0fb] blur-3xl opacity-70"
                aria-hidden="true"
              />

              {/* Photo */}
              <div className="relative lg:col-span-5 min-h-[20rem] sm:min-h-[26rem] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={t.photo}
                  alt={`${t.name}, ${t.course} at ${t.university.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: t.focus }}
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs text-slate-700 backdrop-blur">
                  <span className="relative flex w-2 h-2" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60 motion-reduce:animate-none" />
                    <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  Now in the {t.university.country}
                </span>
              </div>

              {/* Quote */}
              <div className="relative lg:col-span-7 flex flex-col px-3 pt-5 pb-4 sm:px-6 sm:pt-8 lg:px-10 lg:py-10">
                <blockquote className="flex-1 text-[1.2rem] sm:text-[1.45rem] lg:text-[1.6rem] leading-[1.42] tracking-[-0.02em] text-slate-800">
                  “<Quote t={t} />”
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-slate-100 pt-6">
                  <span className="flex min-w-0 items-center gap-3.5">
                    <span className="min-w-0">
                      <span className="block text-lg sm:text-xl tracking-[-0.02em] text-slate-900">{t.name}</span>
                      <span className="block text-[13px] sm:text-sm text-slate-500">{t.course}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3 sm:ml-auto">
                    {t.university.logo && (
                      <span className="grid place-items-center h-11 shrink-0">
                        <Image
                          src={t.university.logo}
                          alt=""
                          width={96}
                          height={40}
                          className="h-7 w-auto max-w-[5rem] object-contain"
                        />
                      </span>
                    )}
                    <span className="text-[13px] sm:text-sm leading-snug text-slate-700 max-w-[11rem]">
                      <span className="sr-only">University: </span>
                      {t.university.name}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
