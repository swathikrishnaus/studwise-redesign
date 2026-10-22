"use client";

import { useState } from "react";
import { Icon } from "@/components/shared/PageKit";
import { socialLinks } from "@/data/navigation";

const LINK = "M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1m2 5a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1";
const CHECK = "M5 13l4 4L19 7";
const WHATSAPP = socialLinks.find((s) => s.label === "WhatsApp")?.icon ?? "";

/* Copy the article link, or share it on WhatsApp */
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const btn =
    "inline-flex items-center gap-2 h-10 px-3.5 rounded-full ring-1 ring-slate-200 bg-white text-sm text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]";

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copy} className={btn}>
        <Icon d={copied ? CHECK : LINK} className="w-4 h-4" />
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d={WHATSAPP} />
        </svg>
        Share
      </a>
    </div>
  );
}
