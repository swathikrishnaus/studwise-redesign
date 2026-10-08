"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { services, servicesIntro } from "@/data/services";
import { clamp, easeOutCubic } from "@/lib/scroll";
import ServiceArt from "./ServiceArt";

const headingWords = ["Our", "Services"];

/* --------------------------------------------------------------------------
   ServicesSection — "Our Services" in a staggered two-column grid
   --------------------------------------------------------------------------
   Scroll drives three CSS variables (no React re-renders):
     --hp  on the section: heading words slide up out of their masks
     --sp  on the section: the right column travels faster than the left,
           closing its offset as you scroll (staggered parallax)
     --rv / --pa on each card: reveal (scale + unmask) and image parallax
   Smoothness comes from Lenis (components/layout/SmoothScroll).
   Styles live in globals.css under "Services".
   -------------------------------------------------------------------------- */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const heading = section.querySelector<HTMLElement>("[data-svc-heading]");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-svc-card]"));
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const sp = clamp((vh - rect.top) / (rect.height + vh));
      section.style.setProperty("--sp", sp.toFixed(4));

      if (heading) {
        const h = heading.getBoundingClientRect();
        section.style.setProperty("--hp", clamp((vh - h.top) / (vh * 0.55)).toFixed(4));
      }

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const rv = easeOutCubic(clamp((vh - r.top) / (vh * 0.7)));
        const pa = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
        card.style.setProperty("--rv", rv.toFixed(4));
        card.style.setProperty("--pa", pa.toFixed(4));
      });
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

  // Move the "Explore" bubble with the pointer inside a card's media
  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#F1F5F9] pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-48"
      style={{ "--sp": 0, "--hp": 0 } as CSSProperties}
    >
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ---------------- Header ---------------- */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end mb-14 sm:mb-20 lg:mb-28">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
              <span className="font-mono text-slate-400">03</span>
              <span className="h-px w-10 bg-[#009cd9]/40" aria-hidden="true" />
              What we do
            </div>
            <h2
              id="services-heading"
              data-svc-heading
              className="font-normal tracking-[-0.04em] leading-[0.92] text-slate-900 text-[clamp(3.4rem,13vw,10.5rem)]"
            >
              {headingWords.map((word, i) => (
                <span key={word} className="svc-word-mask">
                  <span className="svc-word" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="svc-intro text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-md">
              {servicesIntro}
            </p>
          </div>
        </div>

        {/* ---------------- Staggered two-column grid ---------------- */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 xl:gap-x-14 gap-y-14 sm:gap-y-20 lg:gap-y-28">
          {services.map((service, i) => (
            <li key={service.slug} data-svc-card className="svc-card">
              <Link href={`/services#${service.slug}`} className="group block focus-visible:outline-none">
                {/* Media */}
                <div
                  className="svc-media relative aspect-[4/3] overflow-hidden"
                  onPointerMove={handlePointerMove}
                >
                  <div className="svc-scene absolute inset-0">
                    <ServiceArt art={service.art} />
                  </div>
                  <span className="absolute left-5 top-5 sm:left-6 sm:top-6 font-mono text-xs tracking-widest text-slate-700/70 mix-blend-multiply">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="svc-cursor" aria-hidden="true">
                    Explore
                  </span>
                </div>

                {/* Meta */}
                <div className="svc-meta mt-5 sm:mt-6 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-normal tracking-tight text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 mt-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 transition-all duration-500 group-hover:bg-[#009cd9] group-hover:border-[#009cd9] group-hover:text-white group-hover:-rotate-45 group-focus-visible:ring-4 group-focus-visible:ring-[#009cd9]/30"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
                <span className="sr-only">Learn more about {service.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
