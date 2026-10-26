/* ==========================================================================
   Homepage — "Who We Are" content
   ==========================================================================
   Copy mirrors the live studwise.in homepage.
   ========================================================================== */

export const aboutIntro =
  "Studwise International is one of the best education consultancy in Malappuram since 2019, a team of professionals to assist you in making your dream a reality.";

export const aboutTagline =
  "We are relaying quality education equivalence to the dreams of students.";

/** Client-provided figures (Studwise fact sheet, October 2026): confirm before launch */
export const aboutStats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 550, suffix: "+", label: "Students Guided" },
  { value: 14, suffix: "+", label: "Countries" },
];

export const branches = ["Manjeri", "Valanchery", "Calicut"];

/**
 * Stops along the flight route. `t` is the fraction of the route's length
 * at which the stop sits. The first stop is home, the last is the finale;
 * the route runs on past the finale so the parked airplane never covers it.
 */
export type RouteStop = {
  name: string;
  coords: string;
  t: number;
  kind: "home" | "country" | "finale";
};

export const routeStops: RouteStop[] = [
  { name: "Malappuram", coords: "11.07° N · 76.07° E", t: 0.07, kind: "home" },
  { name: "UK", coords: "51.51° N · 0.13° W", t: 0.2, kind: "country" },
  { name: "USA", coords: "40.71° N · 74.01° W", t: 0.277, kind: "country" },
  { name: "Canada", coords: "43.65° N · 79.38° W", t: 0.354, kind: "country" },
  { name: "Australia", coords: "33.87° S · 151.21° E", t: 0.431, kind: "country" },
  { name: "Malta", coords: "35.90° N · 14.51° E", t: 0.508, kind: "country" },
  { name: "Singapore", coords: "1.35° N · 103.82° E", t: 0.585, kind: "country" },
  { name: "Dubai", coords: "25.20° N · 55.27° E", t: 0.662, kind: "country" },
  { name: "Malaysia", coords: "3.14° N · 101.69° E", t: 0.739, kind: "country" },
  { name: "150+ Universities", coords: "Across the globe", t: 0.86, kind: "finale" },
];
