"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { countryOffers, totalOffers } from "@/data/globalReach";
import type { CountryOffers } from "@/data/globalReach";
import { clamp, easeInOutCubic, easeOutCubic, lerp, prefersReducedMotion, smoothstep } from "@/lib/scroll";

const fmt = (n: number) => n.toLocaleString("en-IN");

// Tiers by number of offers — each tier gets its own arrangement
const giants = countryOffers.slice(0, 4); // 7,000 – 2,000
const orbit = countryOffers.slice(4, 8); // 1,000 – 600
const cards = countryOffers.slice(8, 13); // 300 – 30
const chips = countryOffers.slice(13); // 20 – 10

const tierLabel = (list: CountryOffers[]) =>
  `${fmt(list[0].offers)} – ${fmt(list[list.length - 1].offers)} offers`;

function Count({ value }: { value: number }) {
  return (
    <>
      <span data-count={value} aria-hidden="true">0</span>
      <span className="text-[#009cd9]">+</span>
      <span className="sr-only">{fmt(value)}+</span>
    </>
  );
}

function Flag({ code, className = "" }: { code: string; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ring-1 ring-slate-900/10 ${className}`}>
      <Image src={`/flags/${code}.svg`} alt="" fill sizes="220px" className="object-cover" />
    </span>
  );
}

function TierLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 lg:mb-12 lg:text-center text-[11px] sm:text-xs uppercase tracking-[0.22em] text-slate-400">
      {children}
    </div>
  );
}

/**
 * The smaller tiers, as aligned cards either side of the plane's lane.
 * Countries alternate left / right so both columns stay balanced; "lg"
 * cards show a bar of each country's share of its tier's top count.
 */
function CountryColumns({ list, size }: { list: CountryOffers[]; size: "lg" | "sm" }) {
  const max = list[0].offers;
  return (
    // Below lg the side columns dissolve (display: contents) and `order`
    // lists the countries in true descending order in one flow
    <div
      className={`grid gap-3 sm:gap-4 lg:gap-0 lg:grid-cols-[1fr_minmax(380px,30vw)_1fr] ${size === "sm" ? "sm:grid-cols-2" : ""}`}
    >
      {[0, 1].map((side) => (
        <div
          key={side}
          className={`contents lg:grid lg:gap-4 lg:content-start lg:w-full lg:max-w-[30rem] ${size === "sm" ? "lg:grid-cols-2" : "lg:grid-cols-1"} ${
            side === 0 ? "lg:col-start-1 lg:justify-self-end" : "lg:col-start-3 lg:justify-self-start"
          }`}
        >
          {list
            .map((c, i) => ({ c, i }))
            .filter(({ i }) => i % 2 === side)
            .map(({ c, i }) =>
              size === "lg" ? (
                <div
                  key={c.code}
                  data-reveal
                  className="reach-card flex items-center gap-4 rounded-2xl bg-white ring-1 ring-slate-200/80 p-4 sm:p-5 shadow-[0_18px_40px_-28px_rgba(0,80,130,0.35)]"
                  style={{ "--i": i, order: i } as CSSProperties}
                >
                  <Flag code={c.code} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
                      <span className="text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">{c.country}</span>
                      <span className="text-sm sm:text-base text-slate-500 tabular-nums whitespace-nowrap">
                        <Count value={c.offers} /> offers
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-sky-50 overflow-hidden" aria-hidden="true">
                      <div
                        className="reach-bar h-full rounded-full bg-[#009cd9]"
                        style={{ width: `${Math.max(6, (c.offers / max) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={c.code}
                  data-reveal
                  className="reach-card flex items-center gap-3 rounded-2xl bg-white ring-1 ring-slate-200/80 p-3 sm:p-4 shadow-[0_14px_30px_-24px_rgba(0,80,130,0.35)]"
                  style={{ "--i": i, order: i } as CSSProperties}
                >
                  <Flag code={c.code} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base tracking-tight text-slate-900 leading-tight">{c.country}</div>
                    <div className="text-xs sm:text-sm text-slate-500 tabular-nums">
                      <Count value={c.offers} /> offers
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   StudentsSection — "Our Students Across The Globe"
   --------------------------------------------------------------------------
   A top-down airplane flies the whole section, like the bottle on
   klimtwine.com: it drops in from above the viewport while the previous
   section is still on screen (small, angled, high up), settles into the
   centre lane, weaves and banks past the countries on either side, then
   lands in the centre of a panel that scales up from the bottom ("Taste
   the Art of Wine" on klimtwine). It is a fixed overlay positioned from
   scroll each frame. Countries are grouped by offers and each group has
   its own arrangement: giant names, orbiting flag tokens, then aligned
   country cards and compact chips either side of the lane.
   Scroll sets --rv on each [data-reveal] (reveal 0→1) and flips
   data-on once an item is in view; styles live in globals.css.
   -------------------------------------------------------------------------- */
export default function StudentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const flyer = flyerRef.current;
    const plane = planeRef.current;
    const shadow = shadowRef.current;
    const landing = section?.querySelector<HTMLElement>("[data-landing]");
    if (!section || !track || !flyer || !plane || !shadow || !landing) return;
    let size = 0;

    const heading = section.querySelector<HTMLElement>("[data-heading]");
    const reveals = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    const total = section.querySelector<HTMLElement>("[data-total]");
    const reduce = prefersReducedMotion();
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const desktop = window.innerWidth >= 1024;

      if (heading) {
        const h = heading.getBoundingClientRect();
        section.style.setProperty("--hp", clamp((vh - h.top) / (vh * 0.55)).toFixed(4));
      }

      // Flight progress along the track (0 at its top, 1 at its bottom)
      const t = track.getBoundingClientRect();
      const p = clamp((vh / 2 - t.top) / Math.max(1, t.height - vh / 2));
      section.style.setProperty("--tp", p.toFixed(4));

      // ---------------- Airplane ----------------
      const vw = window.innerWidth;
      const nextSize = desktop ? Math.round(Math.min(340, vh * 0.38)) : vw >= 640 ? 130 : 100;
      if (nextSize !== size) {
        size = nextSize;
        flyer.style.width = flyer.style.height = `${size}px`;
        section.style.setProperty("--plane-size", `${size}px`);
      }

      const s = section.getBoundingClientRect();
      const l = landing.getBoundingClientRect();
      // Entry: drops in from just above the viewport while the section's
      // top edge travels from the bottom of the screen to the top
      const enter = easeInOutCubic(clamp(1 - s.top / vh));
      // Exit: once the landing panel's centre climbs past mid-screen, the
      // plane rides along with it (it has touched down)
      const y = Math.min(lerp(-size * 0.75, vh / 2, enter), l.top + l.height / 2);
      // Below lg there is no room for a lane beside the content, so the
      // plane waits for the landing panel and fades in as it arrives
      const arrive = desktop ? 1 : clamp((vh * 0.8 - l.top) / (vh * 0.35));
      const visible = s.top < vh && l.bottom > 0 && arrive > 0;
      flyer.style.visibility = visible ? "visible" : "hidden";
      flyer.style.opacity = String(arrive);

      // Final approach: everything straightens out as the panel arrives
      const settle = 1 - smoothstep(0.35, 1, clamp((vh - l.top) / vh));
      const motion = reduce ? 0 : 1;
      const turn = Math.cos(p * Math.PI * 5) * settle * enter * motion;
      const laneX = vw / 2;
      const x = laneX + (desktop ? Math.sin(p * Math.PI * 5) * Math.min(vw * 0.04, 64) * settle * enter * motion : 0);
      // Comes in banked and smaller (higher up), like the bottle swinging in
      const noseTurn = -turn * 12 - (1 - enter) * 28 * motion;
      const bankY = turn * 26 + (1 - enter) * 20 * motion;
      const scale =
        (0.55 + 0.45 * enter) * (1 + Math.sin(p * Math.PI) * 0.08 * motion) * (1 - (1 - settle) * 0.1);

      flyer.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      plane.style.transform =
        `perspective(1000px) rotateZ(${noseTurn}deg) rotateY(${bankY}deg) scale(${scale})`;
      // Ground shadow drifts further away the higher the plane is
      const altitude = (0.35 + 0.65 * settle) * (1 + (1 - enter) * 1.2);
      shadow.style.transform =
        `translate3d(${46 * altitude}px, ${64 * altitude}px, 0) rotateZ(${noseTurn}deg) scale(${scale * 0.95})`;
      shadow.style.opacity = String(Math.max(0.08, 0.3 - altitude * 0.12));

      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        const rv = easeOutCubic(clamp((vh * 0.92 - r.top) / (vh * 0.35)));
        el.style.setProperty("--rv", rv.toFixed(4));
        if (rv > 0.35) el.dataset.on = "true";
        el.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => {
          c.textContent = fmt(Math.round(Number(c.dataset.count) * rv));
        });
      });

      landing.style.setProperty("--lv", easeOutCubic(clamp((vh - l.top) / vh)).toFixed(4));

      if (total) {
        const r = total.getBoundingClientRect();
        // Finishes counting by the time the plane touches down
        const k = easeOutCubic(clamp((vh - r.top) / (vh * 0.28)));
        total.textContent = fmt(Math.round(totalOffers * k));
      }
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

  return (
    <section
      ref={sectionRef}
      id="students"
      aria-labelledby="students-heading"
      className="relative overflow-x-clip bg-[#F1F5F9] pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40"
      style={{ "--hp": 0, "--tp": 0, "--plane-size": "100px" } as CSSProperties}
    >
      {/* ---------------- The flying airplane (fixed overlay) ---------------- */}
      <div
        ref={flyerRef}
        className="fixed left-0 top-0 z-30 pointer-events-none will-change-transform"
        style={{ width: 100, height: 100, visibility: "hidden" }}
        aria-hidden="true"
      >
        <div ref={shadowRef} className="absolute inset-0 will-change-transform">
          <Image src="/images/plane-top-cutout.png" alt="" fill sizes="340px" className="object-contain brightness-0 blur-[10px]" />
        </div>
        <div ref={planeRef} className="absolute inset-0 will-change-transform">
          <div className="relative h-full animate-[plane-hover-float_5s_ease-in-out_infinite]">
            <Image src="/images/plane-top-cutout.png" alt="" fill sizes="340px" className="object-contain" />
          </div>
        </div>
      </div>

      {/* ---------------- Header ---------------- */}
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 lg:text-center mb-14 lg:mb-10">
        <div className="flex lg:justify-center items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
          <span className="h-px w-10 bg-[#009cd9]/40" aria-hidden="true" />
          Global reach
        </div>
        <h2
          id="students-heading"
          data-heading
          className="font-normal tracking-[-0.045em] leading-[0.95] text-[clamp(2.6rem,10vw,8rem)]"
        >
          <span className="svc-word-mask">
            <span className="svc-word text-slate-900" style={{ "--i": 0 } as CSSProperties}>Our Students</span>
          </span>
          <br />
          <span className="svc-word-mask">
            <span className="svc-word text-[#009cd9]" style={{ "--i": 1 } as CSSProperties}>Across The Globe</span>
          </span>
        </h2>
      </div>

      {/* ======================================================
          Flight track: the plane flies down its centre lane
          ====================================================== */}
      <div ref={trackRef} className="relative">
        {/* Dashed flight line, drawn as the plane descends (desktop) */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-[50svh] w-px -translate-x-1/2 pointer-events-none [background:repeating-linear-gradient(to_bottom,rgba(0,156,217,0.35)_0_8px,transparent_8px_18px)] origin-top scale-y-[var(--tp)]"
          aria-hidden="true"
        />

        <div className="relative max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-[8vh] lg:pt-[28vh]">
          {/* ---------- 1. Giants: huge names either side of the lane ---------- */}
          <TierLabel>{tierLabel(giants)}</TierLabel>
          <div className="grid grid-cols-2 lg:grid-cols-[1fr_minmax(380px,30vw)_1fr] gap-x-4 gap-y-10 lg:gap-y-[16vh] mb-[10vh] lg:mb-[26vh]">
            {giants.map((c, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={c.code}
                  data-reveal
                  className={`giant ${left ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"}`}
                  style={{ "--dir": left ? -1 : 1 } as CSSProperties}
                >
                  <div className={`flex items-center gap-3 ${left ? "lg:justify-end" : ""}`}>
                    <Flag code={c.code} className="w-12 h-8 sm:w-14 sm:h-10 rounded-lg shadow-sm" />
                    <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-3 text-[clamp(2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.05em] text-slate-900">
                    {c.country}
                  </div>
                  <div className="mt-3 text-xl sm:text-2xl lg:text-3xl tracking-tight text-slate-700 tabular-nums">
                    <Count value={c.offers} /> <span className="text-slate-400 text-base sm:text-lg">offers</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- 2. Orbit: floating flag tokens around the lane ---------- */}
          <TierLabel>{tierLabel(orbit)}</TierLabel>
          <div className="grid grid-cols-2 lg:grid-cols-[1fr_minmax(380px,30vw)_1fr] gap-x-4 gap-y-10 lg:gap-y-0 mb-[10vh] lg:mb-[26vh]">
            {[0, 1].map((side) => (
              <div
                key={side}
                className={`contents lg:flex lg:flex-col lg:gap-16 ${side === 0 ? "lg:col-start-1 lg:items-end" : "lg:col-start-3 lg:items-start lg:pt-20"}`}
              >
                {orbit.slice(side * 2, side * 2 + 2).map((c, j) => (
                  <div
                    key={c.code}
                    data-reveal
                    className="orbit-token flex flex-col items-center text-center"
                    style={{ "--float-delay": `${(side * 2 + j) * -1.4}s` } as CSSProperties}
                  >
                    <div className="orbit-token__disc">
                      <Flag code={c.code} className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 rounded-full ring-[6px] ring-white shadow-[0_24px_40px_-18px_rgba(0,80,130,0.45)]" />
                    </div>
                    <div className="mt-4 text-xl sm:text-2xl lg:text-3xl tracking-tight text-slate-900">{c.country}</div>
                    <div className="mt-1 text-sm sm:text-base text-slate-500 tabular-nums">
                      <Count value={c.offers} /> offers
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- 3. Country cards, aligned either side of the lane ---------- */}
          <TierLabel>{tierLabel(cards)}</TierLabel>
          <div className="mb-[10vh] lg:mb-[20vh]">
            <CountryColumns list={cards} size="lg" />
          </div>

          {/* ---------- 4. Compact country chips ---------- */}
          <TierLabel>{tierLabel(chips)}</TierLabel>
          <CountryColumns list={chips} size="sm" />
        </div>

        {/* ---------------- Landing panel: scales up, the plane touches down ---------------- */}
        <div data-landing className="relative mt-[18vh] px-3 sm:px-4 lg:px-6 xl:px-7">
          <div className="landing-panel relative h-svh max-w-[1728px] mx-auto overflow-hidden bg-gradient-to-b from-[#d9f0fb] via-[#eaf7fd] to-[#d4eefa]">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[420px] rounded-full bg-white/70 blur-[90px]" aria-hidden="true" />
            <Image src="/images/cloud.png" alt="" width={380} height={203} className="absolute -left-16 bottom-[18%] w-[38%] max-w-[420px] h-auto opacity-90 translate-x-[calc((1-var(--lv))*-80px)]" />
            <Image src="/images/cloud.png" alt="" width={340} height={181} className="absolute -right-14 top-[14%] w-[30%] max-w-[340px] h-auto opacity-80 translate-x-[calc((1-var(--lv))*80px)]" />

            {/* Touchdown pad, centred under where the plane parks */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[calc(var(--plane-size)*1.05)] aspect-square rounded-full border-2 border-dashed border-[#009cd9]/40"
              aria-hidden="true"
            >
              <div className="absolute inset-[18%] rounded-full bg-white/50" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-end text-center pb-[8vh] px-6">
              <div className="text-[clamp(3.4rem,12vw,10rem)] leading-none tracking-[-0.05em] text-slate-900 tabular-nums">
                <span data-total aria-hidden="true">0</span>
                <span className="text-[#009cd9]">+</span>
                <span className="sr-only">{fmt(totalOffers)}+</span>
              </div>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                offers secured for our students across {countryOffers.length} countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
