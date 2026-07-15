/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Shield, Truck, Leaf, Clock, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ProductConfigurator } from "@/components/shop/product-configurator";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ReviewsSection } from "@/components/shop/reviews-section";
import { FinishProvider } from "@/lib/finish-context";

type Props = { params: Promise<{ slug: string }> };

async function getProduct(slug: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: "asc" } },
        sizes: true,
        finishes: true,
        reviews: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Tainhaus`,
      description: product.description,
      images: [{ url: (product.images as any[])[0]?.url ?? "/og-image.jpg" }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const specs    = (product.specs ?? {}) as Record<string, string>;
  const images   = product.images   as any[];
  const sizes    = product.sizes    as any[];
  const finishes = product.finishes as any[];
  const reviews  = product.reviews  as any[];
  const features = product.features as string[];

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      <div className="container-site py-5">
        <Link href="/shop" className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-800 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>
      </div>
      <div className="container-site pb-16">
        <FinishProvider>
          {/* Sticky gallery on mobile — fixed at top so image always visible when picking colours */}
          <div className="lg:hidden sticky top-14 z-30 bg-white shadow-md">
            <div className="container-site py-2">
              <ProductGallery images={images} productName={product.name} productSlug={product.slug} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 xl:gap-16 items-start">
            {/* Left column — sticky gallery desktop only */}
            <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={images} productName={product.name} productSlug={product.slug} />
            </div>

            {/* Right column — details + configurator */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-wrap gap-2">
                {product.new && 
                </div>
              )}
              <div className="bg-white rounded-2xl p-5 border border-sand-200">
                <div className="flex items-baseline gap-2 mb-1">
                  
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { Icon: Shield, label: product.warranty },
                  { Icon: Truck, label: `Install in ${product.leadTime}` },
                  { Icon: Leaf, label: "FSC Timber" },
                  { Icon: Clock, label: "1-Day install" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-sand-200/50 rounded-xl text-center">
                    <Icon className="w-4 h-4 text-forest-800" />
                    <span className="font-body text-xs text-charcoal-600 leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FinishProvider>

        <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-6">About {product.name}</h2>
            <div className="space-y-4">
              {product.longDescription.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="font-body text-charcoal-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal-900 mb-5">Technical Specifications</h3>
            <dl className="space-y-3">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-0.5 py-2.5 border-b border-sand-200">
                  <dt className="font-body text-xs text-charcoal-500 uppercase tracking-wide">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                  <dd className="font-body text-sm font-medium text-charcoal-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        
      </div>
    </div>
  );
}
