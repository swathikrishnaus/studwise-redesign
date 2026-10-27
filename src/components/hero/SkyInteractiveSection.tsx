"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import SoftCloud, { CLOUD_BANK, CLOUD_PUFF, CLOUD_TOWER } from "./SoftCloud";
import { Books, Cap, Globe, Sparks } from "@/components/shared/Doodles";

/* Services offered by Studwise, shown as quick-scan chips under the copy */
const heroPerks = ["Scholarship guidance", "Visa assistance", "IELTS / TOEFL prep", "Accommodation support"];

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
        <h1 className="banner-title text-white [text-shadow:0_2px_24px_rgba(10,60,120,0.25)]">
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
        <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2 max-w-[24rem] sm:max-w-[32rem] xl:max-w-[26rem] 2xl:max-w-[30rem]" aria-label="What we help with">
          {heroPerks.map((perk) => (
            <li
              key={perk}
              className="inline-flex items-center text-sm sm:text-[15px] text-white bg-white/15 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30 shadow-[0_4px_12px_-10px_rgba(10,60,120,0.25)]"
            >
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
