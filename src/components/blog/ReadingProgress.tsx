"use client";

import { useEffect, useRef } from "react";

/* Thin bar along the top of the window that fills as the article is read */
export default function ReadingProgress({ target }: { target: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(target);
    const bar = barRef.current;
    if (!el || !bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.style.transform = `scaleX(${p})`;
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
  }, [target]);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#7dd3fc] to-[#009cd9]" />
    </div>
  );
}
