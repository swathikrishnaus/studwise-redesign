import { whyChoose } from "@/data/aboutPage";
import { Eyebrow, StatCards, gutter } from "@/components/shared/PageKit";
import ScrollWords from "@/components/shared/ScrollWords";

/* --------------------------------------------------------------------------
   WhyStudwiseSection — "Why Choose Us" statement and three key figures
   -------------------------------------------------------------------------- */
export default function WhyStudwiseSection() {
  return (
    <section id="why-choose-us" aria-labelledby="why-studwise-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={gutter}>
        <div className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
            <div data-reveal className="lg:col-span-3">
              <Eyebrow as="h2" id="why-studwise-heading">
                Why Choose Us
              </Eyebrow>
            </div>
            <ScrollWords
              text={whyChoose.text}
              className="lg:col-span-9 tracking-[-0.02em] leading-[1.2] text-slate-900 text-[clamp(1.35rem,5.4vw,1.9rem)] sm:text-[clamp(1.7rem,3.4vw,2.4rem)] lg:text-[min(2.5vw,2.6rem)]"
            />
          </div>

          {/* Key figures */}
          <StatCards reveal size="lg" className="mt-12 sm:mt-16 sm:grid-cols-3 gap-3 sm:gap-4" items={whyChoose.stats} />
        </div>
      </div>
    </section>
  );
}
