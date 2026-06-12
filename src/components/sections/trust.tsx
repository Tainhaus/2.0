// src/components/sections/trust.tsx
import { Shield, Leaf, Award, Zap, TreePine, Truck } from "lucide-react";

const TRUST_ITEMS = [
  {
    Icon: Shield,
    title: "5-Year Structural Warranty",
    description: "Every cabin comes backed by our 5-year structural warranty. If anything goes wrong, we fix it.",
  },
  {
    Icon: Leaf,
    title: "FSC Certified Timber",
    description: "All timber sourced from FSC-certified, sustainably managed Nordic forests.",
  },
  {
    Icon: Zap,
    title: "Energy Efficient Design",
    description: "Double-glazed doors and windows with excellent insulation keep your cabin warm in winter and cool in summer.",
  },
  {
    Icon: Truck,
    title: "Delivered in 4–6 Weeks",
    description: "Fast, reliable delivery and installation across the UK. Most orders completed within 4–6 weeks.",
  },
];

export function TrustSection() {
  return (
    <section className="section-sm bg-white md:bg-forest-800">
      <div className="container-site">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex justify-center mb-5">
            <div className="w-12 h-0.5 bg-terracotta-500 md:bg-terracotta-400 rounded-full" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-display-sm text-charcoal-900 md:text-white mb-3">
            Built to last.{" "}
            <span className="text-terracotta-500 italic">Crafted to care.</span>
          </h2>
          <p className="font-body text-sm text-charcoal-600 md:text-forest-200">
            Quality and sustainability built into every cabin we sell.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-2 p-4 sm:p-5 rounded-2xl bg-white md:bg-white/10 md:border-white/10 border border-sand-200 hover:shadow-luxury md:hover:bg-white/20 hover:border-transparent transition-all duration-400"
            >
              <div className="w-10 h-10 bg-forest-800/8 md:bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-forest-800 md:group-hover:bg-white/20 transition-colors duration-300">
                <item.Icon className="w-4 h-4 text-forest-800 md:text-white group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-charcoal-900 md:text-white mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-charcoal-600 md:text-forest-200 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
