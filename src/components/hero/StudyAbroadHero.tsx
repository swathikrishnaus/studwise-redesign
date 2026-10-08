import HeroHeader from "./HeroHeader";
import SkyInteractiveSection from "./SkyInteractiveSection";
import ConsultationCard from "./ConsultationCard";
import MarqueeTicker from "./MarqueeTicker";

/* --------------------------------------------------------------------------
   Stats Boxes — three equal tiles beneath the form
   -------------------------------------------------------------------------- */
const heroStats = [
  { value: "500+", label: "Partner Universities", color: "text-[#009cd9]" },
  { value: "99.2%", label: "Visa Success Rate", color: "text-[#009cd9]" },
  { value: "₹45 Cr+", label: "Scholarships Won", color: "text-amber-500" },
];

function StatsBoxes() {
  return (
    <dl className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {heroStats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse justify-center gap-1 rounded-2xl bg-white px-3 py-3.5 sm:px-4 sm:py-4 ring-1 ring-slate-200/70 shadow-[0_12px_30px_-18px_rgba(0,109,160,0.35)] text-center sm:text-left"
        >
          <dt className="text-[10px] sm:text-xs text-slate-500 leading-tight">{stat.label}</dt>
          <dd className={`text-lg sm:text-2xl tracking-tight leading-none ${stat.color}`}>{stat.value}</dd>
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
