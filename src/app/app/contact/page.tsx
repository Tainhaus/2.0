// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  { id: "GENERAL", label: "General enquiry" },
  { id: "PRODUCT", label: "Product question" },
  { id: "CONFIGURATOR", label: "Design consultation" },
  { id: "TRADE", label: "Trade / contractor" },
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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      {/* Header */}
      <section className="bg-white py-16 border-b border-sand-200">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="divider mb-6" />
            <h1 className="font-display text-display-md text-charcoal-900 mb-4">
              Let&apos;s talk
              <br />
              <span className="text-gradient-forest italic">about your garden</span>
            </h1>
            <p className="font-body text-lg text-charcoal-600 leading-relaxed">
              Whether you know exactly what you want or you&apos;re just starting to explore,
              our team is here to help. No pressure, no jargon — just an honest conversation.
            </p>
          </div>
        </div>
      </section>

      <div className="container-site py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="bg-white rounded-3xl p-12 shadow-card text-center">
                <div className="w-16 h-16 bg-forest-800/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-forest-800" />
                </div>
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
                  Message received!
                </h2>
                <p className="font-body text-charcoal-600 mb-6 max-w-md mx-auto">
                  Thank you for getting in touch. One of our garden room specialists will 
                  be in contact within one working day.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/shop" className="btn-primary">
                    Browse while you wait
                  </Link>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-secondary"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-card space-y-6"
              >
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-6">
                  Send us a message
                </h2>

                {/* Enquiry type */}
                <div>
                  <label className="label">Type of enquiry</label>
                  <div className="flex flex-wrap gap-2">
                    {ENQUIRY_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, type: t.id }))}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-200",
                          form.type === t.id
                            ? "bg-forest-800 text-white"
                            : "bg-sand-200 text-charcoal-700 hover:bg-sand-300"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="label">
                      Full name <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      Email address <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    Phone number <span className="text-charcoal-400 font-normal normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="07700 900 123"
                    className="input-field"
                  />
                </div>

                {/* Product interest */}
                <div>
                  <label htmlFor="productInterest" className="label">
                    Which product interests you?
                  </label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    value={form.productInterest}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">— I&apos;m not sure yet —</option>
                    <option value="horizon">The Horizon (Garden Room)</option>
                    <option value="zenith">The Zenith (Wellness Pod)</option>
                    <option value="nordic">The Nordic (Sauna)</option>
                    <option value="studio">The Studio (Gym/Studio)</option>
                    <option value="annexe">The Annexe (Full Annexe)</option>
                    <option value="custom">Something bespoke</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="label">
                    Your message <span className="text-terracotta-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your garden, what you're hoping to use the space for, and any questions you have..."
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                {error && (
                  <p className="font-body text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-center text-charcoal-400">
                  We respond within one working day. By submitting you agree to our{" "}
                  <Link href="/privacy-policy" className="underline hover:text-charcoal-600">
                    privacy policy
                  </Link>
                  .
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
                {[
                  {
                    Icon: Phone,
                    label: "Call us",
                    value: "",
                    href: "tel:",
                  },
                  {
                    Icon: Mail,
                    label: "Email us",
                    value: "hello@tainhaus.co.uk",
                    href: "mailto:hello@tainhaus.co.uk",
                  },
                  {
                    Icon: MapPin,
                    label: "Visit us",
                    value: "14 Craftsman Way, Worcestershire WR4 0AB",
                    href: "https://maps.google.com",
                  },
                  {
                    Icon: Clock,
                    label: "Hours",
                    value: "Mon–Fri 8am–6pm · Sat 9am–4pm",
                    href: null,
                  },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 bg-forest-800/8 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-forest-800" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-charcoal-500 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="font-body text-sm text-charcoal-800 hover:text-forest-800 transition-colors underline-grow"
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-charcoal-800">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showroom image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=85"
                alt="Tainhaus showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-body text-xs text-white/80 font-semibold uppercase tracking-wide mb-1">
                  Open by appointment
                </p>
                <p className="font-body text-sm text-white">
                  Visit our showroom in Worcestershire to see our pods in person.
                </p>
              </div>
            </div>

            {/* Quick configurator CTA */}
            <div className="bg-forest-800 rounded-3xl p-7 text-white">
              <h4 className="font-display text-lg font-bold mb-2">
                Design your pod online
              </h4>
              <p className="font-body text-sm text-forest-200 mb-4">
                Use our configurator to explore sizes, finishes, and options before you call.
              </p>
              <Link href="/configurator" className="btn-terracotta w-full justify-center text-sm py-3">
                Open configurator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
