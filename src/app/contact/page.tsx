// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Clock, ArrowRight, CheckCircle2, Loader2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  { id: "GENERAL",      label: "General enquiry" },
  { id: "PRODUCT",      label: "Product question" },
  { id: "CONFIGURATOR", label: "Design consultation" },
  { id: "TRADE",        label: "Trade / contractor" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "GENERAL",
    productInterest: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try emailing us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 pt-24">
      {/* Hero */}
      <section className="bg-forest-800 py-16 md:py-20">
        <div className="container-site max-w-3xl">
          <div className="w-12 h-0.5 bg-terracotta-400 rounded-full mb-5" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Get in touch
          </h1>
          <p className="font-body text-lg text-forest-200 leading-relaxed">
            Whether you have a question about a product, want to discuss a custom build,
            or are ready to place an order — we&apos;re here to help.
          </p>
        </div>
      </section>

      <div className="container-site py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="bg-white rounded-3xl p-10 shadow-card text-center">
                <CheckCircle2 className="w-14 h-14 text-forest-700 mx-auto mb-5" />
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
                  Message received
                </h2>
                <p className="font-body text-charcoal-600 max-w-md mx-auto mb-6">
                  Thank you for getting in touch. A member of our team will respond within one working day.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "", type: "GENERAL", productInterest: "" }); }}
                  className="inline-flex items-center gap-2 text-forest-800 font-body font-semibold hover:underline"
                >
                  Send another message <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-card space-y-6">
                <h2 className="font-display text-2xl font-bold text-charcoal-900">Send us a message</h2>

                {/* Enquiry type */}
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, type: type.id }))}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                        form.type === type.id
                          ? "bg-forest-800 text-white"
                          : "bg-sand-200 text-charcoal-700 hover:bg-sand-300"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                      Full name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                      Email address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Product interest */}
                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                    Product of interest
                  </label>
                  <select
                    name="productInterest"
                    value={form.productInterest}
                    onChange={handleChange}
                    className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent bg-white"
                  >
                    <option value="">Select a product (optional)</option>
                    <option value="Santorini">Santorini</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Corsica">Corsica</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Capri">Capri</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bali">Bali</option>
                    <option value="Ibiza">Ibiza</option>
                    <option value="Custom Build">Custom Build</option>
                    <option value="Custom Option">Something different — let's chat</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us what you're looking for, your garden size, or any questions you have..."
                    className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none"
                  />
                </div>

                {error && (
                  <p className="font-body text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-700 disabled:bg-sand-300 text-white font-body font-semibold py-4 rounded-2xl transition-colors"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>Send message <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="font-body text-xs text-charcoal-400 text-center">
                  We aim to respond within one working day.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact details */}
            <div className="bg-white rounded-3xl p-7 shadow-card">
              <h3 className="font-display text-xl font-bold text-charcoal-900 mb-5">
                Get in touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-xs text-charcoal-400 uppercase tracking-wide mb-0.5">Phone</p>
                    <a href="tel:+447859765130" className="font-body text-sm font-medium text-charcoal-800 hover:text-forest-800 transition-colors">
                      07859 765130
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-xs text-charcoal-400 uppercase tracking-wide mb-0.5">Email</p>
                    <a href="mailto:info@tainhaus.co.uk" className="font-body text-sm font-medium text-charcoal-800 hover:text-forest-800 transition-colors">
                      info@tainhaus.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-xs text-charcoal-400 uppercase tracking-wide mb-0.5">Hours</p>
                    <p className="font-body text-sm font-medium text-charcoal-800">Mon–Fri: 7:00am – 6:00pm</p>
                    <p className="font-body text-sm font-medium text-charcoal-800">Saturday: 9:00am – 5:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote CTA */}
            <div className="bg-forest-800 rounded-3xl p-7">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Ready to design your space?
              </h3>
              <p className="font-body text-sm text-forest-200 mb-5 leading-relaxed">
                Use our interactive configurator to choose your cabin type, size and colour — then request a tailored quote.
              </p>
              <Link
                href="/configurator"
                className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white font-body font-semibold text-sm px-5 py-3 rounded-full transition-colors"
              >
                Design Your Space <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Response time */}
            <div className="bg-sand-200 rounded-3xl p-7">
              <p className="font-body text-sm text-charcoal-700 leading-relaxed">
                <strong className="text-charcoal-900">We respond to all enquiries within one working day.</strong>{" "}
                For urgent matters please email us directly at{" "}
                <a href="mailto:info@tainhaus.co.uk" className="text-forest-800 underline">
                  info@tainhaus.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
