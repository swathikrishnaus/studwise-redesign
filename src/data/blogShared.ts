/* ==========================================================================
   Blog — types and helpers safe for client components
   ==========================================================================
   Kept apart from data/blog.ts so the browser never downloads the article
   bodies (posts.json); the index page only needs these summaries.
   ========================================================================== */

export const TOPICS = ["Destinations", "Visas", "Tests & Admissions", "Guides"] as const;
export type Topic = (typeof TOPICS)[number];

export type CoverIcon = "globe" | "passport" | "book" | "compass" | "pin";

/** Each topic's cover colours and icon, so a post only needs a topic and a cover word */
export const TOPIC_COVER: Record<Topic, { sky: [string, string]; icon: CoverIcon }> = {
  Destinations: { sky: ["#1f8a8a", "#6cc4c0"], icon: "globe" },
  Visas: { sky: ["#c9772f", "#f0b46a"], icon: "passport" },
  "Tests & Admissions": { sky: ["#2f7fc4", "#68b4e6"], icon: "book" },
  Guides: { sky: ["#2a8a5c", "#78c79a"], icon: "compass" },
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  topic: Topic;
  /** Big word on the designed cover (keep it short: one word, about 12 letters) */
  kicker: string;
  /** A photo to use instead of the designed cover, when the post has one */
  image?: string;
  /** From the topic (TOPIC_COVER) */
  icon: CoverIcon;
  /** From the topic (TOPIC_COVER) */
  sky: [string, string];
  /** Lower-cased title, excerpt and headings, for search */
  search: string;
};

export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
