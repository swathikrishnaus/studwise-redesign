"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { Heading } from "@/data/blog";

/* --------------------------------------------------------------------------
   ArticleToc — "On this page": the article's headings, the one being read
   highlighted (scroll spy). Shown as a sticky rail on desktop and as a
   collapsible list on smaller screens.
   -------------------------------------------------------------------------- */
export default function ArticleToc({ headings, variant }: { headings: Heading[]; variant: "rail" | "inline" }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;
    const onScroll = () => {
      // The last heading that has passed a line a third of the way down
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  // Scroll to the heading ourselves: the site's Lenis anchor handling
  // lands short on long pages
  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    el.scrollIntoView({ block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  if (!headings.length) return null;

  const list = (
    <ol className="space-y-1">
      {headings.map((h) => {
        const on = h.id === active;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => jump(e, h.id)}
              aria-current={on ? "location" : undefined}
              className={`group flex gap-3 rounded-lg py-1.5 text-[13.5px] leading-snug transition-colors ${
                h.level === 3 ? "pl-3" : ""
              } ${on ? "text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
            >
              <span
                className={`mt-[0.55em] h-px shrink-0 transition-all duration-300 ${on ? "w-5 bg-[#009cd9]" : "w-2.5 bg-slate-300 group-hover:w-4"}`}
                aria-hidden="true"
              />
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="group/toc rounded-2xl bg-white ring-1 ring-slate-900/5 px-5 py-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-slate-900">
          On this page
          <svg className="w-4 h-4 text-slate-400 transition-transform group-open/toc:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <nav aria-label="On this page" className="mt-4">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="On this page">
      <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">On this page</p>
      {list}
    </nav>
  );
}
