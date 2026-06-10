// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Lock, Shield, CreditCard, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = getTotal();

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name:      item.name,
            price:     item.price,
            quantity:  item.quantity,
            image:     item.image,
            size:      item.selectedSize,
            finish:    item.selectedFinish,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand-100 pt-28 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-charcoal-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal-900 mb-3">Your cart is empty</h1>
          <p className="font-body text-charcoal-500 mb-8">Add a product to your cart before checking out.</p>
          <Link href="/shop" className="btn-primary">Browse our collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100 pt-24 pb-20">
      <div className="container-site max-w-5xl">
        <Link href="/shop" className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-800 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue shopping
        </Link>

        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-8">Your order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.selectedSize}-${item.selectedFinish}`}
                className="bg-white rounded-2xl p-5 border border-sand-200 flex gap-4">
                {item.image && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-sand-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-charcoal-900 mb-1">{item.name}</h3>
                  {item.selectedSize && (
                    <p className="font-body text-sm text-charcoal-500">Size: {item.selectedSize}</p>
                  )}
                  {item.selectedFinish && (
                    <p className="font-body text-sm text-charcoal-500">Finish: {item.selectedFinish}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-body text-sm text-charcoal-500">Qty: {item.quantity}</span>
                    <span className="font-display font-bold text-forest-800">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-sand-200 sticky top-24">
              <h2 className="font-display text-xl font-bold text-charcoal-900 mb-5">Order summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between font-body text-sm text-charcoal-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-charcoal-600">
                  <span>Delivery</span>
                  <span className="text-forest-700 font-medium">Quoted separately</span>
                </div>
                <div className="border-t border-sand-200 pt-3 flex justify-between font-display font-bold text-charcoal-900">
                  <span>Total</span>
                  <span className="text-forest-800">{formatPrice(total)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="font-body text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full justify-center gap-3 mb-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay securely with Stripe
                  </>
                )}
              </button>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-charcoal-500">
                  <Lock className="w-3.5 h-3.5 text-forest-700" />
                  <span className="font-body text-xs">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-500">
                  <Shield className="w-3.5 h-3.5 text-forest-700" />
                  <span className="font-body text-xs">Secure payment via Stripe</span>
                </div>
              </div>

              <p className="font-body text-xs text-charcoal-400 mt-4 leading-relaxed">
                After payment, our team will contact you within 24 hours to confirm your order and arrange delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
