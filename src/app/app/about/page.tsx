// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TreePine, Award, Users, Hammer } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Tainhaus — how we started, what we stand for, and why we build the finest garden rooms in Britain.",
};

const MILESTONES = [
  
  
  
  
  
  
];

const VALUES = [
  {
    Icon: Hammer,
    title: "Craftsmanship first",
    body: "Every pod that leaves our workshop is built by hand by certified joiners with a minimum 10 years' experience. We've never outsourced a single structural element.",
  },
  {
    Icon: TreePine,
    title: "Nature, respected",
    body: "FSC-certified timber. Carbon-neutral manufacturing. Sedum roof options that support pollinators. We build in gardens — we take that responsibility seriously.",
  },
  {
    Icon: Users,
    title: "For every chapter of life",
    body: "A pod isn't just a product — it's a space that changes with you. We design for the 28-year-old starting their career and the 72-year-old rediscovering their creativity.",
  },
  {
    Icon: Award,
    title: "Obsessive quality",
    body: "We use fewer SKUs than our competitors because we'd rather do fewer things perfectly than many things adequately. Every material, every joint, every finish is chosen deliberately.",
  },
];

const TEAM = [
  {
    name: "James Whitfield",
    role: "Co-founder & Head of Design",
    bio: "A qualified joiner with 20 years of experience in high-end residential construction. James obsesses over material selection and structural integrity.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Co-founder & Operations Director",
    bio: "Formerly in sustainable construction consultancy, Sarah leads our supply chain, installation teams, and our commitment to sustainability.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Tom Okafor",
    role: "Lead Architect & Product Designer",
    bio: "Tom brings an architectural rigour to every new product line, ensuring our pods sit beautifully in gardens of every style and era.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&q=85"
          alt="Tainhaus workshop interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-site">
            <div className="max-w-2xl">
              <div className="divider mb-6" />
              <h1 className="font-display text-display-lg text-white mb-4">
                Built by hand.
                <br />
                <em className="text-terracotta-300">Designed for life.</em>
              </h1>
              <p className="font-body text-xl text-white/75 max-w-lg">
                We're a team of craftspeople, architects, and garden obsessives. 
                Every pod we make is an act of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            <div>
              <div className="divider mb-6" />
              <h2 className="font-display text-display-sm text-charcoal-900 mb-6">
                How it started — and why we&apos;re still here
              </h2>
              <div className="space-y-4 font-body text-charcoal-700 leading-relaxed">
                <p>
                  In 2015, two joiners — James Whitfield and his business partner — were 
                  finishing a renovation on a Victorian terrace in Birmingham when the 
                  homeowner showed them a garden building company's catalogue. 
                  James's reaction was immediate: <em>"We could build something so much better than this."</em>
                </p>
                <p>
                  So they did. The first Tainhaus was installed in a south-facing 
                  Worcestershire garden in the autumn of 2015. It was a simple design — 
                  3×4m, Siberian Larch cladding, triple-glazed doors — but every neighbour 
                  who saw it wanted one.
                </p>
                <p>
                  Nearly a decade on, we've installed over 2,400 pods across the UK. 
                  Our team has grown to 38 people. But the ethos hasn't changed: we build 
                  every pod as if it's for someone we care about, because most of the time, it is.
                </p>
              </div>
              <Link href="/shop" className="btn-primary mt-8">
                See our collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=85"
                    alt="Joiner working on pod frame"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1590736969596-72f8f9ed7aed?w=600&q=85"
                    alt="Workshop interior detail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85"
                    alt="Completed garden room installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544985361-b420d7a77043?w=600&q=85"
                    alt="Garden sauna installed"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="craftsmanship" className="section bg-sand-100">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center mb-5">
              <div className="divider" />
            </div>
            <h2 className="font-display text-display-md text-charcoal-900">
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-3xl p-8 shadow-card hover:shadow-luxury transition-all duration-400"
              >
                <div className="w-12 h-12 bg-forest-800/8 rounded-2xl flex items-center justify-center mb-5">
                  <val.Icon className="w-5 h-5 text-forest-800" />
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  {val.title}
                </h3>
                <p className="font-body text-charcoal-600 leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-white"
              style={{
                left: `${(i / 19) * 100}%`,
                top: 0,
                bottom: 0,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
        <div className="container-site relative z-10">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-0.5 bg-terracotta-400 rounded-full" />
            </div>
            <h2 className="font-display text-display-md text-white">
              Our journey
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <p className="font-display text-3xl font-bold text-terracotta-300 mb-2">
                  {m.year}
                </p>
                <p className="font-body text-sm text-forest-200 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-white">
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="flex justify-center mb-5">
              <div className="divider" />
            </div>
            <h2 className="font-display text-display-md text-charcoal-900 mb-4">
              Meet the team
            </h2>
            <p className="font-body text-charcoal-600">
              38 people. One shared belief: that a great outdoor space can transform how you live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((person) => (
              <div key={person.name} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-sand-200 group-hover:ring-forest-300 transition-all duration-300">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                  {person.name}
                </h3>
                <p className="font-body text-sm font-semibold text-terracotta-600 mb-3">
                  {person.role}
                </p>
                <p className="font-body text-sm text-charcoal-600 leading-relaxed max-w-xs mx-auto">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section bg-sand-100">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="divider mb-6" />
              <h2 className="font-display text-display-sm text-charcoal-900 mb-6">
                Built for now.
                <br />
                <span className="text-gradient-forest italic">Responsible for tomorrow.</span>
              </h2>
              <div className="space-y-4 font-body text-charcoal-700 leading-relaxed">
                <p>
                  Every piece of timber we use carries FSC certification — meaning it was 
                  harvested from a forest managed for the long-term health of the ecosystem, 
                  not stripped for short-term gain.
                </p>
                <p>
                  In 2023, we became certified carbon-neutral across our manufacturing 
                  operations through a combination of energy efficiency improvements and 
                  investment in accredited UK woodland planting projects.
                </p>
                <p>
                  Our SIP panel construction delivers insulation values that exceed current 
                  UK building regulations — which means your pod costs less to heat and 
                  uses less energy across its lifetime.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&q=85"
                alt="Sustainable forest - FSC certified timber source"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2">
                  {["FSC® Certified", "Carbon Neutral", "A-Rated Energy", "UK Woodlands Supporter"].map((b) => (
                    <span key={b} className="bg-white/90 backdrop-blur-sm text-forest-800 font-body text-xs font-semibold px-3 py-1.5 rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-white">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-4">
            Ready to create your space?
          </h2>
          <p className="font-body text-charcoal-600 mb-8">
            Browse our collection or book a free consultation with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              Browse all pods
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Free consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
