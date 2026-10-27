import { socialLinks } from "@/data/navigation";

type Social = (typeof socialLinks)[number];

/** A social profile's glyph in white on its own brand colour */
export function SocialBadge({ s, className = "w-6 h-6", glyph = "w-3.5 h-3.5" }: { s: Social; className?: string; glyph?: string }) {
  return (
    <span className={`grid place-items-center shrink-0 rounded-full text-white ${s.brand} ${className}`} aria-hidden="true">
      <svg className={glyph} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d={s.icon} />
      </svg>
    </span>
  );
}

export default function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const ring = tone === "dark" ? "ring-white/25" : "ring-white";
  return (
    <ul className={`flex items-center gap-2.5 ${className}`} aria-label="Studwise on social media">
      {socialLinks.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Studwise on ${s.label}`}
            className={`grid place-items-center w-10 h-10 rounded-full ring-2 ${ring} shadow-[0_8px_18px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105`}
          >
            <SocialBadge s={s} className="w-full h-full" glyph="w-[18px] h-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
