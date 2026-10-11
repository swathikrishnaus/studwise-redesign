"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

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
  const planeX = mousePos.x * 45;
  const planeY = mousePos.y * 35;
  const planeRotate = mousePos.x * 6 - mousePos.y * 4;

  const cloudBackX = mousePos.x * -20;
  const cloudBackY = mousePos.y * -14;

  const cloudFrontX = mousePos.x * -40;
  const cloudFrontY = mousePos.y * -25;

  const cloudAccentX = mousePos.x * 25;
  const cloudAccentY = mousePos.y * 18;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Phones get a tall panel: the copy sits on top and the plane and its
      // cloud bank get a clear stage of their own underneath
      className="relative w-full h-full min-h-[43rem] sm:min-h-[50rem] lg:min-h-[40rem] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex flex-col justify-start p-7 pt-9 sm:p-10 sm:pt-12 lg:p-12 xl:p-14 select-none"
      style={{
        background: `
          radial-gradient(circle at 85% 20%, rgba(255,255,255,0.25) 0%, transparent 50%),
          radial-gradient(circle at 15% 85%, rgba(0,120,180,0.4) 0%, transparent 45%),
          linear-gradient(135deg, #009cd9 0%, #0089c2 30%, #007ab0 60%, #006da0 100%)
        `,
      }}
    >
      {/* ------------------------------------------------------------------
          Atmospheric Lighting
          ------------------------------------------------------------------ */}
      <div
        className="absolute -top-20 -right-20 w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] rounded-full bg-white/15 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#006da0]/40 blur-[70px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Sun glow behind the plane */}
      <div
        className="absolute bottom-[14%] right-[18%] w-[260px] h-[260px] lg:w-[380px] lg:h-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_65%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Flight Path Trail (Decorative SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -50 590 C 150 560, 300 520, 430 440 C 540 370, 600 300, 850 220"
          stroke="url(#trailGrad)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* ------------------------------------------------------------------
          LAYER 1: Far clouds (slow parallax) — one high on the right, one
          small wisp drifting behind the copy on the left
          ------------------------------------------------------------------ */}
      <div
        className="absolute top-[42%] sm:top-[40%] lg:top-[30%] right-[-8%] lg:right-[-4%] w-[46%] max-w-[380px] pointer-events-none transition-transform duration-300 ease-out opacity-60 blur-[1px]"
        style={{ transform: `translate3d(${cloudBackX}px, ${cloudBackY}px, 0)` }}
        aria-hidden="true"
      >
        <div className="animate-[cloud-float-slow_9s_ease-in-out_infinite]">
          <Image
            src="/images/cloud.png"
            alt=""
            width={380}
            height={203}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div
        className="absolute bottom-[26%] lg:bottom-[20%] left-[-10%] lg:left-[-4%] w-[42%] max-w-[300px] pointer-events-none transition-transform duration-300 ease-out opacity-45 blur-[2px]"
        style={{ transform: `translate3d(${cloudBackX * 1.4}px, ${cloudBackY}px, 0)` }}
        aria-hidden="true"
      >
        <div className="animate-[cloud-float-reverse_13s_ease-in-out_infinite]">
          <Image src="/images/cloud.png" alt="" width={300} height={160} className="w-full h-auto object-contain" />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          LAYER 2: Cloud bank the plane skims over
          ------------------------------------------------------------------ */}
      <div
        className="absolute -bottom-[6%] right-[-8%] sm:right-[-4%] lg:-right-[8%] w-[88%] sm:w-[72%] lg:w-[58%] max-w-[640px] pointer-events-none transition-transform duration-200 ease-out opacity-90"
        style={{ transform: `translate3d(${cloudAccentX}px, ${cloudAccentY}px, 0)` }}
        aria-hidden="true"
      >
        <div className="animate-[cloud-float-reverse_11s_ease-in-out_infinite]">
          <Image
            src="/images/cloud.png"
            alt=""
            width={640}
            height={342}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,60,120,0.25)]"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          LAYER 3: 3D Airplane (Main interactive element)
          ------------------------------------------------------------------ */}
      {/* data-flight-start: FlightPlane takes off from this box on scroll and
          --flight-handoff fades this copy out as the flying copy fades in */}
      <div
        data-flight-start
        className="absolute bottom-[12%] sm:bottom-[14%] lg:bottom-[11%] right-[6%] sm:right-[8%] lg:right-[2%] w-[80%] sm:w-[62%] lg:w-[54%] max-w-[620px] pointer-events-none z-20"
        style={{ opacity: "calc(1 - var(--flight-handoff, 0))" }}
        aria-hidden="true"
      >
        <div
          className="transition-transform duration-200 ease-out"
          style={{ transform: `translate3d(${planeX}px, ${planeY}px, 0) rotate(${planeRotate}deg)` }}
        >
          <div className="animate-[plane-hover-float_6s_ease-in-out_infinite]">
            <Image
              src="/images/airplane.png"
              alt="3D Airplane"
              width={600}
              height={302}
              priority
              sizes="(min-width: 1024px) 600px, 80vw"
              className="w-full h-auto object-contain drop-shadow-[0_28px_48px_rgba(0,40,90,0.45)]"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          LAYER 4: Foreground clouds (closest, highest parallax) — tucked
          under the plane's tail and belly so it sits *in* the sky
          ------------------------------------------------------------------ */}
      <div
        className="absolute -bottom-[7%] -right-[10%] sm:-right-[6%] w-[58%] sm:w-[46%] lg:w-[40%] max-w-[460px] pointer-events-none transition-transform duration-150 ease-out z-30 opacity-95"
        style={{ transform: `translate3d(${cloudFrontX}px, ${cloudFrontY}px, 0)` }}
        aria-hidden="true"
      >
        <Image
          src="/images/cloud.png"
          alt=""
          width={460}
          height={246}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
        />
      </div>
      <div
        className="absolute -bottom-[6%] left-[14%] sm:left-[22%] lg:-left-[6%] lg:-bottom-[10%] w-[44%] sm:w-[34%] lg:w-[30%] max-w-[340px] pointer-events-none transition-transform duration-150 ease-out z-30 opacity-90"
        style={{ transform: `translate3d(${cloudFrontX * 0.8}px, ${cloudFrontY}px, 0)` }}
        aria-hidden="true"
      >
        <Image src="/images/cloud.png" alt="" width={340} height={182} className="w-full h-auto object-contain" />
      </div>

      {/* ------------------------------------------------------------------
          CONTENT: Bold Headline & Short Tagline
          ------------------------------------------------------------------ */}
      <div className="relative z-30 max-w-xl lg:max-w-2xl">
        <h1 className="text-[3.1rem] sm:text-[4.2rem] md:text-[4.6rem] lg:text-[4.6rem] xl:text-[5.4rem] 2xl:text-[6.2rem] font-normal text-white leading-[1.02] tracking-[-0.03em] drop-shadow-md">
          <span className="block">Take flight to</span>
          <span className="block">world-class</span>
          <span className="block">universities.</span>
        </h1>

        {/* Three balanced lines from sm up; wraps naturally on phones */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl xl:text-[1.35rem] text-white/90 leading-relaxed">
          <span className="sm:block">Your journey to top global universities</span>{" "}
          <span className="sm:block">starts here — personalized mentorship,</span>{" "}
          <span className="sm:block">scholarships, and 100% visa assistance.</span>
        </p>

        {/* What Studwise handles for you */}
        <ul className="mt-6 flex flex-wrap gap-2 max-w-[22rem] sm:max-w-[30rem]" aria-label="What we help with">
          {heroPerks.map((perk) => (
            <li
              key={perk}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-white bg-white/15 backdrop-blur-md pl-1.5 pr-3 py-1 rounded-full border border-white/25"
            >
              <span className="grid place-items-center w-4.5 h-4.5 rounded-full bg-white text-[#0089c2]">
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
