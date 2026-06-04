// src/components/layout/navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

const NAV_LINKS = [
  {
    label: "Garden Rooms",
    href: "/shop",
    dropdown: [
      { label: "All Products", href: "/shop" },
      { label: "Garden Rooms", href: "/shop?category=GARDEN_ROOM" },
      { label: "Garden Pods", href: "/shop?category=GARDEN_POD" },
      { label: "Studios & Gyms", href: "/shop?category=STUDIO" },
      { label: "Saunas", href: "/shop?category=SAUNA" },
      { label: "Annexes", href: "/shop?category=GARDEN_ROOM&useCase=GUEST_ROOM" },
    ],
  },
  {
    label: "Design Your Pod",
    href: "/configurator",
  },
  {
    label: "Our Story",
    href: "/about",
  },
  {
    label: "Inspiration",
    href: "/inspiration",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHomePage
            ? "bg-sand-100/95 backdrop-blur-xl shadow-luxury border-b border-sand-200/60"
            : "bg-transparent"
        )}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group z-10">
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300",
                  isScrolled || !isHomePage
                    ? "bg-forest-800"
                    : "bg-white/20 backdrop-blur-sm"
                )}
              >
                <span className="text-white font-display font-bold text-lg leading-none">Y</span>
              </div>
              <span
                className={cn(
                  "font-display font-semibold text-lg tracking-tight transition-colors duration-300",
                  isScrolled || !isHomePage ? "text-charcoal-900" : "text-white"
                )}
              >
                Tainhaus
              </span>
            </Link>

            {/* Desktop nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative">
                  {link.dropdown ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.label ? null : link.label)
                      }
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-body font-medium",
                        "transition-all duration-200",
                        isScrolled || !isHomePage
                          ? "text-charcoal-700 hover:text-forest-800 hover:bg-forest-800/5"
                          : "text-white/90 hover:text-white hover:bg-white/10",
                        activeDropdown === link.label && "bg-white/10"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-full text-sm font-body font-medium",
                        "transition-all duration-200",
                        isScrolled || !isHomePage
                          ? "text-charcoal-700 hover:text-forest-800 hover:bg-forest-800/5"
                          : "text-white/90 hover:text-white hover:bg-white/10",
                        pathname === link.href && "text-forest-800 bg-forest-800/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown menu */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-luxury-lg border border-sand-200/60 py-2 z-50"
                      style={{ animation: "slideInDown 0.2s ease forwards" }}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2.5 text-sm font-body text-charcoal-700 hover:text-forest-800 hover:bg-forest-800/5 transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Phone */}
              <Link
                href="tel:+441234567890"
                className={cn(
                  "hidden xl:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium",
                  "transition-all duration-200",
                  isScrolled || !isHomePage
                    ? "text-charcoal-600 hover:text-forest-800 hover:bg-forest-800/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                01234 567 890
              </Link>

              {/* CTA */}
              <Link
                href="/contact"
                className={cn(
                  "hidden md:inline-flex btn-primary text-xs px-5 py-2.5",
                  !isScrolled && isHomePage && "bg-white text-forest-800 hover:bg-sand-100"
                )}
              >
                Get a Quote
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={cn(
                  "relative btn-icon",
                  isScrolled || !isHomePage ? "text-charcoal-700" : "text-white"
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

              {/* Mobile toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={cn(
                  "lg:hidden btn-icon",
                  isScrolled || !isHomePage ? "text-charcoal-700" : "text-white"
                )}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-sand-100 shadow-luxury-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-sand-200">
              <span className="font-display font-semibold text-forest-800">Menu</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="btn-icon text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center px-6 py-3.5 font-body font-medium text-charcoal-800 hover:text-forest-800 hover:bg-forest-800/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="bg-sand-200/50 border-y border-sand-200">
                      {link.dropdown.slice(1).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center pl-10 pr-6 py-2.5 font-body text-sm text-charcoal-600 hover:text-forest-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-5 border-t border-sand-200 space-y-3">
              <Link href="/contact" className="btn-primary w-full justify-center">
                Get a Free Quote
              </Link>
              <Link href="tel:+441234567890" className="btn-secondary w-full justify-center">
                <Phone className="w-4 h-4" />
                01234 567 890
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
