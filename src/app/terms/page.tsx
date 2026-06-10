import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tainhaus",
  description: "Terms and conditions for purchasing from Tainhaus.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Terms &amp; Conditions</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="space-y-8 font-body text-charcoal-700">

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">1. About us</h2>
            <p>Tainhaus is a UK-based retailer of premium log cabins and garden rooms. By using our website or placing an order, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">2. Orders</h2>
            <p>All orders are subject to availability and acceptance. We reserve the right to refuse any order. A contract is formed when we confirm your order by email.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">3. Pricing</h2>
            <p>All prices are shown in GBP and include VAT unless stated otherwise. We reserve the right to change prices at any time. Prices shown at the time of your order will be honoured.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">4. Delivery</h2>
            <p>Lead times are estimates only and may vary. We will contact you to arrange delivery. Risk passes to you on delivery. We are not liable for delays caused by circumstances beyond our reasonable control.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">5. Returns & cancellations</h2>
            <p>As our products are bespoke and made to order, your statutory right to cancel under the Consumer Contracts Regulations 2013 does not apply once production has commenced. Please contact us within 24 hours of placing your order if you wish to cancel.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">6. Warranty</h2>
            <p>Products carry a 5-year structural warranty from the date of delivery. This covers defects in materials and workmanship under normal use. It does not cover damage from improper installation, modification, or normal weathering.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">7. Limitation of liability</h2>
            <p>Our total liability to you shall not exceed the price paid for the relevant product. We are not liable for indirect or consequential losses.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">8. Governing law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">9. Contact</h2>
            <p>For any queries, email <a href="mailto:hello@tainhaus.co.uk" className="text-forest-800 underline">hello@tainhaus.co.uk</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
