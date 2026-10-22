import { socialLinks } from "@/data/navigation";

/* --------------------------------------------------------------------------
   SocialLinks — round icon links to Studwise's social profiles
   -------------------------------------------------------------------------- */
export default function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const style =
    tone === "dark"
      ? "bg-white/[0.08] text-white ring-white/15 hover:bg-white hover:text-[#0b2a45]"
      : "bg-white text-[#0a7fb3] ring-slate-200 hover:bg-[#009cd9] hover:text-white hover:ring-[#009cd9]";
  return (
    <ul className={`flex items-center gap-2.5 ${className}`} aria-label="Studwise on social media">
      {socialLinks.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Studwise on ${s.label}`}
            className={`grid place-items-center w-10 h-10 rounded-full ring-1 transition-all duration-300 hover:-translate-y-0.5 ${style}`}
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={s.icon} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
