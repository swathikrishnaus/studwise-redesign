"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

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
      className="relative w-full h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex flex-col justify-center p-7 pb-36 sm:p-10 sm:pb-52 lg:p-12 xl:p-14 select-none"
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
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#006da0]/40 blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Flight Path Trail (Decorative SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -50 550 C 150 500, 300 450, 420 320 C 520 210, 600 150, 850 80"
          stroke="url(#trailGrad)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
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
          LAYER 1: Background Cloud (Furthest away, slow parallax)
          ------------------------------------------------------------------ */}
      <div
        className="absolute top-8 right-0 sm:right-4 w-[220px] sm:w-[300px] lg:w-[360px] pointer-events-none transition-transform duration-300 ease-out opacity-70 blur-[0.5px]"
        style={{ transform: `translate3d(${cloudBackX}px, ${cloudBackY}px, 0)` }}
        aria-hidden="true"
      >
        <div className="animate-[cloud-float-slow_9s_ease-in-out_infinite]">
          <Image
            src="/images/cloud.png"
            alt=""
            width={360}
            height={192}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          LAYER 2: Middle Cloud Bank (Under the plane)
          ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-4 right-0 sm:right-8 lg:right-12 w-[280px] sm:w-[380px] lg:w-[450px] pointer-events-none transition-transform duration-200 ease-out opacity-85"
        style={{ transform: `translate3d(${cloudAccentX}px, ${cloudAccentY}px, 0)` }}
        aria-hidden="true"
      >
        <div className="animate-[cloud-float-reverse_11s_ease-in-out_infinite]">
          <Image
            src="/images/cloud.png"
            alt=""
            width={450}
            height={240}
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
        className="absolute bottom-6 sm:bottom-12 lg:bottom-10 right-2 sm:right-8 lg:right-10 w-[190px] sm:w-[280px] lg:w-[340px] xl:w-[380px] pointer-events-none z-20"
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
              width={410}
              height={207}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,40,90,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          LAYER 4: Foreground Cloud (Closest, highest parallax)
          ------------------------------------------------------------------ */}
      <div
        className="absolute -bottom-8 -right-6 sm:-right-2 w-[200px] sm:w-[270px] lg:w-[330px] pointer-events-none transition-transform duration-150 ease-out z-30 opacity-90"
        style={{ transform: `translate3d(${cloudFrontX}px, ${cloudFrontY}px, 0)` }}
        aria-hidden="true"
      >
        <Image
          src="/images/cloud.png"
          alt=""
          width={330}
          height={176}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* ------------------------------------------------------------------
          CONTENT: Bold Headline & Short Tagline
          ------------------------------------------------------------------ */}
      <div className="relative z-30 max-w-md lg:max-w-xl">
        <h1 className="text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.9rem] xl:text-[4.6rem] font-normal text-white leading-[1.04] tracking-tight drop-shadow-md">
          <span className="block">Take flight to</span>
          <span className="block">world-class</span>
          <span className="block">universities.</span>
        </h1>

        {/* Three balanced lines from sm up; wraps naturally on phones */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl xl:text-[1.4rem] text-white leading-relaxed">
          <span className="sm:block">Your journey to top global universities</span>{" "}
          <span className="sm:block">starts here — personalized mentorship,</span>{" "}
          <span className="sm:block">scholarships, and 100% visa assistance.</span>
        </p>

        {/* Interactive Hint */}
        <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/80 font-normal bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <span className="animate-bounce">✈</span>
          <span>Move cursor to navigate the skies</span>
        </div>
      </div>
    </div>
  );
}
