"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/shared/PageKit";
import Pagination, { usePageParam, writePage } from "@/components/shared/Pagination";
import { TOPICS, formatPostDate } from "@/data/blogShared";
import type { PostSummary, Topic } from "@/data/blogShared";
import PostCover from "./PostCover";
import CloudButton from "@/components/ui/CloudButton";

/* Articles per page: three rows of the three-column desktop grid */
const PAGE_SIZE = 9;

const SEARCH = "M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z";
const CLOSE = "M6 18 18 6M6 6l12 12";

/** The date (the topic is already on the cover; a photo cover shows it here instead) */
function Meta({ post }: { post: PostSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
      {post.image && (
        <>
          <span className="text-[#0a7fb3]">{post.topic}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
    </p>
  );
}

/** Article card, the same for every post: cover, date, title, excerpt (the whole card links) */
function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="tm-enter group relative flex flex-col">
      <div className="overflow-hidden rounded-2xl">
        <PostCover {...post} className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <Meta post={post} />
        <h3 className="mt-3 text-xl sm:text-[1.4rem] leading-snug tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-[#0a7fb3]">
          {/* The whole card is clickable through this link's ::after */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-[#009cd9]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 body-text text-slate-600 line-clamp-2">{post.excerpt}</p>
      </div>
    </article>
  );
}

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const [query, setQueryState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);

  // The page number lives in the URL (?page=2; page 1 is the bare /blog)
  const page = usePageParam();

  // A new filter or search starts again from the first page
  const changeTopic = (t: Topic | "All") => {
    setTopic(t);
    writePage(1, false);
  };
  const setQuery = (value: string) => {
    setQueryState(value);
    writePage(1, false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      posts.filter((p) => (topic === "All" || p.topic === topic) && (!q || q.split(/\s+/).every((w) => p.search.includes(w)))),
    [posts, topic, q],
  );
  const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const first = (current - 1) * PAGE_SIZE;
  const visible = shown.slice(first, first + PAGE_SIZE);

  const goTo = (n: number) => {
    if (n < 1 || n > pageCount || n === current) return;
    pendingFocus.current = true;
    writePage(n, true);
  };

  // Once the new page has rendered, return to the top of the list and move
  // focus there, for keyboard and screen-reader users
  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    gridRef.current?.scrollIntoView({ block: "start" });
    gridRef.current?.focus({ preventScroll: true });
  }, [current]);

  // A topic only gets a filter once it has a post, so an empty topic never shows
  const usedTopics = useMemo(() => TOPICS.filter((t) => posts.some((p) => p.topic === t)), [posts]);

  const tab = (active: boolean) =>
    `inline-flex items-center gap-1.5 h-11 px-4 rounded-full text-sm ring-1 transition-colors ${
      active
        ? "bg-slate-900 text-white ring-slate-900"
        : "bg-white text-slate-700 ring-slate-200 hover:ring-[#009cd9] hover:text-[#0a7fb3]"
    }`;

  const reset = () => {
    changeTopic("All");
    setQuery("");
  };

  return (
    <div id="articles" className="scroll-mt-4">
      {/* Filters: topic buttons and search, set straight on the page */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div role="group" aria-label="Filter by topic" className="flex flex-wrap items-center gap-2">
            {(["All", ...usedTopics] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={topic === t}
                onClick={() => changeTopic(t)}
                className={tab(topic === t)}
              >
                {t === "All" ? "All articles" : t}
              </button>
            ))}
          </div>

          <label className="group/search relative w-full sm:max-w-sm lg:ml-auto lg:w-80">
            <span className="sr-only">Search articles</span>
            <span className="pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-full bg-sky-50 text-[#0a7fb3] transition-colors group-focus-within/search:bg-[#009cd9] group-focus-within/search:text-white">
              <Icon d={SEARCH} className="w-4 h-4" />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              className="w-full h-11 rounded-full bg-white pl-12 pr-11 text-[15px] text-slate-900 placeholder:text-slate-500 outline-none shadow-[0_1px_2px_rgba(15,23,42,0.05),0_10px_24px_-18px_rgba(15,23,42,0.35)] transition-shadow focus:shadow-[0_0_0_3px_rgba(0,156,217,0.18),0_10px_24px_-18px_rgba(15,23,42,0.35)] [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              >
                <Icon d={CLOSE} className="w-3.5 h-3.5" />
              </button>
            )}
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "article" : "articles"} found
      </p>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 py-16 text-center">
          <p className="text-xl tracking-tight text-slate-900">No articles match “{query}”.</p>
          <p className="mt-2 text-slate-500">Try another word, or browse every article.</p>
          <CloudButton onClick={reset} className="mt-6">
            Show all articles
          </CloudButton>
        </div>
      ) : (
        <div key={`${topic}-${q}-${current}`}>
          <div
            ref={gridRef}
            tabIndex={-1}
            aria-label={`Articles, page ${current} of ${pageCount}`}
            className="scroll-mt-28 mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-y-14 outline-none"
          >
            {visible.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-14 sm:mt-16 flex justify-center border-t border-slate-200 pt-6">
              <Pagination current={current} count={pageCount} onChange={goTo} basePath="/blog" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
