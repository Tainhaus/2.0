// src/components/ui/cookie-consent.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-charcoal-900 text-white rounded-2xl shadow-luxury-xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center">
            <Cookie className="w-5 h-5 text-sand-200" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold text-white mb-1">
              We use cookies
            </h3>
            <p className="font-body text-sm text-sand-400 leading-relaxed mb-4">
              We use essential cookies to make our site work, and optional analytics cookies to understand how you use it.
              By clicking &quot;Accept all&quot; you consent to all cookies. See our{" "}
              <Link href="/privacy" className="text-sand-300 underline underline-offset-2 hover:text-white transition-colors">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="btn-primary text-sm px-5 py-2.5"
              >
                Accept all
              </button>
              <button
                onClick={acceptEssential}
                className="font-body text-sm text-sand-400 hover:text-white transition-colors px-2 py-2.5"
              >
                Essential only
              </button>
            </div>
          </div>
          <button
            onClick={acceptEssential}
            className="shrink-0 text-sand-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
