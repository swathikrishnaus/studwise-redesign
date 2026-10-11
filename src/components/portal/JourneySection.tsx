"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import { lerp, pinnedProgress, prefersReducedMotion, smoothstep } from "@/lib/scroll";
import type { JourneyScene } from "./journeyScene";

/* --------------------------------------------------------------------------
   JourneySection — "The Staircase to a New Future"
   --------------------------------------------------------------------------
   Pinned scroll scene: a student at the foot of an illuminated staircase
   in the blue hour, with the section's message and CTAs → the climb →
   above the clouds at dawn → down to the campus in daylight, where the
   same student walks to the main hall and the arrival copy lands.

   One value drives everything: the section's pinned scroll progress
   (0 → 1, via the same Lenis + sticky pattern as the rest of the page),
   eased once per frame. The 3D scene (journeyScene.update), the intro
   and headline text and the no-WebGL fallback all read that same p, so
   they cannot drift apart, and scrolling up plays it all back in reverse.

   Three.js loads on demand as the section approaches. Without WebGL the
   same timeline runs on the campus photograph (night → day). With reduced
   motion the section isn't pinned and shows the final frame.
   -------------------------------------------------------------------------- */

// The arrival headline, revealed word by word once the student reaches campus
// Share of the pinned scroll the journey uses; the remainder is a hold on
// the final "Destination reached" view
const FINISH = 0.82;

const finaleLines = [
  ["Step", "onto", "campus"],
  ["with", "confidence"],
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const introScrimRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const words = Array.from(section.querySelectorAll<HTMLElement>("[data-word]"));
    const reduce = prefersReducedMotion();

    let scene: JourneyScene | null = null;
    let loading = false;
    let disposed = false;
    let size = "";
    let p = reduce ? 1 : 0;
    let raf = 0;

    const setMode = (mode: "webgl" | "fallback") => {
      section.dataset.mode = mode;
    };

    const webglAvailable = () => {
      try {
        const test = document.createElement("canvas");
        return !!(test.getContext("webgl2") || test.getContext("webgl"));
      } catch {
        return false;
      }
    };

    const tick = () => {
      raf = 0;
      const target = reduce ? 1 : pinnedProgress(section);
      p = reduce ? 1 : lerp(p, target, 0.12);
      if (Math.abs(target - p) < 1e-4) p = target;
      // The journey completes at FINISH; the rest of the scroll holds the
      // arrival view in place before the footer comes up
      const q = Math.min(1, p / FINISH);

      /* ---- Text: message + CTAs at the foot of the stairs; arrival copy on campus */
      const intro = smoothstep(0.03, 0.14, q);
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - intro);
        introRef.current.style.transform = `translate3d(0, ${-intro * 40}px, 0)`;
        introRef.current.style.pointerEvents = intro < 0.5 ? "auto" : "none";
      }
      if (introScrimRef.current) introScrimRef.current.style.opacity = String(1 - intro);
      const scrim = smoothstep(0.88, 0.96, q);
      if (scrimRef.current) scrimRef.current.style.opacity = String(scrim);
      if (finaleRef.current) finaleRef.current.style.visibility = scrim > 0 ? "visible" : "hidden";
      const headline = smoothstep(0.9, 0.97, q);
      words.forEach((el, i) => {
        const t = smoothstep(i / (words.length + 2), (i + 3) / (words.length + 2), headline);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${(1 - t) * 0.4}em, 0)`;
      });
      const cta = smoothstep(0.94, 0.99, q);
      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(cta);
        ctaRef.current.style.transform = `translate3d(0, ${(1 - cta) * 16}px, 0)`;
        ctaRef.current.style.pointerEvents = cta > 0.9 ? "auto" : "none";
      }

      /* ---- Fallback: the same blue hour → day timeline on the photograph */
      if (section.dataset.mode === "fallback") {
        if (photoRef.current) photoRef.current.style.transform = `scale(${lerp(1.35, 1.04, q)})`;
        if (nightRef.current) nightRef.current.style.opacity = String(1 - smoothstep(0.15, 0.85, q));
      }

      /* ---- 3D */
      const rect = section.getBoundingClientRect();
      if (scene && rect.top < window.innerHeight && rect.bottom > 0) {
        const key = `${canvas.clientWidth}x${canvas.clientHeight}`;
        if (key !== size) {
          scene.resize(canvas.clientWidth, canvas.clientHeight);
          size = key;
        }
        scene.update(q);
        scene.render();
      }

      if (p !== target) raf = requestAnimationFrame(tick);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const load = async () => {
      if (loading) return;
      loading = true;
      if (!webglAvailable()) {
        setMode("fallback");
        request();
        return;
      }
      try {
        const { createJourneyScene } = await import("./journeyScene");
        if (disposed) return;
        // Textures arrive after the first frame; redraw when they do
        scene = createJourneyScene(canvas, {
          mobile: window.innerWidth < 768,
          onAssetLoad: () => scene?.render(),
        });
        size = "";
        setMode("webgl");
      } catch {
        setMode("fallback");
      }
      request();
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      scene = null;
      setMode("fallback");
      request();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // Start loading Three.js about a screen before the section arrives
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) load();
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(section);

    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      disposed = true;
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
      scene?.dispose();
      scene = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="get-started"
      aria-labelledby="journey-heading"
      className="group relative h-[780vh] motion-reduce:h-auto bg-[#0a5687]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ---------------- 3D journey ---------------- */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-700 group-data-[mode=webgl]:opacity-100"
          aria-hidden="true"
        />

        {/* ---------------- Fallback: the campus photograph, night → day ---------------- */}
        <div className="absolute inset-0 hidden group-data-[mode=fallback]:block" aria-hidden="true">
          <div ref={photoRef} className="absolute inset-0 origin-center motion-reduce:scale-100">
            <Image src="/images/hero/campus-students.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#0a7fb3] mix-blend-color opacity-40" />
          </div>
          <div ref={nightRef} className="absolute inset-0 bg-[#0a5687]/70 motion-reduce:opacity-0" />
        </div>

        {/* ---------------- Opening view: message + CTAs at the foot of the stairs ---------------- */}
        <div
          ref={introScrimRef}
          className="absolute inset-0 pointer-events-none motion-reduce:hidden"
          style={{ background: "linear-gradient(180deg, rgba(4,52,86,0.55) 0%, rgba(4,52,86,0.25) 40%, rgba(4,52,86,0) 62%)" }}
          aria-hidden="true"
        />
        <div
          ref={introRef}
          className="absolute inset-x-0 top-0 pt-[8svh] sm:pt-[10svh] px-6 sm:px-10 lg:pl-[6vw] lg:pr-10 text-center lg:text-left will-change-transform motion-reduce:hidden"
        >
          <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-sky-100/90">
            Study abroad with Studwise
          </p>
          <h2
            id="journey-heading"
            className="font-normal tracking-[-0.045em] leading-[0.95] text-white text-[clamp(2.5rem,7vw,7rem)] drop-shadow-[0_4px_30px_rgba(0,40,80,0.35)]"
          >
            Your journey starts here
          </h2>
          <p className="mt-3 sm:mt-5 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,40,80,0.4)]">
            If you&apos;ve already decided on your study destination, ignore your hesitations and reach out to us.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
            <CloudButton href="/study-destinations" variant="white" size="lg">
              Explore study destinations
            </CloudButton>
            <a
              href={bookAppointmentHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-white underline decoration-white/50 underline-offset-4 hover:decoration-white transition-colors"
            >
              or talk to an advisor
            </a>
          </div>
          <p className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-white/70">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6 6 6 6-6" />
            </svg>
            Every big move starts with one step — scroll to climb
          </p>
        </div>

        {/* ---------------- Finale ---------------- */}
        {/* Sky-side scrim for the copy */}
        <div
          ref={scrimRef}
          className="absolute inset-0 pointer-events-none opacity-0 motion-reduce:opacity-100"
          style={{
            background: `
              linear-gradient(180deg, rgba(3,48,77,0.74) 0%, rgba(3,48,77,0.55) 34%, rgba(3,48,77,0.32) 52%, rgba(3,48,77,0) 70%)
            `,
          }}
          aria-hidden="true"
        />
        <div
          ref={finaleRef}
          className="absolute inset-x-0 top-0 px-6 sm:px-10 lg:pl-[6vw] lg:pr-10 pt-[9svh] sm:pt-[11svh] text-center lg:text-left invisible motion-reduce:visible"
        >
          <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-sky-100/90">
            Destination reached
          </p>
          <p className="font-normal tracking-[-0.045em] leading-[0.95] text-white text-[clamp(2.4rem,6.6vw,6.8rem)] drop-shadow-[0_4px_30px_rgba(0,40,80,0.35)]">
            {finaleLines.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, i) => (
                  <span key={i} data-word className="inline-block mr-[0.22em] opacity-0 will-change-transform motion-reduce:opacity-100">
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <div ref={ctaRef} className="opacity-0 motion-reduce:opacity-100">
            <p className="mt-3 sm:mt-5 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,40,80,0.4)]">
              From shortlisting universities to scholarships, visas and your first day abroad, Studwise walks every step of the way with you.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <CloudButton href={bookAppointmentHref} size="lg" target="_blank" rel="noopener noreferrer">
                Book a free consultation
              </CloudButton>
              <CloudButton href="/universities" variant="white" size="lg">
                View partner universities
              </CloudButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
