// src/components/sections/hero.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    src: "/hero-1.jpg.png",
    alt: "Premium log cabin in a beautifully landscaped garden",
    headline: "Your garden,",
    headlineAccent: "transformed.",
    sub: "Premium log cabins and garden rooms — crafted for every life stage, every dream.",
    cta: "Shop Garden Rooms",
    ctaHref: "/shop",
  },
  {
    // Swapped: was hero-2 (kitchen) — now using hero-3 (timber garden room)
    src: "/hero-3.jpg.png",
    alt: "Beautiful timber garden room with natural cladding — perfect home office",
    headline: "Work from",
    headlineAccent: "paradise.",
    sub: "Home offices that make your commute a five-second walk through the garden.",
    cta: "See the range",
    ctaHref: "/shop",
  },
  {
    src: "/hero-4.jpg.png",
    alt: "Premium log cabin installed in a UK garden",
    headline: "Built to last.",
    headlineAccent: "Loved forever.",
    sub: "Delivered and installed across the UK in just 4 to 6 weeks.",
    cta: "Design Your Space",
    ctaHref: "/configurator",
  },
  {
    src: "/hero-2.jpg.png",
    alt: "Contemporary outdoor kitchen and garden bar pod",
    headline: "From idea",
    headlineAccent: "to your garden.",
    sub: "Call or order today — most customers receive their cabin within 4 to 6 weeks.",
    cta: "Get a quote",
    ctaHref: "/contact",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mark as loaded immediately — don't wait
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Preload all hero images in background
  useEffect(() => {
    let loaded = 0;
    HERO_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.onload = () => {
        loaded++;
        if (loaded === 1) setImagesReady(true); // show content after first loads
      };
      img.onerror = () => {
        loaded++;
        if (loaded === 1) setImagesReady(true);
      };
      img.src = slide.src;
    });
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] md:h-screen min-h-[480px] max-h-[1080px] overflow-hidden bg-forest-950">
      {/* Background images — render all, show only current */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === currentSlide ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== currentSlide}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.alt}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/55 via-charcoal-950/35 to-charcoal-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/65 via-transparent to-transparent hidden sm:block" />
        </div>
      ))}

      {/* Content — shows immediately, no delay */}
      <div className="relative z-10 h-full container-site flex flex-col justify-center">
        <div className="max-w-2xl pt-14 sm:pt-20 px-1">
          {/* Eyebrow */}
          <div
            className={cn(
              "inline-flex items-center gap-2 mb-6 transition-all duration-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-pulse" />
            <span className="font-body text-xs font-semibold text-sand-300 uppercase tracking-[0.2em]">
              Handcrafted in Britain
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "font-display font-bold text-white mb-4 transition-all duration-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: "80ms",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            {slide.headline}
            <br />
            <span className="text-terracotta-400 italic">{slide.headlineAccent}</span>
          </h1>

          {/* Sub */}
          <p
            className={cn(
              "font-body text-lg md:text-xl text-sand-300 mb-8 max-w-lg leading-relaxed transition-all duration-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "160ms" }}
          >
            {slide.sub}
          </p>

          {/* CTA */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 transition-all duration-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "240ms" }}
          >
            <Link
              href={slide.ctaHref}
              style={{
                backgroundColor: "#C26B4A",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              {slide.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col gap-2 hidden md:flex">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              startInterval();
            }}
            className={cn(
              "w-1.5 rounded-full transition-all duration-300",
              i === currentSlide ? "h-8 bg-white" : "h-1.5 bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
          aria-label="Scroll down"
        >
          <span className="font-body text-xs uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
