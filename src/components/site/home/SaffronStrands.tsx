import type { CSSProperties } from "react";

/**
 * Decorative saffron-thread motif for the hero.
 *
 * Saffron is sold as thin, curled crimson-gold filaments ("رشته/رگه زعفران"), so
 * each strand here is a long tapered curve that ends in a brighter trumpet tip.
 * The whole layer is purely ornamental: it is aria-hidden and ignores pointer
 * events so it never interferes with the hero's links.
 */
interface Strand {
  /** Curve in the 1200×800 viewBox. */
  d: string;
  /** Trumpet tip coordinate, where a strand gets slightly thicker. */
  tip: [number, number];
  width: number;
  opacity: number;
  /** Stagger so the strands shimmer out of phase. */
  delay: string;
}

const STRANDS: Strand[] = [
  { d: "M110 -40 C 210 150, 130 300, 255 445 S 375 645, 315 860", tip: [315, 860], width: 1.6, opacity: 0.55, delay: "0s" },
  { d: "M300 -50 C 355 110, 300 210, 360 330", tip: [360, 330], width: 1.2, opacity: 0.4, delay: "1.6s" },
  { d: "M1005 -60 C 925 140, 1035 285, 915 435 S 790 625, 875 875", tip: [875, 875], width: 1.6, opacity: 0.5, delay: "0.9s" },
  { d: "M700 850 C 745 690, 665 565, 730 435 S 795 300, 745 150", tip: [745, 150], width: 1.3, opacity: 0.42, delay: "2.3s" },
  { d: "M470 880 C 505 740, 455 660, 500 560", tip: [500, 560], width: 1.1, opacity: 0.35, delay: "1.2s" },
  { d: "M640 120 C 690 200, 655 260, 700 340", tip: [700, 340], width: 1.1, opacity: 0.3, delay: "2.8s" },
];

export default function SaffronStrands() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hs-saffron-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d67a" stopOpacity="0" />
          <stop offset="35%" stopColor="#e8b94a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c98f1f" stopOpacity="0.2" />
        </linearGradient>
        <filter id="hs-saffron-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft bloom behind the crisp filaments */}
      <g filter="url(#hs-saffron-glow)">
        {STRANDS.map((s, i) => (
          <path
            key={`glow-${i}`}
            d={s.d}
            fill="none"
            stroke="#e8b94a"
            strokeWidth={s.width * 3}
            strokeLinecap="round"
            opacity={s.opacity * 0.45}
          />
        ))}
      </g>

      {/* the strands themselves */}
      {STRANDS.map((s, i) => (
        <g
          key={`strand-${i}`}
          className="hs-strand"
          style={{ "--hs-delay": s.delay } as CSSProperties}
        >
          <path
            d={s.d}
            fill="none"
            stroke="url(#hs-saffron-stroke)"
            strokeWidth={s.width}
            strokeLinecap="round"
            opacity={s.opacity}
          />
          <circle cx={s.tip[0]} cy={s.tip[1]} r={s.width * 1.6} fill="#f2c94c" opacity={s.opacity} />
        </g>
      ))}
    </svg>
  );
}
