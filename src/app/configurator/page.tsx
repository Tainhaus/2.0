// src/app/configurator/page.tsx
"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Ruler, Palette, MessageSquare, Loader2, Phone, Briefcase, Dumbbell, Palette as PaletteIcon, BedDouble, BookOpen, Wind, Music, Sparkles, HelpCircle } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Step = "type" | "size" | "colour" | "quote";

const POD_TYPES = [
  {
    id: "garden-room",
    name: "Garden Room",
    desc: "Versatile, fully-insulated room for year-round use",
    price: 5000,
    image: "/products/sicilia-birch.png",
  },
  {
    id: "wellness-pod",
    name: "Ibiza",
    desc: "Premium outdoor entertaining suite with kitchen and bar",
    price: 12100,
    image: "/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m-birch.png",
  },
  {
    id: "studio",
    name: "Studio / Gym",
    desc: "Light-filled creative or fitness space in your garden",
    price: 12400,
    image: "/products/oriental-4-4-7x3-2m-log-cabin-birch.png",
  },
  {
    id: "annexe",
    name: "Full Annexe",
    desc: "Complete two-bedroom living suite — kitchen, bathroom included",
    price: 62200,
    image: "/products/monaco-2-bed-log-cabin-birch.png",
  },
  {
    id: "custom",
    name: "Custom Build",
    desc: "Something unique? Talk to us and we'll design exactly what you need.",
    price: 0,
    image: "",
    isCustom: true,
  },
];

const SIZES = [
  { id: "xs", label: "Compact",  dims: "2.5 × 3.0m", sqm: 7.5,  adder: 0     },
  { id: "sm", label: "Small",    dims: "3.0 × 4.0m", sqm: 12,   adder: 2500  },
  { id: "md", label: "Medium",   dims: "3.5 × 5.0m", sqm: 17.5, adder: 5500  },
  { id: "lg", label: "Large",    dims: "4.0 × 6.0m", sqm: 24,   adder: 9500  },
  { id: "xl", label: "X-Large",  dims: "5.0 × 7.0m", sqm: 35,   adder: 16000 },
];

// Standard wall colours — no exterior cladding images
const COLOURS = [
  { id: "birch",       name: "Birch",       hex: "#D4C5A9", border: "#B8A98A" },
  { id: "oak",         name: "Oak",         hex: "#B8864E", border: "#9A6E3A" },
  { id: "stone-grey",  name: "Stone Grey",  hex: "#8A8F8A", border: "#6E7370" },
  { id: "black",       name: "Black",       hex: "#1A1A1A", border: "#000000" },
  { id: "white",       name: "White",       hex: "#F5F5F0", border: "#D0CFC8" },
  { id: "sage",        name: "Sage Green",  hex: "#7D9B76", border: "#607A5A" },
  { id: "slate-blue",  name: "Slate Blue",  hex: "#6B7FA3", border: "#4E6280" },
  { id: "terracotta",  name: "Terracotta",  hex: "#C26B4A", border: "#A0533A" },
  { id: "custom",      name: "Custom",      hex: "", border: "", isCustom: true },
];

const STEPS: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "type",   label: "Type",   icon: MessageSquare },
  { id: "size",   label: "Size",   icon: Ruler         },
  { id: "colour", label: "Colour", icon: Palette       },
  { id: "quote",  label: "Quote",  icon: Check         },
];

export default function ConfiguratorPage() {
  const [step, setStep]               = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<typeof POD_TYPES[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[0] | null>(null);
  const [selectedColour, setSelectedColour] = useState<typeof COLOURS[0] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const stepIndex = STEPS.findIndex(s => s.id === step);
  const totalPrice = (selectedType?.price ?? 0) + (selectedSize?.adder ?? 0);
  const isCustomBuild = selectedType?.isCustom;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      <section className="bg-forest-800 py-12 md:py-16">
        <div className="container-site max-w-3xl">
          <div className="w-10 h-0.5 bg-terracotta-400 rounded-full mb-5" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Design Your Space
          </h1>
          <p className="font-body text-forest-200 text-lg">
            Tell us what you need and we&apos;ll put together a tailored quote.
          </p>
        </div>
      </section>

      <div className="container-site max-w-3xl py-12">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                stepIndex > i ? "bg-forest-800 text-white" :
                stepIndex === i ? "bg-terracotta-500 text-white" :
                "bg-sand-300 text-charcoal-500"
              )}>
                {stepIndex > i ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn("font-body text-sm hidden sm:block", stepIndex === i ? "text-charcoal-900 font-semibold" : "text-charcoal-400")}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-sand-300 mx-1" />}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-card">
            <div className="w-16 h-16 bg-forest-800/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-forest-800" />
            </div>
            <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">Quote request received</h2>
            <p className="font-body text-charcoal-600 max-w-md mx-auto mb-6">
              Thank you. One of our team will be in touch within one working day with your tailored quote.
            </p>
            <a href="/shop" className="inline-flex items-center gap-2 bg-forest-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-forest-700 transition-colors">
              Browse products while you wait <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">

            {/* STEP 1: Type */}
            {step === "type" && (
              <div className="p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">What are you looking for?</h2>
                <p className="font-body text-charcoal-500 mb-7">Select the type that best matches your vision.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {POD_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type);
                        if (type.isCustom) {
                          setStep("quote");
                        } else {
                          setStep("size");
                        }
                      }}
                      className={cn(
                        "text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                        selectedType?.id === type.id ? "border-forest-800" : "border-sand-200"
                      )}
                    >
                      {!type.isCustom && type.image && (
                        <div className="h-36 bg-sand-200 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={type.image} alt={type.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      {type.isCustom && (
                        <div className="h-36 bg-forest-800 flex items-center justify-center">
                          <Phone className="w-10 h-10 text-white/50" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display font-bold text-charcoal-900">{type.name}</h3>
                          {type.price > 0 && (
                            <span className="font-body text-xs text-terracotta-500 font-semibold shrink-0">from {formatPrice(type.price)}</span>
                          )}
                          {type.isCustom && (
                            <span className="font-body text-xs text-forest-800 font-semibold shrink-0">Call us</span>
                          )}
                        </div>
                        <p className="font-body text-xs text-charcoal-500 mt-1">{type.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Size */}
            {step === "size" && (
              <div className="p-8 md:p-10">
                <button onClick={() => setStep("type")} className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal-700 mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">What size do you need?</h2>
                <p className="font-body text-charcoal-500 mb-7">Choose the size that fits your garden and budget.</p>
                <div className="space-y-3">
                  {SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => { setSelectedSize(size); setStep("colour"); }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:border-forest-800/40",
                        selectedSize?.id === size.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200"
                      )}
                    >
                      <div>
                        <span className="font-display font-bold text-charcoal-900 mr-3">{size.label}</span>
                        <span className="font-body text-sm text-charcoal-500">{size.dims} · {size.sqm}m²</span>
                      </div>
                      {size.adder > 0 && (
                        <span className="font-body text-sm font-semibold text-terracotta-500">+{formatPrice(size.adder)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Colour */}
            {step === "colour" && (
              <div className="p-8 md:p-10">
                <button onClick={() => setStep("size")} className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal-700 mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">Choose a colour</h2>
                <p className="font-body text-charcoal-500 mb-2">Select a standard wall colour for your cabin.</p>
                <p className="font-body text-xs text-charcoal-400 mb-7 bg-sand-100 rounded-xl px-4 py-2.5 border border-sand-200">
                  🎨 <strong>Exterior cladding options are not available online</strong> — select &ldquo;Custom&rdquo; and our team will discuss bespoke cladding with you directly.
                </p>
                <div className="flex flex-wrap gap-5 mb-8">
                  {COLOURS.map((colour) => {
                    const isSelected = selectedColour?.id === colour.id;
                    if (colour.isCustom) {
                      return (
                        <button
                          key={colour.id}
                          onClick={() => { setSelectedColour(colour); setStep("quote"); }}
                          className={cn(
                            "flex flex-col items-center gap-2 group",
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-200 bg-gradient-to-br from-terracotta-400 to-forest-800",
                            isSelected ? "border-forest-800 scale-110 shadow-md" : "border-transparent hover:scale-105"
                          )}>
                            <span className="text-white text-lg">✦</span>
                          </div>
                          <span className="font-body text-xs font-medium text-charcoal-600">Custom</span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={colour.id}
                        onClick={() => setSelectedColour(colour)}
                        className="flex flex-col items-center gap-2"
                        title={colour.name}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full border-4 transition-all duration-200 shadow-sm",
                            isSelected ? "border-forest-800 scale-110 shadow-md" : "border-transparent hover:scale-105"
                          )}
                          style={{
                            backgroundColor: colour.hex,
                            outline: `2px solid ${colour.border}`,
                          }}
                        >
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <Check className={cn("w-5 h-5 drop-shadow", colour.id === "black" ? "text-white" : "text-charcoal-900")} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <span className={cn("font-body text-xs font-medium text-center", isSelected ? "text-forest-800 font-semibold" : "text-charcoal-500")}>
                          {colour.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep("quote")}
                  disabled={!selectedColour}
                  className="w-full flex items-center justify-center gap-2 bg-forest-800 disabled:bg-sand-300 disabled:text-charcoal-400 text-white font-semibold py-4 rounded-2xl transition-colors hover:bg-forest-700"
                >
                  Continue to quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 4: Quote */}
            {step === "quote" && (
              <div className="p-8 md:p-10">
                <button onClick={() => setStep(isCustomBuild ? "type" : "colour")} className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal-700 mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {isCustomBuild ? (
                  <>
                    <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">Let&apos;s talk about your custom build</h2>
                    <p className="font-body text-charcoal-500 mb-7">
                      Custom builds start with a conversation. Leave your details and we&apos;ll call you to discuss your vision, site requirements and budget.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">Almost there — get your quote</h2>
                    <p className="font-body text-charcoal-500 mb-5">We&apos;ll prepare a detailed quote and call you within one working day.</p>

                    {/* Summary */}
                    <div className="bg-sand-100 rounded-2xl p-5 mb-7 space-y-2 border border-sand-200">
                      <h3 className="font-body text-xs font-semibold text-charcoal-400 uppercase tracking-widest mb-3">Your selection</h3>
                      {selectedType && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-600">{selectedType.name}</span>
                          <span className="font-semibold">{formatPrice(selectedType.price)}</span>
                        </div>
                      )}
                      {selectedSize && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-600">{selectedSize.label} ({selectedSize.dims})</span>
                          {selectedSize.adder > 0 && <span className="font-semibold text-terracotta-500">+{formatPrice(selectedSize.adder)}</span>}
                        </div>
                      )}
                      {selectedColour && !selectedColour.isCustom && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-600">Colour: {selectedColour.name}</span>
                        </div>
                      )}
                      <div className="border-t border-sand-200 pt-2 flex justify-between font-semibold">
                        <span className="text-charcoal-900">Estimated from</span>
                        <span className="text-forest-800 font-display text-lg">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide block mb-1.5">Name *</label>
                      <input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Your name" className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide block mb-1.5">Phone *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="Your phone number" className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide block mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="your@email.com" className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide block mb-1.5">Anything else?</label>
                    <textarea value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} placeholder="Garden size, access constraints, planning questions..." rows={3} className="w-full border border-sand-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-sand-300 text-white font-semibold py-4 rounded-2xl transition-colors">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send quote request <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
