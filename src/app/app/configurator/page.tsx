// src/app/configurator/page.tsx
"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Ruler, Palette, Zap, MessageSquare, Loader2, Phone, Briefcase, Dumbbell, Palette as PaletteIcon, Flame, BedDouble, BookOpen, Wind, Music, Sparkles, HelpCircle } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Step = "type" | "size" | "finish" | "use-case" | "quote";

const POD_TYPES = [
  {
    id: "garden-room",
    name: "Garden Room",
    desc: "Versatile, fully-insulated room for year-round use",
    price: 5000,
    image: "https://www.northernlogcabins.com/cdn/shop/products/2971356815.jpg?v=1750691576",
  },
  {
    id: "wellness-pod",
    name: "Ibiza",
    desc: "Premium outdoor entertaining suite with kitchen and bar",
    price: 15445,
    image: "https://www.northernlogcabins.com/cdn/shop/files/Kitchen_pod_log_cabin_by_Northen_Log_cabins_5_3add265e-ecc9-494e-88d5-79c92e245bc6.png?v=1779456884",
  },
  {
    id: "sauna",
    name: "Sauna",
    desc: "Authentic Scandinavian sauna — compact and beautifully crafted",
    price: 8995,
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
  },
  {
    id: "studio",
    name: "Studio / Gym",
    desc: "Light-filled creative or fitness space in your garden",
    price: 5371,
    image: "https://www.northernlogcabins.com/cdn/shop/products/2971356160.jpg?v=1750691476",
  },
  {
    id: "annexe",
    name: "Full Annexe",
    desc: "Complete two-bedroom living suite — kitchen, bathroom included",
    price: 0,
    image: "https://www.northernlogcabins.com/cdn/shop/files/Bali2bedroomlogcabinNorthernLogCabins1.jpg?v=1750691417",
  },
];

const SIZES = [
  { id: "xs", label: "Compact",  dims: "2.5 × 3.0m", sqm: 7.5,  adder: 0     },
  { id: "sm", label: "Small",    dims: "3.0 × 4.0m", sqm: 12,   adder: 2500  },
  { id: "md", label: "Medium",   dims: "3.5 × 5.0m", sqm: 17.5, adder: 5500  },
  { id: "lg", label: "Large",    dims: "4.0 × 6.0m", sqm: 24,   adder: 9500  },
  { id: "xl", label: "X-Large",  dims: "5.0 × 7.0m", sqm: 35,   adder: 16000 },
];

const FINISHES = [
  {
    id: "oak",
    name: "Oak",
    imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=400",
    adder: 0,
  },
  {
    id: "birch",
    name: "Birch",
    imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=400",
    adder: 0,
  },
  {
    id: "stone-grey",
    name: "Stone Grey",
    imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=400",
    adder: 0,
  },
  {
    id: "black",
    name: "Black",
    imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=400",
    adder: 0,
  },
  {
    id: "custom",
    name: "Custom",
    imageUrl: "",
    adder: 0,
    isCustom: true,
  },
];

const USE_CASE_OPTIONS = [
  { id: "HOME_OFFICE",     label: "Home Office",      Icon: Briefcase   },
  { id: "GYM_WELLNESS",   label: "Gym & Wellness",   Icon: Dumbbell    },
  { id: "ART_STUDIO",     label: "Art Studio",       Icon: PaletteIcon },
  { id: "SAUNA_SPA",      label: "Sauna & Spa",      Icon: Flame       },
  { id: "GUEST_ROOM",     label: "Guest Room",       Icon: BedDouble   },
  { id: "READING_RETREAT",label: "Reading Retreat",  Icon: BookOpen    },
  { id: "YOGA_STUDIO",    label: "Yoga Studio",      Icon: Wind        },
  { id: "MUSIC_STUDIO",   label: "Music Studio",     Icon: Music       },
  { id: "MULTIPLE",       label: "Multiple Uses",    Icon: Sparkles    },
  { id: "OTHER",          label: "Other",            Icon: HelpCircle  },
];

const STEPS: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "type",     label: "Type",      icon: MessageSquare },
  { id: "size",     label: "Size",      icon: Ruler         },
  { id: "finish",   label: "Cladding",  icon: Palette       },
  { id: "use-case", label: "Use Case",  icon: Zap           },
  { id: "quote",    label: "Get Quote", icon: Phone         },
];

export default function ConfiguratorPage() {
  const [step, setStep] = useState<Step>("type");
  const [config, setConfig] = useState({
    type:         POD_TYPES[0],
    size:         SIZES[1],
    finish:       FINISHES[0],
    useCase:      USE_CASE_OPTIONS[0],
    useCaseOther: "",
  });

  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const totalPrice = config.type.price + config.size.adder + config.finish.adder;
  const stepIndex  = STEPS.findIndex((s) => s.id === step);
  const goNext = () => { const next = STEPS[stepIndex + 1]; if (next) setStep(next.id); };
  const goPrev = () => { const prev = STEPS[stepIndex - 1]; if (prev) setStep(prev.id); };

  const useCaseDisplay =
    config.useCase.id === "OTHER"    && config.useCaseOther ? config.useCaseOther :
    config.useCase.id === "MULTIPLE" && config.useCaseOther ? `Multiple: ${config.useCaseOther}` :
    config.useCase.label;

  async function handleQuoteSubmit() {
    if (!quoteForm.name || !quoteForm.email || !quoteForm.phone) {
      setError("Please enter your name, email and phone number.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const finishLabel = (config.finish as any).isCustom ? "Custom (to be discussed)" : config.finish.name;
      const message = `Configuration request:
- Type: ${config.type.name}
- Size: ${config.size.label} (${config.size.dims})
- Cladding: ${finishLabel}
- Use case: ${useCaseDisplay}
${config.type.price > 0 ? `- Estimated price: ${formatPrice(totalPrice)}` : "- Price: Call for pricing"}

Customer message: ${quoteForm.message || "None"}`;

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    quoteForm.name,
          email:   quoteForm.email,
          phone:   quoteForm.phone,
          message,
          type:    "CONFIGURATOR",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      <div className="bg-white border-b border-sand-200 py-8">
        <div className="container-site">
          <h1 className="font-display text-3xl font-bold text-charcoal-900 mb-1">Design Your Space</h1>
          <p className="font-body text-charcoal-500">Tell us what you need and we'll get back to you with a tailored quote.</p>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Step indicators */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {STEPS.map((s, i) => {
                const isPast    = i < stepIndex;
                const isCurrent = s.id === step;
                return (
                  <div key={s.id} className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => isPast && setStep(s.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200",
                        isCurrent ? "bg-forest-800 text-white"
                          : isPast ? "bg-forest-800/15 text-forest-800 cursor-pointer hover:bg-forest-800/25"
                          : "bg-sand-200 text-charcoal-400 cursor-not-allowed"
                      )}
                    >
                      {isPast ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                      {s.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className={cn("w-4 h-px", i < stepIndex ? "bg-forest-600" : "bg-sand-300")} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-card min-h-[400px]">

              {/* ── Step 1 — Type ── */}
              {step === "type" && (
                <StepSection title="What type of space do you need?">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {POD_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setConfig((p) => ({ ...p, type }))}
                        className={cn(
                          "group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300",
                          config.type.id === type.id ? "border-forest-800 shadow-luxury" : "border-sand-200 hover:border-sand-400"
                        )}
                      >
                        <div className="relative h-40 overflow-hidden bg-sand-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={type.image}
                            alt={type.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {config.type.id === type.id && (
                            <div className="absolute inset-0 bg-forest-800/20 flex items-center justify-center">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-forest-800" />
                              </div>
                            </div>
                          )}
                          {/* Price badge */}
                          <div className="absolute bottom-2 right-2 bg-charcoal-900/70 backdrop-blur-sm text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                            {type.price > 0 ? `From ${formatPrice(type.price)}` : "Call for pricing"}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="font-display font-bold text-charcoal-900">{type.name}</p>
                          <p className="font-body text-xs text-charcoal-500 mt-0.5">{type.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}

              {/* ── Step 2 — Size ── */}
              {step === "size" && (
                <StepSection title="What size do you need?">
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setConfig((p) => ({ ...p, size }))}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          config.size.id === size.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                            config.size.id === size.id ? "border-forest-800 bg-forest-800" : "border-sand-400")}>
                            {config.size.id === size.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="font-body font-semibold text-charcoal-900">{size.label}</p>
                            <p className="font-body text-xs text-charcoal-500">{size.dims} · {size.sqm}m²</p>
                          </div>
                        </div>
                        <span className={cn("font-body text-sm font-semibold",
                          size.adder > 0 ? "text-terracotta-600" : "text-charcoal-500")}>
                          {size.adder > 0 ? `+${formatPrice(size.adder)}` : "Included"}
                        </span>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}

              {/* ── Step 3 — Cladding ── */}
              {step === "finish" && (
                <StepSection title="Choose your exterior cladding" subtitle={`Selected: ${config.finish.name}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {FINISHES.map((finish) => (
                      <button
                        key={finish.id}
                        onClick={() => setConfig((p) => ({ ...p, finish }))}
                        className={cn(
                          "group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-200",
                          config.finish.id === finish.id ? "border-forest-800 shadow-luxury" : "border-sand-200 hover:border-sand-400"
                        )}
                      >
                        {finish.isCustom ? (
                          /* Custom option */
                          <div className="aspect-[4/3] bg-gradient-to-br from-sand-200 to-sand-300 flex flex-col items-center justify-center gap-2">
                            <Palette className="w-8 h-8 text-charcoal-400" />
                            <span className="font-body text-xs text-charcoal-500 text-center px-2">We'll discuss your options</span>
                          </div>
                        ) : (
                          <div className="aspect-[4/3] overflow-hidden bg-sand-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={finish.imageUrl}
                              alt={finish.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-3 flex items-center justify-between">
                          <p className="font-body text-sm font-semibold text-charcoal-800">{finish.name}</p>
                          {config.finish.id === finish.id && (
                            <div className="w-5 h-5 bg-forest-800 rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        {finish.isCustom && config.finish.id === finish.id && (
                          <p className="font-body text-xs text-charcoal-500 px-3 pb-3">
                            Our team will contact you to discuss bespoke options.
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}

              {/* ── Step 4 — Use Case ── */}
              {step === "use-case" && (
                <StepSection title="What will you use it for?" subtitle="Select the closest option or describe your own">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {USE_CASE_OPTIONS.map((uc) => (
                      <button
                        key={uc.id}
                        onClick={() => setConfig((p) => ({ ...p, useCase: uc }))}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-center",
                          config.useCase.id === uc.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",
                          config.useCase.id === uc.id ? "bg-forest-800 text-white" : "bg-sand-200 text-charcoal-600"
                        )}>
                          <uc.Icon className="w-5 h-5" />
                        </div>
                        <span className="font-body text-xs font-semibold text-charcoal-700 leading-tight">{uc.label}</span>
                      </button>
                    ))}
                  </div>

                  {(config.useCase.id === "MULTIPLE" || config.useCase.id === "OTHER") && (
                    <div className="mt-4">
                      <label className="font-body text-sm font-medium text-charcoal-700 block mb-2">
                        {config.useCase.id === "MULTIPLE" ? "Describe your intended uses:" : "Describe what you have in mind:"}
                      </label>
                      <textarea
                        value={config.useCaseOther}
                        onChange={(e) => setConfig((p) => ({ ...p, useCaseOther: e.target.value }))}
                        placeholder={config.useCase.id === "MULTIPLE"
                          ? "e.g. Home office during the week, yoga studio at weekends..."
                          : "e.g. Storage and workshop space..."}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none"
                      />
                    </div>
                  )}
                </StepSection>
              )}

              {/* ── Step 5 — Quote ── */}
              {step === "quote" && (
                <StepSection title="Request your quote">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-forest-800/10 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-forest-800" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-2">Request received!</h3>
                      <p className="font-body text-charcoal-600 max-w-sm">
                        Thank you. One of our team will be in touch within 24 hours with your personalised quote.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <p className="font-body text-sm text-charcoal-600 leading-relaxed">
                        Fill in your details and we'll prepare a personalised quote and call you back.
                      </p>

                      {/* Config summary */}
                      <div className="bg-sand-100 rounded-2xl p-4 space-y-2">
                        <p className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-widest mb-3">Your configuration</p>
                        {[
                          { label: "Type",     value: config.type.name },
                          { label: "Size",     value: `${config.size.label} · ${config.size.dims}` },
                          { label: "Cladding", value: (config.finish as any).isCustom ? "Custom (to discuss)" : config.finish.name },
                          { label: "Use case", value: useCaseDisplay },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between text-sm font-body">
                            <span className="text-charcoal-500">{item.label}</span>
                            <span className="text-charcoal-800 font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Form */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                            Full name <span className="text-terracotta-500">*</span>
                          </label>
                          <input type="text" value={quoteForm.name}
                            onChange={(e) => setQuoteForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                            Email address <span className="text-terracotta-500">*</span>
                          </label>
                          <input type="email" value={quoteForm.email}
                            onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                          Phone number <span className="text-terracotta-500">*</span>
                        </label>
                        <input type="tel" value={quoteForm.phone}
                          onChange={(e) => setQuoteForm((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="07700 000000"
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent" />
                      </div>

                      <div>
                        <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                          Anything else? <span className="text-charcoal-400 font-normal">(optional)</span>
                        </label>
                        <textarea value={quoteForm.message}
                          onChange={(e) => setQuoteForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="e.g. garden size, access, budget, timeline..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none" />
                      </div>

                      {error && (
                        <p className="font-body text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                      )}

                      <button onClick={handleQuoteSubmit} disabled={submitting} className="btn-primary w-full justify-center gap-3">
                        {submitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending your request...</>
                        ) : (
                          <>Request my quote <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="font-body text-xs text-charcoal-400 text-center">
                        We'll respond within 24 hours. No obligation, no hard sell.
                      </p>
                    </div>
                  )}
                </StepSection>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} disabled={stepIndex === 0} className="btn-ghost flex items-center gap-2 disabled:opacity-40">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step !== "quote" && (
                <button onClick={goNext} className="btn-primary">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-sand-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.type.image}
                alt={config.type.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-white font-bold text-xl">{config.type.name}</p>
                {config.type.price > 0 && (
                  <p className="font-body text-white/70 text-sm">From {formatPrice(config.type.price)}</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <p className="font-body text-xs text-charcoal-500 uppercase tracking-widest mb-1">Your selection</p>
              <div className="space-y-2 mt-3 text-sm font-body">
                <div className="flex justify-between text-charcoal-600"><span>Type</span><span className="font-medium text-charcoal-900">{config.type.name}</span></div>
                <div className="flex justify-between text-charcoal-600"><span>Size</span><span className="font-medium text-charcoal-900">{config.size.dims}</span></div>
                <div className="flex justify-between text-charcoal-600"><span>Cladding</span><span className="font-medium text-charcoal-900">{(config.finish as any).isCustom ? "Custom" : config.finish.name}</span></div>
                <div className="flex justify-between text-charcoal-600"><span>Use</span><span className="font-medium text-charcoal-900 text-right max-w-[60%] truncate">{useCaseDisplay}</span></div>
              </div>
              <p className="font-body text-xs text-charcoal-400 mt-4 pt-4 border-t border-sand-200">
                Prices are guide estimates. Your final quote will be confirmed by our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSection({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold text-charcoal-900">{title}</h2>
        {subtitle && <p className="font-body text-sm text-charcoal-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
