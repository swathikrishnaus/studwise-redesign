import HeroHeader from "./HeroHeader";
import SkyInteractiveSection from "./SkyInteractiveSection";
import AdvisorForm from "@/components/shared/AdvisorForm";
import MarqueeTicker from "./MarqueeTicker";

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
      {/* Desktop: the cards fill at least the first screen under the header
          (the ticker follows below the fold), growing with the form */}
      <div className="flex-1 lg:flex-none lg:min-h-[max(41.5rem,calc(100svh-5rem))] w-full max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7 pb-3 sm:pb-4 lg:pb-6 flex flex-col justify-stretch">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-stretch">
          
          {/* ==============================================================
              LEFT COLUMN: Interactive Sky Section
              ============================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-8 flex">
            <SkyInteractiveSection />
          </div>

          {/* ==============================================================
              RIGHT COLUMN: Consultation form, stretched to the sky
              panel's height so both columns end level (the stats moved
              to the Why Choose Us section).
              ============================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-4 flex flex-col gap-3 sm:gap-4 w-full max-w-md lg:max-w-none mx-auto">
            <div className="flex-1 flex flex-col">
              <AdvisorForm id="consultation-panel" highlight />
            </div>
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
