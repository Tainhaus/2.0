// src/components/ui/logo.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", className, size = "md" }: LogoProps) {
  const forestColor = variant === "light" ? "#fff" : "#0A3D2A";
  const accentColor = "#C26B4A";
  const textColor = variant === "light" ? "#fff" : "#0A3D2A";

  const sizes = {
    sm: { width: 120, height: 28, glyph: 16, text: 12, tx: 26 },
    md: { width: 160, height: 36, glyph: 22, text: 16, tx: 34 },
    lg: { width: 200, height: 44, glyph: 28, text: 20, tx: 44 },
  };

  const s = sizes[size];

  return (
    <Link href="/" className={cn("inline-flex items-center group", className)}>
      <svg
        width={s.width}
        height={s.height}
        viewBox={`0 0 ${s.width} ${s.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Tainhaus"
      >
        {/* ── Glyph: architectural house mark ── */}
        <g transform={`translate(2, ${(s.height - s.glyph * 1.4) / 2})`}>
          {/* Roof peak */}
          <path
            d={`M0 ${s.glyph * 0.6} L${s.glyph * 0.5} 0 L${s.glyph} ${s.glyph * 0.6}`}
            stroke={forestColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Walls */}
          <rect
            x={s.glyph * 0.08}
            y={s.glyph * 0.6}
            width={s.glyph * 0.84}
            height={s.glyph * 0.8}
            stroke={forestColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Door */}
          <rect
            x={s.glyph * 0.34}
            y={s.glyph * 0.95}
            width={s.glyph * 0.32}
            height={s.glyph * 0.45}
            stroke={forestColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Terracotta accent line under roofline */}
          <line
            x1={s.glyph * 0.08}
            y1={s.glyph * 0.6}
            x2={s.glyph * 0.92}
            y2={s.glyph * 0.6}
            stroke={accentColor}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>

        {/* ── Wordmark ── */}
        <text
          x={s.tx}
          y={s.height / 2 + s.text * 0.38}
          fontFamily="Georgia, 'Playfair Display', serif"
          fontSize={s.text}
          fontWeight="400"
          letterSpacing={s.text * 0.18}
          fill={textColor}
          style={{ transition: "fill 0.3s ease" }}
        >
          TAINHAUS
        </text>
      </svg>
    </Link>
  );
}
