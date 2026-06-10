// src/app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ProcessSection } from "@/components/sections/process";
import { TrustSection } from "@/components/sections/trust";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ProductCardSkeleton } from "@/components/shop/product-card-skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Our selection -” replaces "One garden, infinite possibilities" */}
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

      {/* From idea to your garden -” process */}
      <ProcessSection />

      {/* Built to last */}
      <TrustSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CtaSection />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}

function CtaSection() {
  return (
    <section className="section-sm bg-sand-200/50">
      <div className="container-site">
        <div className="bg-gradient-to-br from-forest-800 to-olive-700 rounded-4xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="relative z-10">
            <p className="font-body text-xs font-semibold text-forest-300 uppercase tracking-[0.2em] mb-4">
              Start your journey
            </p>
            <h2 className="font-display text-display-md text-white mb-4">
              Ready to transform
              <br />
              your outdoor space?
            </h2>
            <p className="font-body text-forest-200 max-w-xl mx-auto mb-8 leading-relaxed">
              Call us or place your order today. Most customers receive their cabin within 4-6 weeks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-terracotta text-base px-8 py-4">
                Get in touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body text-sm font-medium transition-colors">
                Browse our collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
