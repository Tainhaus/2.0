// src/app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ProcessSection } from "@/components/sections/process";
import { TrustSection } from "@/components/sections/trust";
import { SustainabilitySection } from "@/components/sections/sustainability";
import { ProductCardSkeleton } from "@/components/shop/product-card-skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured products */}
      <Suspense
        fallback={
          <section className="section bg-white">
            <div className="container-site">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <FeaturedProductsSection />
      </Suspense>

      {/* From idea to your garden */}
      <ProcessSection />

      {/* Sustainability */}
      <SustainabilitySection />

      {/* Built to last */}
      <TrustSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CtaSection />
    </>
  );
}

function CtaSection() {
  return (
    <section className="section-sm bg-sand-200/50">
      <div className="container-site">
        <div className="bg-sand-200 rounded-4xl p-10 md:p-16 text-center relative overflow-hidden border border-sand-300">
          <div className="relative z-10">
            <p className="font-body text-xs font-semibold text-terracotta-500 uppercase tracking-[0.2em] mb-4 text-center">
              Start your journey
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-md text-charcoal-900 mb-4 text-center">
              Ready to transform
              <br />
              your outdoor space?
            </h2>
            <p className="font-body text-charcoal-600 max-w-xl mx-auto mb-8 leading-relaxed text-center">
              Call us or place your order today. Most customers receive their cabin within 4–6 weeks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                style={{ backgroundColor: "#C26B4A", color: "white", display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px", borderRadius: "9999px", fontWeight: 600, fontSize: "16px", textDecoration: "none" }}
              >
                Get in touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-400 font-body text-sm font-semibold transition-colors"
              >
                Browse our collection →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
