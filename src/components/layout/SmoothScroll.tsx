"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** The site's Lenis instance, for programmatic smooth scrolls */
export const getLenis = () => instance;

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      anchors: true,
      autoRaf: true,
    });
    instance = lenis;
    return () => {
      instance = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
