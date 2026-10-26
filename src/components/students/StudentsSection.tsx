"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { destinations, reachTotals } from "@/data/globalReach";
import type { Destination } from "@/data/globalReach";
import { clamp, easeInOutCubic, easeOutCubic, prefersReducedMotion, smoothstep } from "@/lib/scroll";

const fmt = (n: number) => n.toLocaleString("en-IN");

function Flag({ code, focus, className = "" }: { code: string; focus?: string; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ring-1 ring-slate-900/10 ${className}`}>
      <Image src={`/flags/${code}.svg`} alt="" fill sizes="220px" className="object-cover" style={focus ? { objectPosition: focus } : undefined} />
    </span>
  );
}

// Token size (phones / tablets / desktop)
const TOKEN = {
  disc: "w-20 h-20 sm:w-28 sm:h-28 lg:w-44 lg:h-44",
  name: "text-lg sm:text-2xl lg:text-[2.3rem]",
};

/**
 * The destinations as floating flag tokens in two columns either side of
 * the plane's lane, the right column staggered lower. The same layout runs
 * at every size; only the lane and tokens scale down.
 */
function TokenColumns({ list }: { list: Destination[] }) {
  return (
    <div className="grid grid-cols-[1fr_84px_1fr] sm:grid-cols-[1fr_140px_1fr] lg:grid-cols-[1fr_minmax(380px,30vw)_1fr]">
      {[0, 1].map((side) => (
        <div
          key={side}
          className={`flex flex-col items-center gap-10 sm:gap-14 lg:gap-16 ${
            side === 0
              ? "col-start-1 lg:items-end lg:pr-[3vw]"
              : "col-start-3 pt-16 sm:pt-20 lg:items-start lg:pl-[3vw] lg:pt-28"
          }`}
        >
          {list
            .map((c, i) => ({ c, i }))
            .filter(({ i }) => i % 2 === side)
            .map(({ c, i }) => (
              <div
                key={c.code}
                data-reveal
                className="orbit-token flex flex-col items-center text-center"
                style={{ "--float-delay": `${i * -1.3}s` } as CSSProperties}
              >
                <div className="orbit-token__disc">
                  <Flag
                    code={c.code}
                    focus={c.focus}
                    className={`${TOKEN.disc} rounded-full ring-4 lg:ring-[6px] ring-white shadow-[0_24px_40px_-18px_rgba(0,80,130,0.45)]`}
                  />
                </div>
                <div className={`mt-3 lg:mt-4 ${TOKEN.name} leading-tight tracking-tight text-slate-900`}>{c.country}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   StudentsSection — "Our Students Across The Globe"
   --------------------------------------------------------------------------
   A top-down airplane flies the whole section, like the bottle on
   klimtwine.com: it appears at the start of its flight line (small,
   angled, fading in) and never crosses the section above, settles into the
   centre lane between two columns of countries (at every screen size),
   weaves and banks past them, then
   lands in the centre of a panel that scales up from the bottom ("Taste
   the Art of Wine" on klimtwine). It is a fixed overlay positioned from
   scroll each frame. The destinations float as flag tokens either side
   of the lane, and the landing panel counts up the students guided.
   Scroll sets --rv on each [data-reveal] (reveal 0→1) and flips
   data-on once an item is in view; styles live in globals.css.
   -------------------------------------------------------------------------- */
export default function StudentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const flyer = flyerRef.current;
    const plane = planeRef.current;
    const shadow = shadowRef.current;
    const landing = section?.querySelector<HTMLElement>("[data-landing]");
    if (!section || !track || !flyer || !plane || !shadow || !landing) return;
    let size = 0;

    const heading = section.querySelector<HTMLElement>("[data-heading]");
    const reveals = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    const total = section.querySelector<HTMLElement>("[data-total]");
    const reduce = prefersReducedMotion();
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const desktop = window.innerWidth >= 1024;

      if (heading) {
        const h = heading.getBoundingClientRect();
        section.style.setProperty("--hp", clamp((vh - h.top) / (vh * 0.55)).toFixed(4));
      }

      // Flight progress along the track (0 at its top, 1 at its bottom)
      const t = track.getBoundingClientRect();
      const p = clamp((vh / 2 - t.top) / Math.max(1, t.height - vh / 2));
      section.style.setProperty("--tp", p.toFixed(4));

      // ---------------- Airplane ----------------
      const vw = window.innerWidth;
      const nextSize = desktop ? Math.round(Math.min(340, vh * 0.38)) : vw >= 640 ? 110 : 76;
      if (nextSize !== size) {
        size = nextSize;
        flyer.style.width = flyer.style.height = `${size}px`;
        section.style.setProperty("--plane-size", `${size}px`);
      }

      const s = section.getBoundingClientRect();
      const l = landing.getBoundingClientRect();
      // Entry: the plane appears at the start of its own flight line (the
      // top of the track) as that rises into view, fading and growing in,
      // so it never crosses the section above. It rides up with the line
      // until mid-screen, then holds there and flies the lane.
      const rise = clamp((vh - t.top) / (vh * 0.5));
      const enter = easeInOutCubic(rise);
      const arrive = smoothstep(0, 0.6, rise);
      // Exit: once the landing panel's centre climbs past mid-screen, the
      // plane rides along with it (it has touched down)
      const y = Math.min(Math.max(vh / 2, t.top + size * 0.5), l.top + l.height / 2);
      const visible = s.top < vh && l.bottom > 0 && arrive > 0.001;
      flyer.style.visibility = visible ? "visible" : "hidden";
      flyer.style.opacity = arrive.toFixed(3);

      // Final approach: everything straightens out as the panel arrives
      const settle = 1 - smoothstep(0.35, 1, clamp((vh - l.top) / vh));
      const motion = reduce ? 0 : 1;
      const turn = Math.cos(p * Math.PI * 5) * settle * enter * motion;
      const x = vw / 2 + Math.sin(p * Math.PI * 5) * Math.min(vw * 0.04, 64) * settle * enter * motion;

      // Comes in banked and smaller (higher up), like the bottle swinging in
      const noseTurn = -turn * 12 - (1 - enter) * 28 * motion;
      const bankY = turn * 26 + (1 - enter) * 20 * motion;
      const scale =
        (0.55 + 0.45 * enter) * (1 + Math.sin(p * Math.PI) * 0.08 * motion) * (1 - (1 - settle) * 0.1);

      flyer.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      plane.style.transform =
        `perspective(1000px) rotateZ(${noseTurn}deg) rotateY(${bankY}deg) scale(${scale})`;
      // Ground shadow drifts further away the higher the plane is
      const altitude = (0.35 + 0.65 * settle) * (1 + (1 - enter) * 1.2);
      shadow.style.transform =
        `translate3d(${46 * altitude}px, ${64 * altitude}px, 0) rotateZ(${noseTurn}deg) scale(${scale * 0.95})`;
      shadow.style.opacity = String(Math.max(0.08, 0.3 - altitude * 0.12));

      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        const rv = easeOutCubic(clamp((vh * 0.92 - r.top) / (vh * 0.35)));
        el.style.setProperty("--rv", rv.toFixed(4));
        if (rv > 0.35) el.dataset.on = "true";
      });

      landing.style.setProperty("--lv", easeOutCubic(clamp((vh - l.top) / vh)).toFixed(4));

      if (total) {
        const r = total.getBoundingClientRect();
        // Finishes counting by the time the plane touches down
        const k = easeOutCubic(clamp((vh - r.top) / (vh * 0.28)));
        total.textContent = fmt(Math.round(reachTotals.students * k));
      }
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
      id="students"
      aria-labelledby="students-heading"
      className="relative overflow-x-clip bg-[#F1F5F9] pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40"
      style={{ "--hp": 0, "--tp": 0, "--plane-size": "100px" } as CSSProperties}
    >
      {/* ---------------- Sky backdrop: soft wash, drifting clouds, flight routes ---------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1F5F9_0%,#e6f4fb_18%,#eef8fd_50%,#e3f2fb_82%,#F1F5F9_100%)]" />
        {/* Faint dashed routes curving across the section */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          {[
            "M-5 12 C 25 6, 40 22, 105 16",
            "M-5 38 C 30 46, 65 28, 105 40",
            "M-5 63 C 35 56, 60 72, 105 64",
            "M-5 86 C 30 92, 70 80, 105 88",
          ].map((d) => (
            <path key={d} d={d} stroke="#009cd9" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {/* Clouds at the section's edges, clear of the countries */}
        {[
          { top: "9%", side: "left-[-6%]", w: "w-[38%] lg:w-[22%]", o: "opacity-70", anim: "animate-[cloud-float-slow_11s_ease-in-out_infinite]" },
          { top: "24%", side: "right-[-7%]", w: "w-[42%] lg:w-[24%]", o: "opacity-60", anim: "animate-[cloud-float-reverse_13s_ease-in-out_infinite]" },
          { top: "44%", side: "left-[-8%]", w: "w-[36%] lg:w-[20%]", o: "opacity-55", anim: "animate-[cloud-float-reverse_12s_ease-in-out_infinite]" },
          { top: "58%", side: "right-[-5%]", w: "w-[34%] lg:w-[19%]", o: "opacity-65", anim: "animate-[cloud-float-slow_10s_ease-in-out_infinite]" },
          { top: "74%", side: "left-[-5%]", w: "w-[40%] lg:w-[23%]", o: "opacity-60", anim: "animate-[cloud-float-slow_12s_ease-in-out_infinite]" },
        ].map((c) => (
          <div key={c.top} className={`absolute ${c.side} ${c.w} ${c.o}`} style={{ top: c.top }}>
            <div className={c.anim}>
              <Image src="/images/cloud.png" alt="" width={940} height={503} sizes="25vw" className="w-full h-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- The flying airplane (fixed overlay) ---------------- */}
      <div
        ref={flyerRef}
        className="fixed left-0 top-0 z-30 pointer-events-none will-change-transform"
        style={{ width: 100, height: 100, visibility: "hidden" }}
        aria-hidden="true"
      >
        <div ref={shadowRef} className="absolute inset-0 will-change-transform">
          <Image src="/images/plane-top-cutout.png" alt="" fill sizes="340px" className="object-contain brightness-0 blur-[10px]" />
        </div>
        <div ref={planeRef} className="absolute inset-0 will-change-transform">
          <div className="relative h-full animate-[plane-hover-float_5s_ease-in-out_infinite]">
            <Image src="/images/plane-top-cutout.png" alt="" fill sizes="340px" className="object-contain" />
          </div>
        </div>
      </div>

      {/* ---------------- Header ---------------- */}
      <div className="relative max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 lg:text-center mb-14 lg:mb-10">
        <div className="flex lg:justify-center items-center gap-3 mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0a7fb3]">
          Global reach
        </div>
        <h2
          id="students-heading"
          data-heading
          className="section-title"
        >
          <span className="svc-word-mask">
            <span className="svc-word text-slate-900" style={{ "--i": 0 } as CSSProperties}>Our Students</span>
          </span>
          <br />
          <span className="svc-word-mask">
            <span className="svc-word text-[#009cd9]" style={{ "--i": 1 } as CSSProperties}>Across The Globe</span>
          </span>
        </h2>
      </div>

      {/* ======================================================
          Flight track: the plane flies down its centre lane
          ====================================================== */}
      <div ref={trackRef} className="relative">
        {/* Dashed flight line, drawn as the plane descends (desktop) */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-[50svh] w-px -translate-x-1/2 pointer-events-none [background:repeating-linear-gradient(to_bottom,rgba(0,156,217,0.35)_0_8px,transparent_8px_18px)] origin-top scale-y-[var(--tp)]"
          aria-hidden="true"
        />

        <div className="relative max-w-[1728px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-[8vh] lg:pt-[28vh]">
          <TokenColumns list={destinations} />
        </div>

        {/* ---------------- Landing panel: scales up, the plane touches down ---------------- */}
        <div data-landing className="relative mt-[10vh] sm:mt-[18vh] px-3 sm:px-4 lg:px-6 xl:px-7">
          <div className="landing-panel relative h-[27rem] sm:h-svh max-w-[1728px] mx-auto overflow-hidden bg-gradient-to-b from-[#d9f0fb] via-[#eaf7fd] to-[#d4eefa]">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[420px] rounded-full bg-white/70 blur-[90px]" aria-hidden="true" />
            <Image src="/images/cloud.png" alt="" width={380} height={203} className="absolute -left-16 bottom-[18%] w-[38%] max-w-[420px] h-auto opacity-90 translate-x-[calc((1-var(--lv))*-80px)]" />
            <Image src="/images/cloud.png" alt="" width={340} height={181} className="absolute -right-14 top-[14%] w-[30%] max-w-[340px] h-auto opacity-80 translate-x-[calc((1-var(--lv))*80px)]" />

            {/* Touchdown pad, centred under where the plane parks */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[calc(var(--plane-size)*1.05)] aspect-square rounded-full border-2 border-dashed border-[#009cd9]/40"
              aria-hidden="true"
            >
              <div className="absolute inset-[18%] rounded-full bg-white/50" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-end text-center pb-8 sm:pb-[8vh] px-6">
              <div className="text-[clamp(3.4rem,12vw,10rem)] leading-none tracking-[-0.05em] text-slate-900 tabular-nums">
                <span data-total aria-hidden="true">0</span>
                <span className="text-[#009cd9]">+</span>
                <span className="sr-only">{fmt(reachTotals.students)}+</span>
              </div>
              <p className="mt-3 sm:mt-4 max-w-[18rem] sm:max-w-none body-lead text-slate-600">
                students guided to study across {reachTotals.countries} countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
