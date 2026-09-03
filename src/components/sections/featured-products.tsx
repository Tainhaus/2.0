// src/components/sections/featured-products.tsx
// v2
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { unstable_cache } from "next/cache";

const getFeaturedProducts = unstable_cache(
  async () => {
    try {
      const { prisma } = await import("@/lib/prisma");
      return prisma.product.findMany({
        where: { featured: true },
        include: {
          images: { orderBy: { order: "asc" } },
          sizes: true,
          finishes: true,
        },
        orderBy: { reviewCount: "desc" },
        take: 4,
      });
    } catch {
      return [];
    }
  },
  ["featured-products"],
  { revalidate: 3600 }
);

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts();

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="divider mb-5" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-md text-charcoal-900">
              Our collection
            </h2>
            <p className="font-body text-charcoal-600 mt-3 max-w-lg">
              Every cabin is crafted from FSC-certified Nordic timber. Built to last decades. Installed in days.
            </p>
          </div>
          <Link
            href="/shop"
            style={{ backgroundColor: "#C26B4A", color: "white", display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "9999px", fontWeight: 600, fontSize: "14px", textDecoration: "none", flexShrink: 0 }}
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.length === 0
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-card animate-pulse">
                  <div className="aspect-[4/3] bg-sand-200" />
                  <div className="p-4 space-y-2.5">
                    <div className="h-3 bg-sand-200 rounded-full w-1/3" />
                    <div className="h-5 bg-sand-200 rounded-full w-2/3" />
                    <div className="h-3 bg-sand-200 rounded-full w-full" />
                  </div>
                </div>
              ))
            : (products as any[]).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

          {/* Custom Build CTA card */}
          <div className="card-luxury flex flex-col bg-forest-800 text-white overflow-hidden">
            <div className="h-44 bg-forest-900 flex flex-col items-center justify-center gap-2">
              <Phone className="w-8 h-8 text-white/40" />
              <span className="font-body text-xs text-forest-300 uppercase tracking-widest">Bespoke</span>
            </div>
            <div className="flex flex-col flex-1 p-4">
              <p className="font-body text-2xs font-semibold text-terracotta-400 uppercase tracking-widest mb-1.5">
                Custom Build
              </p>
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Something unique?
              </h3>
              <p className="font-body text-xs text-forest-200 leading-relaxed flex-1">
                Can&apos;t find exactly what you need? We design and build bespoke cabins to your exact specification. Call us to start the conversation.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
