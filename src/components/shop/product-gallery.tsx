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
    "Oak":        "/products/oriental-4-4-7x3-2m-log-cabin-oak.png",
    "Black":      "/products/oriental-4-4-7x3-2m-log-cabin-black.png",
    "Stone Grey": "/products/oriental-4-4-7x3-2m-log-cabin-stone-grey.png",
    "Birch":      "/products/oriental-4-4-7x3-2m-log-cabin-birch.png",
  },
  "gloria-h-4-5x2-9m-log-cabin": {
    "Oak":        "/products/gloria-h-4-5x2-9m-log-cabin-oak.png",
    "Birch":      "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
    "Stone Grey": "/products/gloria-h-4-5x2-9m-log-cabin-stone-grey.png",
    "Black":      "/products/gloria-h-4-5x2-9m-log-cabin-black.png",
  },
  "dover-combi-6m-x-4m": {
    "Oak":        "/products/dover-combi-6m-x-4m-oak.png",
    "Birch":      "/products/dover-combi-6m-x-4m-birch.png",
    "Stone Grey": "/products/dover-combi-6m-x-4m-stone-grey.png",
    "Black":      "/products/dover-combi-6m-x-4m-black.png",
  },
  "derby-4-5m-x-3m": {
    "Oak":        "/products/derby-4-5m-x-3m-oak.png",
    "Birch":      "/products/derby-4-5m-x-3m-birch.png",
    "Stone Grey": "/products/derby-4-5m-x-3m-stone-grey.png",
    "Black":      "/products/derby-4-5m-x-3m-black.png",
  },
  "monaco-2-bed-log-cabin": {
    "Oak":        "/products/monaco-2-bed-log-cabin-oak.png",
    "Birch":      "/products/monaco-2-bed-log-cabin-birch.png",
    "Stone Grey": "/products/monaco-2-bed-log-cabin-stone-grey.png",
    "Black":      "/products/monaco-2-bed-log-cabin-black.png",
  },
  "outdoor-kitchen-pod-garden-bar-3-0x2-6m": {
    "Oak":        "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-oak.png",
    "Birch":      "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-birch.png",
    "Stone Grey": "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-stone-grey.png",
    "Black":      "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-black.png",
  },
};

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  productSlug?: string;
}

export function ProductGallery({ images, productName, productSlug }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [finishOverride, setFinishOverride] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const { selectedFinishName } = useFinish();

  useEffect(() => {
    if (!productSlug) return;
    const map = FINISH_IMAGES[productSlug];
    if (!map) return;
    const newImage = selectedFinishName ? map[selectedFinishName] ?? null : null;
    if (newImage !== finishOverride) {
      setIsTransitioning(true);
      setTimeout(() => {
        setFinishOverride(newImage);
        setIsTransitioning(false);
        // Show mobile floating preview when a finish is selected
        if (newImage) setShowMobilePreview(true);
      }, 200);
    }
  }, [selectedFinishName, productSlug, finishOverride]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsLightboxOpen(false); setShowMobilePreview(false); }
      if (e.key === "ArrowLeft") setLightboxIndex(p => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setLightboxIndex(p => Math.min(images.length - 1, p + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  if (!images.length) return null;

  const activeImage = images[activeIndex];
  const displaySrc  = finishOverride ?? activeImage.url;
  const displayAlt  = finishOverride ? `${productName} — ${selectedFinishName} cladding` : activeImage.alt;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const prev = () => setActiveIndex((p) => (p - 1 + images.length) % images.length);
  const next = () => setActiveIndex((p) => (p + 1) % images.length);

  return (
    <div className="space-y-3">

      {/* ── Mobile floating preview — shows when a colour is selected ── */}
      {showMobilePreview && finishOverride && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-200 shadow-luxury-xl"
          style={{paddingBottom: "env(safe-area-inset-bottom)"}}
        >
          <div className="flex items-center gap-3 p-3">
            {/* Thumbnail */}
            <div className="w-24 h-20 rounded-xl overflow-hidden bg-sand-100 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={finishOverride}
                alt={displayAlt}
                className={cn(
                  "w-full h-full object-contain transition-opacity duration-200",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}
              />
            </div>
            {/* Label */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-charcoal-500 uppercase tracking-widest mb-0.5">Selected cladding</p>
              <p className="font-display text-base font-bold text-charcoal-900">{selectedFinishName}</p>
              <p className="font-body text-xs text-charcoal-500 truncate">{productName}</p>
            </div>
            {/* Expand button */}
            <button
              onClick={() => openLightbox(activeIndex)}
              className="shrink-0 w-10 h-10 bg-sand-100 rounded-xl flex items-center justify-center"
              aria-label="View full image"
            >
              <ZoomIn className="w-4 h-4 text-charcoal-600" />
            </button>
            {/* Close button */}
            <button
              onClick={() => setShowMobilePreview(false)}
              className="shrink-0 w-10 h-10 bg-sand-100 rounded-xl flex items-center justify-center"
              aria-label="Close preview"
            >
              <X className="w-4 h-4 text-charcoal-600" />
            </button>
          </div>
        </div>
      )}

      {/* ── Main image ── */}
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-200 group cursor-zoom-in"
        onClick={() => openLightbox(activeIndex)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displaySrc}
          alt={displayAlt}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            finishOverride ? "object-contain" : "object-cover",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Finish badge */}
        {finishOverride && (
          <div className="absolute top-3 left-3 bg-charcoal-900/70 backdrop-blur-sm text-white text-xs font-body font-medium px-3 py-1.5 rounded-full pointer-events-none">
            {selectedFinishName} cladding
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="w-4 h-4 text-charcoal-700" />
        </div>

        {/* Nav arrows */}
        {!finishOverride && images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-charcoal-700" />
            </button>
          </>
        )}

        {/* Counter */}
        {!finishOverride && images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-body px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => { setActiveIndex(i); setFinishOverride(null); setShowMobilePreview(false); }}
              className={cn(
                "relative shrink-0 w-16 h-14 rounded-lg overflow-hidden transition-all duration-200 bg-sand-100",
                i === activeIndex && !finishOverride
                  ? "ring-2 ring-forest-800 ring-offset-1"
                  : "opacity-60 hover:opacity-100"
              )}
              title="View product photo"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
          {/* Active cladding thumbnail */}
          {finishOverride && (
            <div className="relative shrink-0 w-16 h-14 rounded-lg overflow-hidden ring-2 ring-terracotta-500 ring-offset-1 bg-sand-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={finishOverride} alt={`${selectedFinishName} cladding`} className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      )}

      {/* ── Lightbox ── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={finishOverride ?? images[lightboxIndex]?.url}
              alt={finishOverride ? `${productName} — ${selectedFinishName}` : images[lightboxIndex]?.alt}
              className="w-full max-h-[85vh] object-contain"
            />
          </div>
          {!finishOverride && images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(p => Math.max(0, p - 1)); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                disabled={lightboxIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(p => Math.min(images.length - 1, p + 1)); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                disabled={lightboxIndex === images.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          {!finishOverride && images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-body px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
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
