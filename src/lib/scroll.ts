/* ==========================================================================
   Scroll Animation Helpers
   ==========================================================================
   Small math helpers shared by the scroll-driven homepage scenes.
   ========================================================================== */

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Hermite-smoothed 0→1 ramp between two edges. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Progress (0→1) of scrolling through a tall section whose child is sticky.
 * 0 when the section top reaches the viewport top, 1 when its bottom
 * reaches the viewport bottom.
 */
export function pinnedProgress(section: Element): number {
  const rect = section.getBoundingClientRect();
  const distance = rect.height - window.innerHeight;
  if (distance <= 0) return rect.top <= 0 ? 1 : 0;
  return clamp(-rect.top / distance);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
