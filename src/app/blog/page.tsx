import type { Metadata } from "next";
import HeroHeader from "@/components/hero/HeroHeader";
import { Eyebrow, gutter } from "@/components/shared/PageKit";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogCta from "@/components/blog/BlogCta";
import { postSummaries } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Study abroad guides from Studwise: destinations, student visas, IELTS and admissions, and how to choose the right consultant.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="bg-[#F1F5F9]">
      <HeroHeader />

      <div className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        {/* Masthead */}
        <header className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 pt-12 pb-10 sm:px-10 sm:pt-16 lg:px-14 lg:pt-20 lg:pb-14">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>The Studwise Journal</Eyebrow>
              <h1 className="mt-6 font-normal tracking-[-0.05em] leading-[0.92] text-slate-900 text-[clamp(3rem,13vw,4.5rem)] sm:text-[clamp(4.5rem,10vw,7rem)] lg:text-[min(8vw,8.5rem)]">
                Study abroad,
                <span className="block text-[#0a7fb3]">explained.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-[15px] sm:text-lg leading-relaxed text-slate-600">
                Destination guides, visa updates and admissions advice from the Studwise counselling team.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 sm:mt-8 px-0 sm:px-2">
          <BlogIndex posts={postSummaries} />
        </div>

        <div className="mt-20 sm:mt-28">
          <BlogCta />
        </div>
      </div>
    </div>
  );
}
