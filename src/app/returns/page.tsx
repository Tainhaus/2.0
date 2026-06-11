import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refund Policy | Tainhaus Log Cabins",
  description: "Tainhaus returns and refund policy for log cabins and garden rooms. Understand your rights and how we handle cancellations, damage claims and disputes.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Returns &amp; Refund Policy</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: June 2026</p>

        <div className="space-y-8 font-body text-charcoal-700">
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">1. Overview</h2>
            <p>At Tainhaus, we want you to be completely satisfied with your purchase. Because our log cabins and garden rooms are bespoke, made-to-order products, our returns policy reflects the nature of these items. Please read this policy carefully before placing your order.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">2. Bespoke and made-to-order items</h2>
            <p>All Tainhaus products are bespoke or made-to-order to your specifications. Under the Consumer Contracts Regulations 2013, the right to cancel does not apply to goods that are made to a consumer's specification or clearly personalised. This includes all log cabins, garden rooms, annexes and outdoor structures sold by Tainhaus.</p>
            <p className="mt-3">Once your order has entered production, it cannot be cancelled or returned unless the product is faulty or not as described.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">3. Cancellations before production</h2>
            <p>If you wish to cancel your order before production has commenced, please contact us immediately at <a href="mailto:hello@tainhaus.co.uk" className="text-forest-800 underline">hello@tainhaus.co.uk</a>. Cancellations received before production begins may be eligible for a full refund minus any administration costs already incurred.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">4. Damaged or incorrect items</h2>
            <p>If your order arrives damaged or does not match your agreed specification, you must notify us within <strong>48 hours of delivery</strong> by emailing <a href="mailto:hello@tainhaus.co.uk" className="text-forest-800 underline">hello@tainhaus.co.uk</a> with photographs of the damage or discrepancy.</p>
            <p className="mt-3">We will assess the claim and, where valid, arrange for replacement parts, repair, or in cases of significant damage, a replacement product. We will not accept damage claims reported more than 48 hours after delivery unless the damage could not reasonably have been identified at the point of delivery.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">5. Order discrepancies</h2>
            <p>Any discrepancies between your order and what was delivered must be reported within 48 hours of delivery. Please retain all original packaging until you have fully inspected your order. We cannot accept liability for discrepancies reported after this period.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">6. Items not eligible for return</h2>
            <p>The following cannot be returned:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Products that have been assembled, modified, or installed</li>
              <li>Products returned without prior written authorisation from Tainhaus</li>
              <li>Products where damage has occurred due to improper storage, handling or installation</li>
              <li>Products where the original packaging has been discarded before a claim is raised</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">7. Refund process</h2>
            <p>Where a refund is approved, we will process it within 14 days to the original payment method. We reserve the right to deduct any reasonable costs incurred prior to cancellation or return.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">8. Your statutory rights</h2>
            <p>Nothing in this policy affects your statutory rights under the Consumer Rights Act 2015. If goods are faulty, not as described, or not fit for purpose, you are entitled to a repair, replacement or refund regardless of our policy above.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">9. Contact us</h2>
            <p>For any returns or refund queries, contact us at <a href="mailto:hello@tainhaus.co.uk" className="text-forest-800 underline">hello@tainhaus.co.uk</a> or visit our <Link href="/contact" className="text-forest-800 underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
