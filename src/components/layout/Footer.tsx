import Image from "next/image";
import Link from "next/link";
import { footerNavLinks, serviceMenu } from "@/data/navigation";
import { offices } from "@/data/offices";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import FooterClock from "./FooterClock";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

const contactCards = [
  {
    label: "WhatsApp",
    value: "Chat with an advisor",
    href: bookAppointmentHref,
    external: true,
    icon: "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z",
    fill: true,
  },
  {
    label: "Call us",
    value: "+91 91136 50884",
    href: tel("+91 91136 50884"),
    icon: "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z",
  },
  {
    label: "Email",
    value: "info@studwise.in",
    href: "mailto:info@studwise.in",
    icon: "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z",
  },
];

/* --------------------------------------------------------------------------
   Footer — site-wide
   --------------------------------------------------------------------------
   A solid deep navy (#0b2a45); the homepage's last section fades into it.
   Contact cards first, then link columns and offices,
   and a full-width "studwise" wordmark with a plane crossing it.
   -------------------------------------------------------------------------- */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 overflow-hidden text-white bg-[#0b2a45] rounded-t-[2rem] lg:rounded-t-[3rem]">

      <div className="relative max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-24">
        {/* ---------------- Statement + contact cards ---------------- */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-sky-200/80">
              <span className="h-px w-10 bg-sky-200/40" aria-hidden="true" />
              Ready when you are
            </p>
            <h2 className="font-normal tracking-[-0.04em] leading-[0.98] text-[clamp(2rem,3.6vw,3.4rem)]">
              Your world-class degree starts with{" "}
              <span className="text-[#7fd6f7]">one conversation.</span>
            </h2>
          </div>
          <ul className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {contactCards.map((c, i) => (
              <li key={c.label} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex sm:flex-col justify-between gap-4 sm:gap-6 h-full rounded-3xl p-4 sm:p-5 bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-between sm:w-full gap-3">
                    <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white/10 text-sky-200 transition-colors group-hover:bg-sky-50 group-hover:text-[#009cd9]">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill={c.fill ? "currentColor" : "none"}
                        stroke={c.fill ? "none" : "currentColor"}
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={c.icon} />
                      </svg>
                    </span>
                    <svg className="hidden sm:block w-5 h-5 text-white/40 transition-all duration-300 group-hover:text-[#009cd9] group-hover:-rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                  <span className="flex-1 sm:flex-none">
                    <span className="block text-xs text-white/50 group-hover:text-slate-500">{c.label}</span>
                    <span className="block mt-1 text-[15px] leading-snug">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- Link columns ---------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-y-12 pt-12 sm:pt-16 pb-6">
          <div className="col-span-1 lg:col-span-3">
            <Link href="/" aria-label="Studwise home" className="inline-block">
              <Image src="/images/logo-white.png" alt="Studwise" width={657} height={240} className="h-11 w-auto" />
            </Link>
            <p className="hidden sm:block mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Study abroad consultants from Kerala — guiding students from shortlist to visa to their first day on
              campus.
            </p>
            <a
              href="#main-content"
              className="group mt-5 inline-flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-[#006da0] group-hover:-translate-y-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.5 15.6v-1.8l-8-5V3.3a1.5 1.5 0 0 0-3 0v5.5l-8 5v1.8l8-2.5v5.5l-2 1.5V22l3.5-1 3.5 1v-1.4l-2-1.5v-5.5l8 2.5Z" />
                </svg>
              </span>
              Back to top
            </a>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-sky-200/70 mb-5">Explore</h3>
            <ul className="space-y-3">
              {footerNavLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-[15px] text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-4">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-sky-200/70 mb-5">Services</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
              {serviceMenu.flatMap((g) => g.items).map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="footer-link text-[15px] text-white/75 hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-sky-200/70 mb-5">Offices</h3>
            <ul className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {offices.map((o) => (
                <li key={o.city} className="flex gap-4">
                  <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#33b7ea] shadow-[0_0_0_4px_rgba(51,183,234,0.18)]" aria-hidden="true" />
                  <div className="text-sm leading-relaxed">
                    <p className="text-white">
                      {o.city}
                      <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-white/40">
                        {o.comingSoon ? "Coming soon" : o.kind}
                      </span>
                    </p>
                    {o.address && <p className="text-white/55">{o.address}</p>}
                    {o.phones.map((ph) => (
                      <a key={ph} href={tel(ph)} className="footer-link text-white/75 hover:text-white">
                        {ph}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------- Wordmark, with a plane flying its route above ---------------- */}
      <div className="relative select-none pt-10 sm:pt-14 pb-8 sm:pb-12" aria-hidden="true">
        {/* Dashed route + plane sit in their own band above the letters */}
        <div className="relative h-8 sm:h-10 mb-4 sm:mb-6">
          <svg className="absolute inset-x-0 top-1/2 w-full h-2 -translate-y-1/2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 10">
            <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,255,255,0.18)" strokeWidth="0.15" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="footer-plane absolute top-1/2 left-0 -translate-y-1/2 text-white">
            <svg className="w-6 h-6 sm:w-9 sm:h-9 rotate-90 drop-shadow-[0_0_12px_rgba(127,214,247,0.8)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 15.6v-1.8l-8-5V3.3a1.5 1.5 0 0 0-3 0v5.5l-8 5v1.8l8-2.5v5.5l-2 1.5V22l3.5-1 3.5 1v-1.4l-2-1.5v-5.5l8 2.5Z" />
            </svg>
          </div>
        </div>
        <p className="text-center font-normal leading-[0.9] tracking-[-0.065em] text-[16vw] text-white/[0.07]">studwise</p>
      </div>

      {/* ---------------- Bottom bar ---------------- */}
      <div className="relative border-t border-white/10">
        <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} Studwise Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Manjeri, Kerala · <FooterClock />
          </p>
        </div>
      </div>
    </footer>
  );
}
