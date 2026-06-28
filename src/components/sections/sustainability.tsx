// src/components/sections/sustainability.tsx
import { Leaf, TreePine, Recycle, Sun, Wind, Award } from "lucide-react";

const GREEN_PILLARS = [
  {
    Icon: TreePine,
    title: "FSC-Certified Nordic Timber",
    description:
      "Every cabin is built from timber sourced exclusively from FSC-certified, sustainably managed forests in Sweden, Finland and the Baltic States. For every tree felled, several more are planted.",
  },
  {
    Icon: Leaf,
    title: "Low Carbon Footprint",
    description:
      "Timber is one of the lowest-carbon building materials available. Our log cabins store carbon throughout their lifetime — making them significantly greener than brick, concrete or steel alternatives.",
  },
  {
    Icon: Sun,
    title: "Energy Efficient by Design",
    description:
      "Double-glazed doors and windows combined with thick 40–70mm log walls provide excellent natural insulation — reducing heating costs and energy consumption year-round.",
  },
  {
    Icon: Recycle,
    title: "Minimal Waste Construction",
    description:
      "Our cabins arrive as precision-cut, numbered components — eliminating on-site waste. UV-resistant packaging protects the timber during transit without single-use plastics.",
  },
  {
    Icon: Wind,
    title: "No Harmful Chemicals",
    description:
      "Foundation bearers are autoclave treated using water-based preservatives — no harmful solvents or toxins. The timber is naturally durable without requiring chemical treatment.",
  },
  {
    Icon: Award,
    title: "Built to Last Decades",
    description:
      "A cabin that lasts 30+ years is inherently sustainable. Our 5-year structural warranty and premium Nordic spruce construction means your investment stands the test of time.",
  },
];

export function SustainabilitySection() {
  return (
    <section className="section bg-forest-800 relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-site relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-5">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="font-body text-xs font-semibold text-green-400 uppercase tracking-[0.2em]">
              Sustainability
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-display-md text-white mb-4">
            Good for your garden.{" "}
            <span className="text-green-400 italic">Good for the planet.</span>
          </h2>
          <p className="font-body text-forest-200 leading-relaxed">
            Our log cabins aren't just beautiful — they're one of the most environmentally responsible 
            building choices you can make. Here's why choosing timber is choosing green.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GREEN_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <pillar.Icon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-forest-200 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carbon callout */}
        <div className="mt-10 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
          <p className="font-body text-sm text-green-300 leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold text-green-400">Did you know?</span>{" "}
            A single Tainhaus log cabin stores approximately{" "}
            <span className="font-semibold text-white">5–8 tonnes of CO₂</span>{" "}
            throughout its lifetime — the equivalent of taking a family car off the road for 2 years.
            Choosing timber isn't just a building decision. It's a climate decision.
          </p>
        </div>
      </div>
    </section>
  );
}
