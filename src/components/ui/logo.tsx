// src/components/ui/logo.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ variant = "dark", className, size = "md" }: LogoProps) {
  const sizes = {
    sm:  { width: 110, height: 44  },
    md:  { width: 195, height: 78  }, // navbar â€” +30%
    lg:  { width: 240, height: 96  }, // footer â€” +20% on top of previous lg
    xl:  { width: 260, height: 104 },
  };

  const s = sizes[size];

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
          mixBlendMode: variant === "dark" ? "multiply" : "screen",
        }}
      />
    </Link>
  );
}
