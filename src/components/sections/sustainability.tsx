// src/components/sections/sustainability.tsx
import { Leaf, TreePine, Recycle, Sun } from "lucide-react";

const GREEN_PILLARS = [
  {
    Icon: TreePine,
    title: "FSC-Certified Nordic Timber",
    description: "Sourced exclusively from sustainably managed forests in Sweden, Finland and the Baltic States. For every tree felled, several more are planted.",
  },
  {
    Icon: Leaf,
    title: "Low Carbon by Nature",
    description: "Timber stores carbon throughout its lifetime — making our cabins significantly greener than brick, concrete or steel alternatives.",
  },
  {
    Icon: Sun,
    title: "Energy Efficient by Design",
    description: "40–70mm log walls and double-glazed windows provide excellent natural insulation, reducing heating costs year-round.",
  },
  {
    Icon: Recycle,
    title: "Built to Last Decades",
    description: "A cabin that lasts 30+ years is inherently sustainable. Our premium Nordic spruce construction is backed by a 5-year structural warranty.",
  },
];

export function SustainabilitySection() {
  return (
    <section className="py-14 bg-forest-800">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          {/* Left: heading */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="font-body text-xs font-semibold text-green-400 uppercase tracking-[0.2em]">
                Sustainability
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
              Good for your garden.{" "}
              <span className="text-green-400 italic">Good for the planet.</span>
            </h2>
            <p className="font-body text-sm text-forest-200 leading-relaxed">
              Our cabins store approximately{" "}
              <span className="text-white font-semibold">5–8 tonnes of CO₂</span>{" "}
              over their lifetime — the equivalent of taking a car off the road for 2 years.
            </p>
          </div>

          {/* Right: pillars in a 2x2 grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GREEN_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <pillar.Icon className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs text-forest-200 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
