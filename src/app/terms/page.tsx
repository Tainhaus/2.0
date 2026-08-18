import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tainhaus",
  description: "Terms and conditions for purchasing from Tainhaus Log Cabins & Garden Rooms.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Terms &amp; Conditions</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: August 2026</p>

        <div className="space-y-8 font-body text-charcoal-700">

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">1. About Us</h2>
            <p>Tainhaus (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a UK-based retailer of premium log cabins and garden rooms, trading as Tainhaus. Our registered office is in England. By using our website at <strong>tainhaus.co.uk</strong> or placing an order with us, you agree to be bound by these Terms &amp; Conditions in full. If you do not agree, please do not use our website or place an order.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>&ldquo;Customer&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo; means the individual or business placing an order with us.</li>
              <li>&ldquo;Products&rdquo; means the log cabins, garden rooms, annexes and outdoor structures available on our website.</li>
              <li>&ldquo;Order&rdquo; means a request by you to purchase Products from us.</li>
              <li>&ldquo;Contract&rdquo; means the legally binding agreement between you and us for the supply of Products.</li>
              <li>&ldquo;Website&rdquo; means tainhaus.co.uk and all associated pages.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">3. Orders & Formation of Contract</h2>
            <p>All orders are subject to availability and acceptance by us. Placing an order does not constitute a contract. A legally binding contract is formed only when we send you a written order confirmation by email. We reserve the right to refuse or cancel any order at our discretion, including where Products are unavailable, where we suspect fraudulent activity, or where a pricing error has occurred.</p>
            <p className="mt-3">You must be at least 18 years old to place an order. By placing an order, you confirm that you are 18 or over and that all information provided is accurate and complete.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">4. Pricing & Payment</h2>
            <p>All prices are shown in pounds sterling (GBP) and are inclusive of any applicable taxes unless otherwise stated. We reserve the right to amend prices at any time. The price applicable to your order will be the price confirmed at the time of your order confirmation.</p>
            <p className="mt-3">Payment is required in full at the time of ordering unless we have agreed alternative payment terms in writing. We accept payment by major credit and debit cards via our secure payment provider. We do not store your card details.</p>
            <p className="mt-3">If a pricing error occurs on our website or in your order confirmation, we will contact you as soon as possible. You will have the option to proceed at the correct price or cancel your order for a full refund.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">5. Bespoke & Made-to-Order Products</h2>
            <p>All Tainhaus products are bespoke or made-to-order to your specifications, including your choice of size, colour and configuration. Under the Consumer Contracts Regulations 2013, the statutory right to cancel does not apply to goods that are made to a consumer&apos;s specification or clearly personalised.</p>
            <p className="mt-3">This means that once your order has entered production, it cannot be cancelled or returned unless the product is faulty, not as described, or not fit for purpose. Please review your order carefully before confirming.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">6. Cancellations</h2>
            <p>If you wish to cancel your order, you must contact us in writing at <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a> as soon as possible.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Before production commences:</strong> You may be entitled to a full refund minus any administration or materials costs already incurred.</li>
              <li><strong>After production has commenced:</strong> No refund will be issued as your product will have been manufactured to your specification.</li>
              <li><strong>After delivery:</strong> Returns are not accepted for bespoke or made-to-order items except in cases of fault or misdescription.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">7. Delivery</h2>
            <p>Delivery lead times are estimates only and may vary depending on product type, customisation, and demand. We will contact you to arrange a delivery date once your order is ready. We will endeavour to deliver within the timeframe indicated but we are not liable for delays caused by circumstances beyond our reasonable control, including weather, supplier delays, or logistics disruption.</p>
            <p className="mt-3">Risk in the Products passes to you upon delivery. Title to the Products passes to you upon receipt of full payment.</p>
            <p className="mt-3">You are responsible for ensuring suitable access to your property and an appropriate base or foundation for the installation. We accept no liability for delays or additional costs arising from inadequate access or site preparation.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">8. Installation</h2>
            <p>Where installation is included or arranged by us, it will be carried out by our team or appointed contractors. You must ensure the installation site is prepared, accessible and free from obstruction prior to the installation date. Any delay caused by lack of site readiness may result in additional charges.</p>
            <p className="mt-3">You are solely responsible for obtaining any planning permission, building regulations approval or other consents required for your installation. We do not provide planning advice. While many garden buildings under a certain size do not require planning permission, requirements vary by location and we strongly recommend you verify with your local planning authority before ordering.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">9. Warranty</h2>
            <p>We offer a 5-year structural warranty on all Tainhaus products from the date of delivery. This covers manufacturing defects in the structure, walls, roof and floor under normal use conditions. Full details of what is and is not covered are set out in our <a href="/warranty" className="text-forest-800 underline">Warranty Policy</a>.</p>
            <p className="mt-3">This warranty is in addition to your statutory rights as a consumer under the Consumer Rights Act 2015 and does not affect them.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">10. Faulty or Damaged Products</h2>
            <p>If your product arrives damaged or does not conform to your agreed specification, you must notify us within <strong>48 hours of delivery</strong> by emailing <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a> with photographs and a description of the issue. We will assess the claim and, where valid, arrange for repair, replacement parts, or a replacement product as appropriate.</p>
            <p className="mt-3">Your statutory rights under the Consumer Rights Act 2015 are not affected by this clause.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">11. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, our total liability to you in connection with any order or contract shall not exceed the total price paid by you for the relevant Products.</p>
            <p className="mt-3">We shall not be liable for any indirect, special, incidental or consequential loss or damage, including loss of profit, loss of business, loss of data, or damage to property, arising from or in connection with your use of our website, any Products purchased, or their installation — even if we have been advised of the possibility of such loss.</p>
            <p className="mt-3">Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded by law.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">12. Intellectual Property</h2>
            <p>All content on the Tainhaus website, including text, images, graphics, logos, product descriptions and designs, is the property of Tainhaus or our licensors and is protected by copyright and other intellectual property laws. You may not reproduce, copy, distribute or commercially exploit any content from our website without our prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">13. Website Use</h2>
            <p>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others. You must not use our website to transmit any harmful, offensive, or fraudulent content, or attempt to gain unauthorised access to our systems. We reserve the right to suspend or terminate your access to our website at any time without notice.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">14. Privacy</h2>
            <p>Your personal data is collected and processed in accordance with our <a href="/privacy" className="text-forest-800 underline">Privacy Policy</a>, which forms part of these Terms. By placing an order or using our website, you consent to such processing.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">15. Force Majeure</h2>
            <p>We shall not be liable for any failure or delay in performing our obligations where such failure or delay results from circumstances beyond our reasonable control, including but not limited to acts of God, war, pandemic, fire, flood, severe weather, strikes, supplier failure, or government action. We will notify you as soon as reasonably practicable and take all reasonable steps to minimise the impact of such events.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">16. Dispute Resolution</h2>
            <p>If you have a complaint or dispute, please contact us in the first instance at <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a>. We will endeavour to resolve any dispute informally within 14 working days.</p>
            <p className="mt-3">If we are unable to resolve the dispute, you may wish to use an independent alternative dispute resolution (ADR) scheme. As a UK consumer, you may also refer disputes to the UK Online Dispute Resolution platform.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">17. Changes to These Terms</h2>
            <p>We reserve the right to update or amend these Terms &amp; Conditions at any time. The version published on our website at the time of your order will apply to that order. We recommend checking this page periodically for updates.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">18. Governing Law & Jurisdiction</h2>
            <p>These Terms &amp; Conditions and any contract formed between us shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">19. Contact Us</h2>
            <p>If you have any questions about these Terms &amp; Conditions, please contact us at:</p>
            <p className="mt-3">
              <strong>Tainhaus</strong><br />
              Email: <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a><br />
              Website: <a href="https://tainhaus.co.uk" className="text-forest-800 underline">tainhaus.co.uk</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
