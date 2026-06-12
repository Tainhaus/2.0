// src/components/sections/featured-products.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
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
}

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts();

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="divider mb-5" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-md text-charcoal-900">Our collection</h2>
            <p className="font-body text-charcoal-600 mt-3 max-w-lg">
              Every pod is designed, engineered, and assembled by hand at our UK workshop. Built to last decades. Installed in days.
            </p>
          </div>
          <Link href="/shop" style={{backgroundColor:"#C26B4A",color:"white",display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 28px",borderRadius:"9999px",fontWeight:600,fontSize:"14px",textDecoration:"none",flexShrink:0}}>
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-card animate-pulse">
                <div className="aspect-[4/3] bg-sand-200" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3 bg-sand-200 rounded-full w-1/3" />
                  <div className="h-5 bg-sand-200 rounded-full w-2/3" />
                  <div className="h-3 bg-sand-200 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(products as any[]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
