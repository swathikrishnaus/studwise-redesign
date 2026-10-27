import type { ReactNode } from "react";

function Doodle({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Mortarboard with a hanging tassel */
export const Cap = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <path d="M32 12 60 24 32 36 4 24 32 12Z" />
    <path d="M15 29v10c0 4 7.6 8 17 8s17-4 17-8V29" />
    <circle cx="32" cy="24" r="1.6" fill="currentColor" />
    <path d="M32 24 52 29v13" />
    <path d="M50 42h4l-.6 7h-2.8L50 42Z" />
  </Doodle>
);

/** Desk globe on its stand */
export const Globe = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <circle cx="32" cy="26" r="17" />
    <ellipse cx="32" cy="26" rx="7.5" ry="17" />
    <path d="M15 26h34M18 17h28M18 35h28" />
    <path d="M10.5 23.5A22 22 0 0 0 49 41" />
    <path d="M32 48v6M24 56h16" />
  </Doodle>
);

/** A small stack of books */
export const Books = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <g transform="rotate(-10 32 36)">
      <rect x="8" y="42" width="48" height="10" rx="2" />
      <rect x="12" y="32" width="42" height="10" rx="2" />
      <rect x="6" y="22" width="44" height="10" rx="2" />
      <path d="M14 42v10M18 32v10M12 22v10M46 45h6M46 49h6M44 25h4M44 29h4" />
    </g>
  </Doodle>
);

/** Three little "idea" strokes */
export const Sparks = ({ className }: { className: string }) => (
  <Doodle className={className}>
    <path d="M40 8l-6 12M26 24l-14-6M28 36l-16 3" strokeWidth={2} />
  </Doodle>
);
