// src/app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center pt-20">
      <div className="container-narrow py-20 text-center">
        <div className="relative w-64 h-48 mx-auto mb-10 rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="Beautiful garden room"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sand-100/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-bold text-forest-800"
              style={{ fontSize: "6rem", lineHeight: 1, opacity: 0.3 }}
            >
              404
            </span>
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-4">
          This page has wandered off.
        </h1>
        <p className="font-body text-lg text-charcoal-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the page you were looking for. It may have moved, 
          or perhaps it never existed — like a perfect garden before it&apos;s built.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link href="/shop" className="btn-secondary">
            <ShoppingBag className="w-4 h-4" />
            Browse our pods
          </Link>
          <Link href="/contact" className="btn-ghost text-charcoal-700">
            Contact us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
