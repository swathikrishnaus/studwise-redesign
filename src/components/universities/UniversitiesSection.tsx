"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { partnerUniversities, universitiesIntro } from "@/data/globalReach";
import { clamp, prefersReducedMotion } from "@/lib/scroll";

const STOP_WORDS = new Set(["of", "the", "university"]);

/** "University of East London" → "EL", "BPP University" → "BPP" */
function monogram(name: string): string {
  const words = name.split(" ").filter((w) => !STOP_WORDS.has(w.toLowerCase()));
  const acronym = words.find((w) => w.length <= 4 && w === w.toUpperCase());
  if (acronym) return acronym;
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

// Three marquee rows, like the three rows on the original logo board
const rows = [
  partnerUniversities.slice(0, 6),
  partnerUniversities.slice(6, 12),
  partnerUniversities.slice(12),
];
const ROW_DIRECTION = [-1, 1, -1];
const BASE_SPEED = 0.45; // px per frame

/* --------------------------------------------------------------------------
   UniversitiesSection — partner universities
   --------------------------------------------------------------------------
   Three marquee rows run in alternating directions. Scrolling adds to
   their speed (and the push decays smoothly afterwards), so the rows
   react to the page like the rest of the scroll experience. A row pauses
   while hovered. The loop only runs while the section is on screen.
   -------------------------------------------------------------------------- */
export default function UniversitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const heading = section.querySelector<HTMLElement>("[data-heading]");
    const tracks = Array.from(section.querySelectorAll<HTMLElement>("[data-track]"));
    const reduce = prefersReducedMotion();

    const offsets = tracks.map(() => 0);
    const paused = tracks.map(() => false);
    let boost = 0;
    let lastY = window.scrollY;
    let visible = false;
    let raf = 0;

    const pauseHandlers = tracks.map((track, i) => {
      const enter = () => (paused[i] = true);
      const leave = () => (paused[i] = false);
      track.addEventListener("pointerenter", enter);
      track.addEventListener("pointerleave", leave);
      return { track, enter, leave };
    });

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (heading) {
        const h = heading.getBoundingClientRect();
        section.style.setProperty("--hp", clamp((vh - h.top) / (vh * 0.55)).toFixed(4));
      }

      const y = window.scrollY;
      boost = boost * 0.9 + Math.min(Math.abs(y - lastY), 120) * 0.08;
      lastY = y;

      if (!reduce) {
        tracks.forEach((track, i) => {
          // Each track holds its items twice; wrap at half its width
          const half = track.scrollWidth / 2;
          if (!paused[i]) offsets[i] += ROW_DIRECTION[i] * (BASE_SPEED + boost);
          if (offsets[i] <= -half) offsets[i] += half;
          if (offsets[i] > 0) offsets[i] -= half;
          track.style.transform = `translate3d(${offsets[i]}px, 0, 0)`;
        });
      }

      if (visible) raf = requestAnimationFrame(frame);
    };

    // Start every row from a different phase
    tracks.forEach((track, i) => {
      offsets[i] = -(track.scrollWidth / 2) * (i / 3);
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      pauseHandlers.forEach(({ track, enter, leave }) => {
        track.removeEventListener("pointerenter", enter);
        track.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="universities"
      aria-labelledby="universities-heading"
      className="relative bg-[#F1F5F9] pb-24 sm:pb-32 lg:pb-40"
      style={{ "--hp": 0 } as CSSProperties}
    >
      <div className="max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7">
        <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-white ring-1 ring-slate-200/70 py-14 sm:py-20 lg:py-28">
          {/* ---------------- Header ---------------- */}
          <div className="px-5 sm:px-8 lg:px-12 xl:px-14 grid lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
                <span className="font-mono text-slate-400">06</span>
                <span className="h-px w-10 bg-[#009cd9]/40" aria-hidden="true" />
                Partners
              </div>
              <h2
                id="universities-heading"
                data-heading
                className="font-normal tracking-[-0.04em] leading-[0.95] text-slate-900 text-[clamp(2.8rem,11vw,8.5rem)]"
              >
                <span className="svc-word-mask">
                  <span className="svc-word" style={{ "--i": 0 } as CSSProperties}>
                    Universities
                  </span>
                </span>
              </h2>
            </div>
            <p className="svc-intro lg:col-span-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-md lg:justify-self-end">
              {universitiesIntro}
            </p>
          </div>

          {/* ---------------- Marquee rows ---------------- */}
          <ul className="sr-only">
            {partnerUniversities.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <div
            className="flex flex-col gap-3 sm:gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
            aria-hidden="true"
          >
            {rows.map((row, ri) => (
              <div key={ri} className="overflow-hidden">
                <div data-track className="flex w-max gap-3 sm:gap-4 will-change-transform">
                  {[...row, ...row].map((name, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-3 sm:gap-4 rounded-full bg-[#F1F5F9] pl-2 pr-6 sm:pl-2.5 sm:pr-8 py-2 sm:py-2.5 transition-colors duration-300 hover:bg-[#009cd9]"
                    >
                      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#009cd9] text-xs sm:text-sm tracking-wide flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-[-12deg]">
                        {monogram(name)}
                      </span>
                      <span className="whitespace-nowrap text-base sm:text-xl lg:text-2xl tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-white">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
