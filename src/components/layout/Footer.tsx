import Link from "next/link";
import { aboutMenu, headerContact, serviceMenu, socialLinks } from "@/data/navigation";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import ScrollWords from "@/components/shared/ScrollWords";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const EMAIL = "info@studwise.in";

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "About Studwise",
    links: aboutMenu.map((m) => ({ label: m.label, href: m.href })),
  },
  {
    title: "Our Services",
    links: serviceMenu.flatMap((g) => g.items).map((s) => ({ label: s.label, href: s.href })),
  },
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Our Team", href: "/team" },
      { label: "Blogs", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      ...socialLinks.map((s) => ({ label: s.label, href: s.href, external: true })),
      { label: headerContact.phones[0], href: tel(headerContact.phones[0]) },
      { label: headerContact.phones[1], href: tel(headerContact.phones[1]) },
      { label: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
];

const actions = [
  { label: headerContact.phones[0], href: tel(headerContact.phones[0]) },
  { label: "Email us", href: `mailto:${EMAIL}` },
  { label: "Book free advisory", href: bookAppointmentHref, external: true },
];

function ExternalIcon() {
  return (
    <svg className="inline-block ml-1.5 -mt-0.5 w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6m0-6L10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

const ext = (external?: boolean) => (external ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 overflow-hidden text-white bg-[#0b2a45] rounded-t-[2rem] lg:rounded-t-[3rem]">
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ---------------- Contact pills ---------------- */}
        <ul className="grid sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-8 pt-10 sm:pt-14">
          {actions.map((a) => (
            <li key={a.label}>
              <a
                href={a.href}
                {...ext(a.external)}
                className="flex items-center justify-center h-14 rounded-full ring-1 ring-white/70 text-[15px] sm:text-base uppercase tracking-[0.06em] tabular-nums transition-colors duration-300 hover:bg-white hover:text-[#0b2a45]"
              >
                {a.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ---------------- Logo + link columns ---------------- */}
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 pt-14 sm:pt-20 pb-14 sm:pb-16">
          <div className="lg:col-span-4">
            <ScrollWords
              text="Study abroad consultants from Kerala, guiding students from shortlist to visa to their first day on campus."
              className="max-w-md text-[1.6rem] sm:text-[1.9rem] lg:text-[2.1rem] leading-[1.2] tracking-[-0.02em] text-white/85"
            />
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xl sm:text-[1.4rem] tracking-[-0.01em] text-white">{col.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.external || /^(tel|mailto):/.test(l.href) ? (
                        <a
                          href={l.href}
                          {...ext(l.external)}
                          className="footer-link whitespace-nowrap text-[14px] text-white/75 hover:text-white tabular-nums"
                        >
                          {l.label}
                          {l.external && <ExternalIcon />}
                        </a>
                      ) : (
                        <Link href={l.href} className="footer-link text-[14px] text-white/75 hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ---------------- Legal line ---------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-10 text-xs leading-relaxed text-white/50">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {year} All rights reserved Studwise Pvt Ltd</span>
            <span className="text-white/25" aria-hidden="true">·</span>
            <Link href="/privacy-policy" className="footer-link hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/25" aria-hidden="true">·</span>
            <Link href="/terms-and-conditions" className="footer-link hover:text-white">
              Terms and Conditions
            </Link>
          </p>
          <div className="md:text-right">
            <p className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Manjeri, Kerala
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Wordmark ---------------- */}
      <div className="border-t border-white/10 overflow-hidden" aria-hidden="true">
        <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-10">
          <svg className="block w-full h-auto translate-y-[12%]" viewBox="0 -20 1620 320">
            <text
              x="0"
              y="268"
              textLength="1600"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              className="font-sans text-white/[0.07]"
              style={{ fontSize: 370, letterSpacing: "-0.06em" }}
            >
              studwise
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
