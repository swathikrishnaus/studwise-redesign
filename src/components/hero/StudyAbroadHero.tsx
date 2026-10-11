import HeroHeader from "./HeroHeader";
import SkyInteractiveSection from "./SkyInteractiveSection";
import ConsultationCard from "./ConsultationCard";
import MarqueeTicker from "./MarqueeTicker";

/* --------------------------------------------------------------------------
   Stats — three soft pastel boxes, each with its own tint and icon
   -------------------------------------------------------------------------- */
const heroStats = [
  {
    value: "500+",
    tint: "bg-[#e3f3fc]",
    ink: "text-[#0a7fb3]",
    label: "Partner universities",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
  },
  {
    value: "99.2%",
    tint: "bg-[#e3f6ec]",
    ink: "text-[#15803d]",
    label: "Visa success rate",
    icon: "M9 12l2 2 4-4m5.6-4A12 12 0 0 1 12 2.9 12 12 0 0 1 3.4 6 12 12 0 0 0 3 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3Z",
  },
  {
    value: "₹45 Cr+",
    tint: "bg-[#fdf1df]",
    ink: "text-[#b45309]",
    label: "Scholarships won",
    icon: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2M12 6.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3 1-2Z",
  },
];

function StatsBoxes() {
  return (
    <dl className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {heroStats.map((stat) => (
        <div key={stat.label} className={`relative rounded-2xl ${stat.tint} p-3.5 sm:px-4 sm:py-4`}>
          <span className={`absolute top-3 right-3 grid place-items-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/80 ${stat.ink}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={stat.icon} />
            </svg>
          </span>
          <div className="flex flex-col-reverse pt-8 sm:pt-0">
            <dt className="text-[11px] sm:text-xs text-slate-600 leading-tight">{stat.label}</dt>
            <dd className="text-lg sm:text-2xl tracking-tight leading-none text-slate-900 mb-1.5">{stat.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export default function StudyAbroadHero() {
  return (
    <section className="relative w-full bg-[#F1F5F9] flex flex-col min-h-screen overflow-hidden">
      {/* ----------------------------------------------------------------
          Top Navigation Header (Transparent)
          ---------------------------------------------------------------- */}
      <HeroHeader />

      {/* ----------------------------------------------------------------
          Main Hero Grid
          ---------------------------------------------------------------- */}
      <div className="flex-1 w-full max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 pb-3 sm:pb-4 lg:pb-6 flex flex-col justify-stretch">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-stretch">
          
          {/* ==============================================================
              LEFT COLUMN: Interactive Sky Section
              ============================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-8 flex">
            <SkyInteractiveSection />
          </div>

          {/* ==============================================================
              RIGHT COLUMN: Consultation Card + Stats Boxes
              Stretches to the sky panel's height: the card grows to fill
              whatever the stats boxes leave, so both columns end level.
              ============================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-4 flex flex-col gap-3 sm:gap-4 w-full max-w-md lg:max-w-none mx-auto">
            <div className="flex-1 flex flex-col">
              <ConsultationCard />
            </div>
            <StatsBoxes />
          </div>

        </div>
      </div>

      {/* ----------------------------------------------------------------
          Bottom Live Marquee Ticker
          ---------------------------------------------------------------- */}
      <MarqueeTicker />
    </section>
  );
}
