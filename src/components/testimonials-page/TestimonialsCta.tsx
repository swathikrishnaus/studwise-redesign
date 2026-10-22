import Link from "next/link";
import ConsultationCard from "@/components/hero/ConsultationCard";
import SoftCloud, { CLOUD_PUFF } from "@/components/hero/SoftCloud";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Eyebrow } from "@/components/shared/PageKit";
import { headerContact, socialLinks } from "@/data/navigation";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/* --------------------------------------------------------------------------
   TestimonialsCta — invitation to start, beside the consultation card
   (#consultation-panel, the target of the header's "Book Free Advisory")
   -------------------------------------------------------------------------- */
export default function TestimonialsCta() {
  return (
    <section aria-labelledby="tm-cta-heading">
      <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0aa6e3] via-[#009cd9] to-[#0a7fb3] text-white px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-16">
        <div
          className="absolute -top-32 -left-24 -z-10 w-[520px] h-[520px] rounded-full bg-white/20 blur-[110px]"
          aria-hidden="true"
        />
        <div className="absolute -right-16 -bottom-6 -z-10 w-[380px] sm:w-[560px] opacity-30" aria-hidden="true">
          <SoftCloud shape={CLOUD_PUFF} seed={17} className="w-full h-auto" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div data-reveal className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between gap-12 lg:py-2">
            <div>
              <Eyebrow tone="light">Start your journey</Eyebrow>
              <h2
                id="tm-cta-heading"
                className="mt-5 font-normal tracking-[-0.04em] leading-[1] text-[clamp(2.1rem,8vw,3rem)] sm:text-[clamp(2.6rem,5.6vw,4rem)] lg:text-[min(4.4vw,4.6rem)] text-balance"
              >
                Your story could be the next one here.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] sm:text-lg leading-relaxed text-white/85">
                Talk to a Studwise advisor about your course, university and visa. It&apos;s free, with no obligation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-14 px-6 rounded-full ring-1 ring-white/45 text-sm uppercase tracking-[0.06em] text-white hover:bg-white/10 transition-colors"
                >
                  Contact us
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.2em] text-sky-100/80">Follow us</span>
                <ul className="flex flex-wrap gap-2" aria-label="Studwise on social media">
                  {socialLinks.map((sl) => (
                    <li key={sl.label}>
                      <a
                        href={sl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full bg-white/10 ring-1 ring-white/30 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0a7fb3]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d={sl.icon} />
                        </svg>
                        {sl.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct contact, filling the column beside the taller card */}
            <dl className="grid sm:grid-cols-3 gap-5 pt-6 border-t border-white/20 text-sm">
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
                <dd className="mt-1.5 text-white">Manjeri · Valanchery · Calicut</dd>
              </div>
            </dl>
          </div>

          <div data-reveal className="lg:col-span-6 xl:col-span-5 flex text-slate-900 w-full max-w-md mx-auto lg:max-w-none">
            <ConsultationCard />
          </div>
        </div>
      </div>
    </section>
  );
}
