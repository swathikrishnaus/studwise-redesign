"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { prefersReducedMotion } from "@/lib/scroll";

type Phase = "loading" | "settle" | "exit" | "gone";

// About 4s in all: the ring counts up (MIN_MS), the logo assembles and holds (HOLD_MS), then the screen lifts (LIFT_MS)
const MIN_MS = 1250;
const HOLD_MS = 1150;
const LIFT_MS = 900;
const MAX_MS = 6000;
const R = 46;
const C = 2 * Math.PI * R;

export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const ringRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const start = performance.now();
    const reduced = prefersReducedMotion();
    let target = 0.12;
    let shown = 0;
    let ready = false;
    let raf = 0;
    const timers: number[] = [];
    root.dataset.loading = "true";
    getLenis()?.stop();

    // Progress: each image that finishes moves the ring on; fonts and window load complete it
    const images = Array.from(document.images).filter((img) => !img.complete);
    const total = images.length || 1;
    let loaded = 0;
    const onImage = () => {
      loaded += 1;
      target = Math.max(target, 0.12 + 0.68 * (loaded / total));
    };
    images.forEach((img) => {
      img.addEventListener("load", onImage, { once: true });
      img.addEventListener("error", onImage, { once: true });
    });
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([pageLoaded, document.fonts?.ready ?? Promise.resolve()]).then(() => {
      ready = true;
    });

    const finish = () => {
      cancelAnimationFrame(raf);
      const release = () => {
        delete root.dataset.loading;
        getLenis()?.start();
      };
      if (reduced) {
        setPhase("exit");
        release();
        timers.push(window.setTimeout(() => setPhase("gone"), 400));
        return;
      }
      setPhase("settle");
      timers.push(
        window.setTimeout(() => {
          setPhase("exit");
          release();
        }, HOLD_MS),
        window.setTimeout(() => setPhase("gone"), HOLD_MS + LIFT_MS)
      );
    };

    const tick = () => {
      const elapsed = performance.now() - start;
      if ((ready && elapsed > MIN_MS) || elapsed > MAX_MS) target = 1;
      // Fill steadily over MIN_MS rather than jumping ahead as images load
      const goal = target === 1 ? 1 : Math.min(target, 0.92 * (elapsed / MIN_MS));
      shown += (goal - shown) * (target === 1 ? 0.14 : 0.08);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - shown));
      if (countRef.current) countRef.current.textContent = String(Math.round(shown * 100)).padStart(2, "0");
      if (target === 1 && shown > 0.995) {
        if (ringRef.current) ringRef.current.style.strokeDashoffset = "0";
        if (countRef.current) countRef.current.textContent = "100";
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      images.forEach((img) => {
        img.removeEventListener("load", onImage);
        img.removeEventListener("error", onImage);
      });
      delete root.dataset.loading;
      getLenis()?.start();
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className="page-loader" data-phase={phase} aria-hidden={phase !== "loading"}>
      <span className="sr-only" role="status">
        Loading Studwise
      </span>
      <span className="page-loader__glow page-loader__glow--a" aria-hidden="true" />
      <span className="page-loader__glow page-loader__glow--b" aria-hidden="true" />

      <div className="page-loader__stage" aria-hidden="true">
        {/* The full logo's canvas: the wordmark fills it, the mark sits where it belongs */}
        <div className="page-loader__logo" style={{ aspectRatio: "3350 / 1209" } as CSSProperties}>
          <Image src="/images/studwise-wordmark.png" alt="" fill priority sizes="300px" className="page-loader__word object-contain" />
          <div className="page-loader__mark">
            <span className="page-loader__ripple" />
            <svg className="page-loader__ring" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(0,156,217,0.14)" strokeWidth="1.6" />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="#009cd9"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C}
                transform="rotate(-90 50 50)"
              />
            </svg>
            {/* The mark in layers: the disc and its three wing feathers, which beat like a wing taking off */}
            <span className="page-loader__shadow" />
            <span className="page-loader__emblem">
              <Image src="/images/loader/mark-disc.png" alt="" fill priority sizes="140px" className="page-loader__disc object-contain" />
              <span className="page-loader__wing">
              {[2, 1, 3].map((n, i) => (
                <Image
                  key={n}
                  src={`/images/loader/feather-${n}.png`}
                  alt=""
                  fill
                  priority
                  sizes="140px"
                  className="page-loader__feather object-contain"
                  style={{ "--f": i } as CSSProperties}
                />
              ))}
              </span>
              <span className="page-loader__glint" />
            </span>
          </div>
        </div>
        <p className="page-loader__count">
          <span ref={countRef}>00</span>
          <span className="text-[#009cd9]">%</span>
        </p>
      </div>
    </div>
  );
}
