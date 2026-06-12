// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | Tainhaus Log Cabins",
  description: "The story behind Tainhaus — two founders united by a vision to bring premium, sustainable garden rooms to homes across the UK.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand-100 pt-24">

      {/* Hero */}
      <section className="bg-forest-800 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px"}}
        />
        <div className="container-site relative z-10 max-w-3xl">
          <div className="w-12 h-0.5 bg-terracotta-400 rounded-full mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Two founders. One shared
            <span className="text-terracotta-300 italic"> vision.</span>
          </h1>
          <p className="font-body text-lg text-forest-200 leading-relaxed">
            Tainhaus was born from a simple but powerful idea — that everyone deserves a space of their own.
            A place to think, to work, to breathe, to live. Built beautifully and built to last.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-3xl">
          <div className="space-y-10 font-body text-charcoal-700 text-lg leading-relaxed">

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900 mb-5">
                Where it began
              </h2>
              <p>
                Tainhaus was founded by two people who came from very different parts of the world,
                but arrived at the same conclusion — that outdoor living in the UK was being done all wrong.
              </p>
              <p className="mt-4">
                One of us grew up in a culture where the relationship between a home and its garden
                is considered inseparable. Log cabins, garden studios and outdoor rooms aren't a luxury —
                they're simply how people live. Natural timber, thoughtful design, and spaces that
                connect you to the outside world are a way of life.
              </p>
              <p className="mt-4">
                The other grew up somewhere where extended families have always understood the value
                of space — where a room of your own isn't a privilege, it's a necessity. Moving
                to the UK brought a deep appreciation for British gardens and a growing frustration
                that so few people were making the most of them.
              </p>
            </div>

            {/* Pull quote */}
            <div className="bg-forest-800 rounded-3xl p-8 md:p-10 my-10">
              <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed">
                &ldquo;We kept seeing the same thing — beautiful gardens with nothing in them.
                And people cramped inside houses that had run out of room. We knew we could change that.&rdquo;
              </p>
              <p className="font-body text-forest-300 text-sm mt-4">— The founders of Tainhaus</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900 mb-5">
                Coming together
              </h2>
              <p>
                We met through a shared passion for sustainable architecture and outdoor living.
                Between us we brought together years of experience in timber construction, bespoke
                residential design, and a deep belief that garden buildings deserved to be taken
                seriously — not as sheds or afterthoughts, but as genuine living spaces worthy of
                quality materials and careful thought.
              </p>
              <p className="mt-4">
                We talked for a long time about sustainability, about the housing pressures facing
                families across the UK, and about the millions of square metres of underused garden
                space sitting behind British homes. Tainhaus was the answer to all of it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900 mb-5">
                What we believe
              </h2>
              <p>
                We believe your garden is some of the most valuable space you own — and that most
                people are barely using it. A well-designed garden room doesn't just add square
                footage. It changes how you live. It gives you somewhere to focus without
                interruption. It gives your children room to grow. It gives guests somewhere
                comfortable to stay. It gives you somewhere to simply be.
              </p>
              <p className="mt-4">
                We also believe that quality and sustainability aren't opposing forces. Every cabin
                we supply is built from FSC-certified Nordic timber — some of the most responsibly
                managed forests in the world. Choosing natural timber over plastic, steel or concrete
                isn't just better for the environment. It's better for you. It ages gracefully.
                It breathes. It feels alive.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900 mb-5">
                Making a difference
              </h2>
              <p>
                From the beginning we wanted Tainhaus to mean something more than a transaction.
                We've worked with families who needed a home office. With people who needed a quiet
                space to recover. With artists who needed somewhere to create. With those who needed
                to stay close to loved ones without giving up their independence.
              </p>
              <p className="mt-4">
                Every cabin we install is a small but meaningful change to someone's life.
                That's not something we take lightly — and it's what drives everything we do.
              </p>
              <p className="mt-4">
                We're still a small team. We still care deeply about every order. And we're still
                driven by that original belief — that the garden behind your home could be so much
                more than it is right now.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sand-100">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-terracotta-500 rounded-full mx-auto mb-5" />
            <h2 className="font-display text-3xl font-bold text-charcoal-900">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Leaf,
                title: "Sustainability first",
                desc: "FSC-certified Nordic timber, responsibly sourced and built to last decades — not seasons.",
              },
              {
                Icon: Heart,
                title: "People over profit",
                desc: "Every cabin changes someone's life. We never forget that, no matter how much we grow.",
              },
              {
                Icon: Globe,
                title: "Global perspective",
                desc: "Inspired by the best of international design — cabins that work for every family and every garden.",
              },
              {
                Icon: Shield,
                title: "Uncompromising quality",
                desc: "5-year structural warranty, premium timber, proper installation. No shortcuts, ever.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-sand-200">
                <div className="w-10 h-10 bg-forest-800/8 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-forest-800" />
                </div>
                <h3 className="font-display text-base font-bold text-charcoal-900 mb-2">{title}</h3>
                <p className="font-body text-sm text-charcoal-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-4">
            Ready to transform your garden?
          </h2>
          <p className="font-body text-charcoal-600 mb-8 leading-relaxed">
            Browse our collection of premium log cabins and garden rooms, or use our design
            configurator to start planning your perfect space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              style={{backgroundColor:"#C26B4A",color:"white",display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",borderRadius:"9999px",fontWeight:600,fontSize:"15px",textDecoration:"none"}}
            >
              Browse our collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-forest-800/20 text-forest-800 font-body font-semibold text-sm hover:border-forest-800/40 hover:bg-forest-800/5 transition-all duration-200"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
