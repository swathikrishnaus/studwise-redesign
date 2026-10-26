"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { SocialBadge } from "@/components/ui/SocialLinks";
import { headerContact, socialLinks } from "@/data/navigation";

const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";
const R = 21;
const C = 2 * Math.PI * R;

/* --------------------------------------------------------------------------
   FloatingDock — a small glass dock at the lower right with Studwise's
   social profiles in their brand colours and a call link (names show on
   hover). On phones it floats just above the bottom tab bar; on desktop
   a "back to top" button sits beneath it, its ring filling with the
   scroll. It slides in once the first screen is scrolled past.
   -------------------------------------------------------------------------- */
export default function FloatingDock() {
  const ringRef = useRef<SVGCircleElement>(null);
  const [showTop, setShowTop] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
      setShowTop(window.scrollY > window.innerHeight * 0.8);
      // Out of the way of the first screen (its form runs close to the edge)
      setShown(window.scrollY > window.innerHeight * 0.5);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tip =
    "pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0b2a45] px-3 py-1.5 text-xs text-white opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100";

  return (
    // Phones: just the socials, above the bottom tab bar. Desktop: with a back-to-top button
    <div className="flex fixed right-3 bottom-[calc(5.4rem+env(safe-area-inset-bottom))] lg:right-5 xl:right-6 lg:bottom-6 z-[45] flex-col items-center gap-3 pointer-events-none">
      <ul
        aria-label="Studwise on social media"
        className={`pointer-events-auto flex flex-col items-center gap-1.5 lg:gap-2 rounded-full bg-white/85 backdrop-blur-xl p-1.5 ring-1 ring-slate-900/[0.07] shadow-[0_18px_40px_-18px_rgba(11,42,69,0.45)] transition-all duration-500 ${
          shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16 pointer-events-none"
        }`}
      >
        {socialLinks.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Studwise on ${s.label}`}
              className="group relative grid place-items-center w-9 h-9 lg:w-10 lg:h-10 rounded-full transition-transform duration-300 hover:scale-110"
            >
              <SocialBadge s={s} className="w-full h-full" glyph="w-[18px] h-[18px]" />
              <span className={`hidden lg:block ${tip}`}>{s.label}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={`tel:${headerContact.phones[0].replace(/\s/g, "")}`}
            aria-label={`Call ${headerContact.phones[0]}`}
            className="group relative grid place-items-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#009cd9] text-white transition-transform duration-300 hover:scale-110"
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={PHONE} />
            </svg>
            <span className={`hidden lg:block ${tip}`}>{headerContact.phones[0]}</span>
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`pointer-events-auto group relative hidden lg:grid place-items-center w-[52px] h-[52px] rounded-full bg-[#0b2a45] text-white shadow-[0_18px_36px_-16px_rgba(11,42,69,0.7)] transition-all duration-500 hover:bg-[#009cd9] ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <circle ref={ringRef} cx="26" cy="26" r={R} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
        </svg>
        <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </button>
    </div>
  );
}
