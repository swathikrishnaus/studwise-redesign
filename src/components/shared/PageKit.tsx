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
  cardClassName = "",
}: {
  items: Stat[];
  size?: "sm" | "md" | "lg" | "row";
  /** Grid columns and gaps for the list */
  className?: string;
  /** Stagger the cards in with the page's scroll reveal */
  reveal?: boolean;
  /** Extra classes for each card (e.g. an outline on a tinted panel) */
  cardClassName?: string;
}) {
  const s = {
    sm: { card: "px-3.5 pb-3.5 sm:px-4 sm:pb-4", tile: "w-7 h-7", icon: "w-4 h-4", value: "text-[1.75rem] sm:text-[2.1rem]", label: "text-[11px] sm:text-xs", gap: "pt-10 sm:pt-12" },
    md: { card: "px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6", tile: "w-8 h-8 sm:w-9 sm:h-9", icon: "w-4 h-4 sm:w-[18px] sm:h-[18px]", value: "text-[2.4rem] sm:text-5xl lg:text-[3.5rem]", label: "text-xs sm:text-sm", gap: "pt-12 sm:pt-16" },
    // Compact row for pinned scenes, which must fit short screens
    row: { card: "px-3 pb-3 sm:px-5 sm:pb-5", tile: "w-7 h-7 sm:w-8 sm:h-8", icon: "w-4 h-4", value: "text-[1.3rem] sm:text-4xl lg:text-[min(2.6rem,5.2vh)]", label: "text-[11px] sm:text-[13px]", gap: "pt-10 sm:pt-12 lg:pt-[min(3.5rem,6vh)]" },
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
            className={`relative flex flex-col-reverse rounded-2xl ${tone.bg} ${s.card} ${s.gap} ${cardClassName}`}
          >
            <dt className={`mt-2 ${s.label} text-slate-600 leading-tight`}>{item.label}</dt>
            <dd className={`${s.value} tracking-[-0.03em] leading-none text-slate-900 tabular-nums whitespace-nowrap`}>
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
