// src/components/shop/reviews-section.tsx
// Reviews hidden — no verified reviews yet
import type { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  return null;
}
