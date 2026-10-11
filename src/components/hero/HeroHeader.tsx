"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CloudButton from "@/components/ui/CloudButton";
import { aboutMenu, headerContact, mainNavLinks, serviceMenu } from "@/data/navigation";
import type { MegaItem } from "@/data/navigation";

type MenuKey = "services" | "about";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

function ItemIcon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={d} />
    </svg>
  );
}

/** One row in a mega menu: icon tile, label and a one-line description */
function MegaLink({ item, onNavigate }: { item: MegaItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/item flex items-start gap-3.5 rounded-2xl p-3 -mx-3 transition-colors hover:bg-sky-50/70 focus-visible:bg-sky-50/70 focus-visible:outline-none"
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-sky-50 text-[#009cd9] ring-1 ring-sky-100 transition-colors group-hover/item:bg-[#009cd9] group-hover/item:text-white group-hover/item:ring-[#009cd9]">
        <ItemIcon d={item.icon} className="w-5 h-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] text-slate-900 leading-snug">{item.label}</span>
        <span className="block mt-0.5 text-[13px] text-slate-500 leading-snug">{item.description}</span>
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------------------
   HeroHeader — site navigation
   --------------------------------------------------------------------------
   Links follow the live studwise.in menu (src/data/navigation.ts).
   "Services" and "About Us" open full-width mega menus: on hover (with a
   short close delay so the pointer can travel into the panel) or on
   click/Enter. Escape or a click outside closes them. Below lg the links
   move into a drawer, with the mega menus as accordions.
   -------------------------------------------------------------------------- */
export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  const close = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setOpen(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${open}"]`);
      close();
      trigger?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  return (
    <header ref={headerRef} className="relative z-50 w-full font-sans" onPointerLeave={scheduleClose}>
      <div className="max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Studwise Home">
          <div className="relative w-36 h-10 flex items-center">
            <Image src="/images/logo.png" alt="Studwise Logo" width={130} height={40} priority className="object-contain" />
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[15px] tracking-[-0.01em] text-slate-800">
            {mainNavLinks.map((link) => {
              const mega = link.mega;
              return mega ? (
                <li
                  key={link.label}
                  onPointerEnter={() => {
                    cancelClose();
                    setOpen(mega);
                  }}
                >
                  <button
                    type="button"
                    data-menu-trigger={mega}
                    aria-expanded={open === mega}
                    aria-controls={`mega-${mega}`}
                    onClick={() => setOpen(open === mega ? null : mega)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors hover:text-[#009cd9] ${
                      open === mega ? "text-[#009cd9] bg-white shadow-sm" : ""
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${open === mega ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </li>
              ) : (
                <li key={link.label} onPointerEnter={scheduleClose}>
                  <Link href={link.href} className="block px-3.5 py-2 rounded-full transition-colors hover:text-[#009cd9]">
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={tel(headerContact.phones[0])}
            className="hidden xl:flex items-center gap-2 text-sm tracking-[-0.01em] text-slate-700 hover:text-[#009cd9] transition-colors"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full bg-white ring-1 ring-slate-200 text-[#009cd9]">
              <ItemIcon
                d="M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z"
                className="w-4 h-4"
              />
            </span>
            <span className="tabular-nums">{headerContact.phones[0]}</span>
          </a>
          <Link
            href="/contact"
            className="text-sm tracking-[-0.01em] text-slate-700 hover:text-[#009cd9] px-4 py-2 rounded-full border border-slate-200 hover:bg-white transition-colors"
          >
            Contact Us
          </Link>
          <CloudButton href="#consultation-panel" size="sm" className="mt-0">
            Book Free Advisory
          </CloudButton>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <CloudButton href="#consultation-panel" size="sm" icon={false} className="mt-0">
            Free Advisory
          </CloudButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ================= Mega menus (desktop) ================= */}
      <div className="hidden lg:block absolute inset-x-0 top-full pointer-events-none">
        <div className="relative max-w-[1728px] mx-auto" onPointerEnter={cancelClose}>
          {/* Services */}
          <div
            id="mega-services"
            role="region"
            aria-label="Services"
            data-open={open === "services"}
            className="mega-panel absolute inset-x-6 xl:inset-x-7 top-2 grid grid-cols-12 gap-6 rounded-[1.75rem] bg-white p-6 xl:p-8 ring-1 ring-slate-200/80 shadow-[0_40px_80px_-30px_rgba(0,60,100,0.35)]"
          >
            <div className="col-span-9 grid grid-cols-3 gap-x-8">
              {serviceMenu.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">{group.title}</p>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <MegaLink key={item.label} item={item} onNavigate={close} />
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/services"
                onClick={close}
                className="col-span-3 mt-4 pt-4 border-t border-slate-100 inline-flex items-center gap-2 text-sm text-[#0078ad] hover:text-[#009cd9]"
              >
                View all services
                <ItemIcon d="M5 12h14m-6-6 6 6-6 6" className="w-4 h-4" />
              </Link>
            </div>
            <div className="col-span-3 flex flex-col justify-between rounded-3xl bg-[#009cd9] text-white p-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  Free 1-on-1 advisory
                </span>
                <p className="mt-4 text-xl leading-snug tracking-tight">Not sure which service you need?</p>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">
                  Tell us your plans and a Studwise advisor will guide you, step by step.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                <CloudButton href="#consultation-panel" variant="white" size="sm" className="mt-0" onClick={close}>
                  Book Free Advisory
                </CloudButton>
                <div className="text-sm text-white/85 space-y-1">
                  {headerContact.phones.map((ph) => (
                    <a key={ph} href={tel(ph)} className="block tabular-nums hover:text-white">
                      {ph}
                    </a>
                  ))}
                  <a href={`mailto:${headerContact.email}`} className="block hover:text-white">
                    {headerContact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div
            id="mega-about"
            role="region"
            aria-label="About Us"
            data-open={open === "about"}
            className="mega-panel absolute inset-x-6 xl:inset-x-7 top-2 grid grid-cols-12 gap-6 rounded-[1.75rem] bg-white p-6 xl:p-8 ring-1 ring-slate-200/80 shadow-[0_40px_80px_-30px_rgba(0,60,100,0.35)]"
          >
            <div className="col-span-7 grid grid-cols-2 gap-x-8 gap-y-1 content-start">
              <p className="col-span-2 mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">About Studwise</p>
              {aboutMenu.map((item) => (
                <MegaLink key={item.label} item={item} onNavigate={close} />
              ))}
            </div>
            <Link href="/about" onClick={close} className="group/about col-span-5 relative overflow-hidden rounded-3xl min-h-[240px]">
              <Image
                src="/images/hero/campus-students.jpg"
                alt=""
                fill
                sizes="520px"
                className="object-cover transition-transform duration-700 group-hover/about:scale-105"
              />
              <span className="absolute inset-0 bg-[#043656]/55" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-sky-100/90">Since 2019</span>
                <span className="block mt-2 text-xl leading-snug tracking-tight">
                  A study-abroad education consultancy headquartered in Manjeri, Malappuram.
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm text-white/90">
                  Read our story
                  <ItemIcon d="M5 12h14m-6-6 6 6-6 6" className="w-4 h-4 transition-transform group-hover/about:translate-x-1" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= Mobile drawer ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-5 py-5 shadow-xl max-h-[calc(100svh-5rem)] overflow-y-auto">
          <nav aria-label="Main" className="flex flex-col text-lg tracking-[-0.01em] text-slate-800">
            {mainNavLinks.map((link) =>
              link.mega ? (
                <details key={link.label} className="group/acc border-b border-slate-100">
                  <summary className="flex items-center justify-between py-3 cursor-pointer list-none">
                    {link.label}
                    <svg
                      className="w-4 h-4 text-slate-400 transition-transform group-open/acc:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pb-3 pl-3">
                    {(link.mega === "services" ? serviceMenu.flatMap((g) => g.items) : aboutMenu).map((item) => (
                      <MegaLink key={item.label} item={item} onNavigate={() => setMobileMenuOpen(false)} />
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 border-b border-slate-100 hover:text-[#009cd9]"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 hover:text-[#009cd9]">
              Contact Us
            </Link>
          </nav>
          <div className="mt-3 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <CloudButton href="#consultation-panel" onClick={() => setMobileMenuOpen(false)} className="w-full">
              Book Free Advisory Session
            </CloudButton>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              {headerContact.phones.map((ph) => (
                <a key={ph} href={tel(ph)} className="tabular-nums hover:text-[#009cd9]">
                  {ph}
                </a>
              ))}
              <a href={`mailto:${headerContact.email}`} className="hover:text-[#009cd9]">
                {headerContact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
