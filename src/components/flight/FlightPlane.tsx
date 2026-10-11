"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { routeProgress } from "@/components/about/route";
import {
  clamp,
  easeInOutCubic,
  lerp,
  pinnedProgress,
  prefersReducedMotion,
  smoothstep,
} from "@/lib/scroll";
import { MAX_BANK, NOSE, PLANE_H, PLANE_W, cubicAt, cubicTangent, wrapAngle } from "./flightMath";
import type { Pt } from "./flightMath";

/* --------------------------------------------------------------------------
   FlightPlane — the hero airplane, flying between sections on scroll
   --------------------------------------------------------------------------
   A fixed overlay that connects two legs:
     A. Take-off: from the hero's plane ([data-flight-start]) along a
        swooping curve to the start of the About route, while the About
        section scrolls up into its pinned position.
     B. Route: along the About flight path ([data-flight-route]) while the
        About section is pinned.
   Endpoints are read live from the DOM each frame, so the plane stays
   locked to the layout at any viewport size. Only the progress values are
   eased, which gives the flight its weight. The artwork is never mirrored
   and only banks gently, so it keeps the pose it has in the hero.
   -------------------------------------------------------------------------- */

const BASE_W = PLANE_W;
const BASE_H = PLANE_H;

export default function FlightPlane() {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const start = document.querySelector<HTMLElement>("[data-flight-start]");
    const section = document.querySelector<HTMLElement>("[data-flight-section]");
    const routeBox = document.querySelector<HTMLElement>("[data-flight-route]");
    const path = routeBox?.querySelector<SVGPathElement>("[data-route-path]");
    if (!plane || !start || !section || !routeBox || !path) return;
    // The hero plane's mouse-parallax and hover-float wrappers
    const parallaxEl = start.firstElementChild;
    const floatEl = parallaxEl?.firstElementChild;

    const root = document.documentElement;
    const reduce = prefersReducedMotion();
    // Lenis already smooths the scroll, so only a light extra ease here
    const k = reduce ? 1 : 0.2;

    let a = 0; // take-off progress (displayed)
    let b = 0; // route progress (displayed)
    let rot = 0;
    let heading = Math.PI;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top;

      // Leg A runs over the last viewport of scroll before About pins
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
      const endW = clamp(box.width * 0.36, 130, 250);

      let pos: Pt;
      let w: number;
      let dir: Pt;
      let poseAngle = 0;

      if (a < 0.999) {
        const st = start.getBoundingClientRect();
        const S = { x: st.left + st.width / 2, y: st.top + st.height / 2 };
        const E = onRoute(0);
        const E2 = onRoute(12);
        const rl = Math.hypot(E2.x - E.x, E2.y - E.y) || 1;
        // Dive out of the hero, then glide in along the route's heading
        const C1 = { x: S.x - vw * 0.04, y: S.y + vh * 0.3 };
        const C2 = {
          x: E.x - ((E2.x - E.x) / rl) * vh * 0.12,
          y: E.y - ((E2.y - E.y) / rl) * vh * 0.12,
        };
        const t = easeInOutCubic(a);
        pos = cubicAt(S, C1, C2, E, t);
        dir = cubicTangent(S, C1, C2, E, t);
        w = lerp(st.width, endW, t);

        // Start from the hero plane's exact live pose (parallax + float),
        // letting that offset fade out over the first part of the climb
        if (parallaxEl && floatEl) {
          const pose = new DOMMatrix(getComputedStyle(parallaxEl).transform).multiply(
            new DOMMatrix(getComputedStyle(floatEl).transform)
          );
          const hold = 1 - smoothstep(0, 0.2, a);
          pos = { x: pos.x + pose.e * hold, y: pos.y + pose.f * hold };
          poseAngle = Math.atan2(pose.b, pose.a) * hold;
        }
      } else {
        const l = b * length;
        pos = onRoute(l);
        const ahead = l + 3 <= length ? onRoute(l + 3) : pos;
        const behind = l + 3 <= length ? pos : onRoute(l - 3);
        dir = { x: ahead.x - behind.x, y: ahead.y - behind.y };
        w = endW;
      }

      if (Math.hypot(dir.x, dir.y) > 0.01) heading = Math.atan2(dir.y, dir.x);

      // Bank toward the heading (eased in from the hero's resting pose)
      const takeoffBlend = smoothstep(0, 0.6, a);
      const rotTarget = clamp(wrapAngle(heading - NOSE), -MAX_BANK, MAX_BANK) * takeoffBlend;
      rot = reduce ? rotTarget : lerp(rot, rotTarget, 0.08);
      if (Math.abs(rotTarget - rot) < 1e-4) rot = rotTarget;

      // Swap with the hero's own plane in a single frame: both copies share
      // the same pose at that instant, so only one plane is ever visible
      const handoff = a > 0.002 ? 1 : 0;
      root.style.setProperty("--flight-handoff", String(handoff));
      plane.style.opacity = String(handoff);
      plane.style.visibility = handoff ? "visible" : "hidden";

      const s = w / BASE_W;
      plane.style.transform =
        `translate3d(${pos.x - BASE_W / 2}px, ${pos.y - BASE_H / 2}px, 0) ` +
        `rotate(${rot + poseAngle}rad) scale(${s})`;

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
      root.style.removeProperty("--flight-handoff");
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
