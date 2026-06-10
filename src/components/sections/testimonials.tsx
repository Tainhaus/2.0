// src/components/sections/testimonials.tsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    title: "Best investment we've ever made",
    body: "I'm 67 and I use The Horizon every single morning as my reading room and art studio. It's the most peaceful space I've ever had. The installation team were absolute gentlemen -” professional, tidy, and finished in a day. I tell everyone about Tainhaus.",
    author: "Margaret H.",
    age: "67",
    use: "Art Studio & Reading Room",
    location: "Worcestershire",
    product: "The Horizon",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&q=80",
    verified: true,
  },
  {
    id: 2,
    rating: 5,
    title: "Cancelled my gym membership the day it went up",
    body: "The Studio with the sprung floor is genuinely better than the gym I was using. I do HIIT, pilates, and weights every morning. My partner does yoga in the evenings. It's paid for itself many times over in membership fees alone -” let alone the time saved.",
    author: "Amanda W.",
    age: "52",
    use: "Home Gym",
    location: "Surrey",
    product: "The Studio",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",
    verified: true,
  },
  {
    id: 3,
    rating: 5,
    title: "My work-life balance is transformed",
    body: "I'm 34, two kids, working from home was a disaster until we got The Horizon. The separation from the house is everything. I close the pod door at 6pm and I'm done for the day. It's been incredible for my mental health.",
    author: "James R.",
    age: "34",
    use: "Home Office",
    location: "Hampshire",
    product: "The Horizon",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    verified: true,
  },
  {
    id: 4,
    rating: 5,
    title: "My yoga clients are blown away every single class",
    body: "I run a private yoga and sound healing practice from The Zenith. Six clients at a time, perfect acoustics, infrared heating, cork floor. It feels like a luxury studio. I've doubled my rates since getting it -” my clients think I've found a new venue.",
    author: "Priya K.",
    age: "34",
    use: "Yoga Studio",
    location: "North Yorkshire",
    product: "The Zenith",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
    verified: true,
  },
  {
    id: 5,
    rating: 5,
    title: "Mum lives 15 metres from us, in total independence",
    body: "My mother is 78. We had the Annexe built for her with a full wet room and kitchenette. She has complete privacy and independence, but we're 30 seconds away if she needs us. The planning team handled everything. I can't express how much peace of mind it's given our whole family.",
    author: "Helen C.",
    age: "53",
    use: "Granny Annexe",
    location: "Kent",
    product: "The Annexe",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    verified: true,
  },
  {
    id: 6,
    rating: 5,
    title: "The Nordic sauna in January -” absolutely incredible",
    body: "I'm 45 and I've wanted a home sauna for 20 years. The Nordic is perfect. It heats to 90Â°C in 25 minutes. My wife and I use it three or four times a week. The alder wood smell is gorgeous. It dropped into our garden in half a day. Completely life-changing.",
    author: "Mike T.",
    age: "45",
    use: "Home Sauna",
    location: "Cheshire",
    product: "The Nordic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    verified: true,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = (dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="section-sm bg-forest-800 relative overflow-hidden">
      <div className="absolute top-10 right-12 opacity-5">
        <Quote className="w-48 h-48 text-white fill-white" />
      </div>

      <div className="container-site relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-terracotta-400 rounded-full" />
          </div>
          <h2 className="font-display text-display-sm text-white mb-3">
            Loved across every{" "}
            <span className="text-terracotta-300 italic">generation</span>
          </h2>
          <p className="font-body text-sm text-forest-300 max-w-lg mx-auto">
            From 22 to 82 -” our cabins are transforming lives across the UK.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              "bg-white/8 backdrop-blur-md rounded-3xl p-7 md:p-10 border border-white/10 transition-all duration-400",
              isAnimating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
            )}
          >
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-terracotta-400 text-terracotta-400" />
              ))}
            </div>
            <blockquote className="font-display text-lg md:text-xl text-white font-medium leading-relaxed mb-6 italic">
              &ldquo;{active.body}&rdquo;
            </blockquote>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-forest-700 shrink-0">
                  <Image src={active.image} alt={active.author} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-sm">
                    {active.author}
                    {active.age && <span className="font-normal text-forest-300 ml-2 text-xs">Age {active.age}</span>}
                  </p>
                  <p className="font-body text-xs text-forest-400">{active.use} Â· {active.location}</p>
                </div>
              </div>
              {active.verified && (
                <span className="badge bg-terracotta-500/20 text-terracotta-300 text-xs">âœ“ Verified purchase</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === activeIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200" aria-label="Previous">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => navigate(1)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200" aria-label="Next">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
