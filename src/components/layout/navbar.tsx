// src/components/layout/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { Logo } from "@/components/ui/logo";

const NAV_LINKS = [
  { label: "Log Cabins",        href: "/shop" },
  { label: "Design Your Space", href: "/configurator" },
  { label: "Our Story",         href: "/about" },
  { label: "Contact",           href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname                         = usePathname();
  const { getItemCount, openCart }       = useCartStore();
  const itemCount                        = getItemCount();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const isDark     = isScrolled || !isHomePage;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isDark
            ? "bg-sand-100/95 backdrop-blur-xl shadow-luxury border-b border-sand-200/60"
            : "bg-gradient-to-b from-charcoal-950/40 to-transparent sm:bg-transparent"
        )}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between h-14 sm:h-16 md:h-20">

            {/* Logo */}
            <Logo
              variant={isDark ? "dark" : "light"}
              size="sm"
              className="z-10"
            />

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                    isDark
                      ? "text-charcoal-700 hover:text-forest-800 hover:bg-forest-800/5"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                    pathname === link.href && "text-forest-800 bg-forest-800/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden md:inline-flex btn-terracotta text-xs px-5 py-2.5"
              >
                Get a Quote
              </Link>

              <button
                onClick={openCart}
                className={cn(
                  "relative btn-icon",
                  isDark ? "text-charcoal-700" : "text-white"
                )}
                aria-label={`Cart, ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-terracotta-500 text-white text-2xs font-body font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={cn(
                  "lg:hidden btn-icon",
                  isDark ? "text-charcoal-700" : "text-white"
                )}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-sand-100 shadow-luxury-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-sand-200">
              <Logo variant="dark" size="sm" />
              <button onClick={() => setIsMobileOpen(false)} className="btn-icon text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-6 py-3.5 font-body font-medium text-charcoal-800 hover:text-forest-800 hover:bg-forest-800/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-5 border-t border-sand-200">
              <Link href="/contact" className="btn-terracotta w-full justify-center">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
