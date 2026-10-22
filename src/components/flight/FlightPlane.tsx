"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { routeProgress } from "@/components/about/route";
import { clamp, lerp, pinnedProgress, prefersReducedMotion, smoothstep } from "@/lib/scroll";
import { MAX_BANK, NOSE, PLANE_H, PLANE_W, wrapAngle } from "./flightMath";
import type { Pt } from "./flightMath";

/* --------------------------------------------------------------------------
   FlightPlane — the airplane flying the About route on scroll
   --------------------------------------------------------------------------
   A fixed overlay that fades in at the start of the About flight path
   ([data-flight-route]) as the About section arrives, then rides the path
   while the section is pinned. (It used to take off from an airplane in
   the hero; the hero now shows students instead.) The route is read live
   from the DOM each frame, so the plane stays locked to the layout at any
   viewport size. Only the progress values are eased, which gives the
   flight its weight. The artwork is never mirrored and only banks gently.
   -------------------------------------------------------------------------- */

const BASE_W = PLANE_W;
const BASE_H = PLANE_H;

export default function FlightPlane() {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const section = document.querySelector<HTMLElement>("[data-flight-section]");
    const routeBox = document.querySelector<HTMLElement>("[data-flight-route]");
    const path = routeBox?.querySelector<SVGPathElement>("[data-route-path]");
    if (!plane || !section || !routeBox || !path) return;

    const reduce = prefersReducedMotion();
    // Lenis already smooths the scroll, so only a light extra ease here
    const k = reduce ? 1 : 0.2;

    let a = 0; // arrival progress (displayed)
    let b = 0; // route progress (displayed)
    let rot = 0;
    let heading = Math.PI;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top;

      // Arrival runs over the last viewport of scroll before About pins
      const targetA = clamp(1 - sectionTop / vh);
      const targetB = routeProgress(pinnedProgress(section));
      a = lerp(a, targetA, k);
      b = lerp(b, targetB, k);
      if (Math.abs(targetA - a) < 1e-4) a = targetA;
      if (Math.abs(targetB - b) < 1e-4) b = targetB;

      // Route in screen space (the SVG viewBox may lag the box on resize)
      const box = routeBox.getBoundingClientRect();
      const vb = path.ownerSVGElement?.viewBox.baseVal;
      const sx = vb && vb.width ? box.width / vb.width : 1;
      const sy = vb && vb.height ? box.height / vb.height : 1;
      const length = path.getTotalLength();
      const onRoute = (l: number): Pt => {
        const p = path.getPointAtLength(clamp(l, 0, length));
        return { x: box.left + p.x * sx, y: box.top + p.y * sy };
      };
      const w = clamp(box.width * 0.36, 130, 250);

      const l = b * length;
      const pos = onRoute(l);
      const ahead = l + 3 <= length ? onRoute(l + 3) : pos;
      const behind = l + 3 <= length ? pos : onRoute(l - 3);
      const dir = { x: ahead.x - behind.x, y: ahead.y - behind.y };
      if (Math.hypot(dir.x, dir.y) > 0.01) heading = Math.atan2(dir.y, dir.x);

      // Bank toward the heading
      const rotTarget = clamp(wrapAngle(heading - NOSE), -MAX_BANK, MAX_BANK);
      rot = reduce ? rotTarget : lerp(rot, rotTarget, 0.08);
      if (Math.abs(rotTarget - rot) < 1e-4) rot = rotTarget;

      // Fade and settle in at the route start as the section arrives
      const show = smoothstep(0.55, 1, a);
      plane.style.opacity = String(show);
      plane.style.visibility = show > 0.001 ? "visible" : "hidden";

      const s = (w / BASE_W) * lerp(0.85, 1, show);
      const lift = (1 - show) * vh * 0.06;
      plane.style.transform =
        `translate3d(${pos.x - BASE_W / 2}px, ${pos.y - BASE_H / 2 - lift}px, 0) ` +
        `rotate(${rot}rad) scale(${s})`;

      const settled = a === targetA && b === targetB && rot === rotTarget;
      if (!settled) raf = requestAnimationFrame(tick);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={planeRef}
      className="fixed left-0 top-0 z-40 pointer-events-none will-change-transform"
      style={{ width: BASE_W, height: BASE_H, opacity: 0, visibility: "hidden" }}
      aria-hidden="true"
    >
      <Image
        src="/images/airplane.png"
        alt=""
        width={BASE_W}
        height={BASE_H}
        className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,40,90,0.4)]"
      />
    </div>
  );
}
