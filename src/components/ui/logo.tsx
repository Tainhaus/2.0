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
    sm: { width: 100, height: 40 },
    md: { width: 130, height: 52 },
    lg: { width: 160, height: 64 },
  };

  const s = sizes[size];

  // Light variant (on dark backgrounds like hero/footer) â€” use white logo
  // Dark variant (on light backgrounds like scrolled navbar) â€” use dark logo with mix-blend-mode
  return (
    <Link href="/" className={cn("inline-flex items-center group", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "light" ? "/tainhaus-logo-dark.png" : "/tainhaus-logo.png"}
        alt="Tainhaus"
        width={s.width}
        height={s.height}
        style={{
          width: s.width,
          height: s.height,
          objectFit: "contain",
          // For dark variant: multiply blend removes the grey background
          mixBlendMode: variant === "dark" ? "multiply" : "screen",
        }}
      />
    </Link>
  );
}
