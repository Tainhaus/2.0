// src/components/shop/product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Heart, TreePine } from "lucide-react";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const primaryImage = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
  const secondaryImage = product.images?.[1];
  const minPrice = product.price;
  const maxSizeAdder = Math.max(...(product.sizes?.map((s) => s.priceAdder) ?? [0]));

  const currentImageUrl = imageIndex === 0
    ? primaryImage?.url
    : (secondaryImage?.url ?? primaryImage?.url);
  const currentImageAlt = imageIndex === 0
    ? primaryImage?.alt
    : (secondaryImage?.alt ?? primaryImage?.alt);

  return (
    <div className={cn("group card-luxury flex flex-col", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        {primaryImage && !imgError ? (
          <Image
            src={currentImageUrl ?? ""}
            alt={currentImageAlt ?? product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-200 gap-2">
            <TreePine className="w-10 h-10 text-forest-800/30" />
            <span className="font-body text-xs text-charcoal-400 text-center px-4">{product.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.new && <span className="badge bg-terracotta-500 text-white text-xs">New</span>}
          {product.bestseller && <span className="badge bg-forest-800 text-white text-xs">Bestseller</span>}
          {product.salePrice && <span className="badge bg-red-500 text-white text-xs">Sale</span>}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-luxury transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
            isWishlisted ? "text-red-500" : "text-charcoal-400 hover:text-red-400"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
        </button>

        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-white/95 backdrop-blur-sm text-forest-800 text-xs font-body font-semibold py-2.5 rounded-full hover:bg-white transition-colors shadow-luxury"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {secondaryImage && !imgError && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setImageIndex(i); }}
                className={cn("w-1.5 h-1.5 rounded-full transition-all duration-200", imageIndex === i ? "bg-white w-4" : "bg-white/50")}
              />
            ))}
          </div>
        )}
      </div>

      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1 p-4">
        <p className="font-body text-2xs font-semibold text-terracotta-500 uppercase tracking-widest mb-1.5">
          {product.category.replace(/_/g, " ")}
        </p>
        <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1 group-hover:text-forest-800 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-body text-xs text-charcoal-500 mb-2 line-clamp-2 flex-1">{product.tagline}</p>
        <p className="font-body text-2xs text-green-700 flex items-center gap-1 mb-2">
          <TreePine className="w-3 h-3" /> FSC-certified Nordic timber
        </p>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={cn("w-3 h-3", star <= Math.round(product.rating) ? "fill-terracotta-400 text-terracotta-400" : "text-sand-300 fill-sand-300")} />
            ))}
          </div>
          <span className="font-body text-xs text-charcoal-500">{product.rating.toFixed(1)} ({product.reviewCount})</span>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold text-forest-800">
              {minPrice === 0 ? "Call for price" : formatPrice(minPrice)}
            </span>
            {maxSizeAdder > 0 && (
              <span className="font-body text-xs text-charcoal-500">– {formatPrice(minPrice + maxSizeAdder)}</span>
            )}
          </div>
          <p className="font-body text-2xs text-charcoal-400 mt-0.5">
            {product.sizes?.[0]?.label ?? "Various sizes"} • {product.leadTime}
          </p>
        </div>
      </Link>
    </div>
  );
}
