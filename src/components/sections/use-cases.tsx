// src/components/sections/use-cases.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const USE_CASES = [
  {
    title: "Home Office",
    subtitle: "Focus. Deep work. No interruptions.",
    description:
      "Separate your work and home life without a commute. Ultrafast broadband, perfect acoustics, and a space that says 'professional' — just steps from the kitchen.",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85",
    href: "/shop?useCase=HOME_OFFICE",
    tag: "Most popular",
    gradient: "from-forest-800 to-olive-700",
  },
  {
    title: "Wellness & Gym",
    subtitle: "Move. Sweat. Restore.",
    description:
      "A sprung floor, mirror wall, and your choice of music at any volume. No monthly fees. No waiting for equipment. Just you and your practice.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=85",
    href: "/shop?useCase=GYM_WELLNESS",
    tag: "Trending",
    gradient: "from-terracotta-700 to-terracotta-500",
  },
  {
    title: "Office Space",
    subtitle: "Focus. Clarity. Productivity.",
    description:
      "A dedicated workspace steps from your back door. No commute, no distractions — just a professional environment that helps you do your best work.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=900&q=85",
    href: "/shop?useCase=HOME_OFFICE",
    tag: "Popular",
    gradient: "from-forest-800 to-forest-600",
  },
  {
    title: "Art & Music Studio",
    subtitle: "Create. Express. Make noise.",
    description:
      "A north-facing skylight for artists. Full acoustic treatment for musicians. A space tuned perfectly to your creative practice.",
    image: "https://images.unsplash.com/photo-1590736969596-72f8f9ed7aed?w=900&q=85",
    href: "/shop?useCase=ART_STUDIO",
    tag: "Creative",
    gradient: "from-olive-700 to-forest-600",
  },
  {
    title: "Guest Annexe",
    subtitle: "Comfort. Privacy. Independence.",
    description:
      "Give guests or family members a self-contained suite. Their own entrance, shower, and kitchen. Close, but with space.",
    image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=900&q=85",
    href: "/shop?useCase=GUEST_ROOM",
    tag: "Family",
    gradient: "from-sand-500 to-sand-400",
  },
  {
    title: "Reading Retreat",
    subtitle: "Still. Warm. Yours alone.",
    description:
      "A sanctuary for the mind. Morning light, a reading chair, the hum of the garden outside. Properly away from everything.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85",
    href: "/shop?useCase=READING_RETREAT",
    tag: "Tranquil",
    gradient: "from-forest-700 to-forest-500",
  },
];

export function UseCasesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" className="section bg-sand-100 overflow-hidden">
      <div className="container-site mb-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="divider mb-5" />
            <h2 className="font-display text-display-md text-charcoal-900 max-w-xl">
              One garden.
              <br />
              <span className="text-gradient-forest italic">Infinite possibilities.</span>
            </h2>
          </div>
          <p className="font-body text-charcoal-600 max-w-sm leading-relaxed">
            From focused work to deep rest, from creative flow to physical movement — 
            your garden pod adapts to every chapter of your life.
          </p>
        </div>
      </div>

      {/* Cards — horizontal scroll on mobile, grid on desktop */}
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, i) => (
            <UseCaseCard key={uc.title} {...uc} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container-site mt-12 flex justify-center">
        <Link href="/configurator" className="btn-secondary group">
          Design your custom space
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

function UseCaseCard({
  title,
  subtitle,
  description,
  image,
  href,
  tag,
  index,
}: (typeof USE_CASES)[number] & { index: number }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="badge-forest text-xs backdrop-blur-sm bg-white/90">
            {tag}
          </span>
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-luxury">
          <ArrowRight className="w-4 h-4 text-forest-800" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-body text-xs font-semibold text-terracotta-500 uppercase tracking-widest mb-1.5">
          {subtitle}
        </p>
        <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2 group-hover:text-forest-800 transition-colors duration-200">
          {title}
        </h3>
        <p className="font-body text-sm text-charcoal-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
