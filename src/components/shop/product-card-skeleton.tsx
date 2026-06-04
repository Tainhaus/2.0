// src/components/shop/product-card-skeleton.tsx
export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-card animate-pulse">
      <div className="aspect-[4/3] bg-sand-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 bg-sand-200 rounded-full w-1/3" />
        <div className="h-5 bg-sand-200 rounded-full w-2/3" />
        <div className="h-3 bg-sand-200 rounded-full w-full" />
        <div className="h-3 bg-sand-200 rounded-full w-4/5" />
        <div className="h-4 bg-sand-200 rounded-full w-1/2 mt-4" />
      </div>
    </div>
  );
}
