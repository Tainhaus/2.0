import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery & Lead Times | Tainhaus Log Cabins",
  description: "Tainhaus delivers log cabins and garden rooms across the UK. Find out about our delivery process, typical lead times of 4-6 weeks, and installation service.",
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-2">Delivery &amp; Lead Times</h1>
        <p className="font-body text-sm text-charcoal-500 mb-10">Last updated: June 2026</p>

        {/* Key stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { Icon: Clock,  title: "4-6 Weeks",        sub: "Typical lead time from order" },
            { Icon: Truck,  title: "UK Wide",           sub: "Delivery across the UK" },
            { Icon: MapPin, title: "On-Site Install",   sub: "Professional installation available" },
          ].map(({ Icon, title, sub }) => (
            <div key={title} className="bg-white rounded-2xl p-5 border border-sand-200 text-center">
              <Icon className="w-7 h-7 text-forest-800 mx-auto mb-2" />
              <p className="font-display font-bold text-charcoal-900">{title}</p>
              <p className="font-body text-xs text-charcoal-500 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 font-body text-charcoal-700">
          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Lead times</h2>
            <p>Most Tainhaus products are delivered within <strong>4 to 6 weeks</strong> from the date your order is confirmed. Lead times may vary depending on product type, customisation requirements, and seasonal demand.</p>
            <p className="mt-3">For bespoke products such as the Monaco 2-bed cabin or custom-sized structures, lead times may be longer. We will confirm your estimated delivery date at the time of ordering.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Delivery process</h2>
            <p>We deliver to mainland UK addresses. Our delivery process works as follows:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-3">
              <li>Once your order is confirmed we will contact you to arrange a suitable delivery date</li>
              <li>We will confirm your delivery slot at least 48 hours in advance</li>
              <li>Delivery is made by our logistics partners, who will contact you on the day with an estimated arrival time</li>
              <li>Please ensure clear access to your delivery address for a large vehicle</li>
              <li>You or a responsible adult must be present to accept and sign for delivery</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Access requirements</h2>
            <p>Please ensure there is suitable vehicle access to your property. If you have any concerns about access — such as narrow roads, low bridges, or restricted driveways — please let us know before your delivery is scheduled. We cannot be held responsible for failed delivery attempts due to access issues not disclosed at the time of ordering.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Delivery charges</h2>
            <p>Standard delivery charges are included in the product price for mainland UK addresses. Deliveries to remote locations, the Scottish Highlands, islands, or addresses requiring specialist handling may incur additional charges. We will confirm any additional charges before taking payment.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Installation service</h2>
            <p>Professional installation is available across the UK. Our experienced installation teams will assemble your cabin on-site, typically completing the job within one to two days depending on the size and complexity of the structure.</p>
            <p className="mt-3">Installation pricing is provided as part of your quote. To discuss installation, please <Link href="/contact" className="text-forest-800 underline">contact us</Link> or use the <Link href="/configurator" className="text-forest-800 underline">Design Your Space</Link> tool to request a quote.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Receiving your delivery</h2>
            <p>When your delivery arrives, please:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Check the number of packages against the delivery note</li>
              <li>Inspect all packages for visible damage before signing</li>
              <li>Note any damage or discrepancies on the delivery note before the driver leaves</li>
              <li>Report any damage or discrepancies to us within 48 hours of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-charcoal-900 mb-3">Questions about your delivery</h2>
            <p>If you have any questions about your delivery, please contact us at <a href="mailto:hello@tainhaus.co.uk" className="text-forest-800 underline">hello@tainhaus.co.uk</a> or visit our <Link href="/contact" className="text-forest-800 underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
