import Image from "next/image";
import type { ReactNode } from "react";
import type { ServiceArtKey } from "@/data/services";

/* --------------------------------------------------------------------------
   ServiceArt — illustrated scene for each service card
   --------------------------------------------------------------------------
   Flat vector illustrations in the brand palette, layered over a soft sky
   gradient with the site's 3D clouds. `.svc-art` is the layer that zooms
   on hover; the whole scene is parallaxed by ServicesSection.
   -------------------------------------------------------------------------- */
const C = {
  white: "#ffffff",
  sky1: "#e0f2fe",
  sky2: "#bae6fd",
  sky3: "#7dd3fc",
  brand: "#009cd9",
  deep: "#0a6c99",
  ink: "#0b4a6b",
  amber: "#f59e0b",
  amberSoft: "#fde68a",
};

const shadow = (cx = 200, cy = 244, rx = 130) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={10} fill={C.deep} opacity={0.12} />
);

const STAR = "0,-11 3.2,-3.5 11,-3.4 4.8,1.6 6.8,9.3 0,4.8 -6.8,9.3 -4.8,1.6 -11,-3.4 -3.2,-3.5";

const scenes: Record<ServiceArtKey, { bg: string; art: ReactNode; clouds: "top" | "bottom" | "both" }> = {
  /* 01 — University building with a floating graduation cap */
  university: {
    bg: "linear-gradient(160deg, #e6f6fd 0%, #a9ddf4 100%)",
    clouds: "bottom",
    art: (
      <>
        {shadow(200, 236, 128)}
        <rect x={96} y={214} width={208} height={16} rx={4} fill={C.white} />
        <rect x={108} y={202} width={184} height={14} rx={3} fill={C.sky1} />
        {[122, 156, 190, 224, 258].map((x) => (
          <g key={x}>
            <rect x={x} y={126} width={20} height={78} rx={3} fill={C.white} />
            <rect x={x + 13} y={126} width={7} height={78} fill={C.sky2} />
          </g>
        ))}
        <rect x={104} y={112} width={192} height={16} rx={3} fill={C.white} />
        <polygon points="96,114 200,58 304,114" fill={C.white} />
        <polygon points="200,58 304,114 200,114" fill={C.sky1} />
        <circle cx={200} cy={94} r={11} fill={C.brand} />
        <g transform="translate(272 26) rotate(-12)">
          <polygon points="0,14 44,0 88,14 44,28" fill={C.ink} />
          <path d="M22 21 v14 c0 9 44 9 44 0 v-14 l-22 7z" fill={C.deep} />
          <path d="M44 14 L74 22 V40" stroke={C.amber} strokeWidth={3} fill="none" strokeLinecap="round" />
          <circle cx={74} cy={43} r={4.5} fill={C.amber} />
        </g>
      </>
    ),
  },

  /* 02 — Certificate with a gold seal and a stack of coins */
  scholarship: {
    bg: "linear-gradient(160deg, #fff8e8 0%, #fcdf9c 100%)",
    clouds: "top",
    art: (
      <>
        {shadow(200, 244, 120)}
        <g transform="rotate(-4 200 150)">
          <rect x={112} y={68} width={176} height={132} rx={10} fill={C.white} />
          <rect x={122} y={78} width={156} height={112} rx={6} fill="none" stroke={C.amberSoft} strokeWidth={2} />
          <rect x={150} y={96} width={100} height={8} rx={4} fill={C.amber} opacity={0.85} />
          <rect x={142} y={116} width={116} height={5} rx={2.5} fill={C.amberSoft} />
          <rect x={152} y={128} width={96} height={5} rx={2.5} fill={C.amberSoft} />
          <rect x={146} y={140} width={108} height={5} rx={2.5} fill={C.amberSoft} />
          <path d="M146 172 c10 -12 18 8 28 -2 s14 6 22 -4" stroke={C.deep} strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(264 188)">
          <polygon points="-14,10 -24,46 -11,38 -3,50 4,14" fill={C.brand} />
          <polygon points="14,10 24,46 11,38 3,50 -4,14" fill={C.deep} />
          <circle r={26} fill={C.amber} />
          <circle r={19} fill="none" stroke={C.white} strokeWidth={2} strokeDasharray="3 3" />
          <polygon points={STAR} fill={C.white} />
        </g>
        <g transform="translate(112 196)">
          {[24, 10, -4].map((y, i) => (
            <g key={y}>
              <ellipse cx={0} cy={y + 12} rx={24} ry={7} fill="#d97706" />
              <rect x={-24} y={y} width={48} height={12} fill={C.amber} />
              <ellipse cx={0} cy={y} rx={24} ry={7} fill={i === 2 ? "#fcd34d" : "#fbbf24"} />
            </g>
          ))}
        </g>
      </>
    ),
  },

  /* 03 — Passport with visa stamps */
  visa: {
    bg: "linear-gradient(160deg, #4cc6f3 0%, #009cd9 100%)",
    clouds: "bottom",
    art: (
      <>
        {shadow(200, 248, 110)}
        <g transform="translate(118 84)">
          <circle r={24} fill="none" stroke={C.white} strokeWidth={2.5} strokeDasharray="4 4" opacity={0.85} />
          <text y={5} textAnchor="middle" fontSize={13} letterSpacing={2} fill={C.white}>VISA</text>
        </g>
        <g transform="rotate(-8 200 150)">
          <rect x={138} y={56} width={124} height={176} rx={14} fill={C.white} />
          <rect x={138} y={56} width={14} height={176} rx={7} fill={C.sky1} />
          <circle cx={207} cy={118} r={30} fill="none" stroke={C.brand} strokeWidth={3} />
          <ellipse cx={207} cy={118} rx={13} ry={30} fill="none" stroke={C.brand} strokeWidth={2.5} />
          <line x1={177} y1={118} x2={237} y2={118} stroke={C.brand} strokeWidth={2.5} />
          <text x={207} y={180} textAnchor="middle" fontSize={12} letterSpacing={3} fill={C.deep}>PASSPORT</text>
          <rect x={172} y={194} width={70} height={5} rx={2.5} fill={C.sky2} />
        </g>
        <g transform="translate(270 196) rotate(14)">
          <rect x={-50} y={-21} width={100} height={42} rx={8} fill={C.white} opacity={0.92} />
          <rect x={-50} y={-21} width={100} height={42} rx={8} fill="none" stroke={C.amber} strokeWidth={3} />
          <text y={5} textAnchor="middle" fontSize={14} letterSpacing={1.5} fill={C.amber}>APPROVED</text>
        </g>
      </>
    ),
  },

  /* 04 — Test sheet, pencil and band-score badge */
  tests: {
    bg: "linear-gradient(160deg, #eaf6fd 0%, #b9def3 100%)",
    clouds: "top",
    art: (
      <>
        {shadow(196, 250, 116)}
        <g transform="rotate(-6 190 150)">
          <rect x={120} y={52} width={150} height={190} rx={10} fill={C.white} />
          <rect x={138} y={72} width={70} height={8} rx={4} fill={C.brand} />
          {[90, 70, 84, 60, 78].map((w, i) => {
            const y = 100 + i * 26;
            return (
              <g key={i}>
                <rect x={138} y={y} width={14} height={14} rx={3} fill="none" stroke={C.sky3} strokeWidth={2} />
                <rect x={162} y={y + 4} width={w} height={6} rx={3} fill={C.sky1} />
                {i !== 2 && i !== 4 && (
                  <path d={`M141 ${y + 7} l4 4 l7 -8`} stroke={C.brand} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </g>
            );
          })}
        </g>
        <g transform="translate(276 150) rotate(32)">
          <rect x={-8} y={-82} width={16} height={14} rx={3} fill="#fca5a5" />
          <rect x={-8} y={-70} width={16} height={100} rx={2} fill={C.amber} />
          <rect x={-8} y={-70} width={5} height={100} fill="#fbbf24" />
          <polygon points="-8,30 8,30 0,48" fill={C.amberSoft} />
          <polygon points="-3,40 3,40 0,48" fill={C.ink} />
        </g>
        <g transform="translate(104 86)">
          <circle r={34} fill={C.brand} />
          <circle r={27} fill="none" stroke={C.white} strokeWidth={1.5} opacity={0.5} />
          <text y={7} textAnchor="middle" fontSize={22} fill={C.white}>8.0</text>
          <text y={21} textAnchor="middle" fontSize={7} letterSpacing={2} fill={C.sky1}>BAND</text>
        </g>
      </>
    ),
  },

  /* 05 — Runway into the clouds (the brand airplane is layered on top) */
  landing: {
    bg: "linear-gradient(180deg, #a9ddf4 0%, #e9f7fe 100%)",
    clouds: "both",
    art: (
      <>
        <polygon points="128,300 272,300 218,172 182,172" fill={C.white} opacity={0.75} />
        <line x1={200} y1={180} x2={200} y2={300} stroke={C.brand} strokeWidth={3} strokeDasharray="12 10" />
        <g transform="translate(200 150)">
          <path d="M0 -24 C-13 -24 -21 -14 -21 -3 C-21 12 0 28 0 28 C0 28 21 12 21 -3 C21 -14 13 -24 0 -24Z" fill={C.amber} />
          <circle cy={-3} r={7} fill={C.white} />
        </g>
      </>
    ),
  },

  /* 06 — House, key and location pin */
  accommodation: {
    bg: "linear-gradient(160deg, #e9f8fd 0%, #b4e2f5 100%)",
    clouds: "top",
    art: (
      <>
        {shadow(200, 232, 120)}
        <rect x={242} y={78} width={16} height={34} rx={2} fill={C.deep} />
        <rect x={128} y={130} width={144} height={96} rx={6} fill={C.white} />
        <rect x={232} y={130} width={40} height={96} fill={C.sky1} />
        <polygon points="112,138 200,66 288,138" fill={C.brand} />
        <polygon points="200,66 288,138 200,138" fill={C.deep} opacity={0.35} />
        <rect x={184} y={170} width={32} height={56} rx={4} fill={C.sky2} />
        <circle cx={209} cy={200} r={2.5} fill={C.deep} />
        <rect x={144} y={152} width={28} height={26} rx={3} fill={C.sky1} stroke={C.sky3} strokeWidth={2} />
        <rect x={232} y={152} width={26} height={26} rx={3} fill={C.white} stroke={C.sky3} strokeWidth={2} />
        <g transform="translate(300 212) rotate(-28)">
          <circle r={13} fill="none" stroke={C.amber} strokeWidth={6} />
          <rect x={12} y={-3} width={42} height={6} rx={3} fill={C.amber} />
          <rect x={42} y={2} width={6} height={11} rx={1} fill={C.amber} />
          <rect x={31} y={2} width={5} height={8} rx={1} fill={C.amber} />
        </g>
        <g transform="translate(110 76)">
          <path d="M0 -26 C-15 -26 -24 -15 -24 -3 C-24 14 0 32 0 32 C0 32 24 14 24 -3 C24 -15 15 -26 0 -26Z" fill={C.amber} />
          <circle cy={-3} r={8} fill={C.white} />
        </g>
      </>
    ),
  },
};

export default function ServiceArt({ art }: { art: ServiceArtKey }) {
  const scene = scenes[art];
  return (
    <div className="absolute inset-0" style={{ background: scene.bg }} aria-hidden="true">
      {(scene.clouds === "top" || scene.clouds === "both") && (
        <Image
          src="/images/cloud.png"
          alt=""
          width={340}
          height={181}
          className="absolute -top-6 -right-10 w-[46%] h-auto opacity-90 animate-[cloud-float-slow_10s_ease-in-out_infinite]"
        />
      )}
      {(scene.clouds === "bottom" || scene.clouds === "both") && (
        <Image
          src="/images/cloud.png"
          alt=""
          width={380}
          height={203}
          className="absolute -bottom-10 -left-10 w-[52%] h-auto opacity-95 animate-[cloud-float-reverse_12s_ease-in-out_infinite]"
        />
      )}

      <div className="svc-art absolute inset-0">
        <svg viewBox="0 0 400 300" className="absolute inset-0 m-auto w-[80%] h-[80%]">
          {scene.art}
        </svg>
        {art === "landing" && (
          <Image
            src="/images/airplane.png"
            alt=""
            width={410}
            height={207}
            className="absolute right-[8%] top-[10%] w-[44%] h-auto drop-shadow-[0_18px_30px_rgba(0,60,110,0.3)] animate-[plane-hover-float_6s_ease-in-out_infinite]"
          />
        )}
      </div>
    </div>
  );
}
