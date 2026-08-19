// src/components/shop/product-gallery.tsx
"use client";

import { useState } from "react";
import { ZoomIn, X } from "lucide-react";
import { useFinish } from "@/lib/finish-context";
import type { ProductImage } from "@/types";

// Primary birch image for each product — shown always, colour selection is informational only
const PRIMARY_IMAGES: Record<string, string> = {
  "sicilia-6-7x3-8m-log-cabin":              "/products/sicilia-birch.png",
  "oriental-4-4-7x3-2m-log-cabin":           "/products/oriental-4-4-7x3-2m-log-cabin-birch.png",
  "gloria-h-4-5x2-9m-log-cabin":             "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
  "dover-combi-6m-x-4m":                     "/products/dover-combi-6m-x-4m-birch.png",
  "gloria-f-4-5x2-0m-log-cabin":             "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
  "derby-4-5m-x-3m":                         "/products/derby-4-5m-x-3m-birch.png",
  "monaco-2-bed-log-cabin":                  "/products/monaco-2-bed-log-cabin-birch.png",
  "outdoor-kitchen-pod-garden-bar-3-0x2-6m": "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-birch.png",
};

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  productSlug?: string;
}

export function ProductGallery({ images, productName, productSlug }: ProductGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { selectedFinishName } = useFinish();

  // Always show the primary birch image — colour selection is just a preference indicator
  const localSrc = productSlug ? PRIMARY_IMAGES[productSlug] : null;
  const dbSrc = (images as any[]).find((i) => i.isPrimary)?.url ?? (images as any[])[0]?.url;
  const displaySrc = localSrc ?? dbSrc ?? "";
  const displayAlt = productName;

  if (!displaySrc) return null;

  return (
    <div className="space-y-3">
      {/* Main image — single, always the primary birch render */}
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-200 group cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displaySrc}
          alt={displayAlt}
          className="w-full h-full object-cover"
        />

        {/* Selected colour badge — shows what colour customer has chosen */}
        {selectedFinishName && (
          <div className="absolute top-3 left-3 bg-charcoal-900/70 backdrop-blur-sm text-white text-xs font-body font-medium px-3 py-1.5 rounded-full pointer-events-none">
            Selected: {selectedFinishName}
          </div>
        )}

        <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="w-4 h-4 text-charcoal-700" />
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displaySrc}
              alt={displayAlt}
              className="w-full max-h-[85vh] object-contain"
            />
          </div>
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
