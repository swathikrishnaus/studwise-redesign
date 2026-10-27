import { useId } from "react";

type Circle = [cx: number, cy: number, r: number];

export type CloudShape = {
  w: number;
  h: number;
  /** Main billows (shaded white) */
  puffs: Circle[];
  /** Soft, pale billows behind the main ones */
  back?: Circle[];
  /** Wide flat base the billows sit on: [cx, cy, rx, ry] */
  base?: [number, number, number, number];
};

/** A long bank of cloud, for the foot of a scene */
export const CLOUD_BANK: CloudShape = {
  w: 1200,
  h: 600,
  back: [[300, 400, 130], [560, 370, 150], [830, 390, 140], [1050, 420, 110]],
  base: [600, 560, 580, 110],
  puffs: [
    [120, 490, 70], [215, 455, 92], [330, 470, 78], [430, 430, 110], [545, 470, 82],
    [660, 440, 100], [780, 480, 76], [880, 450, 94], [1000, 485, 74], [1090, 505, 60],
    [300, 380, 52], [480, 335, 60], [700, 350, 56], [905, 375, 48],
  ],
};

/** A small low cloud, for a corner */
export const CLOUD_PUFF: CloudShape = {
  w: 600,
  h: 300,
  back: [[200, 200, 80], [360, 215, 70], [470, 235, 50]],
  base: [300, 268, 290, 38],
  puffs: [[80, 248, 42], [160, 228, 58], [250, 214, 66], [340, 230, 52], [420, 244, 44], [500, 256, 32], [210, 186, 34]],
};

/** A tall drift of cloud, rising up one side of a scene */
export const CLOUD_TOWER: CloudShape = {
  w: 400,
  h: 700,
  back: [[230, 420, 140], [260, 250, 110]],
  base: [220, 670, 200, 60],
  puffs: [
    [210, 620, 130], [110, 560, 92], [300, 520, 104], [190, 450, 88], [320, 380, 78],
    [230, 320, 66], [330, 250, 58], [270, 190, 44],
  ],
};

export default function SoftCloud({
  shape,
  seed = 7,
  className = "",
}: {
  shape: CloudShape;
  seed?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const { w, h, puffs, back, base } = shape;
  // Displacement scales with the cloud's size so small clouds stay crisp
  const k = w / 1200;

  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" overflow="visible">
      <defs>
        <radialGradient id={`${id}-puff`} cx="42%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fbfdff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e6f0fa" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <filter id={`${id}-billow`} x="-15%" y="-40%" width="130%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency={`${0.009 / k} ${0.018 / k}`} numOctaves={5} seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={70 * k} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation={9 * k} />
        </filter>
        <filter id={`${id}-back`} x="-15%" y="-40%" width="130%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency={0.01 / k} numOctaves={4} seed={seed + 3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={60 * k} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation={18 * k} />
        </filter>
      </defs>
      {back && (
        <g filter={`url(#${id}-back)`} fill="#ffffff" opacity={0.45}>
          {back.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      )}
      <g filter={`url(#${id}-billow)`}>
        {base && <ellipse cx={base[0]} cy={base[1]} rx={base[2]} ry={base[3]} fill={`url(#${id}-base)`} />}
        {puffs.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#${id}-puff)`} />
        ))}
      </g>
    </svg>
  );
}
