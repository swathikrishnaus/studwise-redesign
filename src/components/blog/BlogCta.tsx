import Link from "next/link";
import SoftCloud, { CLOUD_PUFF } from "@/components/hero/SoftCloud";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Eyebrow } from "@/components/shared/PageKit";
import { headerContact } from "@/data/navigation";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export default function BlogCta() {
  return (
    <section
      aria-labelledby="blog-cta-heading"
      className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0aa6e3] via-[#009cd9] to-[#0a7fb3] text-white px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
    >
      <div className="absolute -top-32 -left-24 -z-10 w-[520px] h-[520px] rounded-full bg-white/20 blur-[110px]" aria-hidden="true" />
      <div className="absolute -right-16 -bottom-10 -z-10 w-[380px] sm:w-[560px] opacity-30" aria-hidden="true">
        <SoftCloud shape={CLOUD_PUFF} seed={23} className="w-full h-auto" />
      </div>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="light">Still have questions?</Eyebrow>
          <h2 id="blog-cta-heading" className="section-title mt-5">
            Ask a counsellor, not a search engine.
          </h2>
          <p className="mt-5 max-w-lg body-lead text-white/85">
            Every student&apos;s route is different. Tell us your plans and a Studwise advisor will guide you, free.
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-end xl:justify-end">
          <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-14 px-6 rounded-full ring-1 ring-white/45 text-sm uppercase tracking-[0.06em] text-white hover:bg-white/10 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
      <p className="mt-10 pt-6 border-t border-white/20 text-sm text-white/80">
        Or call{" "}
        {headerContact.phones.map((ph, i) => (
          <span key={ph}>
            <a href={tel(ph)} className="tabular-nums text-white underline-offset-4 hover:underline">
              {ph}
            </a>
            {i < headerContact.phones.length - 1 ? " / " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
