// src/app/checkout/success/page.tsx
import Link from "next/link";
import { ArrowRight, Mail, Check, CheckCircle } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed | Tainhaus" };

export default function CheckoutSuccessPage() {
  return (
    <>
      <ConversionScript />
      <div className="min-h-screen bg-sand-100 pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-forest-800/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-forest-800" />
        </div>

        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-3">
          Order confirmed!
        </h1>
        <p className="font-body text-lg text-charcoal-600 mb-8">
          Thank you for your order. Our team will be in touch within 24 hours to confirm your order details and arrange delivery.
        </p>

        <div className="bg-white rounded-2xl p-6 border border-sand-200 mb-8 text-left space-y-4">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">What happens next?</h2>
          <div className="space-y-3">
            {[
              { step: "1", text: "You'll receive a confirmation email shortly" },
              { step: "2", text: "Our team will call you within 24 hours" },
              { step: "3", text: "We'll confirm your delivery date and installation slot" },
              { step: "4", text: "Your cabin will be delivered and installed by our team" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-forest-800 text-white rounded-full flex items-center justify-center font-body text-xs font-bold shrink-0 mt-0.5">
                  {step}
                </span>
                <span className="font-body text-sm text-charcoal-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          
          <a href="mailto:info@tainhaus.co.uk" className="btn-secondary gap-2">
            <Mail className="w-4 h-4" />
            info@tainhaus.co.uk
          </a>
        </div>

        <Link href="/shop" className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-800 transition-colors">
          Continue browsing
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
    </>
  );
}
