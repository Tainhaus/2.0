// src/components/ui/cookie-consent.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("tainhaus-cookie-consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("tainhaus-cookie-consent", "all");
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem("tainhaus-cookie-consent", "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
    >
      <div className="max-w-2xl mx-auto bg-charcoal-900 text-white rounded-xl shadow-luxury-xl px-4 py-3 flex items-center gap-4">
        <Cookie className="w-4 h-4 text-sand-400 shrink-0" />
        <p className="font-body text-xs text-sand-400 flex-1 leading-relaxed">
          We use essential and optional analytics cookies.{" "}
          <Link href="/privacy" className="text-sand-300 underline underline-offset-2 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={acceptEssential}
            className="font-body text-xs text-sand-500 hover:text-white transition-colors whitespace-nowrap"
          >
            Essential only
          </button>
          <button
            onClick={acceptAll}
            className="btn-primary text-xs px-4 py-2 whitespace-nowrap"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
