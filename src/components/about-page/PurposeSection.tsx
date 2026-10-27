"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import type { CSSProperties } from "react";
import { coreValues, pillars, valuesText } from "@/data/aboutPage";
import { Eyebrow, Icon, gutter, toneAt } from "@/components/shared/PageKit";

const VALUES_ICON = "M12 20.5s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.1c0 5.8-8 10.4-8 10.4Z";
const PLUS = "M12 5v14M5 12h14";

const items = [
  {
    ...pillars[0],
    id: "our-vision",
    image: "/images/vision-web.jpg",
    alt: "A graduate in a blue gown tossing her cap into the air as she walks down an arched corridor",
    focus: "50% 12%",
  },
  {
    ...pillars[1],
    id: "our-mission",
    image: "/images/services/sholorship-img.jpg",
    alt: "Graduates throwing their caps in the air",
    focus: "50% 40%",
  },
  {
    title: "Values",
    text: valuesText,
    icon: VALUES_ICON,
    id: "our-values",
    image: "/images/about/study-abroad-hero.webp",
    alt: "Studwise counsellors working with students at the Manjeri office",
    focus: "55% 40%",
  },
];

export default function PurposeSection() {
  // The open pillar (null once it is closed again) and the photo on show (the last one opened)
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [active, setActive] = useState(0);
  const select = (i: number) => {
    setActive(i);
    setOpenIndex(i);
  };

  // Deep links (/about#our-vision, #our-mission, #our-values) open their
  // pillar, then bring the section back into view once the accordion has
  // settled (the pillar that closes above can shift the page)
  useEffect(() => {
    let timer = 0;
    const sync = () => {
      const i = items.findIndex((item) => `#${item.id}` === window.location.hash);
      if (i < 0) return;
      select(i);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const section = document.getElementById("our-purpose");
        if (!section) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(section, { offset: -24, duration: 0.6 });
        else section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 650);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section id="our-purpose" aria-labelledby="purpose-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={gutter}>
        <div className="rounded-3xl bg-white ring-1 ring-slate-900/5 p-3 sm:p-4 lg:p-5">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
            {/* ---------------- Copy + accordion ---------------- */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col px-3 pt-10 pb-4 sm:px-6 sm:pt-14 lg:px-8 lg:py-12 xl:px-10">
              <div data-reveal>
                <Eyebrow>Our Purpose</Eyebrow>
                <h2 id="purpose-heading" className="section-title mt-5 text-slate-900">
                  What drives us, <span className="text-[#0a7fb3]">every step of the way.</span>
                </h2>
              </div>

              <div className="mt-10 sm:mt-12 lg:mt-auto lg:pt-16">
                <ul className="border-t border-slate-200">
                  {items.map((item, i) => {
                    const open = i === openIndex;
                    const panelId = `${item.id}-panel`;
                    return (
                      <li
                        key={item.id}
                        id={item.id}
                        data-reveal
                        style={{ "--d": `${i * 0.08}s` } as CSSProperties}
                        className="scroll-mt-24 border-b border-slate-200"
                      >
                        <h3>
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => (open ? setOpenIndex(null) : select(i))}
                            className="group flex w-full items-center gap-4 sm:gap-5 py-5 sm:py-6 text-left"
                          >
                            <span
                              className={`text-xs tabular-nums tracking-[0.18em] transition-colors ${open ? "text-[#0a7fb3]" : "text-slate-400"}`}
                            >
                              0{i + 1}
                            </span>
                            <span
                              className={`flex-1 text-[1.6rem] sm:text-[2rem] leading-none tracking-[-0.035em] transition-colors ${
                                open ? "text-slate-900" : "text-slate-400 group-hover:text-slate-700"
                              }`}
                            >
                              {item.title}
                            </span>
                            <span
                              className={`grid place-items-center w-10 h-10 shrink-0 rounded-full ring-1 transition-all duration-500 ${
                                open
                                  ? "rotate-45 bg-[#009cd9] text-white ring-[#009cd9]"
                                  : "text-slate-500 ring-slate-200 group-hover:ring-[#009cd9] group-hover:text-[#0a7fb3]"
                              }`}
                              aria-hidden="true"
                            >
                              <Icon d={PLUS} className="w-4 h-4" />
                            </span>
                          </button>
                        </h3>

                        <div id={panelId} role="region" aria-label={item.title} data-open={open} className="purpose-panel">
                          <div className="overflow-hidden" inert={!open}>
                            <div className="pb-7 sm:pl-10 pr-2 sm:pr-14">
                              <p className="body-text text-slate-600">{item.text}</p>

                              {item.id === "our-values" && (
                                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Our core values">
                                  {coreValues.map((v, k) => {
                                    const tone = toneAt(k);
                                    return (
                                      <li
                                        key={v.title}
                                        className={`inline-flex items-center gap-2 rounded-full ${tone.bg} pl-1.5 pr-3.5 py-1.5`}
                                      >
                                        <span
                                          className={`grid place-items-center w-6 h-6 rounded-full bg-white/85 ${tone.ink}`}
                                          aria-hidden="true"
                                        >
                                          <Icon d={v.icon} className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="text-sm tracking-tight text-slate-800">{v.title}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}

                              {/* Below lg each pillar carries its own photo, under its text */}
                              <div className="lg:hidden relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                                <Image
                                  src={item.image}
                                  alt={item.alt}
                                  fill
                                  sizes="94vw"
                                  // The open pillar's photo is on screen at once; the others wait until opened
                                  loading={open ? "eager" : "lazy"}
                                  className="object-cover"
                                  style={{ objectPosition: item.focus }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* ---------------- Photo stage (desktop; phones show each photo in its pillar) ---------------- */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7">
              <div
                data-reveal="clip"
                className="relative h-full min-h-[18rem] sm:min-h-[26rem] lg:min-h-[40rem] overflow-hidden rounded-2xl bg-slate-100"
              >
                <div className="absolute inset-0">
                  {items.map((item, i) => (
                    <div key={item.id} data-active={i === active} className="purpose-photo absolute inset-0" aria-hidden={i !== active}>
                      <Image
                        src={item.image}
                        alt={i === active ? item.alt : ""}
                        fill
                        sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 48vw, 94vw"
                        className="object-cover"
                        style={{ objectPosition: item.focus }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
