import type { CSSProperties, ReactNode } from "react";

/** Stroked 24 × 24 icon from a single SVG path */
export function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={d} />
    </svg>
  );
}

/** Section label: a short rule and uppercase caption, as on the homepage */
export function Eyebrow({
  children,
  tone = "sky",
  as: Tag = "p",
  id,
}: {
  children: ReactNode;
  tone?: "sky" | "light";
  as?: "p" | "h2";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] ${
        tone === "light" ? "text-sky-100/90" : "text-[#0a7fb3]"
      }`}
    >
      {children}
    </Tag>
  );
}

/** Page gutter shared by every About section (matches the homepage panels) */
export const gutter = "max-w-[1728px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-7";

/* --------------------------------------------------------------------------
   Stat cards — soft pastel cards with a corner icon tile, modelled on the
   stats under the homepage form (components/hero/StudyAbroadHero). Used
   for every figure on inner pages, instead of bordered, divided boxes.
   -------------------------------------------------------------------------- */
export const TONES = {
  sky: { bg: "bg-[#e3f3fc]", ink: "text-[#0a7fb3]" },
  mint: { bg: "bg-[#e3f6ec]", ink: "text-[#15803d]" },
  amber: { bg: "bg-[#fdf1df]", ink: "text-[#b45309]" },
  indigo: { bg: "bg-[#e9ecfb]", ink: "text-[#4338ca]" },
} as const;
export type Tone = keyof typeof TONES;
const TONE_ORDER: Tone[] = ["sky", "mint", "amber", "indigo"];
/** The tone for the i-th card, cycling through the palette */
export const toneAt = (i: number) => TONES[TONE_ORDER[i % TONE_ORDER.length]];

export type Stat = { value: string; label: string; icon: string };

/** Values ending in "+" get the brand-blue plus, as elsewhere on the site */
function StatValue({ value }: { value: string }) {
  return value.endsWith("+") ? (
    <>
      {value.slice(0, -1)}
      <span className="text-[#009cd9]">+</span>
    </>
  ) : (
    <>{value}</>
  );
}

export function StatCards({
  items,
  size = "md",
  className = "",
  reveal = false,
}: {
  items: Stat[];
  size?: "sm" | "md" | "lg";
  /** Grid columns and gaps for the list */
  className?: string;
  /** Stagger the cards in with the page's scroll reveal */
  reveal?: boolean;
}) {
  const s = {
    sm: { card: "px-3.5 pb-3.5 sm:px-4 sm:pb-4", tile: "w-7 h-7", icon: "w-4 h-4", value: "text-xl sm:text-2xl", label: "text-[11px] sm:text-xs", gap: "pt-10 sm:pt-11" },
    md: { card: "px-4 pb-4 sm:px-5 sm:pb-5", tile: "w-8 h-8 sm:w-9 sm:h-9", icon: "w-4 h-4 sm:w-[18px] sm:h-[18px]", value: "text-2xl sm:text-[2rem]", label: "text-xs sm:text-[13px]", gap: "pt-10 sm:pt-12" },
    lg: { card: "px-6 pb-6 sm:px-7 sm:pb-7", tile: "w-10 h-10 sm:w-11 sm:h-11", icon: "w-5 h-5", value: "text-5xl sm:text-6xl", label: "text-sm sm:text-base", gap: "pt-16 sm:pt-24" },
  }[size];

  return (
    <dl className={`grid ${className}`}>
      {items.map((item, i) => {
        const tone = toneAt(i);
        return (
          <div
            key={item.label}
            {...(reveal ? { "data-reveal": true, style: { "--d": `${i * 0.08}s` } as CSSProperties } : {})}
            className={`relative flex flex-col-reverse rounded-2xl ${tone.bg} ${s.card} ${s.gap}`}
          >
            <dt className={`mt-1.5 ${s.label} text-slate-600 leading-tight`}>{item.label}</dt>
            <dd className={`${s.value} tracking-[-0.03em] leading-none text-slate-900 tabular-nums`}>
              <span
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 grid place-items-center ${s.tile} rounded-lg bg-white/80 ${tone.ink}`}
                aria-hidden="true"
              >
                <Icon d={item.icon} className={s.icon} />
              </span>
              <StatValue value={item.value} />
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
