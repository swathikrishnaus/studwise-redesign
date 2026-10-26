import type { Metadata } from "next";
import Link from "next/link";
import HeroHeader from "@/components/hero/HeroHeader";
import FooterClock from "@/components/layout/FooterClock";
import { Eyebrow, Icon, gutter, toneAt } from "@/components/shared/PageKit";
import ContactForm from "@/components/contact-page/ContactForm";
import { contactEmail, contactIntro, faqIntro, faqs } from "@/data/contact";
import { headerContact, socialLinks } from "@/data/navigation";
import { SocialBadge } from "@/components/ui/SocialLinks";
import { directionsUrl, mapEmbedUrl, offices } from "@/data/offices";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import CloudButton from "@/components/ui/CloudButton";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Studwise study abroad consultants in Manjeri, Valanchery and Calicut. Call, WhatsApp or email us, or send a message for free guidance.",
  alternates: { canonical: "/contact" },
};

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

const WHATSAPP = socialLinks.find((s) => s.label === "WhatsApp")!.icon;

/* Filled glyphs for the contact channel cards, matching the WhatsApp logo */
const SOLID = {
  phone:
    "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v.4l-10 6.3L2 6.4V6a2 2 0 0 1 2-2Zm-2 4.8V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.8l-9.5 6a1 1 0 0 1-1 0L2 8.8Z",
};

const ICON = {
  phone:
    "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z",
  mail: "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  arrow: "M7 17 17 7m0 0H9m8 0v8",
  plus: "M12 5v14M5 12h14",
};

const channels = [
  { label: "Chat on WhatsApp", value: headerContact.phones[0], href: bookAppointmentHref, external: true, whatsapp: true, icon: WHATSAPP },
  { label: "Call us", value: headerContact.phones[0], href: tel(headerContact.phones[0]), icon: SOLID.phone },
  { label: "Email us", value: contactEmail, href: `mailto:${contactEmail}`, icon: SOLID.mail },
];

const steps = [
  { title: "Send your message", text: "Tell us where and what you'd like to study, and any questions you have." },
  { title: "An advisor replies", text: "A Studwise counsellor gets back to you on WhatsApp, phone or email." },
  { title: "Plan your next step", text: "Book a free advisory session at one of our offices or online." },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        {/* Masthead */}
        <header className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 pt-12 pb-8 sm:px-10 sm:pt-16 lg:px-14 lg:pt-20 lg:pb-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Contact us</Eyebrow>
              <h1 className="banner-title mt-6 text-slate-900">
                Dreaming to go abroad <span className="text-[#0a7fb3]">for your studies?</span>
              </h1>
              <p className="mt-6 max-w-lg body-lead text-slate-600">{contactIntro.text}</p>
            </div>
            <ul className="lg:col-span-5 grid gap-2.5">
              {channels.map((c, i) => {
                const tone = toneAt(i);
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...("external" in c ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`group flex items-center gap-4 rounded-2xl ${tone.bg} px-4 py-3.5 sm:px-5 sm:py-4 transition-transform duration-300 hover:-translate-y-0.5`}
                    >
                      <span
                        className={`grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-white/80 ${"whatsapp" in c ? "text-[#25D366]" : tone.ink}`}
                      >
                        <svg className={"whatsapp" in c ? "w-6 h-6" : "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d={c.icon} />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-slate-600">{c.label}</span>
                        <span className="block text-base sm:text-lg tracking-tight text-slate-900 tabular-nums truncate">{c.value}</span>
                      </span>
                      <Icon
                        d={ICON.arrow}
                        className="w-5 h-5 shrink-0 text-slate-400 transition-all duration-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </header>

        {/* Form + what happens next */}
        <section aria-label="Send a message" className="mt-6 sm:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div id="consultation-panel" className="scroll-mt-6 lg:col-span-7 xl:col-span-8 lg:sticky lg:top-6">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="rounded-3xl bg-[#0b2a45] text-white p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-sky-200/80">What happens next</p>
              <ol className="mt-6 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid place-items-center w-8 h-8 shrink-0 rounded-full bg-white/10 text-sm tabular-nums text-sky-100 ring-1 ring-white/15">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-lg tracking-tight">{s.title}</span>
                      <span className="mt-1 block text-[15px] sm:text-base leading-relaxed text-white/65">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-900/5">
              <p className="flex items-center gap-2 text-sm text-slate-600">
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60 motion-reduce:animate-none" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                Manjeri, Kerala · <FooterClock />
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-slate-400">Phone</p>
              <ul className="mt-2 space-y-1">
                {headerContact.phones.map((ph) => (
                  <li key={ph}>
                    <a href={tel(ph)} className="text-lg tracking-tight text-slate-900 tabular-nums hover:text-[#0a7fb3]">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-slate-400">Email</p>
              <ul className="mt-2 space-y-1">
                {[contactEmail, headerContact.email].map((m) => (
                  <li key={m}>
                    <a href={`mailto:${m}`} className="text-lg tracking-tight text-slate-900 hover:text-[#0a7fb3] break-all">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex gap-2" aria-label="Studwise on social media">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-10 pl-1.5 pr-4 rounded-full ring-1 ring-slate-200 text-sm text-slate-700 transition-colors hover:bg-[#009cd9] hover:text-white hover:ring-[#009cd9]"
                    >
                      <SocialBadge s={s} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* Offices */}
        <section id="offices" aria-labelledby="offices-heading" className="scroll-mt-6 mt-20 sm:mt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 px-0 sm:px-2">
            <div>
              <Eyebrow>Our offices</Eyebrow>
              <h2
                id="offices-heading"
                className="section-title mt-5 text-slate-900"
              >
                Visit us <span className="text-[#0a7fb3]">in person.</span>
              </h2>
            </div>
            <p className="max-w-sm body-text text-slate-600">
              Meet a counsellor at our head office in Manjeri or our branch in Valanchery. Calicut is opening soon.
            </p>
          </div>

          <ul className="mt-8 sm:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {offices.map((o) => (
              <li key={o.city} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/5">
                <div className="relative aspect-[16/10] bg-slate-100">
                  {o.mapQuery ? (
                    <iframe
                      title={`Map of the Studwise ${o.city} office`}
                      src={mapEmbedUrl(o.mapQuery)}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0 grayscale-[0.4]"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#e3f3fc] to-[#d2edfa]">
                      <span className="flex flex-col items-center gap-3 text-[#0a7fb3]">
                        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/80">
                          <Icon d={ICON.pin} className="w-7 h-7" />
                        </span>
                        <span className="text-sm">Opening soon</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl tracking-[-0.03em] text-slate-900">{o.city}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${
                        o.comingSoon ? "bg-amber-50 text-amber-700" : o.kind === "Head office" ? "bg-sky-50 text-[#0a7fb3]" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {o.comingSoon ? "Coming soon" : o.kind}
                    </span>
                  </div>
                  {o.address && <p className="mt-3 body-text text-slate-600">{o.address}</p>}
                  <div className="mt-auto pt-6 space-y-1.5 text-base">
                    {o.phones.map((ph) => (
                      <a key={ph} href={tel(ph)} className="flex items-center gap-2.5 text-slate-800 hover:text-[#0a7fb3] tabular-nums">
                        <Icon d={ICON.phone} className="w-4 h-4 text-slate-400" />
                        {ph}
                      </a>
                    ))}
                    {o.emails.map((m) => (
                      <a key={m} href={`mailto:${m}`} className="flex items-center gap-2.5 text-slate-800 hover:text-[#0a7fb3] break-all">
                        <Icon d={ICON.mail} className="w-4 h-4 shrink-0 text-slate-400" />
                        {m}
                      </a>
                    ))}
                  </div>
                  {o.mapQuery && (
                    <CloudButton href={directionsUrl(o.mapQuery)} target="_blank" rel="noopener noreferrer" className="mt-6 w-full">
                      Get directions
                    </CloudButton>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-20 sm:mt-28 grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        >
          <div className="lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              id="faq-heading"
              className="section-title mt-5 text-slate-900"
            >
              Frequently asked <span className="text-[#0a7fb3]">questions</span>
            </h2>
            <p className="mt-5 max-w-md body-text text-slate-600">{faqIntro}</p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full ring-1 ring-slate-200 text-sm text-slate-800 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
            >
              Find out more on our blog
              <Icon d={ICON.arrow} className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 divide-y divide-slate-100 border-y border-slate-100">
            {faqs.map((f, i) => (
              <details key={f.q} className="group py-2" {...(i === 0 ? { open: true } : {})}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg sm:text-xl tracking-[-0.02em] text-slate-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-sky-50 text-[#0a7fb3] transition-transform duration-300 group-open:rotate-45">
                    <Icon d={ICON.plus} className="w-4 h-4" />
                  </span>
                </summary>
                <p className="pb-5 pr-12 body-text text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
