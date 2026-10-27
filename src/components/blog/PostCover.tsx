import Image from "next/image";
import SoftCloud, { CLOUD_BANK } from "@/components/hero/SoftCloud";
import type { CoverIcon, PostSummary } from "@/data/blogShared";

const ICONS: Record<CoverIcon, string> = {
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  passport: "M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-3 3.5h6",
  book: "M12 6.5C10.5 5.3 8.4 4.5 6 4.5c-1.1 0-2.1.2-3 .5v14c.9-.3 1.9-.5 3-.5 2.4 0 4.5.8 6 2m0-14c1.5-1.2 3.6-2 6-2 1.1 0 2.1.2 3 .5v14c-.9-.3-1.9-.5-3-.5-2.4 0-4.5.8-6 2m0-14v14",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

type CoverProps = Pick<PostSummary, "kicker" | "icon" | "sky" | "topic" | "image"> & {
  className?: string;
  /** Larger corner details for hero-sized covers */
  large?: boolean;
  /** Multiplies the kicker size, for wide banner-shaped covers */
  scale?: number;
};

export default function PostCover({ kicker, icon, sky, topic, image, className = "", large = false, scale = 1 }: CoverProps) {
  if (image)
    return (
      <div className={`relative overflow-hidden bg-slate-100 ${className}`} aria-hidden="true">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
    );

  // Long words get smaller type so every kicker fits on one line
  const size = Math.min(24, 140 / Math.max(kicker.length, 4)) * scale;

  return (
    <div
      className={`@container relative isolate overflow-hidden text-white ${className}`}
      style={{
        background: `radial-gradient(ellipse at 90% 0%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%), linear-gradient(160deg, ${sky[0]}, ${sky[1]})`,
      }}
      aria-hidden="true"
    >
      <div className="absolute -bottom-[38%] -left-[20%] -z-10 w-[140%] opacity-45">
        <SoftCloud shape={CLOUD_BANK} seed={kicker.length * 7} className="w-full h-auto" />
      </div>

      <div className={`absolute inset-x-0 top-0 flex items-start justify-between ${large ? "p-6 sm:p-8" : "p-4 sm:p-5"}`}>
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30 ${
            large ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[11px]"
          }`}
        >
          {topic}
        </span>
        <svg
          className={`${large ? "w-10 h-10 sm:w-12 sm:h-12" : "w-7 h-7 sm:w-8 sm:h-8"} text-white/85`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.1} d={ICONS[icon]} />
        </svg>
      </div>

      <span
        className="absolute left-[5cqw] bottom-[4cqw] font-normal leading-[0.85] tracking-[-0.05em] whitespace-nowrap [text-shadow:0_4px_30px_rgba(0,30,70,0.25)]"
        style={{ fontSize: `${size}cqw` }}
      >
        {kicker}
      </span>
    </div>
  );
}
