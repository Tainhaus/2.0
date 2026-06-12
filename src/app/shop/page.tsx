export const dynamic = "force-dynamic";

import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductCard } from "@/components/shop/product-card";
import { ProductCardSkeleton } from "@/components/shop/product-card-skeleton";
import { ShopFilters } from "@/components/shop/shop-filters";
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

async function getProducts(params: Awaited<SearchParams>) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const where: Record<string, unknown> = {};
    if (params.category) where.category = params.category;
    if (params.useCase)  where.useCase = { has: params.useCase };
    if (params.minPrice || params.maxPrice) {
      where.price = {
        ...(params.minPrice && { gte: Number(params.minPrice) }),
        ...(params.maxPrice && { lte: Number(params.maxPrice) }),
      };
    }
    const sortMap: Record<string, Record<string, string>> = {
      "price-asc":  { price: "asc" },
      "price-desc": { price: "desc" },
      rating:       { rating: "desc" },
      newest:       { createdAt: "desc" },
      featured:     { featured: "desc" },
    };
    const orderBy = sortMap[params.sort ?? "featured"] ?? { featured: "desc" };
    return prisma.product.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } }, sizes: true, finishes: true },
      orderBy,
    });
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <div className="min-h-screen bg-sand-100">
      <ShopHeader searchParams={params} productCount={products.length} />
      <div className="container-site py-10">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <aside className="w-full lg:w-56 xl:w-64 shrink-0">
            <ShopFilters searchParams={params} />
          </aside>
          <main className="flex-1">
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
  );
}
