"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* --------------------------------------------------------------------------
   SmoothScroll — site-wide inertial scrolling (Lenis)
   --------------------------------------------------------------------------
   Lenis eases the real window scroll, so native `scroll` events, sticky
   positioning and every scroll-driven scene keep working unchanged.
   Lenis honours prefers-reduced-motion by itself (scroll tracks 1:1).
   -------------------------------------------------------------------------- */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      anchors: true,
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
