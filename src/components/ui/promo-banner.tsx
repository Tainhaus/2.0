// src/components/ui/promo-banner.tsx
"use client";

import Link from "next/link";
import { Gift, X } from "lucide-react";
import { useState } from "react";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[998] bg-[#0A3D2A] border-t-2 border-[#C26B4A]"
      style={{ marginBottom: "0" }}
    >
      <div className="container-site py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Gift className="w-5 h-5 text-[#C26B4A] flex-shrink-0" />
          <p className="font-body text-sm text-white font-medium truncate">
            <span className="text-[#C26B4A] font-bold">Limited time:</span> Free exterior cladding with every cabin purchased
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-[#C26B4A] hover:bg-[#A85A3A] text-white font-body font-semibold text-xs px-4 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Enquire Now
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
