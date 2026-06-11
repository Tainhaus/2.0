// src/components/sections/newsletter-section.tsx
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="section-sm bg-sand-200/60">
      <div className="container-narrow text-center">
        <div className="flex justify-center mb-5">
          <div className="w-12 h-0.5 bg-terracotta-500 rounded-full" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mb-3">
          Stay inspired
        </h2>
        <p className="font-body text-charcoal-600 mb-8 max-w-md mx-auto">
          Monthly design ideas, customer case studies, and exclusive subscriber offers. 
          Unsubscribe anytime.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm variant="light" />
        </div>
        <p className="font-body text-xs text-charcoal-400 mt-4">
          No spam, ever. Read our{" "}
          <a href="/privacy-policy" className="underline hover:text-charcoal-600">
            privacy policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
