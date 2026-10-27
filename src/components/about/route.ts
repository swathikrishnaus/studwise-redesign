import { clamp } from "@/lib/scroll";

type Point = [number, number];

// Every segment keeps moving left (x strictly decreasing), so the airplane
// banks down the route without ever turning around.
const START: Point = [82, 2];

// Cubic segments: [control 1, control 2, end]. Shallow glides alternate
// with steeper drops for a rolling descent.
const SEGMENTS: [Point, Point, Point][] = [
  [[74, 3], [62, 6], [56, 14]],
  [[52, 20], [52, 28], [50, 34]],
  [[48, 38], [36, 42], [28, 46]],
  [[24, 48], [22, 60], [22, 68]],
  [[22, 78], [20, 90], [18, 95]],
];

export function buildRoutePath(width: number, height: number): string {
  const sx = width / 100;
  const sy = height / 100;
  const pt = ([x, y]: Point) => `${(x * sx).toFixed(1)} ${(y * sy).toFixed(1)}`;
  return (
    `M ${pt(START)} ` +
    SEGMENTS.map(([c1, c2, end]) => `C ${pt(c1)}, ${pt(c2)}, ${pt(end)}`).join(" ")
  );
}

/** Section progress at which the plane reaches the end of the route. */
const ROUTE_SPAN = 0.88;

/** Maps pinned-section progress to progress along the route (0→1). */
export function routeProgress(sectionProgress: number): number {
  return clamp(sectionProgress / ROUTE_SPAN);
}
