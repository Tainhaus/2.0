// src/app/loading.tsx
// Minimal loading state — just a thin progress bar at the top
// Does NOT block the page with a full-screen overlay
export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-sand-200">
      <div
        className="h-full bg-terracotta-500 animate-pulse"
        style={{ width: "60%" }}
      />
    </div>
  );
}
