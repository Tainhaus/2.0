// src/components/ui/logo.tsx
import Link from "next/link";
import Image from "next/image";
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

  return (
    <Link href="/" className={cn("inline-flex items-center group", className)}>
      <Image
        src="/tainhaus-logo.png"
        alt="Tainhaus â€” Log Cabins & Garden Rooms"
        width={s.width}
        height={s.height}
        className={cn(
          "object-contain transition-all duration-300",
          variant === "light" ? "brightness-0 invert" : "brightness-0"
        )}
        priority
      />
    </Link>
  );
}
