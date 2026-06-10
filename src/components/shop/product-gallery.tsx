// src/components/shop/product-gallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFinish } from "@/lib/finish-context";
import type { ProductImage } from "@/types";

// Map of slug + finish name â†’ local image path
const FINISH_IMAGES: Record<string, Record<string, string>> = {
  "sicilia-6-7x3-8m-log-cabin": {
    "Birch":       "/products/sicilia-birch.png",
    "Black":       "/products/sicilia-black.png",
    "Oak":         "/products/sicilia-oak.png",
    "Stone Grey":  "/products/sicilia-stone-grey.png",
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
  const [finishOverride, setFinishOverride] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { selectedFinishName } = useFinish();

  // When finish changes, smoothly transition the main image
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
      }, 250);
    }
  }, [selectedFinishName, productSlug, finishOverride]);

  if (!images.length) return null;

  const activeImage = images[activeIndex];
  // Use the finish override image if available, otherwise use the regular gallery image
  const displaySrc = finishOverride ?? activeImage.url;
  const displayAlt = finishOverride
    ? `${productName} â€” ${selectedFinishName} cladding`
    : activeImage.alt;

  const prev = () => setActiveIndex((p) => (p - 1 + images.length) % images.length);
  const next = () => setActiveIndex((p) => (p + 1) % images.length);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-sand-200 group">
        <Image
          src={displaySrc}
          alt={displayAlt}
          fill
          priority
          className={cn(
            "transition-opacity duration-300",
            finishOverride ? "object-contain" : "object-cover",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Finish badge */}
        {finishOverride && (
          <div className="absolute top-3 left-3 bg-charcoal-900/70 backdrop-blur-sm text-white text-xs font-body font-medium px-3 py-1.5 rounded-full">
            {selectedFinishName} cladding
          </div>
        )}

        {/* Navigation arrows â€” only show when not in finish override mode */}
        {!finishOverride && images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-charcoal-700" />
            </button>
          </>
        )}

        {/* Zoom */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4 text-charcoal-700" />
        </button>

        {/* Counter â€” only when no finish override */}
        {!finishOverride && images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-body px-2.5 py-1 rounded-full backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => {
                setActiveIndex(i);
                setFinishOverride(null);
              }}
              className={cn(
                "relative shrink-0 w-20 h-16 rounded-xl overflow-hidden transition-all duration-200",
                i === activeIndex && !finishOverride
                  ? "ring-2 ring-forest-800 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-full max-w-5xl mx-4 aspect-[4/3]">
            <Image
              src={displaySrc}
              alt={displayAlt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {!finishOverride && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xl"
          >
            âœ•
          </button>
        </div>
      )}
    </div>
  );
}
