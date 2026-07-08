// src/components/shop/product-gallery.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFinish } from "@/lib/finish-context";
import type { ProductImage } from "@/types";

const FINISH_IMAGES: Record<string, Record<string, string>> = {
  "sicilia-6-7x3-8m-log-cabin": {
    "Birch":      "/products/sicilia-birch.png",
    "Black":      "/products/sicilia-black.png",
    "Oak":        "/products/sicilia-oak.png",
    "Stone Grey": "/products/sicilia-stone-grey.png",
  },
  "oriental-4-4-7x3-2m-log-cabin": {
    "Birch":      "/products/oriental-4-4-7x3-2m-log-cabin-birch.png",
    "Oak":        "/products/oriental-4-4-7x3-2m-log-cabin-oak.png",
    "Stone Grey": "/products/oriental-4-4-7x3-2m-log-cabin-stone-grey.png",
    "Black":      "/products/oriental-4-4-7x3-2m-log-cabin-black.png",
  },
  "gloria-h-4-5x2-9m-log-cabin": {
    "Birch":      "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
    "Oak":        "/products/gloria-h-4-5x2-9m-log-cabin-oak.png",
    "Stone Grey": "/products/gloria-h-4-5x2-9m-log-cabin-stone-grey.png",
    "Black":      "/products/gloria-h-4-5x2-9m-log-cabin-black.png",
  },
  "dover-combi-6m-x-4m": {
    "Birch":      "/products/dover-combi-6m-x-4m-birch.png",
    "Oak":        "/products/dover-combi-6m-x-4m-oak.png",
    "Stone Grey": "/products/dover-combi-6m-x-4m-stone-grey.png",
    "Black":      "/products/dover-combi-6m-x-4m-black.png",
  },
  "gloria-f-4-5x2-0m-log-cabin": {
    "Birch":      "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
    "Oak":        "/products/gloria-h-4-5x2-9m-log-cabin-oak.png",
    "Stone Grey": "/products/gloria-h-4-5x2-9m-log-cabin-stone-grey.png",
    "Black":      "/products/gloria-h-4-5x2-9m-log-cabin-black.png",
  },
  "derby-4-5m-x-3m": {
    "Birch":      "/products/derby-4-5m-x-3m-birch.png",
    "Oak":        "/products/derby-4-5m-x-3m-oak.png",
    "Stone Grey": "/products/derby-4-5m-x-3m-stone-grey.png",
    "Black":      "/products/derby-4-5m-x-3m-black.png",
  },
  "monaco-2-bed-log-cabin": {
    "Birch":      "/products/monaco-2-bed-log-cabin-birch.png",
    "Oak":        "/products/monaco-2-bed-log-cabin-oak.png",
    "Stone Grey": "/products/monaco-2-bed-log-cabin-stone-grey.png",
    "Black":      "/products/monaco-2-bed-log-cabin-black.png",
  },
  "outdoor-kitchen-pod-garden-bar-3-0x2-6m": {
    "Birch":      "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-birch.png",
    "Oak":        "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-oak.png",
    "Stone Grey": "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-stone-grey.png",
    "Black":      "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-black.png",
  },
};

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
  const [colourOverride, setColourOverride] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { selectedFinishName } = useFinish();

  // Update image when colour is selected
  useEffect(() => {
    if (!productSlug) return;
    const map = FINISH_IMAGES[productSlug];
    if (!map) return;
    const newImage = selectedFinishName ? (map[selectedFinishName] ?? null) : null;
    if (newImage !== colourOverride) {
      setIsTransitioning(true);
      setTimeout(() => {
        setColourOverride(newImage);
        setIsTransitioning(false);
      }, 200);
    }
  }, [selectedFinishName, productSlug, colourOverride]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Pick the best image to show
  const localPrimary = productSlug ? PRIMARY_IMAGES[productSlug] : null;
  const dbPrimary = (images as any[]).find((i) => i.isPrimary)?.url ?? (images as any[])[0]?.url;
  const baseSrc = localPrimary ?? dbPrimary ?? "";

  const displaySrc = colourOverride ?? baseSrc;
  const displayAlt = colourOverride
    ? `${productName} — ${selectedFinishName}`
    : productName;

  if (!displaySrc) return null;

  return (
    <div className="space-y-3">
      {/* Main image — single image, no thumbnails */}
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-200 group cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displaySrc}
          alt={displayAlt}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            colourOverride ? "object-contain" : "object-cover",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        />

        {colourOverride && (
          <div className="absolute top-3 left-3 bg-charcoal-900/70 backdrop-blur-sm text-white text-xs font-body font-medium px-3 py-1.5 rounded-full pointer-events-none">
            {selectedFinishName}
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
