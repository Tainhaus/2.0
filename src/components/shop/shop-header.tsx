// src/components/shop/shop-header.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeCategory = ""
  const activeUseCase = searchParams.useCase;

  const QUICK_FILTERS = [
    { label: "All", value: null, type: "category" },
    { label: "Garden Rooms", value: "GARDEN_ROOM", type: "category" },
    { label: "Garden Pods", value: "GARDEN_POD", type: "category" },
    { label: "Studios", value: "STUDIO", type: "category" },
    { label: "Saunas", value: "SAUNA", type: "category" },
    { label: "Home Office", value: "HOME_OFFICE", type: "useCase" },
    { label: "Gym & Wellness", value: "GYM_WELLNESS", type: "useCase" },
  ];

  return (
    <div className="bg-white border-b border-sand-200 pt-24 pb-6">
      <div className="container-site">
        <div className="flex flex-col gap-5">
          {/* Title row */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900">
                {activeCategory
                  ? activeCategory.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
                  : activeUseCase
                  ? activeUseCase.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
                  : "All Garden Rooms & Pods"}
              </h1>
              <p className="font-body text-sm text-charcoal-500 mt-1">
                {productCount} product{productCount !== 1 ? "s" : ""} available
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-charcoal-500" />
              <select
                value={searchParams.sort ?? "featured"}
                onChange={(e) => updateParam("sort", e.target.value)}
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

          {/* Quick filter pills */}
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((filter) => {
              const isActive =
                filter.value === null
                  ? !activeCategory && !activeUseCase
                  : filter.type === "category"
                  ? activeCategory === filter.value
                  : activeUseCase === filter.value;

              return (
                <button
                  key={filter.label}
                  onClick={() => {
                    if (filter.value === null) {
                      router.push(pathname);
                    } else {
                      updateParam(filter.type, isActive ? "" : filter.value);
                    }
                  }}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-forest-800 text-white"
                      : "bg-sand-200 text-charcoal-600 hover:bg-sand-300 hover:text-charcoal-900"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
