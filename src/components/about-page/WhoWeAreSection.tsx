import Image from "next/image";
import type { CSSProperties } from "react";
import { destinations, whoWeAre } from "@/data/aboutPage";
import { directionsUrl, offices } from "@/data/offices";
import { Eyebrow, Icon, gutter } from "@/components/shared/PageKit";
import ScrollWords from "@/components/shared/ScrollWords";

const PIN = "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";
const ARROW = "M7 17 17 7m0 0H9m8 0v8";
const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" aria-labelledby="who-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={`${gutter} py-14 sm:py-20 lg:py-28`}>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start px-3 sm:px-5 lg:px-6">
          {/* Photo */}
          <div className="relative lg:col-span-5 max-w-lg w-full mx-auto lg:max-w-none lg:sticky lg:top-8">
            <div data-reveal="clip" className="relative aspect-[949/1024] overflow-hidden rounded-2xl">
              <Image
                src="/images/about/valanchery-office.webp"
                alt="Studwise counsellors and students together at the Valanchery centre"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 512px, 92vw"
                className="object-cover"
              />
            </div>

          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow as="h2" id="who-heading">
                Who We Are
              </Eyebrow>
              <ScrollWords
                text={whoWeAre.lead}
                className="lead-statement mt-6 text-slate-900"
              />
            </div>

            <div className="mt-7 grid gap-4 body-text text-slate-600 max-w-2xl">
              {whoWeAre.paragraphs.map((p, i) => (
                <p key={i} data-reveal style={{ "--d": `${0.08 * (i + 1)}s` } as CSSProperties}>
                  {p}
                </p>
              ))}
            </div>

            {/* Destinations */}
            <div data-reveal className="mt-10 pt-8 border-t border-slate-200">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Study destinations</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {destinations.map((d) => (
                  <li
                    key={d}
                    className="rounded-lg bg-white ring-1 ring-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Centres */}
            <div id="our-centres" data-reveal className="scroll-mt-8 mt-10 pt-8 border-t border-slate-200">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Our centres</p>
              <ul className="mt-4 grid sm:grid-cols-3 gap-3">
                {offices.map((o, i) => {
                  const hq = o.kind === "Head office";
                  return (
                    <li
                      key={o.city}
                      className="group flex flex-col rounded-2xl bg-white ring-1 ring-slate-200/80 p-4 sm:p-5 transition-colors hover:ring-[#009cd9]/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs tabular-nums text-slate-400">0{i + 1}</span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                            hq ? "bg-sky-50 text-[#0a7fb3]" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {hq ? "Headquarters" : "Centre"}
                        </span>
                      </div>
                      <h3 className="mt-5 flex items-center gap-2 text-lg tracking-tight text-slate-900">
                        <Icon d={PIN} className="w-4 h-4 text-[#009cd9]" />
                        {o.city}
                      </h3>
                      <p className="mt-1.5 text-sm leading-snug text-slate-500 line-clamp-3">
                        {o.address ?? "Calicut, Kerala"}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-sm">
                        <a href={tel(o.phones[0])} className="inline-flex items-center gap-1.5 tabular-nums text-slate-700 hover:text-[#0a7fb3]">
                          <Icon d={PHONE} className="w-3.5 h-3.5" />
                          {o.phones[0]}
                        </a>
                        {o.mapQuery ? (
                          <a
                            href={directionsUrl(o.mapQuery)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Directions to the ${o.city} centre`}
                            className="grid place-items-center w-7 h-7 rounded-lg ring-1 ring-slate-200 text-slate-500 transition-colors hover:bg-[#009cd9] hover:text-white hover:ring-[#009cd9]"
                          >
                            <Icon d={ARROW} className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="w-7 h-7" aria-hidden="true" />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
