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
    sm:  { width: 200, height: 80  },
    md:  { width: 220, height: 88  },
    lg:  { width: 260, height: 104 },
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
          // light variant (on dark/hero bg) = white logo via invert
          // dark variant (on light/scrolled bg) = dark logo as-is
          filter: variant === "light" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </Link>
  );
}
