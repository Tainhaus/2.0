// src/components/sections/trust.tsx
import { Shield, Leaf, Award, Zap, TreePine, Truck } from "lucide-react";

const TRUST_ITEMS = [
  {
    Icon: Shield,
    title: "10-Year Structural Warranty",
    description:
      "Every pod comes backed by our industry-leading 10-year structural warranty. If anything goes wrong, we fix it — no questions.",
  },
  {
    Icon: Leaf,
    title: "FSC Certified Timber",
    description:
      "All our timber is sourced from FSC-certified, sustainably managed forests. We never use old-growth or illegally harvested wood.",
  },
  {
    Icon: TreePine,
    title: "Carbon-Offset Manufacturing",
    description:
      "Our workshop operations are 100% offset through accredited UK woodland projects. Every pod planted, a tree planted.",
  },
  {
    Icon: Zap,
    title: "Energy Efficient Design",
    description:
      "SIP panel construction with PIR insulation core delivers U-values that exceed current building regulations. Warm in winter, cool in summer.",
  },
  {
    Icon: Award,
    title: "Master Craftsmen Only",
    description:
      "Every pod that leaves our workshop is built and inspected by certified joiners with a minimum 10 years' experience.",
  },
  {
    Icon: Truck,
    title: "UK-Manufactured, UK-Installed",
    description:
      "Designed in Birmingham. Built in our Worcestershire workshop. Delivered and installed by our own employed team — no subcontractors.",
  },
];

export function TrustSection() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex justify-center mb-5">
            <div className="w-12 h-0.5 bg-terracotta-500 rounded-full" />
          </div>
          <h2 className="font-display text-display-md text-charcoal-900 mb-4">
            Built to last.
            <br />
            <span className="text-gradient-forest italic">Crafted to care.</span>
          </h2>
          <p className="font-body text-charcoal-600">
            We take sustainability, quality, and your investment seriously. 
            These aren&apos;t just promises — they&apos;re built into every pod we make.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 p-7 rounded-3xl bg-sand-50 border border-sand-200/60 hover:bg-white hover:shadow-luxury hover:border-transparent transition-all duration-400"
            >
              <div className="w-12 h-12 bg-forest-800/8 rounded-2xl flex items-center justify-center group-hover:bg-forest-800 transition-colors duration-300">
                <item.Icon className="w-5 h-5 text-forest-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-charcoal-900 mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-charcoal-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="mt-12 py-8 border-t border-sand-200 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            "FSC® Certified Timber",
            "PAS 68 Security",
            "A-Rated Energy Performance",
            "ISO 9001:2015 Quality",
            "TrustMark Registered Installer",
            "Which? Trusted Trader",
          ].map((cert) => (
            <div key={cert} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-600" />
              <span className="font-body text-sm font-medium text-charcoal-600">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
