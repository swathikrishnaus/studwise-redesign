"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   RevealRoot — fades [data-reveal] children in as they enter the viewport
   --------------------------------------------------------------------------
   Hidden states only apply once the root is marked ready, so the page
   reads fine before hydration or without JavaScript. Styles live in
   globals.css under "About page".
   -------------------------------------------------------------------------- */
export default function RevealRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.on = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    // Anything already on screen shows at once, without a flash
    const vh = window.innerHeight;
    for (const el of items) {
      if (el.getBoundingClientRect().top < vh * 0.9) el.dataset.on = "true";
      else io.observe(el);
    }
    root.dataset.revealRoot = "ready";
    return () => io.disconnect();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
