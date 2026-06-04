// src/app/configurator/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Ruler, Palette, Zap, MessageSquare } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Step = "type" | "size" | "finish" | "use-case" | "summary";

const POD_TYPES = [
  { id: "garden-room", name: "Garden Room", desc: "Versatile, full-insulated room for year-round use", price: 18995, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", slug: "horizon-garden-room" },
  { id: "wellness-pod", name: "Wellness Pod", desc: "Curved barrel-vault for yoga, therapy, and mindfulness", price: 22995, image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80", slug: "zenith-garden-pod" },
  { id: "sauna", name: "Sauna", desc: "Authentic Scandinavian barrel sauna", price: 8995, image: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800&q=80", slug: "nordic-sauna-pod" },
  { id: "studio", name: "Studio / Gym", desc: "Sprung floor, mirrored walls, acoustic treatment", price: 16995, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", slug: "studio-gym-pod" },
  { id: "annexe", name: "Full Annexe", desc: "Complete living suite with kitchen, bathroom, bedroom", price: 42995, image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800&q=80", slug: "annexe-garden-room" },
];

const SIZES = [
  { id: "xs", label: "Compact", dims: "2.5 × 3.0m", sqm: 7.5, adder: 0 },
  { id: "sm", label: "Small", dims: "3.0 × 4.0m", sqm: 12, adder: 2500 },
  { id: "md", label: "Medium", dims: "3.5 × 5.0m", sqm: 17.5, adder: 5500 },
  { id: "lg", label: "Large", dims: "4.0 × 6.0m", sqm: 24, adder: 9500 },
  { id: "xl", label: "X-Large", dims: "5.0 × 7.0m", sqm: 35, adder: 16000 },
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

const USE_CASES = [
  { id: "HOME_OFFICE", label: "Home Office", icon: "💼" },
  { id: "GYM_WELLNESS", label: "Gym & Wellness", icon: "🏃" },
  { id: "ART_STUDIO", label: "Art Studio", icon: "🎨" },
  { id: "SAUNA_SPA", label: "Sauna & Spa", icon: "🧖" },
  { id: "GUEST_ROOM", label: "Guest Room", icon: "🛏" },
  { id: "READING_RETREAT", label: "Reading Retreat", icon: "📚" },
  { id: "YOGA_STUDIO", label: "Yoga Studio", icon: "🧘" },
  { id: "MUSIC_STUDIO", label: "Music Studio", icon: "🎵" },
];

const STEPS: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "type", label: "Pod Type", icon: MessageSquare },
  { id: "size", label: "Size", icon: Ruler },
  { id: "finish", label: "Finish", icon: Palette },
  { id: "use-case", label: "Use Case", icon: Zap },
  { id: "summary", label: "Summary", icon: Check },
];

export default function ConfiguratorPage() {
  const [step, setStep] = useState<Step>("type");
  const [config, setConfig] = useState({
    type: POD_TYPES[0],
    size: SIZES[1],
    finish: FINISHES[0],
    useCase: USE_CASES[0],
  });

  const totalPrice = config.type.price + config.size.adder + config.finish.adder;
  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const goNext = () => { const next = STEPS[stepIndex + 1]; if (next) setStep(next.id); };
  const goPrev = () => { const prev = STEPS[stepIndex - 1]; if (prev) setStep(prev.id); };

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      <div className="bg-white border-b border-sand-200 py-8">
        <div className="container-site">
          <h1 className="font-display text-3xl font-bold text-charcoal-900 mb-1">Design Your Pod</h1>
          <p className="font-body text-charcoal-500">Customise your perfect garden space in 4 simple steps.</p>
        </div>
      </div>
      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
              {step === "type" && (
                <StepSection title="Choose your pod type">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {POD_TYPES.map((type) => (
                      <button key={type.id} onClick={() => setConfig((p) => ({ ...p, type }))} className={cn("group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300", config.type.id === type.id ? "border-forest-800 shadow-luxury" : "border-sand-200 hover:border-sand-400")}>
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
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display font-bold text-charcoal-900">{type.name}</p>
                              <p className="font-body text-xs text-charcoal-500 mt-0.5">{type.desc}</p>
                            </div>
                            <span className="font-display text-sm font-bold text-forest-800 shrink-0">{formatPrice(type.price)}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}
              {step === "size" && (
                <StepSection title="Choose your size">
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <button key={size.id} onClick={() => setConfig((p) => ({ ...p, size }))} className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200", config.size.id === size.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
                        <div className="flex items-center gap-4">
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", config.size.id === size.id ? "border-forest-800 bg-forest-800" : "border-sand-400")}>
                            {config.size.id === size.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="font-body font-semibold text-charcoal-900">{size.label}</p>
                            <p className="font-body text-xs text-charcoal-500">{size.dims} · {size.sqm}m²</p>
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
              {step === "finish" && (
                <StepSection title="Choose your exterior finish" subtitle={`Selected: ${config.finish.name}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {FINISHES.map((finish) => (
                      <button key={finish.id} onClick={() => setConfig((p) => ({ ...p, finish }))} className={cn("flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200", config.finish.id === finish.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
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
              {step === "use-case" && (
                <StepSection title="What will you use it for?">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {USE_CASES.map((uc) => (
                      <button key={uc.id} onClick={() => setConfig((p) => ({ ...p, useCase: uc }))} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 text-center", config.useCase.id === uc.id ? "border-forest-800 bg-forest-800/5" : "border-sand-200 hover:border-sand-400")}>
                        <span className="text-2xl">{uc.icon}</span>
                        <span className="font-body text-xs font-semibold text-charcoal-700">{uc.label}</span>
                      </button>
                    ))}
                  </div>
                </StepSection>
              )}
              {step === "summary" && (
                <StepSection title="Your configuration">
                  <div className="space-y-4">
                    {[
                      { label: "Pod type", value: config.type.name },
                      { label: "Size", value: `${config.size.label} · ${config.size.dims}` },
                      { label: "Exterior finish", value: config.finish.name },
                      { label: "Primary use", value: config.useCase.label },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-3 border-b border-sand-200">
                        <span className="font-body text-sm text-charcoal-600">{item.label}</span>
                        <span className="font-body text-sm font-semibold text-charcoal-900">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-body font-semibold text-charcoal-900">Estimated price</span>
                      <span className="font-display text-3xl font-bold text-forest-800">{formatPrice(totalPrice)}</span>
                    </div>
                    <p className="font-body text-xs text-charcoal-400">inc. VAT. Installation quoted separately.</p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Link href={`/products/${config.type.slug}`} className="btn-primary flex-1 justify-center">View product details <ArrowRight className="w-4 h-4" /></Link>
                      <Link href={`/contact?type=CONFIGURATOR&product=${config.type.slug}`} className="btn-secondary flex-1 justify-center">Request a quote</Link>
                    </div>
                  </div>
                </StepSection>
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={goPrev} disabled={stepIndex === 0} className="btn-ghost flex items-center gap-2 disabled:opacity-40">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step !== "summary" && (
                <button onClick={goNext} className="btn-primary">Continue <ArrowRight className="w-4 h-4" /></button>
              )}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image src={config.type.image} alt={config.type.name} fill className="object-cover transition-all duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-white font-bold text-xl">{config.type.name}</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <p className="font-body text-xs text-charcoal-500 uppercase tracking-widest mb-1">Your estimate</p>
              <p className="font-display text-3xl font-bold text-forest-800 mb-4">{formatPrice(totalPrice)}</p>
              <div className="space-y-1.5 text-sm font-body">
                <div className="flex justify-between text-charcoal-600"><span>{config.type.name}</span><span>{formatPrice(config.type.price)}</span></div>
                {config.size.adder > 0 && <div className="flex justify-between text-charcoal-600"><span>{config.size.label} size</span><span className="text-terracotta-600">+{formatPrice(config.size.adder)}</span></div>}
                {config.finish.adder > 0 && <div className="flex justify-between text-charcoal-600"><span>{config.finish.name} finish</span><span className="text-terracotta-600">+{formatPrice(config.finish.adder)}</span></div>}
              </div>
              <p className="font-body text-xs text-charcoal-400 mt-3">Installation quoted separately.</p>
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
