// src/components/sections/process.tsx
import Link from "next/link";
import { ArrowRight, MessageSquare, Pencil, Hammer, Home } from "lucide-react";

const STEPS = [
  {
    number: "01",
    Icon: MessageSquare,
    title: "Free Consultation",
    description:
      "Book a free call with one of our garden room specialists. We'll discuss your space, your needs, and your budget with zero pressure.",
    cta: "Book a call",
    ctaHref: "/contact",
  },
  {
    number: "02",
    Icon: Pencil,
    title: "Design & Customise",
    description:
      "Use our online configurator or work with our design team to choose your size, finish, interior fit-out, and add-ons.",
    cta: "Try the configurator",
    ctaHref: "/configurator",
  },
  {
    number: "03",
    Icon: Hammer,
    title: "Built by Hand",
    description:
      "Your pod is assembled from scratch in our UK workshop using premium sustainable materials. Quality-checked before it leaves our doors.",
    cta: null,
    ctaHref: null,
  },
  {
    number: "04",
    Icon: Home,
    title: "Installed & Enjoyed",
    description:
      "Our expert installation team arrives, assembles your pod in 1–3 days, and walks you through everything. Then you get to live in it.",
    cta: null,
    ctaHref: null,
  },
];

export function ProcessSection() {
  return (
    <section className="section bg-sand-100">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="divider mb-5" />
            <h2 className="font-display text-display-md text-charcoal-900">
              From idea to
              <br />
              <span className="text-gradient-forest italic">your garden</span>
            </h2>
          </div>
          <p className="font-body text-charcoal-600 max-w-sm leading-relaxed">
            We handle every step of the journey — from that first conversation to the 
            day you step inside your finished pod.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-sand-400 to-transparent" />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-white rounded-3xl p-7 shadow-card hover:shadow-luxury transition-all duration-400 group"
            >
              {/* Step number + icon */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-forest-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-terracotta-500 transition-colors duration-300">
                  <step.Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-5xl font-bold text-sand-300 leading-none mt-1">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-charcoal-600 leading-relaxed mb-4">
                {step.description}
              </p>

              {step.cta && step.ctaHref && (
                <Link
                  href={step.ctaHref}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-forest-800 hover:text-terracotta-500 transition-colors group/link"
                >
                  {step.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              )}

              {/* Connection arrow - desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-12 z-10 w-7 h-7 bg-sand-200 rounded-full items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-sand-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline callout */}
        <div className="mt-12 bg-forest-800 rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-body text-xs font-semibold text-forest-300 uppercase tracking-widest mb-2">
                Average timeline
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-1">
                From first call to first coffee — in 8 weeks.
              </h3>
              <p className="font-body text-forest-300 text-sm">
                Most of our customers move into their pod within 6–10 weeks of ordering.
              </p>
            </div>
            <div className="flex gap-8 shrink-0">
              {[
                { v: "Week 1", l: "Design call" },
                { v: "Week 2-4", l: "Build phase" },
                { v: "Week 6-8", l: "Installation" },
              ].map((t) => (
                <div key={t.l} className="text-center">
                  <p className="font-display text-xl font-bold text-terracotta-300 whitespace-nowrap">{t.v}</p>
                  <p className="font-body text-xs text-forest-400 mt-1">{t.l}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-terracotta shrink-0">
              Start your journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
