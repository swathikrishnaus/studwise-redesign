"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Icon } from "@/components/shared/PageKit";
import LoopCarousel from "@/components/shared/LoopCarousel";
import { serviceMenu } from "@/data/navigation";
import { serviceDetails } from "@/data/serviceDetails";
import { servicesIntro } from "@/data/services";
import { clamp } from "@/lib/scroll";

const headingWords = ["Our", "Services"];
const ARROW = "M5 12h14m-6-6 6 6-6 6";

/* The nine services in menu order, each with its detail page's hero photo
   and opening line */
const cards = serviceMenu.flatMap((group) =>
  group.items.flatMap((item) => {
    const detail = serviceDetails.find((s) => `/services/${s.slug}` === item.href);
    return detail ? [{ ...item, group: group.title, text: detail.hero.lead, image: detail.hero.image, alt: detail.hero.alt, focus: detail.hero.focus }] : [];
  })
);

function ServiceCard({ card, copy }: { card: (typeof cards)[number]; copy?: boolean }) {
  return (
    <li className="shrink-0 w-[20.5rem] sm:w-[27rem] lg:w-[32rem] xl:w-[34rem] pr-3 sm:pr-5">
      <Link
        href={card.href}
        tabIndex={copy ? -1 : undefined}
        draggable={false}
        className="group flex h-full flex-col rounded-[1.75rem] bg-white p-2.5 ring-1 ring-slate-900/[0.04] transition-[box-shadow] duration-300 hover:ring-[#009cd9]/25 focus-visible:outline-offset-4"
      >
        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] bg-slate-100">
          <Image
            src={card.image}
            alt={copy ? "" : card.alt}
            fill
            draggable={false}
            sizes="(min-width: 1280px) 544px, (min-width: 1024px) 512px, (min-width: 640px) 432px, 328px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
            style={{ objectPosition: card.focus }}
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs text-slate-700">
            <Icon d={card.icon} className="w-3.5 h-3.5 text-[#0a7fb3]" />
            {card.group}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-4 pt-6 pb-5 sm:px-6">
          <h3 className="text-[1.35rem] sm:text-[1.6rem] leading-[1.15] tracking-[-0.03em] text-slate-900">{card.label}</h3>
          <p className="mt-2.5 flex-1 body-text text-slate-600 line-clamp-3">{card.text}</p>
          <span className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-[#0a7fb3]">
            Explore service
            <span className="grid place-items-center w-9 h-9 rounded-full bg-sky-50 transition-colors group-hover:bg-[#009cd9] group-hover:text-white">
              <Icon d={ARROW} className="w-4 h-4 transition-transform group-hover:-rotate-45 motion-reduce:transition-none" />
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

/* --------------------------------------------------------------------------
   ServicesSection — "Our Services": the heading rises out of its mask on
   scroll (--hp), then the nine services glide past in a looping row of
   photo cards the visitor can also scroll by hand (styles: globals.css under "Services")
   -------------------------------------------------------------------------- */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector<HTMLElement>("[data-svc-heading]");
    if (!section || !heading) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const h = heading.getBoundingClientRect();
      section.style.setProperty("--hp", clamp((window.innerHeight - h.top) / (window.innerHeight * 0.55)).toFixed(4));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#F1F5F9] pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40"
      style={{ "--hp": 0 } as CSSProperties}
    >
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
              What we do
            </div>
            <h2
              id="services-heading"
              data-svc-heading
              className="section-title text-slate-900"
            >
              {headingWords.map((word, i) => (
                <span key={word} className="svc-word-mask">
                  <span className="svc-word" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="svc-intro body-lead text-slate-600 max-w-md">{servicesIntro}</p>
          </div>
        </div>
      </div>

      {/* Full-bleed carousel, faded at both edges: glides on its own and
          can be dragged, swiped or scrolled sideways */}
      <LoopCarousel
        duration={70}
        className="py-4 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        trackClassName="pl-5 sm:pl-8 lg:pl-12 xl:pl-16"
      >
        <ul className="flex" aria-label="Our services">
          {cards.map((card) => (
            <ServiceCard key={card.href} card={card} />
          ))}
        </ul>
        <ul data-loop-copy className="flex" aria-hidden="true">
          {cards.map((card) => (
            <ServiceCard key={card.href} card={card} copy />
          ))}
        </ul>
      </LoopCarousel>
    </section>
  );
}
