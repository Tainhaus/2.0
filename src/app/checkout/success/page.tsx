import Link from "next/link";
import { ArrowRight, Mail, Check, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed | Tainhaus" };

function ConversionScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      if(typeof gtag !== 'undefined'){
        gtag('event', 'conversion_event_purchase', {
          'event_callback': function() {},
          'event_timeout': 2000
        });
      }
    ` }} />
  );
}

export default function SuccessPage() {
  return (
    <>
      <ConversionScript />
      <div className="min-h-screen bg-sand-100 pt-28 pb-20 flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-card">
            <div className="w-16 h-16 bg-forest-800/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-forest-800" />
            </div>
            <h1 className="font-display text-3xl font-bold text-charcoal-900 mb-3">
              Order confirmed!
            </h1>
            <p className="font-body text-charcoal-600 mb-8 leading-relaxed">
              Thank you for your order. Our team will be in touch within 24 hours to confirm your order details and arrange delivery.
            </p>

            <div className="bg-sand-100 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-display text-lg font-bold text-charcoal-900 mb-4">What happens next?</h3>
              <div className="space-y-3">
                {[
                  "You'll receive a confirmation email shortly",
                  "Our team will call you within 24 hours",
                  "We'll confirm your delivery date and installation slot",
                  "Your cabin will be delivered and installed by our team",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest-800 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="font-body text-sm text-charcoal-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:info@tainhaus.co.uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-sand-300 text-charcoal-700 hover:border-forest-800 hover:text-forest-800 font-body font-medium transition-all"
              >
                <Mail className="w-4 h-4" />
                info@tainhaus.co.uk
              </a>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 text-forest-800 font-body font-semibold hover:underline"
            >
              Continue browsing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
