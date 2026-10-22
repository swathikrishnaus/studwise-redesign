/* ==========================================================================
   Blog — the Studwise Journal
   ==========================================================================
   Articles come from the live studwise.in blog (WordPress), converted to
   plain blocks in data/blog/posts.json: headings, paragraphs and lists,
   with only <strong>, <em>, <a> and <br> inline. Old studwise.in links in
   the copy point at the new pages. Topics and cover details below are
   editorial additions for this site.
   ========================================================================== */

import raw from "./blog/posts.json";
import { slugify } from "@/utils/helpers";
import type { PostSummary, Topic } from "./blogShared";

export { TOPICS, formatPostDate } from "./blogShared";
export type { CoverIcon, PostSummary, Topic } from "./blogShared";

export type Block =
  | { type: "p" | "h2" | "h3" | "h4"; html: string }
  | { type: "ul" | "ol"; items: string[] };

type RawPost = {
  slug: string;
  title: string;
  dek: string | null;
  date: string;
  words: number;
  excerpt: string;
  blocks: Block[];
};

type PostMeta = Pick<PostSummary, "kicker" | "flag" | "icon" | "sky"> & { topic: Topic };

const META: Record<string, PostMeta> = {
  "ielts-scores-to-study-in-new-ealand": { topic: "Tests & Admissions", kicker: "New Zealand", flag: "nz", icon: "book", sky: ["#2f7fc4", "#68b4e6"] },
  "best-courses-to-study-in-ireland": { topic: "Destinations", kicker: "Ireland", flag: "ie", icon: "globe", sky: ["#1f8a8a", "#6cc4c0"] },
  "australia-study-visa-2023": { topic: "Visas", kicker: "Australia", icon: "passport", sky: ["#c9772f", "#f0b46a"] },
  "study-in-france": { topic: "Destinations", kicker: "France", flag: "fr", icon: "globe", sky: ["#3a5bb8", "#86a3e6"] },
  "new-rule-on-dependent-visa-uk": { topic: "Visas", kicker: "UK", flag: "gb", icon: "passport", sky: ["#24427a", "#5d7fbf"] },
  "study-in-canada": { topic: "Destinations", kicker: "Canada", flag: "ca", icon: "globe", sky: ["#b8473f", "#ec8f7d"] },
  "best-study-abroad-consultants-in-kerala": { topic: "Guides", kicker: "Kerala", flag: "in", icon: "compass", sky: ["#2a8a5c", "#78c79a"] },
  "study-in-uk-without-ielts": { topic: "Tests & Admissions", kicker: "UK", flag: "gb", icon: "book", sky: ["#3f4fa8", "#8592dc"] },
  "best-places-to-study-abroad-in-europe": { topic: "Destinations", kicker: "Europe", icon: "globe", sky: ["#2a64b0", "#6fa3dd"] },
  "best-study-abroad-consultants-in-malappuram": { topic: "Guides", kicker: "Malappuram", flag: "in", icon: "pin", sky: ["#0a7fb3", "#4cb8e6"] },
  "benefits-of-studying-abroad": { topic: "Guides", kicker: "Abroad", icon: "compass", sky: ["#3a88cf", "#7cc0ec"] },
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Post = RawPost &
  PostMeta & {
    minutes: number;
    headings: Heading[];
  };

const strip = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

/** Heading id, unique within its post */
export function headingIds(blocks: Block[]): (string | null)[] {
  const used = new Map<string, number>();
  return blocks.map((b) => {
    if (b.type !== "h2" && b.type !== "h3" && b.type !== "h4") return null;
    const base = slugify(strip(b.html)) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  });
}

export const posts: Post[] = (raw as RawPost[])
  .map((p) => {
    const ids = headingIds(p.blocks);
    const headings: Heading[] = p.blocks.flatMap((b, i) =>
      b.type === "h2" || b.type === "h3" ? [{ id: ids[i]!, text: strip(b.html), level: b.type === "h2" ? 2 : 3 }] : []
    );
    return { ...p, ...META[p.slug], minutes: Math.max(1, Math.round(p.words / 220)), headings };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Up to three other posts, same topic first */
export function relatedPosts(post: Post, count = 3) {
  const others = posts.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.topic === post.topic), ...others.filter((p) => p.topic !== post.topic)].slice(0, count);
}

export const postSummaries: PostSummary[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  minutes: p.minutes,
  topic: p.topic,
  kicker: p.kicker,
  flag: p.flag,
  icon: p.icon,
  sky: p.sky,
  search: [p.title, p.dek ?? "", p.excerpt, p.kicker, p.topic, ...p.headings.map((h) => h.text)].join(" ").toLowerCase(),
}));
