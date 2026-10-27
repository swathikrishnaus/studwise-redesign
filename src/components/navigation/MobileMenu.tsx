"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CloudButton from "@/components/ui/CloudButton";
import SocialLinks from "@/components/ui/SocialLinks";
import { aboutMenu, headerContact, mainNavLinks, mobileTabLinks, serviceMenu } from "@/data/navigation";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const ARROW = "M7 17 17 7m0 0H9m8 0v8";
const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";

function Stroke({ d, className = "w-4 h-4" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={d} />
    </svg>
  );
}

/** Two-line toggle that morphs into a cross */
export function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="relative grid place-items-center w-12 h-12 rounded-full bg-white ring-1 ring-slate-900/[0.06] shadow-[0_8px_20px_-12px_rgba(15,23,42,0.35)] transition-colors hover:ring-[#009cd9]/40"
    >
      <span className="relative block w-5 h-3" aria-hidden="true">
        <span
          className={`absolute left-0 h-[1.5px] rounded-full bg-slate-900 transition-all duration-300 ${
            open ? "top-1/2 w-5 -translate-y-1/2 rotate-45" : "top-0 w-5"
          }`}
        />
        <span
          className={`absolute h-[1.5px] rounded-full bg-slate-900 transition-all duration-300 ${
            open ? "left-0 top-1/2 w-5 -translate-y-1/2 -rotate-45" : "right-0 bottom-0 w-3"
          }`}
        />
      </span>
    </button>
  );
}

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Everything the bottom tab bar doesn't already link to (About's sections live on the About page)
  const tabHrefs = new Set(mobileTabLinks.map((l) => l.href));
  const rows = mainNavLinks.filter((l) => !tabHrefs.has(l.href));

  return (
    <div
      id="mobile-menu"
      data-lenis-prevent
      data-open={open}
      inert={!open}
      className="mobile-menu lg:hidden fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[#F1F5F9]"
    >
      <div className="min-h-full flex flex-col px-4 pt-3 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link href="/" onClick={onClose} aria-label="Studwise Home">
            <Image src="/images/studwise-new-logo.png" alt="Studwise" width={3350} height={1209} sizes="112px" className="w-[112px] h-auto" />
          </Link>
          <MenuToggle open onClick={onClose} />
        </div>

        {/* Links */}
        <nav aria-label="Main" className="mt-6">
          <ul className="rounded-[1.75rem] bg-white ring-1 ring-slate-900/5 px-5 py-2">
            {rows.map((link, i) => {
              const mega = "mega" in link ? link.mega : undefined;
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const isOpen = expanded === link.label;
              const items = mega === "services" ? serviceMenu.flatMap((g) => g.items) : mega === "about" ? aboutMenu : [];
              const row = (
                <>
                  <span className="w-7 text-[11px] tabular-nums tracking-[0.12em] text-slate-400">0{i + 1}</span>
                  <span className={`flex-1 text-[1.6rem] leading-none tracking-[-0.035em] ${active ? "text-[#0a7fb3]" : "text-slate-900"}`}>
                    {link.label}
                  </span>
                  <span
                    className={`grid place-items-center w-9 h-9 rounded-full ring-1 transition-all duration-300 ${
                      isOpen ? "rotate-90 bg-[#009cd9] text-white ring-[#009cd9]" : "text-slate-500 ring-slate-200"
                    }`}
                  >
                    <Stroke d={mega ? "M9 18l6-6-6-6" : ARROW} />
                  </span>
                </>
              );
              return (
                <li
                  key={link.label}
                  className="mobile-menu__item border-b border-slate-100 last:border-0"
                  style={{ "--d": `${0.06 + i * 0.05}s` } as CSSProperties}
                >
                  {mega ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : link.label)}
                        className="flex w-full items-center gap-3 py-4 text-left"
                      >
                        {row}
                      </button>
                      <div className="purpose-panel" data-open={isOpen}>
                        <div className="overflow-hidden" inert={!isOpen}>
                          <ul className="grid grid-cols-2 gap-2 pb-4">
                            {items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex h-full flex-col gap-3 rounded-2xl bg-[#F1F5F9] p-3 transition-colors active:bg-sky-50"
                                >
                                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-white text-[#0a7fb3] ring-1 ring-sky-100">
                                    <Stroke d={item.icon} className="w-[18px] h-[18px]" />
                                  </span>
                                  <span className="text-sm leading-snug tracking-tight text-slate-800">{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center gap-3 py-4"
                    >
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Advisory card */}
        <div
          className="mobile-menu__item relative isolate overflow-hidden mt-3 rounded-[1.75rem] bg-[#009cd9] text-white p-5"
          style={{ "--d": "0.4s" } as CSSProperties}
        >
          <div className="absolute -top-16 -right-10 -z-10 w-56 h-56 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            Free 1-on-1 advisory
          </span>
          <p className="mt-3 text-[1.35rem] leading-snug tracking-[-0.02em]">Not sure where to study?</p>
          <CloudButton href="#consultation-panel" variant="white" onClick={onClose} className="mt-5 w-full">
            Book free advisory
          </CloudButton>
          <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between gap-3">
            <div className="space-y-1 text-sm">
              {headerContact.phones.map((ph) => (
                <a key={ph} href={tel(ph)} className="flex items-center gap-2 tabular-nums text-white/90">
                  <Stroke d={PHONE} className="w-3.5 h-3.5" />
                  {ph}
                </a>
              ))}
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
