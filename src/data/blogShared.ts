/* ==========================================================================
   Blog — types and helpers safe for client components
   ==========================================================================
   Kept apart from data/blog.ts so the browser never downloads the article
   bodies (posts.json); the index page only needs these summaries.
   ========================================================================== */

export const TOPICS = ["Destinations", "Visas", "Tests & Admissions", "Guides"] as const;
export type Topic = (typeof TOPICS)[number];

export type CoverIcon = "globe" | "passport" | "book" | "compass" | "pin";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  topic: Topic;
  /** Big word on the designed cover */
  kicker: string;
  /** Flag in public/flags, when there is one */
  flag?: string;
  icon: CoverIcon;
  /** Two gradient stops for the cover sky */
  sky: [string, string];
  /** Lower-cased title, excerpt and headings, for search */
  search: string;
};

export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
