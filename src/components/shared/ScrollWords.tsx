"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType } from "react";
import { clamp, prefersReducedMotion } from "@/lib/scroll";

/* --------------------------------------------------------------------------
   ScrollWords — the homepage's word-by-word "writing" effect for any
   statement: each word lights up from faint to full as the text scrolls
   up through the viewport (--sw, 0→1). Styles: ".sw-word" in globals.css.
   -------------------------------------------------------------------------- */
export default function ScrollWords({
  text,
  as: Tag = "p",
  className = "",
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--sw", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts as the text's top enters the lower part of the screen and
      // completes once its bottom reaches the middle
      const start = vh * 0.9;
      const end = vh * 0.45;
      const p = clamp((start - r.top) / (start - end + r.height * 0.6));
      el.style.setProperty("--sw", p.toFixed(4));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Tag ref={ref} id={id} className={className} style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className="sw-word" style={{ "--i": i } as CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
