import Link from "next/link";
import HeroHeader from "@/components/hero/HeroHeader";
import { Eyebrow, Icon, gutter } from "@/components/shared/PageKit";
import { legalContact } from "@/data/legal";
import type { LegalBlock, LegalDoc } from "@/data/legal";

const pad = (n: number) => String(n).padStart(2, "0");
const ARROW = "M5 12h14m-6-6 6 6-6 6";
const PIN = "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";
const MAIL = "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z";
const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p className="body-text text-slate-600">{block}</p>;
  if ("list" in block)
    return (
      <ul className="space-y-2.5">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3 body-text text-slate-600">
            <span className="mt-[0.7em] w-1.5 h-1.5 shrink-0 rounded-full bg-[#009cd9]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  if ("link" in block)
    return (
      <Link href={block.link.href} className="group inline-flex items-center gap-2 body-text text-[#0a7fb3] hover:text-[#0b2a45]">
        {block.link.label}
        <Icon d={ARROW} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  const row = "flex items-start gap-3 body-text text-slate-700";
  return (
    <address className="not-italic rounded-2xl bg-[#eef7fc] ring-1 ring-[#009cd9]/10 p-5 sm:p-6 space-y-3">
      <p className="text-lg leading-snug tracking-tight text-slate-900">{legalContact.name}</p>
      <p className={row}>
        <Icon d={PIN} className="mt-1 w-4 h-4 shrink-0 text-[#009cd9]" />
        {legalContact.address}
      </p>
      <p className={row}>
        <Icon d={MAIL} className="mt-1 w-4 h-4 shrink-0 text-[#009cd9]" />
        <a href={`mailto:${legalContact.email}`} className="hover:text-[#0a7fb3]">
          {legalContact.email}
        </a>
      </p>
      <p className={row}>
        <Icon d={PHONE} className="mt-1 w-4 h-4 shrink-0 text-[#009cd9]" />
        <a href={`tel:${legalContact.phone.replace(/\s/g, "")}`} className="tabular-nums hover:text-[#0a7fb3]">
          {legalContact.phone}
        </a>
      </p>
    </address>
  );
}

export default function LegalPage({ doc, other }: { doc: LegalDoc; other: { href: string; label: string } }) {
  const contents = (
    <ol className="space-y-0.5">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-3 rounded-xl px-3 py-2 text-[14px] leading-snug text-slate-600 transition-colors hover:bg-[#e3f4fc] hover:text-[#0a7fb3]"
          >
            <span className="w-5 shrink-0 text-[11px] leading-[1.6] tabular-nums text-slate-400">{pad(i + 1)}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        <header className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 pt-12 pb-10 sm:px-10 sm:pt-14 lg:px-14 lg:pt-16 lg:pb-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{doc.eyebrow}</Eyebrow>
              <h1 className="banner-title mt-6 text-slate-900">
                {doc.title} <span className="text-[#0a7fb3]">{doc.accent}</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="body-lead text-slate-600">{doc.intro}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eef7fc] px-3.5 py-1.5 text-[13px] text-[#0a7fb3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009cd9]" aria-hidden="true" />
                Last updated <time>{doc.updated}</time>
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 sm:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Contents */}
          <nav aria-label="Contents" className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
            <details className="lg:hidden group rounded-2xl bg-white ring-1 ring-slate-900/5">
              <summary className="flex items-center justify-between px-5 py-4 text-[15px] text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                Contents
                <Icon d="M19 9l-7 7-7-7" className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-2 pb-3">{contents}</div>
            </details>
            <div className="hidden lg:block rounded-2xl bg-white ring-1 ring-slate-900/5 p-3">
              <p className="px-3 pt-2 pb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">Contents</p>
              {contents}
            </div>
          </nav>

          {/* Sections */}
          <article className="lg:col-span-8 xl:col-span-9 rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 py-4 sm:px-10 sm:py-6 lg:px-14 lg:py-8">
            <div className="max-w-[68ch]">
              {doc.sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="scroll-mt-28 py-8 sm:py-10 border-b border-slate-100 last:border-0"
                >
                  <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-[1.45rem] sm:text-[1.7rem] leading-tight tracking-[-0.025em] text-slate-900">
                    <span className="text-sm tabular-nums tracking-normal text-[#009cd9]">{pad(i + 1)}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {s.blocks.map((b, k) => (
                      <Block key={k} block={b} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>

        <p className="mt-8 text-center body-text text-slate-500">
          See also our{" "}
          <Link href={other.href} className="text-[#0a7fb3] underline-offset-4 hover:underline">
            {other.label}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
