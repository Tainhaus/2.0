// src/components/sections/hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_STATS = [
  { value: "2,400+", label: "Happy homeowners" },
  { value: "10yr", label: "Structural warranty" },
  { value: "4.9â˜…", label: "Average review" },
  { value: "6â€“8wk", label: "Lead time" },
];

const HERO_SLIDES = [
  {
    src: "/hero-1.jpg",
    alt: "Premium timber garden room in a beautifully landscaped garden",
    headline: "Your garden,",
    headlineAccent: "transformed.",
    sub: "Premium log cabins and garden rooms â€” crafted for every life stage, every dream.",
    cta: "Shop Garden Rooms",
    ctaHref: "/shop",
  },
  {
    src: "/hero-2.jpg",
    alt: "Contemporary garden room seamlessly extending a family home",
    headline: "Work from",
    headlineAccent: "paradise.",
    sub: "Home offices that make your commute a five-second walk through the garden.",
    cta: "See Office Pods",
    ctaHref: "/shop",
  },
  {
    src: "/hero-3.jpg",
    alt: "Beautiful garden room with large doors and natural timber cladding",
    headline: "Built to last.",
    headlineAccent: "Loved forever.",
    sub: "Delivered and installed across the UK in just 4 to 6 weeks.",
    cta: "Design Your Space",
    ctaHref: "/configurator",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden bg-forest-950">
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1500",
            i === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/65 via-charcoal-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full container-site flex flex-col justify-center">
        <div className="max-w-2xl pt-20">
          {/* Pre-headline label */}
          <div
            className={cn(
              "inline-flex items-center gap-2 mb-6 transition-all duration-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-pulse-gentle" />
            <span className="font-body text-xs font-semibold text-sand-300 uppercase tracking-[0.2em]">
              Handcrafted in Britain
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "font-display font-bold text-white mb-4 transition-all duration-800",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: "200ms",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            {slide.headline}
            <br />
            <span className="text-gradient-warm italic">{slide.headlineAccent}</span>
          </h1>

          {/* Sub */}
          <p
            className={cn(
              "font-body text-lg md:text-xl text-sand-300 mb-8 max-w-lg leading-relaxed transition-all duration-800",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "350ms" }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 transition-all duration-800",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white font-body font-semibold text-sm px-7 py-4 rounded-full transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5"
            >
              {slide.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2.5 text-white/90 hover:text-white font-body text-sm font-medium transition-colors duration-200 group"
            >
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/50 transition-all duration-200">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              Watch the build
            </button>
          </div>
        </div>


      </div>

      {/* Slide indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 hidden md:flex">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
              }, 6000);
            }}
            className={cn(
              "w-1.5 rounded-full transition-all duration-400",
              i === currentSlide
                ? "h-8 bg-white"
                : "h-1.5 bg-white/30 hover:bg-white/50"
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
          <span className="font-body text-2xs uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Video modal */}
      {showVideo && (
        <div
          className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl mx-8 aspect-video bg-charcoal-900 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              âœ•
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/60 font-body text-sm">
                Replace with your brand video embed
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
