// src/app/configurator/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Check, Ruler, Palette, Zap, MessageSquare, Loader2, Phone } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Step = "type" | "size" | "finish" | "use-case" | "quote";

const POD_TYPES = [
  { id: "garden-room", name: "Garden Room", desc: "Versatile, fully-insulated room for year-round use", price: 18995, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: "wellness-pod", name: "Wellness Pod", desc: "Curved barrel-vault for yoga, therapy, and mindfulness", price: 22995, image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80" },
  { id: "sauna", name: "Sauna", desc: "Authentic Scandinavian barrel sauna", price: 8995, image: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800&q=80" },
  { id: "studio", name: "Studio / Gym", desc: "Sprung floor, mirrored walls, acoustic treatment", price: 16995, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
  { id: "annexe", name: "Full Annexe", desc: "Complete living suite with kitchen, bathroom, bedroom", price: 42995, image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800&q=80" },
];

const SIZES = [
  { id: "xs", label: "Compact", dims: "2.5 Ã— 3.0m", sqm: 7.5, adder: 0 },
  { id: "sm", label: "Small", dims: "3.0 Ã— 4.0m", sqm: 12, adder: 2500 },
  { id: "md", label: "Medium", dims: "3.5 Ã— 5.0m", sqm: 17.5, adder: 5500 },
  { id: "lg", label: "Large", dims: "4.0 Ã— 6.0m", sqm: 24, adder: 9500 },
  { id: "xl", label: "X-Large", dims: "5.0 Ã— 7.0m", sqm: 35, adder: 16000 },
];

const FINISHES = [
  { id: "larch", name: "Natural Larch", hex: "#D4A76A", adder: 0 },
  { id: "charcoal", name: "Charcoal Grey", hex: "#3D3D3D", adder: 0 },
  { id: "forest", name: "Forest Green", hex: "#2D5016", adder: 0 },
  { id: "slate", name: "Slate Blue", hex: "#4A6A8A", adder: 0 },
  { id: "white", name: "Sage White", hex: "#EAE8E3", adder: 0 },
  { id: "black", name: "Midnight Black", hex: "#1A1A1A", adder: 250 },
  { id: "copper", name: "Copper Patina", hex: "#6B4A2A", adder: 450 },
];

const USE_CASE_OPTIONS = [
  { id: "HOME_OFFICE", label: "Home Office", icon: "ðŸ’¼" },
  { id: "GYM_WELLNESS", label: "Gym & Wellness", icon: "ðŸƒ" },
  { id: "ART_STUDIO", label: "Art Studio", icon: "ðŸŽ¨" },
  { id: "SAUNA_SPA", label: "Sauna & Spa", icon: "ðŸ§–" },
  { id: "GUEST_ROOM", label: "Guest Room", icon: "ðŸ›" },
  { id: "READING_RETREAT", label: "Reading Retreat", icon: "ðŸ“š" },
  { id: "YOGA_STUDIO", label: "Yoga Studio", icon: "ðŸ§˜" },
  { id: "MUSIC_STUDIO", label: "Music Studio", icon: "ðŸŽµ" },
  { id: "MULTIPLE", label: "Multiple Uses", icon: "âœ¨" },
  { id: "OTHER", label: "Other", icon: "ðŸ’¬" },
];

const STEPS: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "type", label: "Type", icon: MessageSquare },
  { id: "size", label: "Size", icon: Ruler },
  { id: "finish", label: "Finish", icon: Palette },
  { id: "use-case", label: "Use Case", icon: Zap },
  { id: "quote", label: "Get Quote", icon: Phone },
];

export default function ConfiguratorPage() {
  const [step, setStep] = useState<Step>("type");
  const [config, setConfig] = useState({
    type: POD_TYPES[0],
    size: SIZES[1],
    finish: FINISHES[0],
    useCase: USE_CASE_OPTIONS[0],
    useCaseOther: "",
  });

  const [quoteForm, setQuoteForm] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = config.type.price + config.size.adder + config.finish.adder;
  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const goNext = () => { const next = STEPS[stepIndex + 1]; if (next) setStep(next.id); };
  const goPrev = () => { const prev = STEPS[stepIndex - 1]; if (prev) setStep(prev.id); };

  const useCaseDisplay = config.useCase.id === "OTHER" && config.useCaseOther
    ? config.useCaseOther
    : config.useCase.id === "MULTIPLE" && config.useCaseOther
    ? `Multiple uses: ${config.useCaseOther}`
    : config.useCase.label;

  async function handleQuoteSubmit() {
    if (!quoteForm.name || !quoteForm.email) {
      setError("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const message = `Configuration request:
- Type: ${config.type.name}
- Size: ${config.size.label} (${config.size.dims})
- Finish: ${config.finish.name}
- Use case: ${useCaseDisplay}
- Estimated price: ${formatPrice(totalPrice)}

Customer message: ${quoteForm.message || "None"}`;

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          message,
          type: "CONFIGURATOR",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
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
                const isPast = i < stepIndex;
                const isCurrent = s.id === step;
                return (
                  <div key={s.id} className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => isPast && setStep(s.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200",
                        isCurrent ? "bg-forest-800 text-white" : isPast ? "bg-forest-800/15 text-forest-800 cursor-pointer hover:bg-forest-800/25" : "bg-sand-200 text-charcoal-400 cursor-not-allowed"
                      )}
                    >
                      {isPast ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                      {s.label}
                    </button>
                    {i < STEPS.length - 1 && <div className={cn("w-4 h-px", i < stepIndex ? "bg-forest-600" : "bg-sand-300")} />}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-card min-h-[400px]">

              {/* Step 1 â€” Type */}
              {step === "type" && (
                <StepSection title="What type of space do you need?">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {POD_TYPES.map((type) => (
                      <button key={type.id} onClick={() => setConfig((p) => ({ ...p, type }))}
                        className={cn("group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300",
                          config.type.id === type.id ? "border-forest-800 shadow-luxury" : "border-sand-200 hover:border-sand-400")}>
                        <div className="relative h-36 overflow-hidden">
                          <Image src={type.image} alt={type.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                          {config.type.id === type.id && (
                            <div className="absolute inset-0 bg-forest-800/20 flex items-center justify-center">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-forest-800" />
                              </div>
                            </div>
                          )}
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

              {/* Step 2 â€” Size */}
              {step === "size" && (
                <StepSection title="What size do you need?">
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <button key={size.id} onClick={() => setConfig((p) => ({ ...p, size }))}
                        className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          config.size.id === size.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
                        <div className="flex items-center gap-4">
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", config.size.id === size.id ? "border-forest-800 bg-forest-800" : "border-sand-400")}>
                            {config.size.id === size.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="font-body font-semibold text-charcoal-900">{size.label}</p>
                            <p className="font-body text-xs text-charcoal-500">{size.dims} Â· {size.sqm}mÂ²</p>
                          </div>
                        </div>
                        <span className={cn("font-body text-sm font-semibold", size.adder > 0 ? "text-terracotta-600" : "text-charcoal-500")}>
                          {size.adder > 0 ? `+${formatPrice(size.adder)}` : "Included"}
                        </span>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}

              {/* Step 3 â€” Finish */}
              {step === "finish" && (
                <StepSection title="Choose your exterior finish" subtitle={`Selected: ${config.finish.name}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {FINISHES.map((finish) => (
                      <button key={finish.id} onClick={() => setConfig((p) => ({ ...p, finish }))}
                        className={cn("flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200",
                          config.finish.id === finish.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
                        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: finish.hex, outline: config.finish.id === finish.id ? "3px solid #0A3D2A" : "none", outlineOffset: "2px" }} />
                        <div className="text-center">
                          <p className="font-body text-xs font-semibold text-charcoal-800">{finish.name}</p>
                          {finish.adder > 0 && <p className="font-body text-xs text-terracotta-600">+{formatPrice(finish.adder)}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}

              {/* Step 4 â€” Use Case */}
              {step === "use-case" && (
                <StepSection title="What will you use it for?" subtitle="Select all that apply or describe your own use">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {USE_CASE_OPTIONS.map((uc) => (
                      <button key={uc.id} onClick={() => setConfig((p) => ({ ...p, useCase: uc }))}
                        className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 text-center",
                          config.useCase.id === uc.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
                        <span className="text-2xl">{uc.icon}</span>
                        <span className="font-body text-xs font-semibold text-charcoal-700">{uc.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Text input for Multiple or Other */}
                  {(config.useCase.id === "MULTIPLE" || config.useCase.id === "OTHER") && (
                    <div className="mt-4">
                      <label className="font-body text-sm font-medium text-charcoal-700 block mb-2">
                        {config.useCase.id === "MULTIPLE" ? "Please describe your intended uses:" : "Please describe what you have in mind:"}
                      </label>
                      <textarea
                        value={config.useCaseOther}
                        onChange={(e) => setConfig((p) => ({ ...p, useCaseOther: e.target.value }))}
                        placeholder={config.useCase.id === "MULTIPLE" ? "e.g. Home office during the week, yoga studio at weekends..." : "e.g. Storage and workshop space..."}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none"
                      />
                    </div>
                  )}
                </StepSection>
              )}

              {/* Step 5 â€” Quote form (replaces summary) */}
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
                        Fill in your details below and we'll prepare a personalised quote based on your configuration and call you back at a time that suits you.
                      </p>

                      {/* Config summary â€” compact */}
                      <div className="bg-sand-100 rounded-2xl p-4 space-y-2">
                        <p className="font-body text-xs font-semibold text-charcoal-500 uppercase tracking-widest mb-3">Your configuration</p>
                        {[
                          { label: "Type", value: config.type.name },
                          { label: "Size", value: `${config.size.label} Â· ${config.size.dims}` },
                          { label: "Finish", value: config.finish.name },
                          { label: "Use case", value: useCaseDisplay },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between text-sm font-body">
                            <span className="text-charcoal-500">{item.label}</span>
                            <span className="text-charcoal-800 font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Form fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                            Full name <span className="text-terracotta-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={quoteForm.name}
                            onChange={(e) => setQuoteForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                            Email address <span className="text-terracotta-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={quoteForm.email}
                            onChange={(e) => setQuoteForm((p) => ({ ...p, email: e.target.value }))}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                          Phone number <span className="text-charcoal-400 font-normal">(optional â€” for callback)</span>
                        </label>
                        <input
                          type="tel"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="07700 000000"
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="font-body text-sm font-medium text-charcoal-700 block mb-1.5">
                          Anything else you'd like us to know? <span className="text-charcoal-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={quoteForm.message}
                          onChange={(e) => setQuoteForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="e.g. garden size, access constraints, budget, preferred timeline..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent resize-none"
                        />
                      </div>

                      {error && (
                        <p className="font-body text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                      )}

                      <button
                        onClick={handleQuoteSubmit}
                        disabled={submitting}
                        className="btn-primary w-full justify-center gap-3"
                      >
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image src={config.type.image} alt={config.type.name} fill className="object-cover transition-all duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-white font-bold text-xl">{config.type.name}</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <p className="font-body text-xs text-charcoal-500 uppercase tracking-widest mb-1">Your selection</p>
              <div className="space-y-2 mt-3 text-sm font-body">
                <div className="flex justify-between text-charcoal-600"><span>Type</span><span className="font-medium text-charcoal-900">{config.type.name}</span></div>
                <div className="flex justify-between text-charcoal-600"><span>Size</span><span className="font-medium text-charcoal-900">{config.size.dims}</span></div>
                <div className="flex justify-between text-charcoal-600"><span>Finish</span><span className="font-medium text-charcoal-900">{config.finish.name}</span></div>
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
