// src/components/ui/newsletter-form.tsx
"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  className?: string;
}

export function NewsletterForm({ variant = "light", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-3 py-3", className)}>
        <CheckCircle2 className="w-5 h-5 text-terracotta-300 shrink-0" />
        <p className={cn(
          "font-body text-sm",
          variant === "dark" ? "text-forest-200" : "text-charcoal-700"
        )}>
          Welcome aboard! Check your inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className={cn(
            "w-full px-4 py-3.5 rounded-full font-body text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            variant === "dark"
              ? "bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:ring-white/30 focus:ring-offset-forest-800 focus:bg-white/15"
              : "bg-white text-charcoal-800 placeholder:text-charcoal-400 border border-sand-300 focus:ring-forest-600/20 focus:ring-offset-sand-100 focus:border-forest-600"
          )}
        />
        {status === "error" && (
          <p className="font-body text-xs text-red-400 mt-1 pl-4">{error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading" || !email}
        className={cn(
          "flex items-center gap-2 px-6 py-3.5 rounded-full font-body text-sm font-medium",
          "transition-all duration-200 shrink-0",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          variant === "dark"
            ? "bg-terracotta-500 text-white hover:bg-terracotta-400"
            : "bg-forest-800 text-white hover:bg-forest-700"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
