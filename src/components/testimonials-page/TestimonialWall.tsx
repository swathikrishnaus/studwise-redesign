"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Eyebrow } from "@/components/shared/PageKit";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

const LONG = 480; // characters before a quote collapses behind "Read more"
const FIRST_BATCH = 9;
const BATCH = 6;

const CAP = "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4";

/* A review card: the student's photo, their words, then who they are and
   where they study. Set in the font's display cut, like the featured quotes. */
function StoryCard({ t, id: cardId }: { t: Testimonial; id?: string }) {
  const [open, setOpen] = useState(false);
  const long = t.quote.length > LONG;
  const id = `tm-quote-${t.slug}`;

  return (
    <article id={cardId} tabIndex={-1} className="tm-enter outline-none rounded-3xl bg-white p-6 sm:p-7 ring-1 ring-slate-900/[0.04] shadow-[0_24px_48px_-36px_rgba(15,23,42,0.35)] [font-optical-sizing:none] transition-shadow duration-300 hover:shadow-[0_28px_56px_-30px_rgba(0,110,170,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <span className="relative w-20 h-20 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-4 ring-[#F1F5F9]">
          <Image src={t.photo} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: t.focus }} />
        </span>
        <svg className="w-8 h-8 text-[#009cd9]/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9.6 6C6.5 7.3 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.6 6Z" />
        </svg>
      </div>

      <blockquote
        id={id}
        className={`mt-5 text-base sm:text-[1.0625rem] leading-[1.6] tracking-[-0.01em] text-slate-800 ${long && !open ? "line-clamp-7" : ""}`}
      >
        {t.quote}
      </blockquote>
      {long && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="mt-2 text-sm text-[#0a7fb3] hover:text-[#009cd9]"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}

      <footer className="mt-6 pt-5 border-t border-slate-100">
        <h3 className="text-[1.0625rem] leading-tight tracking-[-0.01em] text-slate-900">{t.name}</h3>
        <p className="mt-1 text-sm leading-snug text-slate-500">{t.course}</p>
        <p className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs leading-tight text-[#0a7fb3] ring-1 ring-sky-100">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={CAP} />
          </svg>
          <span className="sr-only">University: </span>
          {t.university.name}
        </p>
      </footer>
    </article>
  );
}

/* --------------------------------------------------------------------------
   Column count, following the grid's breakpoints (sm: 2, xl: 3)
   -------------------------------------------------------------------------- */
const QUERIES = ["(min-width: 1280px)", "(min-width: 640px)"];
const subscribe = (cb: () => void) => {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", cb));
  return () => lists.forEach((l) => l.removeEventListener("change", cb));
};
const columnCount = () => (window.matchMedia(QUERIES[0]).matches ? 3 : window.matchMedia(QUERIES[1]).matches ? 2 : 1);

/** Rough card height, so each card can go to the shortest column */
const weight = (t: Testimonial) => 260 + Math.min(t.quote.length, LONG) * 0.55 + (t.course.length > 40 ? 20 : 0);

/* Greedy masonry: every card joins the currently shortest column, in order.
   Cards added later only ever go below the ones already placed, so loading
   more never moves a card the reader has seen. */
function toColumns(items: Testimonial[], count: number) {
  const cols: { items: Testimonial[]; h: number }[] = Array.from({ length: count }, () => ({ items: [], h: 0 }));
  for (const t of items) {
    const col = cols.reduce((a, b) => (b.h < a.h ? b : a));
    col.items.push(t);
    col.h += weight(t);
  }
  return cols.map((c) => c.items);
}

/* --------------------------------------------------------------------------
   TestimonialWall — the reviews in a masonry wall, nine at first, then more
   in batches with "Load more stories"
   -------------------------------------------------------------------------- */
export default function TestimonialWall() {
  const cols = useSyncExternalStore(subscribe, columnCount, () => 3);
  const [count, setCount] = useState(FIRST_BATCH);
  const focusSlug = useRef<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // The featured stories are shown above, so the wall holds the rest
  const shown = testimonials.filter((t) => !t.featured);
  const visible = shown.slice(0, count);
  const remaining = shown.length - visible.length;

  const loadMore = () => {
    focusSlug.current = shown[count]?.slug ?? null;
    setCount((c) => Math.min(c + BATCH, shown.length));
  };

  // Back to the first nine, returning the reader to the top of the wall
  const showLess = () => {
    setCount(FIRST_BATCH);
    sectionRef.current?.scrollIntoView({ block: "start" });
  };

  // Keyboard and screen-reader users land on the first new story
  useEffect(() => {
    if (!focusSlug.current) return;
    document.getElementById(`story-${focusSlug.current}`)?.focus({ preventScroll: true });
    focusSlug.current = null;
  }, [count]);

  return (
    <section ref={sectionRef} id="stories" aria-labelledby="stories-heading" className="scroll-mt-6">
      <Eyebrow>Student stories</Eyebrow>
      <h2
        id="stories-heading"
        className="mt-5 font-normal tracking-[-0.04em] leading-[1.02] text-slate-900 text-[clamp(2rem,7vw,2.8rem)] sm:text-[clamp(2.4rem,5vw,3.6rem)]"
      >
        In their own <span className="text-[#0a7fb3]">words.</span>
      </h2>

      <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {toColumns(visible, cols).map((col, i) => (
          <div key={i} className="flex flex-col gap-4">
            {col.map((t) => (
              <StoryCard key={t.slug} t={t} id={`story-${t.slug}`} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-slate-500 tabular-nums" aria-live="polite">
          {remaining > 0 ? `Showing ${visible.length} of ${shown.length} stories` : `You've read all ${shown.length} stories`}
        </p>
        {remaining === 0 && shown.length > FIRST_BATCH && (
          <button
            type="button"
            onClick={showLess}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-[15px] text-slate-900 ring-1 ring-slate-900/10 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.45)] transition-colors hover:bg-[#0b2a45] hover:text-white hover:ring-[#0b2a45]"
          >
            Show less
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0-6 6m6-6 6 6" />
            </svg>
          </button>
        )}
        {remaining > 0 && (
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-[15px] text-slate-900 ring-1 ring-slate-900/10 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.45)] transition-colors hover:bg-[#0b2a45] hover:text-white hover:ring-[#0b2a45]"
          >
            Load more stories
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0-6-6m6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
