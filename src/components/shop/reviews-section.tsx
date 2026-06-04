// src/components/shop/reviews-section.tsx
"use client";

import { useState } from "react";
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 4);

  // Rating distribution
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  return (
    <section className="mt-20">
      <div className="border-t border-sand-200 pt-12">
        <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-10">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          {/* Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-card text-center">
            <div className="font-display text-7xl font-bold text-forest-800 mb-2">
              {rating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    "w-5 h-5",
                    s <= Math.round(rating)
                      ? "fill-terracotta-400 text-terracotta-400"
                      : "fill-sand-300 text-sand-300"
                  )}
                />
              ))}
            </div>
            <p className="font-body text-sm text-charcoal-500">
              Based on {reviewCount} verified reviews
            </p>

            {/* Distribution */}
            <div className="mt-6 space-y-2 text-left">
              {dist.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="font-body text-xs text-charcoal-600 w-3 shrink-0">
                    {star}
                  </span>
                  <Star className="w-3 h-3 fill-terracotta-400 text-terracotta-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-sand-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta-400 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-body text-xs text-charcoal-500 w-6 text-right shrink-0">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent reviews */}
          <div className="lg:col-span-2 space-y-4">
            {displayed.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {reviews.length > 4 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-secondary w-full justify-center mt-2"
              >
                {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      {/* Stars */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={cn(
                "w-4 h-4",
                s <= review.rating
                  ? "fill-terracotta-400 text-terracotta-400"
                  : "fill-sand-300 text-sand-300"
              )}
            />
          ))}
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 text-forest-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-body text-xs">Verified purchase</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h4 className="font-display text-base font-bold text-charcoal-900 mb-2">
        &ldquo;{review.title}&rdquo;
      </h4>

      {/* Body */}
      <p className="font-body text-sm text-charcoal-700 leading-relaxed mb-4">
        {review.body}
      </p>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-sm font-semibold text-charcoal-800">
            {review.authorName}
            {review.authorAge && (
              <span className="font-normal text-charcoal-500 ml-1.5">
                · Age {review.authorAge}
              </span>
            )}
          </p>
          {review.authorUse && (
            <p className="font-body text-xs text-terracotta-600 mt-0.5">
              Used as: {review.authorUse}
            </p>
          )}
        </div>
        <p className="font-body text-xs text-charcoal-400">
          {new Date(review.createdAt).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
