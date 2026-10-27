"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { directionsUrl, mapEmbedUrl, offices } from "@/data/offices";
import { clamp, easeOutCubic } from "@/lib/scroll";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export default function OfficesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = offices[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const heading = section.querySelector<HTMLElement>("[data-heading]");
    const revealEls = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (heading) {
        const h = heading.getBoundingClientRect();
        section.style.setProperty("--hp", clamp((vh - h.top) / (vh * 0.55)).toFixed(4));
      }
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--rv", easeOutCubic(clamp((vh - r.top) / (vh * 0.45))).toFixed(4));
      });
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
      id="offices"
      aria-labelledby="offices-heading"
      className="relative bg-[#F1F5F9] pb-24 sm:pb-32 lg:pb-40"
      style={{ "--hp": 0 } as CSSProperties}
    >
      <div className="max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ---------------- Header ---------------- */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
              Head office &amp; Branch office
            </div>
            <h2
              id="offices-heading"
              data-heading
              className="section-title text-slate-900"
            >
              <span className="svc-word-mask">
                <span className="svc-word" style={{ "--i": 0 } as CSSProperties}>Visit</span>
              </span>
              <span className="svc-word-mask">
                <span className="svc-word text-[#009cd9]" style={{ "--i": 1 } as CSSProperties}>us</span>
              </span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ======================================================
              Office list
              ====================================================== */}
          <ul className="lg:order-1 lg:col-span-5 border-t border-slate-300/70">
            {offices.map((office, i) => {
              const open = i === active;
              const panelId = `office-panel-${i}`;
              return (
                <li key={office.city} data-reveal className="office-row border-b border-slate-300/70">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="group w-full grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_auto] items-center gap-3 py-6 sm:py-7 text-left focus-visible:outline-none"
                  >
                    <span className="font-mono text-xs sm:text-sm text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#0a7fb3]">
                        {office.kind}
                        {office.comingSoon && (
                          <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10px] tracking-wider text-amber-700">
                            Opening soon
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 block text-[clamp(1.9rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.03em] transition-[color,transform] duration-500 group-hover:translate-x-2 group-focus-visible:underline ${
                          open ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {office.city}
                      </span>
                    </span>
                    <span
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        open ? "bg-[#009cd9] border-[#009cd9] text-white rotate-45" : "border-slate-300 text-slate-500"
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {/* Details — grid-rows trick animates height */}
                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!open}>
                      <div className="pb-7 sm:pl-[3.5rem] space-y-4">
                        {/* Below lg the map sits in the open row (loaded only once it opens) */}
                        <div className="lg:hidden relative h-56 sm:h-72 overflow-hidden rounded-2xl bg-[#dff2fb]">
                          {office.mapQuery ? (
                            open && (
                              <iframe
                                title={`Map of the Studwise ${office.city} ${office.kind.toLowerCase()}`}
                                src={mapEmbedUrl(office.mapQuery)}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 w-full h-full border-0"
                              />
                            )
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#bfe6f8] to-[#f0f9ff]">
                              <Image src="/images/airplane.png" alt="" width={410} height={207} className="w-2/5 h-auto animate-[plane-hover-float_6s_ease-in-out_infinite]" />
                              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#0a7fb3]">Opening soon</p>
                            </div>
                          )}
                        </div>
                        {office.address ? (
                          <p className="body-lead text-slate-600 max-w-md">
                            {office.address}
                          </p>
                        ) : (
                          <p className="body-lead text-slate-600 max-w-md">
                            Our Calicut branch is opening soon.
                          </p>
                        )}
                        <dl className="grid grid-cols-[4.5rem_1fr] gap-y-2 text-sm sm:text-base">
                          <dt className="text-slate-400">Phone</dt>
                          <dd className="flex flex-wrap gap-x-4">
                            {office.phones.map((p) => (
                              <a key={p} href={tel(p)} className="text-slate-900 hover:text-[#009cd9] transition-colors">
                                {p}
                              </a>
                            ))}
                          </dd>
                          <dt className="text-slate-400">Email</dt>
                          <dd className="flex flex-wrap gap-x-4 min-w-0">
                            {office.emails.map((e) => (
                              <a key={e} href={`mailto:${e}`} className="text-slate-900 break-all hover:text-[#009cd9] transition-colors">
                                {e}
                              </a>
                            ))}
                          </dd>
                        </dl>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                          {office.mapQuery ? (
                            <CloudButton href={directionsUrl(office.mapQuery)} target="_blank" rel="noopener noreferrer">
                              Get directions
                            </CloudButton>
                          ) : (
                            <CloudButton href={tel(office.phones[0])}>Call the branch</CloudButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ======================================================
              Map panel
              ====================================================== */}
          <div data-reveal className="hidden lg:block lg:order-2 lg:col-span-7">
            <div className="svc-media office-map relative h-[78vw] max-h-[480px] sm:h-[440px] lg:h-full lg:max-h-none lg:min-h-[560px] overflow-hidden bg-[#dff2fb]">
              {offices.map((office, i) =>
                office.mapQuery ? (
                  <iframe
                    key={office.city}
                    title={`Map of the Studwise ${office.city} ${office.kind.toLowerCase()}`}
                    src={mapEmbedUrl(office.mapQuery)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    className={`absolute inset-0 w-full h-full border-0 transition-[opacity,transform] duration-700 ${
                      i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    aria-hidden={i !== active}
                  />
                ) : (
                  <div
                    key={office.city}
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#bfe6f8] to-[#f0f9ff] transition-[opacity,transform] duration-700 ${
                      i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    aria-hidden={i !== active}
                  >
                    <Image src="/images/cloud.png" alt="" width={340} height={181} className="absolute -left-10 top-6 w-[40%] h-auto opacity-90" />
                    <Image src="/images/cloud.png" alt="" width={380} height={203} className="absolute -right-12 bottom-0 w-[48%] h-auto" />
                    <Image src="/images/airplane.png" alt="" width={410} height={207} className="relative w-[34%] h-auto animate-[plane-hover-float_6s_ease-in-out_infinite]" />
                    <p className="relative mt-6 text-[clamp(1.6rem,3.6vw,3rem)] tracking-tight text-slate-900">
                      {office.city}
                    </p>
                    <p className="relative mt-1 text-sm uppercase tracking-[0.2em] text-[#0a7fb3]">Opening soon</p>
                  </div>
                )
              )}

              {/* Soft brand tint over the map */}
              <div className="absolute inset-0 pointer-events-none bg-[#009cd9]/[0.06] mix-blend-multiply" aria-hidden="true" />

              {/* Office label + open-in-maps */}
              <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 flex flex-wrap items-end justify-between gap-3">
                <div className="rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,80,130,0.35)]">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#0a7fb3]">{current.kind}</div>
                  <div className="text-lg sm:text-xl text-slate-900">{current.city}</div>
                </div>
                {current.mapQuery && (
                  <a
                    href={directionsUrl(current.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2.5 text-sm text-slate-800 shadow-[0_12px_30px_-12px_rgba(0,80,130,0.35)] hover:bg-white hover:text-[#009cd9] transition-colors"
                  >
                    Open in Google Maps ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
