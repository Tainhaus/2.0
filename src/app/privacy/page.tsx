import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tainhaus",
  description: "How Tainhaus collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Privacy Policy</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-lg max-w-none space-y-8 font-body text-charcoal-700">

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">1. Who we are</h2>
            <p>Tainhaus (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a UK-based retailer of premium log cabins and garden rooms. Our website is <strong>tainhaus.co.uk</strong>. For any data-related queries, contact us at <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">2. What data we collect</h2>
            <p>We collect the following personal data:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name, email address and phone number when you submit an enquiry or contact form</li>
              <li>Email address when you sign up to our newsletter</li>
              <li>Order details including name, address and payment information when you make a purchase</li>
              <li>Usage data via analytics cookies (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">3. How we use your data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to your enquiries and provide customer service</li>
              <li>To process and fulfil your orders</li>
              <li>To send you marketing emails (only if you have consented)</li>
              <li>To improve our website and services</li>
              <li>To comply with our legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">4. Legal basis for processing</h2>
            <p>We process your data on the following legal bases under UK GDPR:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Contract</strong> -” to fulfil orders you have placed</li>
              <li><strong>Legitimate interests</strong> -” to respond to enquiries and improve our services</li>
              <li><strong>Consent</strong> -” for marketing emails and analytics cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">5. Cookies</h2>
            <p>We use essential cookies to make the site function correctly. With your consent, we also use analytics cookies to understand how visitors use our site. You can manage your cookie preferences at any time using the cookie banner.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">6. Third parties</h2>
            <p>We share your data with the following trusted third parties:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Stripe</strong> -” payment processing (they do not store your card details on our servers)</li>
              <li><strong>Neon / Railway</strong> -” secure database hosting</li>
              <li>We do not sell your data to any third party.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">7. Your rights</h2>
            <p>Under UK GDPR you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with the ICO at <a href="https://ico.org.uk" className="text-forest-800 underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">8. Data retention</h2>
            <p>We retain enquiry and order data for 7 years in line with UK tax and accounting requirements. Newsletter subscribers are kept until they unsubscribe.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">9. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">info@tainhaus.co.uk</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
