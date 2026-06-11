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
    sm:  { width: 120, height: 48  },
    md:  { width: 210, height: 84  }, // navbar — 40% bigger
    lg:  { width: 260, height: 104 }, // footer — 30% bigger
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
        }}
      />
    </Link>
  );
}
