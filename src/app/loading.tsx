// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-sand-100/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-sand-300" />
          <div className="absolute inset-0 rounded-full border-2 border-forest-800 border-t-transparent animate-spin" />
        </div>
        <p className="font-display text-sm font-semibold text-forest-800 tracking-wide">
          Tainhaus
        </p>
      </div>
    </div>
  );
}
