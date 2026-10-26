"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openAdvisorDialog } from "@/components/shared/AdvisorDialog";
import { mobileTabLinks } from "@/data/navigation";

const ICONS: Record<string, string> = {
  "/": "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z",
  "/about": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-10v5m0-8h.01",
  "/testimonials": "M8 9h8M8 13h5m-9 8 3.5-3H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v15Z",
  "/contact": "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z",
};
const HEADSET =
  "M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Zm-3 2v1a3 3 0 0 1-3 3h-2";

/** The top edge of the bar's 112px middle: flat shoulders curving down into the notch that cradles the advisor button (the glass itself is cut to this shape in globals.css) */
const NOTCH_EDGE = "M0 .5H16C24 .5 26 4.5 28 10.5C32 24.5 43 34.5 56 34.5C69 34.5 80 24.5 84 10.5C86 4.5 88 .5 96 .5H112";

function Stroke({ d, className = "w-[22px] h-[22px]" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={d} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   MobileTabBar — the bottom navigation on phones and tablets (below lg):
   a frosted-glass bar (the page blurs through it) with a notch in the
   middle that cradles a raised
   brand-blue advisor button (it opens components/shared/AdvisorDialog).
   Two icon tabs sit either side; the current page's icon turns brand
   blue and its name slides in beneath it. WhatsApp, Call and Instagram float
   above it in the FloatingDock. The hamburger menu leaves these links out.
   -------------------------------------------------------------------------- */
export default function MobileTabBar() {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const tab = (t: (typeof mobileTabLinks)[number]) => {
    const active = isCurrent(t.href);
    return (
      <li key={t.href}>
        <Link
          href={t.href}
          aria-label={t.label}
          aria-current={active ? "page" : undefined}
          className={`tabbar__tab relative flex h-16 flex-col items-center justify-center transition-colors duration-300 ${
            active ? "text-[#009cd9]" : "text-slate-400 active:text-slate-600"
          }`}
        >
          <Stroke d={ICONS[t.href]} />
          {/* The current page's name slides in under its icon */}
          <span className="tabbar__label text-[10.5px] leading-none tracking-[0.01em]" aria-hidden="true">
            {t.label}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <nav
      aria-label="Quick links"
      className="lg:hidden fixed inset-x-0 bottom-0 z-[55] px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pointer-events-none"
    >
      <div className="relative mx-auto max-w-md h-16 pointer-events-auto">
        {/* A soft glow beneath (a real shadow would stop the glass blurring the page) */}
        <span className="absolute inset-x-6 -bottom-1 h-8 rounded-full bg-[#0b2a45]/15 blur-xl" aria-hidden="true" />
        {/* The glass, cut to the notched shape */}
        <div className="tabbar__glass absolute inset-0 rounded-[1.4rem] bg-white/60 backdrop-blur-xl backdrop-saturate-150" aria-hidden="true" />
        {/* Its light edge, notch included */}
        <div className="absolute inset-0 flex pointer-events-none" aria-hidden="true">
          <span className="flex-1 rounded-l-[1.4rem] border border-r-0 border-white/80" />
          <svg className="w-28 h-16 shrink-0 overflow-visible" viewBox="0 0 112 64" fill="none">
            <path d={NOTCH_EDGE} stroke="rgba(255,255,255,0.8)" />
            <path d="M0 63.5H112" stroke="rgba(255,255,255,0.8)" />
          </svg>
          <span className="flex-1 rounded-r-[1.4rem] border border-l-0 border-white/80" />
        </div>

        <div className="relative flex h-full">
          <ul className="flex-1 grid grid-cols-2">{mobileTabLinks.slice(0, 2).map(tab)}</ul>
          <div className="relative w-28 shrink-0">
            <button
              type="button"
              onClick={openAdvisorDialog}
              aria-haspopup="dialog"
              aria-label="Book a free advisory session"
              className="absolute left-1/2 -top-7 -ml-7 grid place-items-center w-14 h-14 rounded-full bg-[#009cd9] text-white shadow-[0_8px_18px_-8px_rgba(0,156,217,0.7)] transition-transform duration-200 active:scale-95"
            >
              <Stroke d={HEADSET} className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex-1 grid grid-cols-2">{mobileTabLinks.slice(2).map(tab)}</ul>
        </div>
      </div>
    </nav>
  );
}
