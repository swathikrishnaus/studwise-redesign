"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import CloudButton from "@/components/ui/CloudButton";
import {
  aboutIntro,
  aboutStats,
  aboutTagline,
  branches,
  routeStops,
} from "@/data/about";
import {
  easeOutCubic,
  lerp,
  pinnedProgress,
  prefersReducedMotion,
  smoothstep,
} from "@/lib/scroll";
import { buildRoutePath, routeProgress } from "./route";

const introWords = aboutIntro.split(" ");
const countries = routeStops.filter((s) => s.kind === "country");

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  const [box, setBox] = useState({ w: 100, h: 100 });
  const [pins, setPins] = useState<{ x: number; y: number }[]>([]);
  const routeD = buildRoutePath(box.w, box.h);

  // Track the route box size so the path is drawn in real pixels
  useEffect(() => {
    const el = routeRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: Math.max(1, width), h: Math.max(1, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Place stop pins on the path (as percentages of the box)
  useLayoutEffect(() => {
    const path = progressPathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.dataset.length = String(length);
    setPins(
      routeStops.map((stop) => {
        const p = path.getPointAtLength(stop.t * length);
        return { x: (p.x / box.w) * 100, y: (p.y / box.h) * 100 };
      })
    );
    // Re-apply the current scroll state against the new path length
    window.dispatchEvent(new Event("scroll"));
  }, [box.w, box.h]);

  // Scroll-driven timeline
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = prefersReducedMotion();
    const pinEls = Array.from(section.querySelectorAll<HTMLElement>("[data-stop]"));
    const labelEls = Array.from(section.querySelectorAll<HTMLElement>("[data-stop-label]"));
    const counterEls = Array.from(section.querySelectorAll<HTMLElement>("[data-counter]"));
    const readoutName = section.querySelector<HTMLElement>("[data-readout-name]");
    const readoutCoords = section.querySelector<HTMLElement>("[data-readout-coords]");
    const block2 = section.querySelector<HTMLElement>('[data-stage-block="2"]');
    const block3 = section.querySelector<HTMLElement>('[data-stage-block="3"]');

    let current = pinnedProgress(section);
    let lastStop = -2;
    let raf = 0;

    const apply = (p: number) => {
      const s = section.style;
      const m2 = smoothstep(0.19, 0.24, p) * (1 - smoothstep(0.7, 0.75, p));
      const m3 = smoothstep(0.73, 0.79, p);
      s.setProperty("--pb", p.toFixed(4));
      s.setProperty("--r1", smoothstep(0, 0.17, p).toFixed(4));
      s.setProperty("--m1", (1 - smoothstep(0.17, 0.22, p)).toFixed(4));
      s.setProperty("--m2", m2.toFixed(4));
      s.setProperty("--m3", m3.toFixed(4));
      // Hidden blocks leave the tab order and stop catching clicks
      if (block2) block2.style.visibility = m2 > 0.01 ? "visible" : "hidden";
      if (block3) block3.style.visibility = m3 > 0.01 ? "visible" : "hidden";

      // Route drawing
      const rp = routeProgress(p);
      const path = progressPathRef.current;
      const length = Number(path?.dataset.length ?? 0);
      if (path && length) path.style.strokeDashoffset = String(length * (1 - rp));

      // Stops reached so far
      let reached = -1;
      routeStops.forEach((stop, i) => {
        if (rp >= stop.t - 0.004) reached = i;
      });
      if (reached !== lastStop) {
        lastStop = reached;
        pinEls.forEach((el) => {
          el.dataset.active = String(Number(el.dataset.stop) <= reached);
        });
        labelEls.forEach((el) => {
          el.dataset.active = String(Number(el.dataset.stopLabel) <= reached);
        });
        const stop = routeStops[Math.max(0, reached)];
        if (readoutName) {
          readoutName.textContent = reached < 0 ? "Departing" : stop.name;
          // A small lift as each new country comes in
          if (!reduce) readoutName.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "ease-out" });
        }
        if (readoutCoords) readoutCoords.textContent = stop.coords;
      }

      // Counters
      const c = easeOutCubic(smoothstep(0.78, 0.93, p));
      counterEls.forEach((el, i) => {
        el.textContent = Math.round(aboutStats[i].value * c).toLocaleString("en-IN");
      });
    };

    const tick = () => {
      raf = 0;
      const target = pinnedProgress(section);
      current = reduce ? target : lerp(current, target, 0.2);
      if (Math.abs(target - current) < 0.0004) current = target;
      apply(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    apply(current);
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
      id="about"
      data-flight-section
      aria-labelledby="about-heading"
      className="relative h-[420vh] lg:h-[320vh] bg-[#F1F5F9]"
      style={
        { "--pb": 0, "--r1": 0, "--m1": 1, "--m2": 0, "--m3": 0 } as CSSProperties
      }
    >
      <div className="sticky top-0 h-svh w-full p-3 sm:p-4 lg:p-6 xl:p-7">
        <div className="relative mx-auto h-full max-w-[1728px] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-b from-[#dff2fb] via-[#f2faff] to-white text-slate-800">
          {/* ---------------- Sky: drifting clouds ---------------- */}
          <div
            className="hidden lg:block absolute -left-16 top-[8%] w-[340px] opacity-70 pointer-events-none translate-x-[calc(var(--pb)*60px)]"
            aria-hidden="true"
          >
            <Image src="/images/cloud.png" alt="" width={340} height={181} className="w-full h-auto" />
          </div>
          <div
            className="absolute right-[-60px] top-[38%] w-[220px] sm:w-[300px] opacity-60 pointer-events-none translate-x-[calc(var(--pb)*-80px)]"
            aria-hidden="true"
          >
            <Image src="/images/cloud.png" alt="" width={300} height={160} className="w-full h-auto" />
          </div>
          <div
            className="absolute left-[30%] -bottom-10 w-[280px] sm:w-[380px] opacity-80 pointer-events-none translate-x-[calc(var(--pb)*-40px)]"
            aria-hidden="true"
          >
            <Image src="/images/cloud.png" alt="" width={380} height={203} className="w-full h-auto" />
          </div>

          <div className="relative h-full flex flex-col lg:grid lg:grid-cols-12">
            {/* ======================================================
                Story copy (right on desktop, top on mobile)
                ====================================================== */}
            <div className="shrink-0 lg:order-2 lg:col-span-6 flex flex-col gap-5 sm:gap-7 lg:justify-between p-6 sm:p-9 lg:p-12 xl:p-14 lg:pl-4">
              <div className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
                <h2 id="about-heading">Who We Are</h2>
              </div>

              {/* Stage: blocks share a grid cell and crossfade on mobile */}
              <div className="grid lg:flex-1 lg:content-center lg:gap-10">
                {/* Block 1 — intro, revealed word by word */}
                <p
                  className="lead-statement lead-statement--fit [grid-area:1/1] opacity-[var(--m1)] lg:opacity-100 text-slate-900"
                  style={{ "--n": introWords.length } as CSSProperties}
                >
                  {introWords.map((word, i) => (
                    <span key={i} className="about-word" style={{ "--i": i } as CSSProperties}>
                      {word}{" "}
                    </span>
                  ))}
                </p>

                {/* Block 2 — countries & branches */}
                <div
                  data-stage-block="2"
                  className="[grid-area:1/1] lg:[grid-area:2/1] self-start opacity-[var(--m2)] translate-y-[calc((1-var(--m2))*16px)] max-w-xl"
                >
                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-[#009cd9]">
                      150+
                    </span>
                    <span className="pb-1.5 text-xs sm:text-sm text-slate-500 leading-snug max-w-[9rem]">
                      universities across the globe
                    </span>
                  </div>
                  <p className="body-text text-slate-600">
                    Aligning with countries like the{" "}
                    {countries.map((c, i) => (
                      <span key={c.name}>
                        <span data-stop-label={routeStops.indexOf(c)} className="about-country">
                          {c.name}
                        </span>
                        {i < countries.length - 2 ? ", " : i === countries.length - 2 ? ", and " : ""}
                      </span>
                    ))}
                    , an authorized representative of 150+ universities across the globe
                    with branches and associate offices in{" "}
                    {branches.map((b, i) => (
                      <span key={b}>
                        <span className="text-slate-900">{b}</span>
                        {i < branches.length - 2 ? ", " : i === branches.length - 2 ? ", and " : ""}
                      </span>
                    ))}
                    .
                  </p>
                </div>

                {/* Block 3 — stats + CTA */}
                <div
                  data-stage-block="3"
                  className="[grid-area:1/1] lg:[grid-area:2/1] self-start opacity-[var(--m3)] translate-y-[calc((1-var(--m3))*16px)]"
                >
                  <dl className="grid grid-cols-3 gap-3 sm:gap-6 border-y border-slate-200 py-4 sm:py-5">
                    {aboutStats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <span className="sr-only">
                            {stat.value.toLocaleString("en-IN")}
                            {stat.suffix}
                          </span>
                          <span
                            aria-hidden="true"
                            className="block text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight tabular-nums leading-none text-slate-900"
                          >
                            <span data-counter>0</span>
                            <span className="text-[#009cd9]">{stat.suffix}</span>
                          </span>
                          <span aria-hidden="true" className="mt-2 block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">
                            {stat.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <p className="body-text text-slate-600 max-w-sm">
                      {aboutTagline}
                    </p>
                    <CloudButton href="/about" className="self-start shrink-0">
                      Find out more
                    </CloudButton>
                  </div>
                </div>
              </div>

              {/* Scroll cue (desktop) */}
              <div className="hidden lg:flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                <span className="relative h-px w-24 bg-slate-200 overflow-hidden">
                  <span className="absolute inset-0 bg-[#009cd9] origin-left scale-x-[var(--pb)]" />
                </span>
                Scroll to fly
              </div>
            </div>

            {/* ======================================================
                Flight route map (left on desktop, bottom on mobile)
                ====================================================== */}
            <div className="relative flex-1 min-h-0 lg:order-1 lg:col-span-6 px-5 pb-6 sm:px-9 sm:pb-9 lg:py-12 lg:pl-12 lg:pr-4 xl:py-14 xl:pl-14">
              {/* Live readout */}
              <div
                className="hidden sm:flex absolute z-10 left-9 lg:left-12 xl:left-14 top-0 lg:top-12 xl:top-14 items-center gap-3.5 rounded-2xl bg-white/90 backdrop-blur-md ring-1 ring-sky-100 shadow-[0_18px_40px_-20px_rgba(0,90,150,0.45)] pl-2.5 pr-5 py-2.5"
                aria-hidden="true"
              >
                {/* A glossy map pin on a sky tile, rippling where it meets the ground */}
                <span className="relative grid place-items-center w-12 h-12 overflow-hidden rounded-xl bg-gradient-to-br from-[#e6f5fc] to-[#bfe3f7] ring-1 ring-white">
                  <span className="absolute left-1/2 bottom-[9px] w-6 h-2 -ml-3 rounded-[50%] bg-[#009cd9]/25" />
                  <span className="absolute left-1/2 bottom-[9px] w-6 h-2 -ml-3 rounded-[50%] ring-1 ring-[#009cd9]/60 animate-ping [animation-duration:2.4s] motion-reduce:animate-none" />
                  <svg className="relative -mt-1.5 w-7 h-7 drop-shadow-[0_4px_4px_rgba(0,70,120,0.35)]" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="readout-pin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0a6fa3" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#readout-pin)" d="M12 22s-7.5-6.6-7.5-12.4a7.5 7.5 0 0 1 15 0C19.5 15.4 12 22 12 22Z" />
                    <path fill="#fff" fillOpacity={0.28} d="M7.2 8.4A5.2 5.2 0 0 1 12 4.6c.5 0 .6.6.1.8a6.4 6.4 0 0 0-4 3.6c-.3.6-1 .2-.9-.6Z" />
                    <circle cx="12" cy="9.6" r="3" fill="#fff" />
                    <circle cx="12" cy="9.6" r="1.3" fill="#009cd9" />
                  </svg>
                </span>
                <span className="min-w-[8.5rem]">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#0a7fb3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Now flying over
                  </span>
                  <span data-readout-name className="block mt-0.5 text-xl leading-tight tracking-[-0.02em] text-slate-900">
                    Departing
                  </span>
                  <span data-readout-coords className="block font-mono text-[11px] text-slate-400">
                    {routeStops[0].coords}
                  </span>
                </span>
              </div>

              <div ref={routeRef} data-flight-route className="relative h-full w-full">
                <svg
                  className="absolute inset-0 w-full h-full overflow-visible"
                  viewBox={`0 0 ${box.w} ${box.h}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="route-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0a7fb3" />
                    </linearGradient>
                  </defs>
                  {/* Planned route */}
                  <path
                    d={routeD}
                    fill="none"
                    stroke="rgba(0,156,217,0.35)"
                    strokeWidth={1.5}
                    strokeDasharray="2 9"
                    strokeLinecap="round"
                  />
                  {/* Travelled route */}
                  <path
                    ref={progressPathRef}
                    data-route-path
                    d={routeD}
                    fill="none"
                    stroke="url(#route-grad)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    className="drop-shadow-[0_2px_6px_rgba(0,156,217,0.35)]"
                    style={{ strokeDashoffset: "100000", strokeDasharray: "100000 100000" }}
                  />
                </svg>

                {/* Stops */}
                {routeStops.map((stop, i) => {
                  const pos = pins[i];
                  const labelLeft = pos ? pos.x > 60 : false;
                  return (
                    <div
                      key={stop.name}
                      data-stop={i}
                      data-active="false"
                      className="group absolute"
                      style={{
                        left: `${pos?.x ?? 0}%`,
                        top: `${pos?.y ?? 0}%`,
                        visibility: pos ? "visible" : "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                          stop.kind === "country"
                            ? "w-2.5 h-2.5 bg-slate-300 group-data-[active=true]:bg-[#009cd9] group-data-[active=true]:shadow-[0_0_0_5px_rgba(0,156,217,0.15),0_0_14px_rgba(0,156,217,0.6)]"
                            : "w-4 h-4 bg-white ring-4 ring-slate-200 group-data-[active=true]:bg-[#009cd9] group-data-[active=true]:ring-[#009cd9]/20"
                        }`}
                      />
                      {stop.kind === "home" && (
                        <span className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-[#009cd9]/60 opacity-0 group-data-[active=true]:opacity-100 group-data-[active=true]:animate-ping" />
                      )}
                      <span
                        className={`absolute top-0 -translate-y-1/2 whitespace-nowrap transition-all duration-500 opacity-40 group-data-[active=true]:opacity-100 ${
                          labelLeft
                            ? "right-3 sm:right-4 translate-x-1 group-data-[active=true]:translate-x-0 text-right"
                            : "left-3 sm:left-4 -translate-x-1 group-data-[active=true]:translate-x-0"
                        }`}
                      >
                        {stop.kind === "country" ? (
                          <span className="text-[11px] sm:text-sm tracking-wide text-slate-700">{stop.name}</span>
                        ) : (
                          <span className="inline-flex flex-col rounded-xl bg-white/85 backdrop-blur-sm ring-1 ring-slate-200 shadow-sm px-2.5 py-1.5 sm:px-3 sm:py-2">
                            <span className="text-[11px] sm:text-sm text-slate-900">{stop.name}</span>
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0a7fb3]">
                              {stop.kind === "home" ? "Since 2019" : stop.coords}
                            </span>
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section progress line */}
          <span
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-[var(--pb)] bg-gradient-to-r from-[#7dd3fc] to-[#009cd9]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
