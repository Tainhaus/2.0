// src/app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-sand-100/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-sand-300" />
          <div className="absolute inset-0 rounded-full border-2 border-forest-800 border-t-transparent animate-spin" />
        </div>
        <Image
          src="/tainhaus-logo.png"
          alt="Tainhaus"
          width={120}
          height={48}
          className="object-contain brightness-0 opacity-60"
        />
      </div>
    </div>
  );
}
