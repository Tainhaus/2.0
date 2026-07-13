// src/components/shop/shop-header.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

interface ShopHeaderProps {
  searchParams: Record<string, string | undefined>;
  productCount: number;
}

export function ShopHeader({ searchParams, productCount }: ShopHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateSort = (value: string) => {
    const params = new URLSearchParams();
    if (value && value !== "featured") {
      params.set("sort", value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="bg-white border-b border-sand-200 pt-24 pb-6">
      <div className="container-site">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900">
              All Garden Rooms &amp; Cabins
            </h1>
            <p className="font-body text-sm text-charcoal-500 mt-1">
              {productCount} product{productCount !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-charcoal-500" />
            <select
              value={searchParams.sort ?? "featured"}
              onChange={(e) => updateSort(e.target.value)}
              className="font-body text-sm text-charcoal-700 bg-transparent border-none outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
