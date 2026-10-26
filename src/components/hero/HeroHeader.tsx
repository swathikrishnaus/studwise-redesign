"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CloudButton from "@/components/ui/CloudButton";
import MobileMenu, { MenuToggle } from "@/components/navigation/MobileMenu";
import { getLenis } from "@/components/layout/SmoothScroll";
import { aboutMenu, aboutMenuExtras, headerContact, mainNavLinks, serviceMenu } from "@/data/navigation";
import type { MegaItem } from "@/data/navigation";

type MenuKey = "services" | "about";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const ARROW = "M5 12h14m-6-6 6 6-6 6";
const MAIL = "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z";
const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";

/** Header pills: white at rest; pastel blue with brand-blue text when hovered, focused, open or on the current page */
const pill =
  "cursor-pointer flex items-center gap-1.5 h-10 px-3 xl:px-4 rounded-full ring-1 transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:bg-[#e3f4fc] focus-visible:text-[#009cd9] focus-visible:ring-[#009cd9]/40";
const pillIdle =
  "bg-white text-slate-800 ring-slate-900/[0.07] shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:bg-[#e3f4fc] hover:text-[#009cd9] hover:ring-[#009cd9]/20";
const pillOn = "bg-[#e3f4fc] text-[#009cd9] ring-[#009cd9]/20";

const aboutFeatured = aboutMenu.filter((i) => i.featured);
const aboutMore = [...aboutMenu.filter((i) => !i.featured && !i.footerOnly), ...aboutMenuExtras];

function ItemIcon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={d} />
    </svg>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full bg-[#e3f4fc] px-2 py-0.5 text-[10.5px] leading-none tracking-wide text-[#0a7fb3]">{children}</span>;
}

/** A large card in a mega menu's left column: pastel icon tile, label and
    description (`dense`: the description only shows from xl, for the
    three-column Services grid) */
function FeatureCard({ item, onNavigate, dense = false }: { item: MegaItem; onNavigate: () => void; dense?: boolean }) {
  return (
    <Link
      href={item.href}
      onClick={(e) => {
        onNavigate();
        // Already on that page (e.g. "About Studwise" on /about): back to its banner
        if (window.location.pathname === item.href) {
          e.preventDefault();
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(0, { duration: 1.2 });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="group/card flex items-center gap-3.5 xl:gap-4 rounded-2xl bg-white px-3.5 py-3.5 xl:px-4 xl:py-4 ring-1 ring-slate-900/[0.07] transition-[background-color,box-shadow] duration-300 hover:bg-[#f6fbfe] hover:ring-[#009cd9]/30 focus-visible:ring-2 focus-visible:ring-[#009cd9] focus-visible:outline-none"
    >
      <span className="shrink-0 grid place-items-center w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-[#e3f4fc] text-[#009cd9] transition-colors duration-300 group-hover/card:bg-[#d2ecfa]">
        <ItemIcon d={item.icon} className="w-[22px] h-[22px]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-2 text-[15px] xl:text-[16px] leading-snug tracking-[-0.01em] text-slate-900">
          {item.label}
          {item.badge && <Badge>{item.badge}</Badge>}
        </span>
        <span className={`${dense ? "hidden xl:block" : "block"} mt-0.5 text-[13px] xl:text-[13.5px] leading-snug text-slate-500`}>
          {item.description}
        </span>
      </span>
      <ItemIcon
        d={ARROW}
        className="shrink-0 w-4 h-4 text-[#009cd9] opacity-0 -translate-x-1.5 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0"
      />
    </Link>
  );
}

/** A white tile in a mega menu's filled side card: pastel icon tile, label and description */
function QuickLink({ item, onNavigate }: { item: MegaItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/item flex items-center gap-3 rounded-xl bg-white p-2.5 xl:p-3 ring-1 ring-[#009cd9]/[0.08] transition-[box-shadow,color] duration-300 hover:ring-[#009cd9]/30 focus-visible:ring-2 focus-visible:ring-[#009cd9] focus-visible:outline-none"
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-[#e3f4fc] text-[#009cd9]">
        <ItemIcon d={item.icon} className="w-5 h-5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[14.5px] leading-snug text-slate-900 transition-colors group-hover/item:text-[#0a7fb3]">
          {item.label}
          {item.badge && <Badge>{item.badge}</Badge>}
        </span>
        <span className="block mt-0.5 text-[12.5px] leading-snug text-slate-500">{item.description}</span>
      </span>
    </Link>
  );
}

/** The filled side card that holds a mega menu's quick links and its call to action */
const sideCard = "flex flex-col rounded-2xl bg-gradient-to-b from-[#eef8fd] to-[#dcf0fa] p-4 xl:p-5 ring-1 ring-[#009cd9]/10";

/** The pill that hangs from a panel's bottom edge */
function PanelTag() {
  return (
    <a
      href={tel(headerContact.phones[0])}
      className="absolute left-1/2 -bottom-4 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#e3f4fc] px-4 h-8 text-[13px] text-[#0b2a45] ring-1 ring-[#009cd9]/20 transition-colors hover:bg-[#d2ecfa]"
    >
      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping motion-reduce:animate-none" />
      </span>
      Advisors online now
      <span className="text-[#0b2a45]/40" aria-hidden="true">·</span>
      <span className="tabular-nums">{headerContact.phones[0]}</span>
    </a>
  );
}

const panel =
  "mega-panel absolute inset-x-6 xl:inset-x-7 top-3 rounded-[1.75rem] bg-[#FCFDFE] p-6 xl:p-8 pb-8 xl:pb-10 ring-1 ring-slate-900/[0.06] shadow-[0_24px_60px_-34px_rgba(0,60,100,0.3)]";

/* --------------------------------------------------------------------------
   HeroHeader — site navigation
   --------------------------------------------------------------------------
   Links follow the live studwise.in menu (src/data/navigation.ts). On
   desktop the logo sits on the left, the links in pills in the middle and
   the contact actions on the right. "Services" and
   "About Us" open full-width mega menus: on hover (with a short close
   delay so the pointer can travel into the panel) or on click/Enter.
   Services lays out all nine services at once, in three columns by stage
   of the journey; each panel pairs large cards with quick links and an
   advisory card. Icons sit on pastel tiles and cards only tint on hover. Escape or a click outside closes them. Below lg the
   links move into a full-screen menu.
   Once the bar has scrolled away it hides while the page scrolls down
   and slides back in, on a frosted strip, as soon as the reader scrolls
   up (on every screen size); at the very top it rejoins the page.
   -------------------------------------------------------------------------- */
export default function HeroHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const [open, setOpen] = useState<MenuKey | null>(null);
  // "top": in the page flow; "pinned": fixed and showing; "hidden": fixed, slid up
  const [bar, setBar] = useState<"top" | "pinned" | "hidden">("top");
  // Slide only between pinned and hidden, never when leaving or rejoining the flow
  const [glide, setGlide] = useState(false);
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

  useEffect(() => {
    let state = "top";
    let last = window.scrollY;
    let raf = 0;
    const set = (next: "top" | "pinned" | "hidden", animate: boolean) => {
      if (next === state) return;
      state = next;
      setGlide(animate);
      setBar(next);
      if (next === "hidden") close();
    };
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      // A scripted jump (e.g. the student spotlight's faces) never brings the bar back
      if (y >= 1 && document.documentElement.dataset.navLock) {
        if (state === "pinned") set("hidden", true);
        last = y;
        return;
      }
      if (y < 1) set("top", false);
      else if (state === "top") {
        // Leave the flow only once the bar has scrolled out of sight
        if (y > 80) set("hidden", false);
      } else if (y - last > 8) set("hidden", true);
      else if (last - y > 8) set("pinned", true);
      else return;
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [close]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header ref={headerRef} className="relative z-50 w-full h-20 font-sans [font-optical-sizing:none]" onPointerLeave={scheduleClose}>
      {/* The bar and its mega menus; the header keeps its 80px in the flow while this is fixed */}
      <div className="site-bar" data-bar={bar} data-glide={glide}>
        {/* Backdrop while a mega menu is open: dims and blurs the page so the
            panel reads cleanly (inside the header's stacking context, so it
            sits above the page but below the header and panels) */}
        <div
          className={`hidden lg:block fixed inset-0 -z-10 bg-[#0b2a45]/35 backdrop-blur-[6px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onPointerEnter={scheduleClose}
          onClick={close}
          aria-hidden="true"
        />
        {/* Strip behind the bar: solid while a mega menu is open, frosted while pinned */}
        <div
          className={`absolute inset-x-0 top-0 h-20 -z-[5] transition-[opacity,background-color,box-shadow] duration-300 ${
            open
              ? "opacity-100 bg-[#F1F5F9]"
              : bar === "top"
                ? "opacity-0 bg-[#F1F5F9]"
                : "opacity-100 bg-[#F1F5F9]/85 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgba(15,23,42,0.07)]"
          }`}
          aria-hidden="true"
        />
        <div className="relative max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 h-20 grid grid-cols-[1fr_auto] lg:grid-cols-[auto_1fr_auto] items-center gap-4 xl:gap-6">
          {/* Brand logo (left) */}
          <Link href="/" onPointerEnter={scheduleClose} className="justify-self-start flex items-center shrink-0" aria-label="Studwise Home">
            <Image src="/images/studwise-new-logo.png" alt="Studwise Logo" width={3350} height={1209} sizes="122px" priority className="w-[112px] lg:w-[122px] h-auto" />
          </Link>

          {/* Desktop navigation (centre) */}
          <nav aria-label="Main" className="hidden lg:block justify-self-center">
            <ul className="flex items-center gap-1.5 text-[14px] tracking-[-0.01em]">
              {mainNavLinks.map((link) => {
                const mega = link.mega;
                const current = isCurrent(link.href);
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
                      className={`${pill} ${open === mega || current ? pillOn : pillIdle}`}
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
                  // The logo links home, so the Home pill only shows where there is room
                  <li key={link.label} onPointerEnter={scheduleClose} className={link.href === "/" ? "hidden xl:block" : undefined}>
                    <Link href={link.href} aria-current={current ? "page" : undefined} className={`${pill} ${current ? pillOn : pillIdle}`}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li onPointerEnter={scheduleClose}>
                <Link href="/contact" aria-current={isCurrent("/contact") ? "page" : undefined} className={`${pill} ${isCurrent("/contact") ? pillOn : pillIdle}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex justify-self-end items-center gap-1.5 shrink-0 text-[14px] tracking-[-0.01em]" onPointerEnter={scheduleClose}>
            {/* The number as plain text, no pill */}
            <a
              href={tel(headerContact.phones[0])}
              className="hidden xl:flex items-center gap-2 h-10 px-3 rounded-full text-slate-800 transition-colors hover:text-[#009cd9] focus-visible:text-[#009cd9]"
            >
              <ItemIcon d={PHONE} className="w-4 h-4 text-[#009cd9]" />
              <span className="tabular-nums">{headerContact.phones[0]}</span>
            </a>
            <CloudButton href="#consultation-panel" size="sm" className="mt-0">
              Book Free Advisory
            </CloudButton>
          </div>

          {/* Mobile toggle (the advisory button lives in the bottom tab bar) */}
          <div className="lg:hidden justify-self-end">
            <MenuToggle open={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)} />
          </div>
        </div>

        {/* ================= Mega menus (desktop) ================= */}
        <div className="hidden lg:block absolute inset-x-0 top-full pointer-events-none">
          <div className="relative max-w-[1728px] mx-auto" onPointerEnter={cancelClose}>
            {/* Services: all nine at once, in three columns by stage */}
            <div id="mega-services" role="region" aria-label="Services" data-open={open === "services"} className={panel}>
              <div className="grid grid-cols-12 gap-8 xl:gap-10">
                <div className="col-span-9 grid grid-cols-3 gap-3 xl:gap-4">
                  {serviceMenu.map((g, i) => (
                    <div key={g.title} className="flex flex-col">
                      <p className="flex items-center gap-2 h-8 mb-2 text-[13px] text-slate-500">
                        <span className="text-[11px] tabular-nums text-slate-400">0{i + 1}</span>
                        {g.title}
                      </p>
                      <div className="flex-1 grid grid-rows-3 gap-3">
                        {g.items.map((item) => (
                          <FeatureCard key={item.label} item={item} onNavigate={close} dense />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* The advisory card fills the side column */}
                <div className={`col-span-3 ${sideCard} justify-between`}>
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#0a7fb3] ring-1 ring-[#009cd9]/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                      Free 1-on-1 advisory
                    </span>
                    <p className="mt-5 text-[1.35rem] xl:text-[1.6rem] leading-[1.1] tracking-[-0.03em] text-[#0b2a45]">Not sure which service you need?</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                      Tell us your plans and a Studwise advisor will guide you, step by step.
                    </p>
                  </div>
                  <div className="mt-6">
                    <CloudButton href="#consultation-panel" onClick={close} size="sm" className="mt-0 w-full h-11">
                      Book Free Advisory
                    </CloudButton>
                    <div className="mt-5 pt-4 border-t border-[#009cd9]/15 space-y-1.5 text-[13.5px] text-slate-700">
                      {headerContact.phones.map((ph) => (
                        <a key={ph} href={tel(ph)} className="flex items-center gap-2 tabular-nums transition-colors hover:text-[#0a7fb3]">
                          <ItemIcon d={PHONE} className="w-4 h-4 text-[#009cd9]" />
                          {ph}
                        </a>
                      ))}
                      <a href={`mailto:${headerContact.email}`} className="flex items-center gap-2 transition-colors hover:text-[#0a7fb3]">
                        <ItemIcon d={MAIL} className="w-4 h-4 text-[#009cd9]" />
                        {headerContact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <PanelTag />
            </div>

            {/* About */}
            <div id="mega-about" role="region" aria-label="About Us" data-open={open === "about"} className={panel}>
              <div className="grid grid-cols-12 gap-8 xl:gap-10">
                <div className="col-span-6 xl:col-span-5 grid grid-rows-4 gap-3">
                  {aboutFeatured.map((item) => (
                    <FeatureCard key={item.label} item={item} onNavigate={close} />
                  ))}
                </div>

                <div className={`col-span-6 xl:col-span-7 ${sideCard}`}>
                  {/* The tiles stretch to fill the height beside the four cards */}
                  <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-2">
                    {aboutMore.map((item) => (
                      <QuickLink key={item.label} item={item} onNavigate={close} />
                    ))}
                  </div>
                  <div className="pt-4">
                    <div className="mb-4 h-px bg-[#009cd9]/15" aria-hidden="true" />
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-[1.35rem] xl:text-[1.6rem] leading-[1.1] tracking-[-0.03em] text-[#0b2a45]">
                        Guiding students abroad from Manjeri, Malappuram, since 2019.
                      </p>
                      <CloudButton href="/about" onClick={close} size="sm" className="mt-0 shrink-0 h-11">
                        Our story
                      </CloudButton>
                    </div>
                  </div>
                </div>
              </div>
              <PanelTag />
            </div>
          </div>
        </div>

      </div>

      {/* ================= Mobile menu ================= */}
      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}
