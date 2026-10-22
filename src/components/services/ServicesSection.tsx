"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { services, servicesIntro } from "@/data/services";
import { clamp, easeOutCubic } from "@/lib/scroll";

const headingWords = ["Our", "Services"];

// Stage of the journey each service belongs to (matches the Services menu)
const stage: Record<string, string> = {
  university: "Plan & apply",
  scholarship: "Plan & apply",
  tests: "Prepare & travel",
  visa: "Prepare & travel",
  landing: "Settle in abroad",
  accommodation: "Settle in abroad",
};

/* --------------------------------------------------------------------------
   ServicesSection — "Our Services" in a staggered two-column grid
   --------------------------------------------------------------------------
   Scroll drives three CSS variables (no React re-renders):
     --hp  on the section: heading words slide up out of their masks
     --sp  on the section: the right column travels faster than the left,
           closing its offset as you scroll (staggered parallax)
     --rv / --pa on each card: reveal (unmask from below) and image parallax
     --vel / --vabs on the section: eased scroll velocity; the cards bend
           (skew + squash) with it, after the featured work on lusion.co
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;
    let vel = 0;
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

      // Scroll velocity (−1…1), eased so the cards bend with the scroll and
      // relax back once it stops — like Lusion's featured work
      const y = window.scrollY;
      const target = reduce ? 0 : clamp((y - lastY) / (vh * 0.035), -1, 1);
      lastY = y;
      vel += (target - vel) * 0.18;
      if (Math.abs(vel) < 0.001) vel = 0;
      section.style.setProperty("--vel", vel.toFixed(4));
      section.style.setProperty("--vabs", Math.abs(vel).toFixed(4));

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const rv = easeOutCubic(clamp((vh - r.top) / (vh * 0.7)));
        const pa = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
        card.style.setProperty("--rv", rv.toFixed(4));
        card.style.setProperty("--pa", pa.toFixed(4));
      });

      // Keep easing until the bend has fully relaxed
      if (vel !== 0) raf = requestAnimationFrame(tick);
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
              <Link href={service.href} className="group block focus-visible:outline-none">
                {/* Media: unmasks from below on reveal, bends with scroll speed */}
                <div className="svc-media relative aspect-[4/3] overflow-hidden" onPointerMove={handlePointerMove}>
                  <div className="svc-scene absolute inset-0">
                    <Image
                      src={service.photo}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="svc-art object-cover"
                    />
                  </div>
                  <span className="svc-cursor" aria-hidden="true">
                    Explore
                  </span>
                </div>

                {/* Caption + title (title gets Lusion's slide-in arrow on hover) */}
                <div className="svc-meta mt-5 sm:mt-6">
                  <div className="svc-line overflow-hidden">
                    <p className="svc-line__inner flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate-500">
                      <span className="tabular-nums text-[#0a7fb3]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-slate-300" aria-hidden="true" />
                      {stage[service.art]}
                    </p>
                  </div>
                  <div className="svc-line overflow-hidden mt-2.5 sm:mt-3">
                    <h3 className="svc-line__inner svc-title relative text-2xl sm:text-3xl lg:text-[2.4rem] font-normal tracking-[-0.03em] text-slate-900 leading-[1.1]">
                      <span className="svc-title__arrow" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016" />
                        </svg>
                      </span>
                      <span className="svc-title__text">{service.title}</span>
                    </h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">{service.description}</p>
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
