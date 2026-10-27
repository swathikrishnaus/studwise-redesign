import type { Metadata } from "next";
import Image from "next/image";
import HeroHeader from "@/components/hero/HeroHeader";
import CloudButton from "@/components/ui/CloudButton";
import CareersBoard from "@/components/careers/CareersBoard";
import { Eyebrow, Icon, gutter, toneAt } from "@/components/shared/PageKit";
import { careerReasons, hiringSteps, lifePhotos, openings } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Studwise International, a study abroad consultancy in Manjeri, Malappuram. Help students reach universities around the world.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const count = openings.length;

  return (
    <div className="bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        <header className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 pt-12 pb-10 sm:px-10 sm:pt-16 lg:px-14 lg:pt-20 lg:pb-14">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Careers at Studwise</Eyebrow>
              <h1 className="banner-title mt-6 text-slate-900">
                Help students <span className="text-[#0a7fb3]">go further</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="body-lead text-slate-600">
                Join the team that guides students from their first counselling session to their visa.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CloudButton href="#open-roles" className="mt-0">
                  {count ? `See ${count} open ${count === 1 ? "role" : "roles"}` : "Get in touch"}
                </CloudButton>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------- Open roles ---------------- */}
        <section id="open-roles" aria-labelledby="roles-heading" className="scroll-mt-24 mt-14 sm:mt-20 px-0 sm:px-2">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 id="roles-heading" className="text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900">
              Open roles
            </h2>
            {count > 0 && <span className="text-sm text-slate-500">{count} open {count === 1 ? "role" : "roles"}</span>}
          </div>
          <div className="mt-6">
            <CareersBoard />
          </div>
        </section>

        {/* ---------------- Why Studwise ---------------- */}
        <section aria-labelledby="why-heading" className="mt-20 sm:mt-28 px-0 sm:px-2">
          <h2 id="why-heading" className="border-b border-slate-200 pb-4 text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900">
            Why Studwise
          </h2>
          <ul className="mt-6 sm:mt-8 grid sm:grid-cols-3 gap-3 sm:gap-5">
            {careerReasons.map((r, i) => {
              const tone = toneAt(i);
              return (
                <li key={r.title} className={`rounded-2xl ${tone.bg} p-6 sm:p-7`}>
                  <span className={`grid place-items-center w-11 h-11 rounded-xl bg-white/80 ${tone.ink}`}>
                    <Icon d={r.icon} className="w-5 h-5" />
                  </span>
                  <h3 className="mt-6 text-xl tracking-tight text-slate-900">{r.title}</h3>
                  <p className="mt-2 body-text text-slate-600">{r.text}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------------- How we hire ---------------- */}
        <section aria-labelledby="hire-heading" className="mt-20 sm:mt-28 px-0 sm:px-2">
          <h2 id="hire-heading" className="border-b border-slate-200 pb-4 text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900">
            How we hire
          </h2>
          <ol className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {hiringSteps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-slate-900/[0.06]">
                <span className="text-sm tabular-nums text-[#009cd9]">0{i + 1}</span>
                <h3 className="mt-3 text-lg sm:text-xl tracking-tight text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- Life at Studwise ---------------- */}
        <section aria-labelledby="life-heading" className="mt-20 sm:mt-28 px-0 sm:px-2">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 id="life-heading" className="text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900">
              Life at Studwise
            </h2>
          </div>
          <ul className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {lifePhotos.map((p, i) => (
              <li key={p.src} className={`relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] ${i % 2 ? "lg:translate-y-8" : ""}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: p.focus }} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
