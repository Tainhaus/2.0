// src/components/shop/product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Heart } from "lucide-react";
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

  const primaryImage = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
  const secondaryImage = product.images?.[1];
  const minPrice = product.price;
  const maxSizeAdder = Math.max(...(product.sizes?.map((s) => s.priceAdder) ?? [0]));

  return (
    <div className={cn("group card-luxury flex flex-col", className)}>
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        {/* Primary image */}
        {primaryImage && (
          <Image
            src={imageIndex === 0 ? primaryImage.url : (secondaryImage?.url ?? primaryImage.url)}
            alt={imageIndex === 0 ? primaryImage.alt : (secondaryImage?.alt ?? primaryImage.alt)}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.new && (
            <span className="badge bg-terracotta-500 text-white text-xs">New</span>
          )}
          {product.bestseller && (
            <span className="badge bg-forest-800 text-white text-xs">Bestseller</span>
          )}
          {product.salePrice && (
            <span className="badge bg-red-500 text-white text-xs">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm",
            "flex items-center justify-center shadow-luxury",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
            isWishlisted ? "text-red-500" : "text-charcoal-400 hover:text-red-400"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
        </button>

        {/* View product overlay button */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-white/95 backdrop-blur-sm text-forest-800 text-xs font-body font-semibold py-2.5 rounded-full hover:bg-white transition-colors shadow-luxury"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Image toggle dots (on hover) */}
        {secondaryImage && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setImageIndex(i);
                }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200",
                  imageIndex === i ? "bg-white w-4" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1 p-4">
        {/* Category */}
        <p className="font-body text-2xs font-semibold text-terracotta-500 uppercase tracking-widest mb-1.5">
          {product.category.replace(/_/g, " ")}
        </p>

        {/* Name */}
        <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1 group-hover:text-forest-800 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="font-body text-xs text-charcoal-500 mb-3 line-clamp-2 flex-1">
          {product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-3 h-3",
                  star <= Math.round(product.rating)
                    ? "fill-terracotta-400 text-terracotta-400"
                    : "text-sand-300 fill-sand-300"
                )}
              />
            ))}
          </div>
          <span className="font-body text-xs text-charcoal-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold text-forest-800">
                {formatPrice(minPrice)}
              </span>
              {maxSizeAdder > 0 && (
                <span className="font-body text-xs text-charcoal-500">
                  – {formatPrice(minPrice + maxSizeAdder)}
                </span>
              )}
            </div>
            {product.salePrice && (
              <span className="font-body text-xs text-charcoal-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <p className="font-body text-2xs text-charcoal-400 mt-0.5">
              From {product.sizes?.[0]?.label ?? "Various sizes"} • {product.leadTime}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
