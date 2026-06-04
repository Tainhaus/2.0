// src/app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero";
import { UseCasesSection } from "@/components/sections/use-cases";
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

      {/* Use cases */}
      <UseCasesSection />

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

      {/* Immersive lifestyle band */}
      <LifestyleBand />

      {/* Process */}
      <ProcessSection />

      {/* Trust */}
      <TrustSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA section */}
      <CtaSection />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}

function LifestyleBand() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,61,42,0.92) 0%, rgba(10,61,42,0.60) 50%, rgba(10,61,42,0.15) 100%), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2000&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          <div className="divider-lg mb-8" />
          <p className="font-body text-sm font-semibold text-terracotta-300 uppercase tracking-[0.2em] mb-4">
            Designed for every life stage
          </p>
          <h2 className="font-display text-display-lg text-white mb-6">
            A room that
            <br />
            <em className="text-terracotta-300">grows with you.</em>
          </h2>
          <p className="font-body text-lg text-white/75 mb-8 leading-relaxed max-w-lg">
            Your first home office at 28. Your art studio at 45. Your meditation retreat at 65. 
            The same pod — a different chapter, a different purpose.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-terracotta">
              Find your perfect pod
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-ghost text-white border-white/30 hover:bg-white/10 hover:text-white">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-sm bg-sand-200/50">
      <div className="container-site">
        <div className="bg-gradient-to-br from-forest-800 to-olive-700 rounded-4xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute top-8 right-1/3 w-3 h-3 rounded-full bg-terracotta-400/60" />
          <div className="absolute bottom-8 left-1/4 w-2 h-2 rounded-full bg-white/40" />

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
              Book a free, no-obligation consultation with one of our garden room specialists. 
              We&apos;ll listen to your needs, visit your garden, and guide you to the perfect solution.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-terracotta text-base px-8 py-4">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/configurator" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body text-sm font-medium transition-colors">
                Or design your pod online →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
