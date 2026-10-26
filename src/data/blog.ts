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
import { TOPIC_COVER } from "./blogShared";
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

/** What each post sets for its card: a topic, the cover word and, optionally, a
    cover photo. Colours and icon follow the topic. */
type PostMeta = { topic: Topic; kicker: string; image?: string };

const META: Record<string, PostMeta> = {
  "ielts-scores-to-study-in-new-ealand": { topic: "Tests & Admissions", kicker: "New Zealand" },
  "best-courses-to-study-in-ireland": { topic: "Destinations", kicker: "Ireland" },
  "australia-study-visa-2023": { topic: "Visas", kicker: "Australia" },
  "study-in-france": { topic: "Destinations", kicker: "France" },
  "new-rule-on-dependent-visa-uk": { topic: "Visas", kicker: "UK" },
  "study-in-canada": { topic: "Destinations", kicker: "Canada" },
  "best-study-abroad-consultants-in-kerala": { topic: "Guides", kicker: "Kerala" },
  "study-in-uk-without-ielts": { topic: "Tests & Admissions", kicker: "UK" },
  "best-places-to-study-abroad-in-europe": { topic: "Destinations", kicker: "Europe" },
  "best-study-abroad-consultants-in-malappuram": { topic: "Guides", kicker: "Malappuram" },
  "benefits-of-studying-abroad": { topic: "Guides", kicker: "Abroad" },
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Post = RawPost &
  PostMeta &
  Pick<PostSummary, "sky" | "icon"> & {
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
    const meta = META[p.slug];
    return { ...p, ...meta, ...TOPIC_COVER[meta.topic], minutes: Math.max(1, Math.round(p.words / 220)), headings };
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
  image: p.image,
  icon: p.icon,
  sky: p.sky,
  search: [p.title, p.dek ?? "", p.excerpt, p.kicker, p.topic, ...p.headings.map((h) => h.text)].join(" ").toLowerCase(),
}));
