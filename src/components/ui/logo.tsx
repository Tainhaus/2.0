// src/components/ui/logo.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", className, size = "md" }: LogoProps) {
  const sizes = {
    sm:  { width: 280, height: 112 },
    md:  { width: 308, height: 123 },
    lg:  { width: 364, height: 146 },
  };

  const s = sizes[size];

  return (
    <Link href="/" className={cn("inline-flex items-center group", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tainhaus-logo-dark.png"
        alt="Tainhaus"
        width={s.width}
        height={s.height}
        style={{
          width: s.width,
          height: s.height,
          objectFit: "contain",
          // light = white (on dark hero bg)
          // dark = pure black (on light scrolled navbar)
          filter: variant === "light"
            ? "brightness(0) invert(1)"
            : "brightness(0)",
        }}
      />
    </Link>
  );
}
