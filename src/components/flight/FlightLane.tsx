"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { clamp, lerp, prefersReducedMotion, smoothstep } from "@/lib/scroll";
import { wrapAngle } from "./flightMath";
import type { Pt } from "./flightMath";

export type LaneStop = { label: string; sub?: string };

/** Catmull-Rom through the points, as one smooth cubic path */
function smoothPath(pts: Pt[]): string {
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

/* --------------------------------------------------------------------------
   FlightLane — the homepage's top-down airplane (see StudentsSection) for
   inner pages: a row of stops laid out on the same grid as the cards
   below it (offices, process steps…), joined by a dashed flight route.
   As the lane scrolls up the screen the plane flies in from the left,
   weaving through each stop, which lights up as it passes, and parks just
   beyond the last one; the route behind it is inked in. The route is
   rebuilt from the stops' real positions whenever the lane resizes.
   Styles: "Flight lane" in globals.css.
   -------------------------------------------------------------------------- */
export default function FlightLane({
  stops,
  gridClassName,
  className = "",
  label,
  showLabels = true,
}: {
  stops: LaneStop[];
  /** Grid columns and gaps, matching the cards the stops sit above */
  gridClassName: string;
  className?: string;
  /** Accessible name for the list of stops */
  label: string;
  /** Off when the cards below already title each stop: only the numbers show */
  showLabels?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const maskId = `lane${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [route, setRoute] = useState({ w: 0, h: 0, d: "" });

  // ---- Build the route through the stops' dots ----
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const build = () => {
      const box = wrap.getBoundingClientRect();
      const dots = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stop-dot]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      if (!dots.length || !box.width) return;
      const y = dots[0].y;
      const lift = Math.min(30, y * 0.6);
      const last = dots[dots.length - 1];
      const step = dots.length > 1 ? dots[1].x - dots[0].x : box.width / 2;
      const pts: Pt[] = [{ x: -box.width * 0.06, y: y + lift * 0.5 }];
      dots.forEach((p, i) => {
        if (i > 0) pts.push({ x: (dots[i - 1].x + p.x) / 2, y: y - lift });
        pts.push(p);
      });
      // Park a little past the last stop, clear of its label and inside the lane
      const plane = flyerRef.current?.offsetWidth ?? 64;
      pts.push({ x: Math.min(box.width - plane * 0.6, last.x + step * 0.42), y: y - lift * 0.35 });
      setRoute({ w: box.width, h: box.height, d: smoothPath(pts) });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [stops.length]);

  // ---- Fly it on scroll ----
  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const trail = trailRef.current;
    const flyer = flyerRef.current;
    const plane = planeRef.current;
    const shadow = shadowRef.current;
    if (!wrap || !path || !trail || !flyer || !plane || !shadow || !route.d) return;

    const stopEls = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stop]"));
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stop-dot]"));
    const length = path.getTotalLength();
    trail.style.strokeDasharray = `${length} ${length}`;

    // Distance along the route at which the plane reaches each stop
    const box = wrap.getBoundingClientRect();
    const stopAt = dots.map((el) => {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2 - box.left;
      let lo = 0;
      let hi = length;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < x) lo = mid;
        else hi = mid;
      }
      return lo;
    });

    const reduce = prefersReducedMotion();
    const k = reduce ? 1 : 0.1;
    let p = 0;
    let rot = 0;
    let first = true;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      // From the lane entering the lower screen to it reaching the upper third
      const target = clamp((vh * 0.92 - r.top) / (vh * 0.58));
      p = first ? target : lerp(p, target, k);
      if (Math.abs(target - p) < 1e-4) p = target;

      const l = p * length;
      const pos = path.getPointAtLength(l);
      const a = path.getPointAtLength(Math.max(0, l - 2));
      const b = path.getPointAtLength(Math.min(length, l + 2));
      // Artwork's nose points down the screen, so subtract a quarter turn
      const heading = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
      rot = first || reduce ? heading : rot + wrapAngle(heading - rot) * 0.2;
      first = false;

      const size = flyer.offsetWidth;
      const show = smoothstep(0, 0.07, p);
      // A gentle climb mid-route: bigger, shadow further away
      const alt = Math.sin(p * Math.PI);
      const scale = (0.8 + 0.2 * show) * (1 + alt * 0.08);
      flyer.style.opacity = show.toFixed(3);
      flyer.style.visibility = show > 0.001 ? "visible" : "hidden";
      flyer.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`;
      plane.style.transform = `rotate(${rot}rad) scale(${scale})`;
      shadow.style.transform =
        `translate3d(${10 + alt * 12}px, ${16 + alt * 16}px, 0) rotate(${rot}rad) scale(${scale * 0.92})`;

      trail.style.strokeDashoffset = String(length - l);
      stopEls.forEach((el, i) => {
        el.dataset.on = String(l >= stopAt[i] - 6);
      });

      if (p !== target) raf = requestAnimationFrame(tick);
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
  }, [route]);

  return (
    <div ref={wrapRef} className={`relative overflow-x-clip pt-10 sm:pt-12 ${className}`}>
      {/* Route: faint full dashes, inked in behind the plane */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${route.w || 1} ${route.h || 1}`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <path ref={trailRef} d={route.d} stroke="white" strokeWidth={10} strokeLinecap="round" />
          </mask>
        </defs>
        <path ref={pathRef} d={route.d} stroke="#009cd9" strokeOpacity={0.22} strokeWidth={1.5} strokeDasharray="6 8" />
        <path d={route.d} stroke="#009cd9" strokeOpacity={0.75} strokeWidth={1.75} strokeDasharray="6 8" mask={`url(#${maskId})`} />
      </svg>

      <ol aria-label={label} className={`relative grid ${gridClassName}`}>
        {stops.map((stop, i) => (
          <li key={i} data-stop className="flight-stop flex flex-col items-center text-center min-w-0">
            <span
              data-stop-dot
              className="flight-stop__dot block w-3.5 h-3.5 rounded-full bg-white ring-2 ring-[#009cd9]/45"
              aria-hidden="true"
            />
            <span className="relative z-[3] mt-4 text-[11px] tabular-nums tracking-[0.18em] text-[#0a7fb3]">0{i + 1}</span>
            <span
              className={
                showLabels
                  ? "flight-stop__label relative z-[3] mt-1 max-w-full truncate px-1 text-sm sm:text-base tracking-tight text-slate-500"
                  : "sr-only"
              }
            >
              {stop.label}
            </span>
            {showLabels && stop.sub && (
              <span className="relative z-[3] hidden sm:block mt-0.5 max-w-full truncate px-1 text-xs text-slate-400">{stop.sub}</span>
            )}
          </li>
        ))}
      </ol>

      {/* The airplane, with its ground shadow */}
      <div
        ref={flyerRef}
        className="absolute left-0 top-0 z-[2] w-12 h-12 sm:w-16 sm:h-16 lg:w-[5.5rem] lg:h-[5.5rem] pointer-events-none will-change-transform"
        style={{ visibility: "hidden", opacity: 0 }}
        aria-hidden="true"
      >
        <div ref={shadowRef} className="absolute inset-0 opacity-20 will-change-transform">
          <Image src="/images/plane-top-cutout.png" alt="" fill sizes="88px" className="object-contain brightness-0 blur-[6px]" />
        </div>
        <div ref={planeRef} className="absolute inset-0 will-change-transform">
          <Image src="/images/plane-top-cutout.png" alt="" fill sizes="88px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}
