// src/components/shop/product-configurator.tsx
"use client";

import { useState } from "react";
import { ShoppingBag, MessageSquare, Plus, Minus } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import type { Product, ProductSize, Finish } from "@/types";

const USE_CASE_LABELS: Record<string, string> = {
  HOME_OFFICE:     "Home Office",
  GYM_WELLNESS:    "Gym & Wellness",
  ART_STUDIO:      "Art Studio",
  SAUNA_SPA:       "Sauna & Spa",
  GUEST_ROOM:      "Guest Room",
  ENTERTAINMENT:   "Entertainment",
  READING_RETREAT: "Reading Retreat",
  YOGA_STUDIO:     "Yoga Studio",
  MUSIC_STUDIO:    "Music Studio",
  GARDEN_ROOM:     "Garden Room",
};

interface ProductConfiguratorProps {
  product: Product;
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes?.[0] ?? null!
  );
  const [selectedFinish, setSelectedFinish] = useState<Finish>(
    product.finishes?.[0] ?? null!
  );
  const [selectedUseCase, setSelectedUseCase] = useState<string>(
    product.useCase?.[0] ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addItem } = useCartStore();

  const basePrice = product.salePrice ?? product.price;
  const sizeAdder = selectedSize?.priceAdder ?? 0;
  const finishAdder = selectedFinish?.priceAdder ?? 0;
  const unitPrice = basePrice + sizeAdder + finishAdder;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 400));
    addItem(product, {
      selectedSize,
      selectedFinish,
      useCase: selectedUseCase,
    });
    setIsAdding(false);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <ConfigSection
          title="Size"
          subtitle={selectedSize ? `${selectedSize.sqm}m² floor area` : undefined}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "flex items-start justify-between p-3.5 rounded-xl border-2 text-left transition-all duration-200",
                  selectedSize?.id === size.id
                    ? "border-forest-800 bg-forest-800/5"
                    : "border-sand-300 hover:border-sand-400 hover:bg-sand-50"
                )}
              >
                <div>
                  <p
                    className={cn(
                      "font-body text-sm font-semibold",
                      selectedSize?.id === size.id
                        ? "text-forest-800"
                        : "text-charcoal-800"
                    )}
                  >
                    {size.label}
                  </p>
                  <p className="font-body text-xs text-charcoal-500 mt-0.5">
                    {size.sqm}m² • {size.heightM}m height
                  </p>
                </div>
                {size.priceAdder > 0 && (
                  <span className="font-body text-xs font-semibold text-terracotta-600 shrink-0 ml-2">
                    +{formatPrice(size.priceAdder)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ConfigSection>
      )}

      {/* Finish selector */}
      {product.finishes && product.finishes.length > 0 && (
        <ConfigSection
          title="Exterior Finish"
          subtitle={selectedFinish?.name}
        >
          <div className="flex flex-wrap gap-2.5">
            {product.finishes.map((finish) => (
              <button
                key={finish.id}
                onClick={() => setSelectedFinish(finish)}
                title={`${finish.name}${finish.priceAdder > 0 ? ` (+${formatPrice(finish.priceAdder)})` : ""}`}
                className={cn(
                  "group relative w-10 h-10 rounded-full border-2 transition-all duration-200",
                  selectedFinish?.id === finish.id
                    ? "border-forest-800 scale-110 shadow-luxury"
                    : "border-sand-300 hover:border-sand-500 hover:scale-105"
                )}
                style={{
                  backgroundColor: finish.hexColor ?? "#D4A76A",
                }}
              >
                {selectedFinish?.id === finish.id && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-white/70 backdrop-blur-sm" />
                  </span>
                )}
                {/* Tooltip */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-charcoal-900 text-white text-2xs font-body px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {finish.name}
                  {finish.priceAdder > 0 && ` +${formatPrice(finish.priceAdder)}`}
                </span>
              </button>
            ))}
          </div>
        </ConfigSection>
      )}

      {/* Use case */}
      {product.useCase && product.useCase.length > 1 && (
        <ConfigSection title="Primary Use">
          <div className="flex flex-wrap gap-2">
            {product.useCase.map((uc) => (
              <button
                key={uc}
                onClick={() => setSelectedUseCase(uc)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200",
                  selectedUseCase === uc
                    ? "bg-forest-800 text-white"
                    : "bg-sand-200 text-charcoal-700 hover:bg-sand-300"
                )}
              >
                {USE_CASE_LABELS[uc] ?? uc}
              </button>
            ))}
          </div>
        </ConfigSection>
      )}

      {/* Price summary */}
      <div className="bg-white rounded-2xl p-5 border border-sand-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-charcoal-600">Base price</span>
          <span className="font-body text-sm font-medium">{formatPrice(basePrice)}</span>
        </div>
        {sizeAdder > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-charcoal-600">Size upgrade</span>
            <span className="font-body text-sm font-medium text-terracotta-600">
              +{formatPrice(sizeAdder)}
            </span>
          </div>
        )}
        {finishAdder > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-charcoal-600">Finish upgrade</span>
            <span className="font-body text-sm font-medium text-terracotta-600">
              +{formatPrice(finishAdder)}
            </span>
          </div>
        )}
        <div className="border-t border-sand-200 pt-2 flex items-center justify-between">
          <span className="font-body font-semibold text-charcoal-900">Total</span>
          <span className="font-display text-2xl font-bold text-forest-800">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="font-body text-xs text-charcoal-400">
          inc. VAT. Installation quoted separately after site survey.
        </p>
      </div>

      {/* Qty + Add to cart */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          {/* Qty */}
          <div className="flex items-center gap-3 bg-sand-200 rounded-full px-3 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow transition-shadow"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 text-charcoal-700" />
            </button>
            <span className="font-body font-semibold text-charcoal-900 w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow transition-shadow"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 text-charcoal-700" />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 rounded-full",
              "font-body font-semibold text-sm transition-all duration-300",
              addedFeedback
                ? "bg-olive-600 text-white"
                : product.inStock
                ? "bg-forest-800 text-white hover:bg-forest-700 hover:shadow-luxury-md hover:-translate-y-0.5 active:translate-y-0"
                : "bg-sand-300 text-charcoal-500 cursor-not-allowed"
            )}
          >
            {isAdding ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : addedFeedback ? (
              <>✓ Added to cart</>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </button>
        </div>

        {/* Expert CTA */}
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border-2 border-forest-800/20 text-forest-800 font-body font-medium text-sm hover:border-forest-800/40 hover:bg-forest-800/5 transition-all duration-200"
        >
          <MessageSquare className="w-4 h-4" />
          Speak to an expert first
        </a>
      </div>

      {/* Lead time note */}
      <p className="font-body text-xs text-center text-charcoal-500">
        🕐 Typical lead time: <strong>{product.leadTime}</strong> •{" "}
        🛡 {product.warranty}
      </p>
    </div>
  );
}

function ConfigSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="font-body text-sm font-semibold text-charcoal-800 uppercase tracking-wide">
          {title}
        </p>
        {subtitle && (
          <span className="font-body text-xs text-charcoal-500">— {subtitle}</span>
        )}
      </div>
      {children}
    </div>
  );
}
