// src/components/layout/cart-drawer.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-60"
          style={{ animation: "fadeIn 0.3s ease forwards" }}
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-0 bottom-0 z-70 w-full max-w-md
          bg-sand-100 shadow-luxury-xl flex flex-col
          transition-transform duration-500 ease-out-expo
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-forest-800" />
            <h2 className="font-display text-xl font-semibold text-charcoal-900">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="badge-forest text-xs">{items.length}</span>
            )}
          </div>
          <button onClick={closeCart} className="btn-icon text-charcoal-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
              <div className="w-20 h-20 bg-forest-800/8 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-forest-800/40" />
              </div>
              <div>
                <p className="font-display text-lg text-charcoal-700 mb-1">Your cart is empty</p>
                <p className="font-body text-sm text-charcoal-500">
                  Browse our collection to find your perfect garden room
                </p>
              </div>
              <Link href="/shop" onClick={closeCart} className="btn-primary">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-1 px-4">
              {items.map((item) => {
                const primaryImage = item.product.images.find((i) => i.isPrimary) ?? item.product.images[0];
                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-sand-200/60"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-sand-200">
                      {primaryImage && (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-sm text-charcoal-900 truncate">
                        {item.product.name}
                      </h3>
                      {item.selectedSize && (
                        <p className="font-body text-xs text-charcoal-500 mt-0.5">
                          Size: {item.selectedSize.label}
                        </p>
                      )}
                      {item.selectedFinish && (
                        <p className="font-body text-xs text-charcoal-500">
                          Finish: {item.selectedFinish.name}
                        </p>
                      )}
                      {item.useCase && (
                        <p className="font-body text-xs text-terracotta-600 capitalize mt-0.5">
                          {item.useCase.replace(/_/g, " ").toLowerCase()}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty */}
                        <div className="flex items-center gap-2 bg-sand-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 rounded-full hover:bg-sand-200 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3 text-charcoal-600" />
                          </button>
                          <span className="font-body text-xs font-semibold text-charcoal-800 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 rounded-full hover:bg-sand-200 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3 text-charcoal-600" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm font-semibold text-forest-800">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-charcoal-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand-200 px-6 py-5 space-y-4 bg-white">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-body text-charcoal-600">Subtotal</span>
                <span className="font-body font-semibold text-charcoal-800">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-charcoal-600">Installation</span>
                <span className="font-body text-charcoal-500 text-xs">Quoted on survey</span>
              </div>
              <div className="flex justify-between text-sm">
                
                <span className="font-body font-semibold text-charcoal-800">{formatPrice(total * 0.2)}</span>
              </div>
              <div className="border-t border-sand-200 pt-2 flex justify-between">
                <span className="font-body font-semibold text-charcoal-900">Total</span>
                <span className="font-display font-bold text-lg text-forest-800">
                  {formatPrice(total * 1.2)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center text-base py-4"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              onClick={closeCart}
              className="btn-secondary w-full justify-center text-sm"
            >
              Speak to an Expert First
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
