"use client";

import { useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { Icon } from "./PageKit";

const PREV = "M15 18l-6-6 6-6";
const NEXT = "M9 18l6-6-6-6";

/* Page-number URL helpers: history changes made here announce themselves
   with a "list:page" event, alongside the browser's own popstate */
const PAGE_EVENT = "list:page";
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(PAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(PAGE_EVENT, onChange);
  };
}

/** Set ?page= (page 1 is the bare URL); push adds a history entry */
export function writePage(n: number, push: boolean) {
  const url = new URL(window.location.href);
  if (n > 1) url.searchParams.set("page", String(n));
  else url.searchParams.delete("page");
  if (url.href === window.location.href) return;
  history[push ? "pushState" : "replaceState"](null, "", url);
  window.dispatchEvent(new Event(PAGE_EVENT));
}

/** The current ?page= number (1 on the server and when absent) */
export function usePageParam() {
  const search = useSyncExternalStore(subscribeToUrl, () => window.location.search, () => "");
  return Math.max(1, Math.floor(Number(new URLSearchParams(search).get("page"))) || 1);
}

/** Page numbers to show: all of them up to seven, otherwise the first,
    the last and the current page's neighbours, with gaps (null) between */
function pageList(current: number, count: number): (number | null)[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const keep = new Set([1, count, current - 1, current, current + 1].filter((n) => n >= 1 && n <= count));
  const sorted = [...keep].sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? [null, n] : [n]));
}

/** Numbered pages with Previous / Next. Links carry real ?page= hrefs;
    clicks are handled in place. */
export default function Pagination({
  current,
  count,
  onChange,
  basePath,
}: {
  current: number;
  count: number;
  onChange: (n: number) => void;
  /** The list's own path, for the links' hrefs */
  basePath: string;
}) {
  const href = (n: number) => (n > 1 ? `${basePath}?page=${n}` : basePath);
  const go = (e: MouseEvent<HTMLAnchorElement>, n: number) => {
    e.preventDefault();
    onChange(n);
  };
  const step = "inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full text-sm ring-1 transition-colors";
  const edge = (disabled: boolean) =>
    disabled
      ? `${step} ring-slate-200 text-slate-300 cursor-not-allowed`
      : `${step} ring-slate-200 bg-white text-slate-700 hover:ring-[#009cd9] hover:text-[#0a7fb3]`;

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-1.5">
        <li>
          {current > 1 ? (
            <a href={href(current - 1)} onClick={(e) => go(e, current - 1)} rel="prev" className={edge(false)}>
              <Icon d={PREV} className="w-4 h-4" />
              Previous
            </a>
          ) : (
            <span aria-disabled="true" className={edge(true)}>
              <Icon d={PREV} className="w-4 h-4" />
              Previous
            </span>
          )}
        </li>
        {pageList(current, count).map((n, i) =>
          n === null ? (
            <li key={`gap-${i}`} aria-hidden="true" className="w-6 text-center text-sm text-slate-400">
              …
            </li>
          ) : (
            <li key={n}>
              <a
                href={href(n)}
                onClick={(e) => go(e, n)}
                aria-current={n === current ? "page" : undefined}
                aria-label={`Page ${n}`}
                className={`grid place-items-center w-10 h-10 rounded-full text-sm tabular-nums transition-colors ${
                  n === current
                    ? "bg-slate-900 text-white"
                    : "bg-white ring-1 ring-slate-200 text-slate-700 hover:ring-[#009cd9] hover:text-[#0a7fb3]"
                }`}
              >
                {n}
              </a>
            </li>
          ),
        )}
        <li>
          {current < count ? (
            <a href={href(current + 1)} onClick={(e) => go(e, current + 1)} rel="next" className={edge(false)}>
              Next
              <Icon d={NEXT} className="w-4 h-4" />
            </a>
          ) : (
            <span aria-disabled="true" className={edge(true)}>
              Next
              <Icon d={NEXT} className="w-4 h-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
