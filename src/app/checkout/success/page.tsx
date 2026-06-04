// src/app/checkout/success/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-sand-100 pt-20 flex items-center justify-center">
      <div className="container-narrow py-20 text-center">
        <div className="w-20 h-20 bg-forest-800/10 rounded-full flex items-center justify-center mx-auto mb-7">
          <CheckCircle2 className="w-10 h-10 text-forest-800" />
        </div>

        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-4">
          Order confirmed!
        </h1>

        <p className="font-body text-lg text-charcoal-600 mb-3 max-w-lg mx-auto">
          Thank you for your order. You&apos;ll receive a confirmation email shortly, 
          and one of our team will be in touch within one working day to discuss 
          installation details.
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-card max-w-md mx-auto mb-8 mt-8">
          <h2 className="font-display text-xl font-bold text-charcoal-900 mb-4">
            What happens next?
          </h2>
          <ol className="space-y-3 text-left">
            {[
              "We&apos;ll send your order confirmation by email",
              "A garden room specialist will call within 1 working day",
              "We&apos;ll arrange a free site survey at your convenience",
              "Build begins at our workshop — lead time 6–10 weeks",
              "Our team arrives and installs your pod in 1–3 days",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-forest-800 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span
                  className="font-body text-sm text-charcoal-700"
                  dangerouslySetInnerHTML={{ __html: step }}
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="tel:+441234567890" className="btn-secondary">
            <Phone className="w-4 h-4" />
            Call us now
          </Link>
        </div>
      </div>
    </div>
  );
}
