"use client";

import { useState, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import SoftCloud, { CLOUD_BANK, CLOUD_PUFF, CLOUD_TOWER } from "./SoftCloud";

/* Services offered by Studwise, shown as quick-scan chips under the copy */
const heroPerks = ["Scholarship guidance", "Visa assistance", "IELTS / TOEFL prep", "Accommodation support"];

/* --------------------------------------------------------------------------
   Line icons floating around the student (64 × 64, white strokes)
   -------------------------------------------------------------------------- */
function Doodle({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Mortarboard with a hanging tassel */
const Cap = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <path d="M32 12 60 24 32 36 4 24 32 12Z" />
    <path d="M15 29v10c0 4 7.6 8 17 8s17-4 17-8V29" />
    <circle cx="32" cy="24" r="1.6" fill="currentColor" />
    <path d="M32 24 52 29v13" />
    <path d="M50 42h4l-.6 7h-2.8L50 42Z" />
  </Doodle>
);

/** Desk globe on its stand */
const Globe = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <circle cx="32" cy="26" r="17" />
    <ellipse cx="32" cy="26" rx="7.5" ry="17" />
    <path d="M15 26h34M18 17h28M18 35h28" />
    <path d="M10.5 23.5A22 22 0 0 0 49 41" />
    <path d="M32 48v6M24 56h16" />
  </Doodle>
);

/** A small stack of books */
const Books = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <g transform="rotate(-10 32 36)">
      <rect x="8" y="42" width="48" height="10" rx="2" />
      <rect x="12" y="32" width="42" height="10" rx="2" />
      <rect x="6" y="22" width="44" height="10" rx="2" />
      <path d="M14 42v10M18 32v10M12 22v10M46 45h6M46 49h6M44 25h4M44 29h4" />
    </g>
  </Doodle>
);

/** Three little "idea" strokes */
const Sparks = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <path d="M40 8l-6 12M26 24l-14-6M28 36l-16 3" strokeWidth={2} />
  </Doodle>
);

/* --------------------------------------------------------------------------
   SkyInteractiveSection — the homepage banner panel
   --------------------------------------------------------------------------
   A student (cut out from the client's approved banner mockup:
   public/images/hero/student-hero.webp) standing in soft clouds on a clear sky, with white line icons and dashed paths around her. It
   used to show a 3D airplane; the client asked for a student so the site
   doesn't read as a travel agency.
   The "stage" box holds the student, her clouds and icons so they scale
   together: below xl it sits under the copy (sized by height), from xl up
   beside it (sized by width). Layers drift with the pointer.
   -------------------------------------------------------------------------- */
export default function SkyInteractiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax offsets — different layers move at different speeds
  const studentX = mousePos.x * 12;
  const studentY = mousePos.y * 6;
  const iconX = mousePos.x * 28;
  const iconY = mousePos.y * 18;
  const cloudX = mousePos.x * -24;
  const cloudY = mousePos.y * -10;

  const drift = (k: number, ky = k) => ({ transform: `translate3d(${cloudX * k}px, ${cloudY * ky}px, 0)` });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Phones get a tall panel: the copy sits on top and the student gets
      // a clear stage of their own underneath
      className="relative isolate w-full h-full min-h-[48rem] sm:min-h-[54rem] lg:min-h-[40rem] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex flex-col justify-start p-7 pt-9 sm:p-10 sm:pt-12 lg:p-12 xl:p-14 select-none"
      style={{
        // A clear, soft daytime sky: deeper at the lower left, paler toward
        // the sun at the top right
        background: `
          radial-gradient(ellipse at 92% 4%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 52%),
          radial-gradient(ellipse at 0% 100%, rgba(22,98,170,0.35) 0%, rgba(22,98,170,0) 55%),
          linear-gradient(160deg, #3a88cf 0%, #4794d5 42%, #5ea8df 100%)
        `,
      }}
    >
      {/* ------------------------------------------------------------------
          Sky clouds: a low one in the bottom-left corner and a faint wisp
          on the right
          ------------------------------------------------------------------ */}
      <div
        className="absolute -bottom-[3%] -left-[10%] w-[56%] sm:w-[40%] xl:w-[34%] z-30 pointer-events-none transition-transform duration-200 ease-out"
        style={drift(0.8)}
        aria-hidden="true"
      >
        <SoftCloud shape={CLOUD_PUFF} seed={21} className="w-full h-auto opacity-50" />
      </div>
      <div
        className="hidden sm:block absolute top-[52%] xl:top-[6%] -right-[14%] w-[46%] pointer-events-none opacity-40 blur-[2px] transition-transform duration-300 ease-out"
        style={drift(0.4)}
        aria-hidden="true"
      >
        <SoftCloud shape={CLOUD_PUFF} seed={5} className="w-full h-auto" />
      </div>

      {/* ------------------------------------------------------------------
          Stage: the student with her clouds, icons and dashed paths
          (the cut-out is 1100 × 1159). It sinks a little below the panel so
          the clouds take her at the waist, and from xl up it is nudged past
          the right edge so the backpack tucks out of frame.
          ------------------------------------------------------------------ */}
      <div
        className="absolute -bottom-[2%] xl:-bottom-[3%] right-[2%] sm:right-[10%] lg:right-[4%] xl:right-0 xl:translate-x-[4%] h-[46%] lg:h-[42%] xl:h-auto xl:w-[56%] aspect-[1100/1159] pointer-events-none"
        aria-hidden="true"
      >
        {/* Dashed paths: one sweeping up from the foot of the panel to the
            student, one dropping from the globe into the clouds */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path
            d="M -110 104 C -64 100, -36 92, -18 78 C -6 68, 0 52, 6 40"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeDasharray="7 8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 84.5 25 C 86 32, 89 38, 93 45"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeDasharray="6 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Tall drift of cloud behind her shoulder and backpack */}
        <div className="absolute bottom-0 -right-[40%] w-[78%] transition-transform duration-300 ease-out" style={drift(0.4)}>
          <SoftCloud shape={CLOUD_TOWER} seed={13} className="w-full h-auto opacity-40" />
        </div>

        {/* The student */}
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translate3d(${studentX}px, ${studentY}px, 0)` }}>
          <Image
            src="/images/hero/student-hero.webp"
            alt=""
            width={1000}
            height={1574}
            priority
            sizes="(min-width: 1280px) 520px, (min-width: 640px) 420px, 340px"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_30px_40px_rgba(10,60,110,0.3)]"
          />
        </div>

        {/* Icons, drifting a little faster than the student */}
        <div className="absolute inset-0 text-white transition-transform duration-200 ease-out" style={{ transform: `translate3d(${iconX}px, ${iconY}px, 0)` }}>
          <span className="absolute -top-[9%] left-[58%] w-[14%] animate-[cloud-float-slow_7s_ease-in-out_infinite] motion-reduce:animate-none">
            <Cap className="w-full h-auto" />
          </span>
          <span className="absolute top-[12%] left-[79%] w-[11%] animate-[cloud-float-reverse_8s_ease-in-out_infinite] motion-reduce:animate-none">
            <Globe className="w-full h-auto" />
          </span>
          <span className="absolute top-[27%] left-[2%] sm:left-[4%] w-[12%] animate-[cloud-float-reverse_9s_ease-in-out_infinite] motion-reduce:animate-none">
            <Books className="w-full h-auto" />
          </span>
          <Sparks className="absolute top-[8%] left-[15%] w-[8%] h-auto" />
        </div>

        {/* Cloud bank she stands in, over her waist */}
        <div className="absolute -bottom-[34%] -left-[70%] w-[220%] transition-transform duration-150 ease-out" style={drift(1, 0.6)}>
          <SoftCloud shape={CLOUD_BANK} seed={7} className="w-full h-auto opacity-60" />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          CONTENT: Bold Headline & Short Tagline
          ------------------------------------------------------------------ */}
      <div className="relative z-30 max-w-xl lg:max-w-2xl">
        <h1 className="text-[3.1rem] sm:text-[4.2rem] md:text-[4.6rem] lg:text-[4.6rem] xl:text-[4.9rem] 2xl:text-[6rem] font-normal text-white leading-[1.02] tracking-[-0.03em] [text-shadow:0_2px_24px_rgba(10,60,120,0.25)]">
          <span className="block">Take flight to</span>
          <span className="block">world-class</span>
          <span className="block">universities.</span>
        </h1>

        {/* Three balanced lines from sm up; wraps naturally on phones */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl xl:text-[1.3rem] text-white/95 leading-relaxed">
          <span className="sm:block">Your journey to top global universities</span>{" "}
          <span className="sm:block">starts here — personalized mentorship,</span>{" "}
          <span className="sm:block">scholarships, and 100% visa assistance.</span>
        </p>

        {/* What Studwise handles for you */}
        <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2 max-w-[22rem] sm:max-w-[30rem] xl:max-w-[23rem] 2xl:max-w-[26rem]" aria-label="What we help with">
          {heroPerks.map((perk) => (
            <li
              key={perk}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-white bg-white/15 backdrop-blur-md pl-1.5 pr-3 py-1 rounded-full border border-white/30 shadow-[0_6px_16px_-10px_rgba(10,60,120,0.5)]"
            >
              <span className="grid place-items-center w-4.5 h-4.5 rounded-full bg-white text-[#3a88cf]">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
