// src/components/shop/product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, TreePine } from "lucide-react";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

// Map slug → local image paths that are confirmed to exist in /public/products/
const LOCAL_IMAGES: Record<string, string> = {
  "sicilia-6-7x3-8m-log-cabin":              "/products/sicilia-birch.png",
  "oriental-4-4-7x3-2m-log-cabin":           "/products/oriental-4-4-7x3-2m-log-cabin-birch.png",
  "gloria-h-4-5x2-9m-log-cabin":             "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
  "dover-combi-6m-x-4m":                     "/products/dover-combi-6m-x-4m-birch.png",
  "gloria-f-4-5x2-0m-log-cabin":             "/products/gloria-h-4-5x2-9m-log-cabin-birch.png",
  "derby-4-5m-x-3m":                         "/products/derby-4-5m-x-3m-birch.png",
  "monaco-2-bed-log-cabin":                  "/products/monaco-2-bed-log-cabin-birch.png",
  "outdoor-kitchen-pod-garden-bar-3-0x2-6m": "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-birch.png",
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const minPrice = product.price;
  const maxSizeAdder = Math.max(...(product.sizes?.map((s) => s.priceAdder) ?? [0]));

  // Use local image first — always works. Fall back to DB image if no local match.
  const localSrc = LOCAL_IMAGES[product.slug];
  const dbSrc = product.images?.find((i: any) => i.isPrimary)?.url ?? product.images?.[0]?.url;
  const imageSrc = localSrc ?? dbSrc;

  return (
    <div className={cn("group card-luxury flex flex-col", className)}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        {imageSrc && !imgError ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-200 gap-2">
            <TreePine className="w-10 h-10 text-forest-800/30" />
            <span className="font-body text-xs text-charcoal-400 text-center px-4">{product.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.new && <span className="badge bg-terracotta-500 text-white text-xs">New</span>}
          {product.bestseller && <span className="badge bg-forest-800 text-white text-xs">Bestseller</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-luxury transition-all duration-200 opacity-0 group-hover:opacity-100",
            isWishlisted ? "text-red-500" : "text-charcoal-400 hover:text-red-400"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
        </button>

        {/* View overlay */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-white/95 backdrop-blur-sm text-forest-800 text-xs font-body font-semibold py-2.5 rounded-full hover:bg-white transition-colors shadow-luxury"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1 p-4">
        <p className="font-body text-2xs font-semibold text-terracotta-500 uppercase tracking-widest mb-1.5">
          {product.category.replace(/_/g, " ")}
        </p>
        <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1 group-hover:text-forest-800 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-body text-xs text-charcoal-500 mb-2 line-clamp-2 flex-1">
          {product.tagline}
        </p>
        <p className="font-body text-2xs text-green-700 flex items-center gap-1 mb-2">
          <TreePine className="w-3 h-3" /> FSC-certified Nordic timber
        </p>
        <span className="font-body text-xs text-charcoal-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <div>
          <span className="font-display text-xl font-bold text-forest-800">
            {minPrice === 0 ? "Call for price" : formatPrice(minPrice)}
          </span>
          {maxSizeAdder > 0 && (
            <span className="font-body text-xs text-charcoal-500 ml-1">
              – {formatPrice(minPrice + maxSizeAdder)}
            </span>
          )}
          <p className="font-body text-2xs text-charcoal-400 mt-0.5">
            {product.sizes?.[0]?.label ?? "Various sizes"} • {product.leadTime}
          </p>
        </div>
      </Link>
    </div>
  );
}
