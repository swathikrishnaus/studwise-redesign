/** Natural size of the airplane artwork, in px. */
export const PLANE_W = 410;
export const PLANE_H = 207;

/** Direction the artwork's nose points (tail → nose), in screen radians. */
export const NOSE = Math.atan2(-190, -420);
/** Kept small so the plane holds its pose instead of spinning round. */
export const MAX_BANK = (20 * Math.PI) / 180;

export type Pt = { x: number; y: number };

export function cubicAt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

export function cubicTangent(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  };
}

export function wrapAngle(a: number): number {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

/** Screen-space bank (radians, clockwise) for a plane heading along `heading`. */
export function bankFor(heading: number): number {
  return Math.max(-MAX_BANK, Math.min(MAX_BANK, wrapAngle(heading - NOSE)));
}
