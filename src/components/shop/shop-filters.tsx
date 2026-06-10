// src/components/shop/shop-filters.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface ShopFiltersProps {
  searchParams: Record<string, string | undefined>;
}

const PRICE_RANGES = [
  { label: "Under £10,000", min: 0, max: 10000 },
  { label: "£10,000 – £20,000", min: 10000, max: 20000 },
  { label: "£20,000 – £35,000", min: 20000, max: 35000 },
  { label: "£35,000+", min: 35000, max: 999999 },
];

export function ShopFilters({ searchParams }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([, v]) => v !== undefined)
      ) as Record<string, string>
    );
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => router.push(pathname);

  const hasFilters = Object.keys(searchParams).some(
    (k) => k !== "sort" && searchParams[k]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-body text-sm font-semibold text-charcoal-800 uppercase tracking-wider">
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs font-body text-terracotta-500 hover:text-terracotta-600 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterGroup title="Category">
        {CATEGORIES.map((cat) => (
          <FilterOption
            key={cat.id}
            label={cat.label}
            isActive={searchParams.category === cat.id}
            onClick={() =>
              updateParam("category", searchParams.category === cat.id ? null : cat.id)
            }
          />
        ))}
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price Range">
        {PRICE_RANGES.map((range) => {
          const isActive =
            searchParams.minPrice === String(range.min) &&
            searchParams.maxPrice === String(range.max);
          return (
            <FilterOption
              key={range.label}
              label={range.label}
              isActive={isActive}
              onClick={() => {
                if (isActive) {
                  updateParam("minPrice", null);
                  updateParam("maxPrice", null);
                } else {
                  updateParam("minPrice", String(range.min));
                  updateParam("maxPrice", String(range.max));
                }
              }}
            />
          );
        })}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-sand-200 pt-5">
      <h3 className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-widest mb-3">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterOption({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body transition-all duration-150",
        isActive
          ? "bg-forest-800 text-white font-medium"
          : "text-charcoal-600 hover:bg-sand-200 hover:text-charcoal-900"
      )}
    >
      <span
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
          isActive ? "border-white bg-white" : "border-sand-400"
        )}
      >
        {isActive && (
          <span className="w-2 h-2 bg-forest-800 rounded-sm block" />
        )}
      </span>
      {label}
    </button>
  );
}
