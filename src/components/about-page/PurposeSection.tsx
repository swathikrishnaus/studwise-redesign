import Image from "next/image";
import type { CSSProperties } from "react";
import { coreValues, pillars, valuesText } from "@/data/aboutPage";
import { Eyebrow, Icon, gutter, toneAt } from "@/components/shared/PageKit";

const VALUES_ICON = "M12 20.5s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.1c0 5.8-8 10.4-8 10.4Z";

const items = [
  { ...pillars[0], id: "our-vision", image: "/images/services/sholorship-img.jpg", alt: "Graduates throwing their caps in the air", focus: "50% 40%" },
  { ...pillars[1], id: "our-mission", image: "/images/services/tests-study.jpg", alt: "A student working at a laptop in a sunlit study room", focus: "55% 50%" },
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

/* --------------------------------------------------------------------------
   PurposeSection — Vision, Mission and Values side by side: each a card
   with its photo, title and text, the core values listed under Values
   -------------------------------------------------------------------------- */
export default function PurposeSection() {
  return (
    <section id="our-purpose" aria-labelledby="purpose-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={gutter}>
        <div className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16">
          <div data-reveal className="max-w-3xl">
            <Eyebrow>Our Purpose</Eyebrow>
            <h2
              id="purpose-heading"
              className="mt-5 font-normal tracking-[-0.04em] leading-[1.02] text-slate-900 text-[clamp(2rem,7vw,2.8rem)] sm:text-[clamp(2.4rem,5vw,3.6rem)] text-balance"
            >
              What drives us, <span className="text-[#0a7fb3]">every step of the way.</span>
            </h2>
          </div>

          <div className="mt-12 sm:mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {items.map((item, i) => (
              <article
                key={item.id}
                id={item.id}
                data-reveal
                style={{ "--d": `${i * 0.08}s` } as CSSProperties}
                className={`scroll-mt-8 flex flex-col rounded-2xl bg-[#F6F9FC] p-2 ring-1 ring-slate-900/5 ${
                  i === 2 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 ${i === 2 ? "md:aspect-[21/8] xl:aspect-[16/10]" : ""}`}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                    className="object-cover"
                    style={{ objectPosition: item.focus }}
                  />
                </div>
                <div className="flex-1 px-4 pt-6 pb-5 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-white text-[#0a7fb3] ring-1 ring-sky-100" aria-hidden="true">
                      <Icon d={item.icon} />
                    </span>
                    <h3 className="text-[1.6rem] sm:text-[1.8rem] leading-none tracking-[-0.03em] text-slate-900">{item.title}</h3>
                  </div>
                  <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-slate-600">{item.text}</p>

                  {item.id === "our-values" && (
                    <ul className="mt-6 grid grid-cols-2 gap-2" aria-label="Our core values">
                      {coreValues.map((v, k) => {
                        const tone = toneAt(k);
                        return (
                          <li key={v.title} className={`flex items-center gap-2 rounded-xl ${tone.bg} px-2.5 py-2`}>
                            <span className={`grid place-items-center w-7 h-7 shrink-0 rounded-lg bg-white/80 ${tone.ink}`} aria-hidden="true">
                              <Icon d={v.icon} className="w-4 h-4" />
                            </span>
                            <span className="text-sm tracking-tight text-slate-900">{v.title}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
