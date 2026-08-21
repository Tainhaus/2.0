export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import type { Metadata } from "next";
import { ProductCard } from "@/components/shop/product-card";
import { ProductCardSkeleton } from "@/components/shop/product-card-skeleton";
import { ShopHeader } from "@/components/shop/shop-header";

export const metadata: Metadata = {
  title: "Shop Log Cabins & Garden Rooms",
  description:
    "Browse our full range of premium log cabins and garden rooms. From compact garden offices to full 2-bedroom annexes — all delivered and installed across the UK in 4-6 weeks.",
  keywords: [
    "log cabins for sale UK",
    "garden rooms for sale",
    "buy log cabin",
    "garden office for sale",
    "log cabin prices UK",
    "garden room shop",
    "wooden garden rooms",
  ],
  openGraph: {
    title: "Shop Log Cabins & Garden Rooms | Tainhaus",
    description: "Browse premium log cabins and garden rooms. Delivered and installed UK-wide in 4-6 weeks.",
    images: [{ url: "/hero-1.jpg", width: 1200, height: 630, alt: "Tainhaus log cabin collection" }],
  },
};

type SearchParams = Promise<{
  category?: string;
  useCase?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

async function getProducts() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma.product.findMany({
      include: { images: { orderBy: { order: "asc" } }, sizes: true, finishes: true },
      orderBy: { featured: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const products = await getProducts();

  return (
    <>
    <ScrollToTop />
    <div className="min-h-screen bg-sand-100">
      <ShopHeader searchParams={params} productCount={products.length} />

      {/* Custom Project Banner */}
      <div className="bg-forest-800">
        <div className="container-site py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-body text-xs font-semibold text-terracotta-400 uppercase tracking-widest mb-0.5">Bespoke builds</p>
              <p className="font-display text-lg font-bold text-white">
                Can&apos;t find exactly what you need? We build custom cabins.
              </p>
            </div>
            <a
              href="/configurator"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white font-body font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              Start a custom project →
            </a>
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        <div>
          <main className="">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-sand-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-display text-xl text-charcoal-800 mb-2">No products found</h3>
                <p className="font-body text-sm text-charcoal-500">Try adjusting your filters or browse our full collection</p>
              </div>
            ) : (
              <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
              }>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(products as any[]).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
    </>
  );
}