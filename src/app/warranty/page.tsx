import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Warranty & Guarantee | Tainhaus Log Cabins",
  description: "Tainhaus offers a 5-year structural warranty on all log cabins and garden rooms. Find out what's covered, how to make a claim, and our guarantee to you.",
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Warranty &amp; Guarantee</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: June 2026</p>

        {/* Warranty badge */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-10 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-white">5-Year Structural Warranty</p>
            <p className="font-body text-forest-300 text-sm mt-1">Every Tainhaus product is covered from the date of delivery.</p>
          </div>
        </div>

        <div className="space-y-8 font-body text-charcoal-700">
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">What is covered</h2>
            <ul className="space-y-2">
              {[
                "Structural defects in the log walls, roof and floor",
                "Manufacturing defects in doors and windows",
                "Failure of joints, fixings or connectors due to manufacturing fault",
                "Premature timber rot or decay not caused by external factors",
                "Structural failure under normal use and load conditions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">What is not covered</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Damage caused by improper installation not carried out by Tainhaus or an approved installer</li>
              <li>Normal weathering, discolouration, or surface checking of timber</li>
              <li>Damage caused by neglect, misuse, or failure to maintain the product</li>
              <li>Damage caused by acts of nature including storms, flooding, or subsidence</li>
              <li>Cosmetic damage that does not affect structural integrity</li>
              <li>Modifications made to the structure after installation</li>
              <li>Consumable items such as roof felt, bitumen tiles, or sealants</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Warranty period</h2>
            <p>The 5-year structural warranty commences from the date of delivery to your address. You will receive confirmation of your warranty start date with your delivery documentation.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">How to make a claim</h2>
            <p>To make a warranty claim, please email <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a> with:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your order number and delivery date</li>
              <li>A clear description of the defect or issue</li>
              <li>Photographs showing the defect</li>
            </ul>
            <p className="mt-3">We aim to respond to all warranty claims within 5 working days. Valid claims will be resolved by repair, replacement of affected parts, or in exceptional circumstances, full product replacement.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Timber maintenance</h2>
            <p>To maintain your warranty and ensure longevity of your cabin, we recommend:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Treating all external timber surfaces with a suitable wood preservative every 1-2 years</li>
              <li>Ensuring guttering is kept clear and water drains away from the base</li>
              <li>Checking and reapplying sealant around doors and windows annually</li>
              <li>Keeping vegetation clear from the walls of the structure</li>
            </ul>
            <p className="mt-3">Failure to maintain the product appropriately may affect your warranty cover.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Transferability</h2>
            <p>The Tainhaus warranty is non-transferable and applies to the original purchaser only.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Contact</h2>
            <p>For warranty queries, email <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a> or visit our <Link href="/contact" className="text-forest-800 underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
