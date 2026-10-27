"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/shared/PageKit";
import { getLenis } from "@/components/layout/SmoothScroll";
import { lockNav, pinnedProgress, unlockNav } from "@/lib/scroll";
import { spotlightIntro, spotlightStudents } from "@/data/studentSpotlight";
import type { SpotlightStudent } from "@/data/studentSpotlight";

const total = spotlightStudents.length;
const pad = (n: number) => String(n).padStart(2, "0");
const CAP = "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4";
const PIN = "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";

function Glyph({ d, className = "w-3.5 h-3.5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    </svg>
  );
}

/** Confirmed details only; "Graduation day" (what every photo shows) until a country is added */
function Tags({ s }: { s: SpotlightStudent }) {
  const tag = "inline-flex items-center gap-1.5 h-7 rounded-full px-2.5 text-[12.5px] leading-none";
  return (
    <ul className="flex flex-wrap gap-1.5">
      <li className={`${tag} bg-white text-[#0a7fb3] ring-1 ring-[#009cd9]/15`}>
        <Glyph d={s.country ? PIN : CAP} />
        {s.country ?? "Graduation day"}
      </li>
      {s.course && <li className={`${tag} bg-white text-slate-600 ring-1 ring-slate-900/[0.06]`}>{s.course}</li>}
      {s.university && (
        <li className={`${tag} bg-white text-slate-600 ring-1 ring-slate-900/[0.06]`}>
          <Glyph d={CAP} />
          {s.university}
        </li>
      )}
    </ul>
  );
}

function Counter({ index, className = "" }: { index: number; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-sm tabular-nums tracking-[0.12em] text-slate-900" aria-hidden="true">
        {pad(index + 1)} <span className="text-slate-400">/ {pad(total)}</span>
      </span>
      <span className="flex flex-1 max-w-40 gap-1.5" aria-hidden="true">
        {spotlightStudents.map((s, i) => (
          <span key={s.name} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-slate-900/10">
            <span
              className={`absolute inset-0 origin-left rounded-full bg-[#009cd9] transition-transform duration-500 ${i <= index ? "scale-x-100" : "scale-x-0"}`}
            />
          </span>
        ))}
      </span>
    </div>
  );
}

export default function StudentSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);

  // First reveal when the section comes into view (photos only start hidden once this runs)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    setReady(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Desktop: scroll through the pinned scene picks the student
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      const p = pinnedProgress(el);
      setActive(Math.min(total - 1, Math.floor(p * total)));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Phones: the swipe position picks the counter
  const onRowScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.firstElementChild as HTMLElement | null;
    if (!card) return;
    setSlide(Math.min(total - 1, Math.round(row.scrollLeft / (card.offsetWidth + 12))));
  };

  // A face in the desktop scene scrolls to that student's stretch of it,
  // keeping the site header hidden while it does (see HeroHeader)
  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / total) * distance;
    lockNav();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(top, { duration: 1, onComplete: unlockNav });
      window.setTimeout(unlockNav, 1600);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(unlockNav, 1200);
    }
  };

  const current = spotlightStudents[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="spotlight-heading"
      data-ready={ready || undefined}
      className="spotlight relative bg-[#F1F5F9] lg:h-[230svh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-svh">
        <div className="w-full lg:h-full max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 py-3 sm:py-4 lg:py-6">
          {/* A soft sky panel, so the section reads as its own scene */}
          <div className="relative isolate overflow-hidden lg:h-full rounded-3xl bg-gradient-to-br from-[#c9e8f8] via-[#dcf0fa] to-[#ecf7fd] ring-1 ring-[#009cd9]/10 py-10 sm:py-14 lg:py-0 lg:flex lg:items-center">
            <span
              className="pointer-events-none absolute -top-40 -left-32 -z-10 w-[34rem] h-[34rem] rounded-full bg-white/45 blur-3xl"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-48 right-1/4 -z-10 w-[30rem] h-[30rem] rounded-full bg-[#009cd9]/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="w-full lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:h-[min(46rem,calc(100svh-7rem))] px-5 sm:px-8 lg:px-8 xl:px-10">
              {/* ---------------- Intro and the current student ---------------- */}
              <div className="lg:col-span-5 flex flex-col lg:py-4 xl:pl-6">
                <Eyebrow>
                  {spotlightIntro.label}
                </Eyebrow>
                <h2
                  id="spotlight-heading"
                  className="mt-4 text-[2.3rem] sm:text-5xl xl:text-[3.6rem] leading-[1.02] tracking-[-0.04em] text-slate-900"
                >
                  {spotlightIntro.title} <span className="text-[#0a7fb3]">{spotlightIntro.accent}</span>
                </h2>
                <p className="mt-4 max-w-md body-text text-slate-600">{spotlightIntro.text}</p>

                {/* Desktop: the featured student's details */}
                <div className="hidden lg:flex flex-1 flex-col justify-end">
                  <Counter index={active} />
                  <div key={active} className="spotlight-details mt-6" aria-live="polite">
                    <p className="text-[2.6rem] xl:text-[3.2rem] leading-none tracking-[-0.04em] text-slate-900">{current.name}</p>
                    <div className="mt-4">
                      <Tags s={current} />
                    </div>
                    <p className="mt-4 max-w-sm text-[1.05rem] leading-relaxed text-slate-600">{current.caption}</p>
                  </div>
                  <ul className="mt-8 flex items-center gap-2" aria-label="Choose a student">
                    {spotlightStudents.map((s, i) => (
                      <li key={s.name}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-label={`Show ${s.name}`}
                          aria-current={i === active || undefined}
                          className={`relative block w-12 h-12 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#dcf0fa] transition-[box-shadow,opacity] duration-300 ${
                            i === active ? "ring-[#009cd9]" : "ring-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={s.photo} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: s.focus }} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ---------------- Desktop: the featured photograph ---------------- */}
              <div className="hidden lg:block lg:col-span-7 relative">
                <div className="relative h-full overflow-hidden rounded-2xl bg-[#cfe6f3]">
                  {spotlightStudents.map((s, i) => (
                    <div
                      key={s.name}
                      className="spotlight-photo absolute inset-0"
                      data-on={seen && i <= active}
                      style={{ zIndex: i + 1 }}
                      aria-hidden={i !== active || undefined}
                    >
                      <Image
                        src={s.photo}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 1728px) 950px, 58vw"
                        className="spotlight-photo__img object-cover"
                        style={{ objectPosition: s.focus }}
                      />
                    </div>
                  ))}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#0b2a45]/45 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    key={`tag-${active}`}
                    className="spotlight-details absolute left-6 bottom-6 z-20 inline-flex items-center gap-2 h-9 rounded-full bg-white/20 px-3.5 text-[13px] text-white ring-1 ring-white/35 backdrop-blur-md"
                    aria-hidden="true"
                  >
                    <Glyph d={current.country ? PIN : CAP} />
                    {current.name}
                    <span className="text-white/60">·</span>
                    {current.country ?? "Graduation day"}
                  </span>
                </div>
              </div>
            </div>

            {/* ---------------- Phones and tablets: a swipeable row ---------------- */}
            <div className="lg:hidden mt-8">
              <ul
                ref={rowRef}
                onScroll={onRowScroll}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 scroll-px-5 sm:scroll-px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Students abroad"
              >
                {spotlightStudents.map((s) => (
                  <li key={s.name} className="snap-start shrink-0 w-[82%] sm:w-[46%]">
                    <div className="spotlight-photo relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#cfe6f3]" data-on={seen}>
                      <Image
                        src={s.photo}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 640px) 46vw, 82vw"
                        className="spotlight-photo__img object-cover"
                        style={{ objectPosition: s.focus }}
                      />
                    </div>
                    <p className="mt-4 text-2xl leading-none tracking-[-0.03em] text-slate-900">{s.name}</p>
                    <div className="mt-3">
                      <Tags s={s} />
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.caption}</p>
                  </li>
                ))}
              </ul>
              <Counter index={slide} className="mt-5 px-5 sm:px-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
