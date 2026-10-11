"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { bookAppointmentHref, whySegments } from "@/data/whyChooseUs";
import { clamp, pinnedProgress, smoothstep } from "@/lib/scroll";

/* --------------------------------------------------------------------------
   Flatten the paragraph into words, remembering where each highlighted
   phrase starts and how many words it spans.
   -------------------------------------------------------------------------- */
type Phrase = { words: string[]; start: number; highlight: boolean };

const phrases: Phrase[] = [];
let wordCount = 0;
for (const seg of whySegments) {
  const words = seg.text.split(" ");
  phrases.push({ words, start: wordCount, highlight: !!seg.highlight });
  wordCount += words.length;
}

/* --------------------------------------------------------------------------
   WhyChooseSection — "Why Choose Us"
   --------------------------------------------------------------------------
   A pinned statement on a soft sky panel: the paragraph fills in word by
   word as you scroll while the services it names sweep into highlights
   (--wf), then the "Book appointment" button rises in (--cta).
   Styles live in globals.css under "Why Choose Us".
   -------------------------------------------------------------------------- */
export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;
    const cta = section.querySelector<HTMLElement>(".why-cta");
    let raf = 0;

    const tick = () => {
      raf = 0;
      const p = pinnedProgress(pin);
      const wf = clamp((p - 0.04) / 0.74);
      section.style.setProperty("--wp", p.toFixed(4));
      section.style.setProperty("--wf", wf.toFixed(4));
      const ctaIn = smoothstep(0.8, 0.9, p);
      section.style.setProperty("--cta", ctaIn.toFixed(4));
      // Keep the button out of the tab order until it has faded in
      if (cta) cta.style.visibility = ctaIn > 0.01 ? "visible" : "hidden";

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
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="relative bg-[#F1F5F9]"
      style={{ "--wp": 0, "--wf": 0, "--cta": 0, "--n": wordCount } as CSSProperties}
    >
      <div ref={pinRef} className="relative h-[280vh]">
        <div className="sticky top-0 h-svh p-3 sm:p-4 lg:p-6 xl:p-7">
          <div className="relative h-full max-w-[1728px] mx-auto flex items-center overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#d9f0fb] via-[#e8f6fd] to-[#d2edfa]">
          {/* ---------------- Sky atmosphere ---------------- */}
          <div
            className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full bg-white/70 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-20 bottom-[-40px] w-[300px] sm:w-[420px] opacity-90 pointer-events-none translate-x-[calc(var(--wp)*80px)]"
            aria-hidden="true"
          >
            <Image src="/images/cloud.png" alt="" width={420} height={224} className="w-full h-auto" />
          </div>
          <div
            className="hidden sm:block absolute -right-16 top-[12%] w-[260px] opacity-70 pointer-events-none translate-x-[calc(var(--wp)*-70px)]"
            aria-hidden="true"
          >
            <Image src="/images/cloud.png" alt="" width={260} height={139} className="w-full h-auto" />
          </div>

          <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 grid lg:grid-cols-12 gap-8 lg:gap-6">
            {/* Label column */}
            <div className="lg:col-span-3 flex lg:flex-col justify-between gap-6 lg:py-2">
              <div>
                <div className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
                  <span className="h-px w-10 bg-[#009cd9]/40" aria-hidden="true" />
                  <h2 id="why-heading">Why Choose Us</h2>
                </div>
              </div>
            </div>

            {/* Statement */}
            <div className="lg:col-span-9">
              <p className="tracking-[-0.02em] leading-[1.16] text-[clamp(1.45rem,6.2vw,2.4rem)] sm:text-[clamp(1.9rem,4.6vw,3rem)] lg:text-[min(3.3vw,6.2vh)]">
                {phrases.map((phrase, pi) => {
                  const words = phrase.words.map((word, wi) => (
                    <span
                      key={wi}
                      className={phrase.highlight ? "why-word why-word--hl" : "why-word"}
                      style={{ "--i": phrase.start + wi } as CSSProperties}
                    >
                      {word}
                      {wi < phrase.words.length - 1 ? " " : ""}
                    </span>
                  ));
                  return (
                    <span key={pi}>
                      {phrase.highlight ? (
                        <span
                          className="why-phrase"
                          style={{ "--s": phrase.start, "--len": phrase.words.length } as CSSProperties}
                        >
                          {words}
                        </span>
                      ) : (
                        words
                      )}
                      {pi < phrases.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </p>

              <div className="why-cta mt-8 sm:mt-10">
                <CloudButton href={bookAppointmentHref} size="lg" target="_blank" rel="noopener noreferrer">
                  Book appointment
                </CloudButton>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

    </section>
  );
}
