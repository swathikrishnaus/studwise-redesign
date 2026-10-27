import Link from "next/link";
import type { CSSProperties } from "react";
import AdvisorForm from "@/components/shared/AdvisorForm";
import SoftCloud, { CLOUD_PUFF } from "@/components/hero/SoftCloud";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { aboutCta, centres } from "@/data/aboutPage";
import { headerContact, socialLinks } from "@/data/navigation";
import { SocialBadge } from "@/components/ui/SocialLinks";
import { Eyebrow, gutter } from "@/components/shared/PageKit";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export default function AboutCtaSection() {
  return (
    <section aria-labelledby="about-cta-heading" className="bg-[#F1F5F9]">
      <div className={`${gutter} py-3 sm:py-4 lg:py-6 pb-16 sm:pb-20 lg:pb-24`}>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0aa6e3] via-[#009cd9] to-[#0a7fb3] text-white px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-16">
          {/* Atmosphere */}
          <div className="absolute -top-32 -left-24 -z-10 w-[520px] h-[520px] rounded-full bg-white/20 blur-[110px]" aria-hidden="true" />
          <div className="absolute -right-16 -bottom-6 -z-10 w-[380px] sm:w-[560px] opacity-30" aria-hidden="true">
            <SoftCloud shape={CLOUD_PUFF} seed={9} className="w-full h-auto" />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between gap-12 lg:py-2">
              <div>
                <div data-reveal>
                  <Eyebrow tone="light">Start your journey</Eyebrow>
                  <h2 id="about-cta-heading" className="section-title mt-5">
                    {aboutCta.title}
                  </h2>
                </div>
                <p data-reveal style={{ "--d": "0.08s" } as CSSProperties} className="mt-6 max-w-lg body-lead text-white/85">
                  {aboutCta.text}
                </p>
                <div data-reveal style={{ "--d": "0.16s" } as CSSProperties} className="mt-8 flex flex-wrap items-center gap-3">
                  <WhatsAppButton>Let&apos;s get started</WhatsAppButton>
                  <Link
                    href={aboutCta.moreInfoHref}
                    className="inline-flex items-center gap-2 h-14 px-6 rounded-full ring-1 ring-white/45 text-sm uppercase tracking-[0.06em] text-white hover:bg-white/10 transition-colors"
                  >
                    More information
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                </div>

                {/* Social profiles */}
                <div data-reveal style={{ "--d": "0.2s" } as CSSProperties} className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-sky-100/80">Follow us</span>
                  <ul className="flex flex-wrap gap-2" aria-label="Studwise on social media">
                    {socialLinks.map((sl) => (
                      <li key={sl.label}>
                        <a
                          href={sl.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 h-10 pl-1.5 pr-4 rounded-full bg-white/10 ring-1 ring-white/30 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0a7fb3]"
                        >
                          <SocialBadge s={sl} />
                          {sl.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct contact, filling the column beside the taller card */}
              <dl
                data-reveal
                style={{ "--d": "0.24s" } as CSSProperties}
                className="grid sm:grid-cols-3 gap-5 pt-6 border-t border-white/20 text-sm"
              >
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-sky-100/80">Call us</dt>
                  {headerContact.phones.map((ph) => (
                    <dd key={ph} className="mt-1.5">
                      <a href={tel(ph)} className="tabular-nums text-white hover:text-sky-100">
                        {ph}
                      </a>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-sky-100/80">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${headerContact.email}`} className="text-white hover:text-sky-100">
                      {headerContact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-sky-100/80">Visit us</dt>
                  <dd className="mt-1.5 text-white">{centres.map((c) => c.name).join(" · ")}</dd>
                </div>
              </dl>
            </div>

            <div
              data-reveal
              style={{ "--d": "0.2s" } as CSSProperties}
              className="lg:col-span-6 xl:col-span-5 flex min-w-0 text-slate-900 w-full max-w-md mx-auto lg:max-w-none"
            >
              <AdvisorForm id="consultation-panel" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
