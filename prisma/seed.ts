// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.finish.deleteMany();
  await prisma.product.deleteMany();

  // ─── PRODUCTS ────────────────────────────────────────────────
  const horizon = await prisma.product.create({
    data: {
      slug: "horizon-garden-room",
      name: "The Horizon",
      tagline: "Your room with a view — designed for every life stage",
      description:
        "The Horizon is our flagship garden room. Floor-to-ceiling glazing, precision timber framing, and a seamlessly insulated shell make this the most versatile space we've ever built.",
      longDescription: `The Horizon redefines what an outdoor room can be. Whether you're a young professional craving a distraction-free home office, a family needing a creative studio for the kids, or a retiree wanting a serene reading sanctuary — The Horizon adapts to your life.

Engineered with triple-glazed panels and structural insulated panels (SIPs), this room performs year-round across the full spectrum of UK weather. Its clean architectural lines suit both modern and traditional gardens.

Every Horizon is built to order in our workshop, delivered to site, and installed within a single day by our expert team. We handle everything from groundwork consultation to final fit-out.`,
      price: 18995,
      category: "GARDEN_ROOM",
      useCase: ["HOME_OFFICE", "ART_STUDIO", "READING_RETREAT", "GUEST_ROOM"],
      featured: true,
      bestseller: true,
      rating: 4.9,
      reviewCount: 147,
      leadTime: "6–8 weeks",
      warranty: "10 years structural",
      features: [
        "Triple-glazed full-height sliding doors",
        "SIP panel construction — R-value 4.2",
        "Integrated underfloor heating",
        "USB-C + smart home ready electrical fit-out",
        "Certified sustainably sourced Siberian Larch cladding",
        "Optional living roof system",
        "Concealed rainwater drainage",
        "5-year manufacturer paint warranty",
      ],
      specs: {
        construction: "Structural Insulated Panels (SIPS)",
        glazing: "Triple-glazed argon-filled units",
        cladding: "Siberian Larch (pre-treated or painted)",
        roofing: "EPDM rubber or optional sedum living roof",
        floor: "Engineered oak or luxury vinyl tile",
        insulation: "PIR foam core — walls, floor, ceiling",
        electrical: "Full fit-out with consumer unit",
        heating: "Underfloor heating included",
        planning: "Usually permitted development",
        delivery: "Flat-pack delivery + 1-day installation",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
            alt: "The Horizon garden room in a lush green garden",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=85",
            alt: "Interior of The Horizon showing light-filled office setup",
            isPrimary: false,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=1200&q=85",
            alt: "The Horizon exterior at dusk",
            isPrimary: false,
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=85",
            alt: "The Horizon used as a garden studio",
            isPrimary: false,
            order: 3,
          },
        ],
      },
      sizes: {
        create: [
          { label: "2.5 × 3.0m", widthM: 2.5, depthM: 3.0, heightM: 2.5, sqm: 7.5, priceAdder: 0 },
          { label: "3.0 × 4.0m", widthM: 3.0, depthM: 4.0, heightM: 2.5, sqm: 12, priceAdder: 2500 },
          { label: "3.5 × 5.0m", widthM: 3.5, depthM: 5.0, heightM: 2.5, sqm: 17.5, priceAdder: 5500 },
          { label: "4.0 × 6.0m", widthM: 4.0, depthM: 6.0, heightM: 2.8, sqm: 24, priceAdder: 9500 },
          { label: "5.0 × 7.0m", widthM: 5.0, depthM: 7.0, heightM: 2.8, sqm: 35, priceAdder: 16000 },
        ],
      },
      finishes: {
        create: [
          { name: "Natural Larch", hexColor: "#D4A76A", priceAdder: 0 },
          { name: "Charcoal Grey", hexColor: "#3D3D3D", priceAdder: 0 },
          { name: "Forest Green", hexColor: "#2D5016", priceAdder: 0 },
          { name: "Slate Blue", hexColor: "#4A6A8A", priceAdder: 0 },
          { name: "Sage White", hexColor: "#EAE8E3", priceAdder: 0 },
          { name: "Midnight Black", hexColor: "#1A1A1A", priceAdder: 250 },
          { name: "Copper Patina", hexColor: "#6B4A2A", priceAdder: 450 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Life-changing home office",
            body: "I was skeptical at first — could a garden building really feel like a proper room? The Horizon completely changed my mind. It's warm in winter, cool in summer, and utterly silent. My productivity has skyrocketed since moving my office out here.",
            authorName: "James R.",
            authorAge: "38",
            authorUse: "Home Office",
            verified: true,
          },
          {
            rating: 5,
            title: "Mum's new favourite room",
            body: "We bought this for my 71-year-old mother as a reading room and art studio. She absolutely adores it. The installation team were respectful, tidy, and fast. Could not recommend more highly.",
            authorName: "Sarah M.",
            authorAge: "44",
            authorUse: "Art Studio / Reading Room",
            verified: true,
          },
          {
            rating: 5,
            title: "Better than our house extension",
            body: "Far cheaper, far quicker, and honestly — far nicer. We use it as a family TV room / teenage hangout. The kids live out here.",
            authorName: "Tom & Lucy B.",
            authorAge: "42",
            authorUse: "Family Entertainment",
            verified: true,
          },
        ],
      },
    },
  });

  const zenith = await prisma.product.create({
    data: {
      slug: "zenith-garden-pod",
      name: "The Zenith",
      tagline: "A sculptural wellness sanctuary for mind and body",
      description:
        "The Zenith is our premium curved-roof pod — architecturally striking, deeply insulated, and designed for wellness pursuits from yoga to meditation to beauty therapy.",
      longDescription: `The Zenith turns your garden into a place of genuine retreat. Its graceful curved barrel-vault roof is not just beautiful — it creates a loftier interior feel that makes even modest footprints feel spacious.

Favoured by yoga instructors, therapists, and anyone who wants a true sanctuary just steps from their back door, The Zenith ships with premium cork flooring, soft ambient lighting channels, and acoustically treated walls as standard.

It works equally well as a compact sauna suite, a massage therapy room, a musician's studio, or simply the most beautiful reading nook you've ever owned.`,
      price: 22995,
      category: "GARDEN_POD",
      useCase: ["YOGA_STUDIO", "SAUNA_SPA", "MUSIC_STUDIO", "READING_RETREAT"],
      featured: true,
      new: true,
      rating: 4.95,
      reviewCount: 63,
      leadTime: "8–10 weeks",
      warranty: "10 years structural",
      features: [
        "Curved barrel-vault insulated roof",
        "Premium cork flooring as standard",
        "Acoustic insulation lining (class B sound absorption)",
        "Concealed LED lighting channel perimeter",
        "Bi-fold oak-framed doors",
        "Natural cedar cladding option",
        "Skylight module available",
        "Optional sauna fit-out package",
      ],
      specs: {
        construction: "Steel-reinforced SIP curved panels",
        glazing: "Double-glazed oak-framed bi-folds",
        cladding: "Western Red Cedar (natural oil treated)",
        roofing: "Rubber-clad curved vault — 20-year lifespan",
        floor: "Cork (standard) or engineered oak",
        insulation: "Spray foam + PIR hybrid system",
        electrical: "Full fit-out with dimmable circuits",
        heating: "Infrared panels (silent, instant)",
        planning: "Usually permitted development",
        delivery: "2-person installation team, 1–2 days",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1600&q=90",
            alt: "The Zenith garden pod in a tranquil setting",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85",
            alt: "Interior yoga studio setup in The Zenith",
            isPrimary: false,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
            alt: "The Zenith exterior evening lighting",
            isPrimary: false,
            order: 2,
          },
        ],
      },
      sizes: {
        create: [
          { label: "2.4 × 3.0m", widthM: 2.4, depthM: 3.0, heightM: 2.8, sqm: 7.2, priceAdder: 0 },
          { label: "3.0 × 4.0m", widthM: 3.0, depthM: 4.0, heightM: 2.8, sqm: 12, priceAdder: 3200 },
          { label: "3.6 × 5.0m", widthM: 3.6, depthM: 5.0, heightM: 3.0, sqm: 18, priceAdder: 7800 },
        ],
      },
      finishes: {
        create: [
          { name: "Natural Cedar", hexColor: "#A0522D", priceAdder: 0 },
          { name: "Charcoal Stain", hexColor: "#2C2C2C", priceAdder: 0 },
          { name: "Whitewash", hexColor: "#F5F0E8", priceAdder: 0 },
          { name: "Ebony", hexColor: "#0D0D0D", priceAdder: 350 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "My yoga clients are blown away",
            body: "I run a small yoga and meditation practice from The Zenith. It holds 4 clients comfortably, has beautiful acoustics, and the infrared heating makes it perfect even in January. Best investment I've made in my business.",
            authorName: "Priya K.",
            authorAge: "34",
            authorUse: "Yoga Studio",
            verified: true,
          },
          {
            rating: 5,
            title: "Retired and loving it",
            body: "My husband and I are both 67. We use it as a morning meditation room and afternoon reading room. It's brought such peace to our garden. The team who installed it were wonderful — proper craftsmen.",
            authorName: "Margaret & David H.",
            authorAge: "67",
            authorUse: "Wellness / Relaxation",
            verified: true,
          },
        ],
      },
    },
  });

  const nordic = await prisma.product.create({
    data: {
      slug: "nordic-sauna-pod",
      name: "The Nordic",
      tagline: "Authentic Scandinavian sauna — your private wellness ritual",
      description:
        "Inspired by Finnish sauna tradition, The Nordic delivers an authentic barrel-sauna experience with premium kiln-dried alder wood, a Harvia Kip heater, and optional cold plunge deck.",
      longDescription: `The Nordic is for those who believe recovery is as important as performance. Handcrafted from premium kiln-dried alder wood, it arrives fully pre-assembled on a delivery truck and drops into position in your garden in under four hours.

A Harvia Kip electric heater (or optional wood-burning Harvia Pro) heats the chamber to 90°C in 30 minutes. Integrated ergonomic benching, hygrometer, and aromatic birch ladle set are included as standard.

The Nordic's compact 2.2m diameter footprint fits in gardens of all sizes. An optional wraparound cedar deck with cold plunge tub transforms your back garden into a premium Nordic spa.`,
      price: 8995,
      category: "SAUNA",
      useCase: ["SAUNA_SPA"],
      featured: true,
      rating: 4.8,
      reviewCount: 89,
      leadTime: "3–4 weeks",
      warranty: "5 years structure, 2 years heater",
      features: [
        "Kiln-dried alder wood construction",
        "Harvia Kip 6kW electric heater included",
        "Integrated ergonomic triple-tier bench",
        "Tempered glass door with bronze hardware",
        "Interior LED mood lighting",
        "Hygrometer and birch ladle set",
        "Pre-assembled — drops into position",
        "Optional cedar wraparound deck",
        "Optional cold plunge tub bundle",
      ],
      specs: {
        construction: "Kiln-dried alder (44mm tongue & groove)",
        diameter: "2.2m diameter barrel",
        heater: "Harvia Kip 6kW electric (standard)",
        heaterAlt: "Harvia Pro wood-burning (upgrade)",
        capacity: "Up to 4 persons",
        heatingTime: "25–30 minutes to 90°C",
        door: "Tempered glass + solid alder",
        electrical: "32A supply required",
        planning: "No planning permission required",
        delivery: "Pre-assembled — crane lift optional",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=1600&q=90",
            alt: "The Nordic barrel sauna in snowy garden",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=85",
            alt: "Interior of The Nordic sauna",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "2.2m Diameter × 2.1m", widthM: 2.2, depthM: 2.2, heightM: 2.1, sqm: 3.8, priceAdder: 0 },
          { label: "2.2m × 3.6m Extended", widthM: 2.2, depthM: 3.6, heightM: 2.1, sqm: 6.1, priceAdder: 1800 },
          { label: "2.2m × 4.8m Double", widthM: 2.2, depthM: 4.8, heightM: 2.1, sqm: 8.3, priceAdder: 3500 },
        ],
      },
      finishes: {
        create: [
          { name: "Natural Alder", hexColor: "#C8955C", priceAdder: 0 },
          { name: "Thermowood Dark", hexColor: "#3D2B1A", priceAdder: 450 },
          { name: "Silver Grey Aged", hexColor: "#A0A0A0", priceAdder: 200 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Better than our gym sauna",
            body: "After years of gym memberships, we decided to invest in our own sauna. The Nordic is absolutely phenomenal. Heats up in 25 minutes. The alder smells incredible. Our whole family uses it every week.",
            authorName: "Mike & Claire T.",
            authorAge: "45",
            authorUse: "Home Sauna",
            verified: true,
          },
        ],
      },
    },
  });

  const annexe = await prisma.product.create({
    data: {
      slug: "annexe-garden-room",
      name: "The Annexe",
      tagline: "A complete living suite — reimagine your outdoor space",
      description:
        "The Annexe is our largest and most complete solution: a full garden annexe with kitchenette, bathroom, and sleeping area. Ideal as a guest suite, granny annexe, or premium rental.",
      longDescription: `The Annexe is more than a garden room — it's an additional living space. Fully fitted with a compact kitchenette, wet room, and sleeping area, it operates completely independently from your main house.

Whether you're creating a self-contained space for elderly relatives, a teenage den with real independence, or a premium holiday let that pays for itself — The Annexe delivers the space, quality, and privacy that a great annexe needs.

All models come with planning guidance as part of the service. Many qualify as permitted development, but for those requiring planning consent, our in-house planning team manages the process end-to-end.`,
      price: 42995,
      category: "GARDEN_ROOM",
      useCase: ["GUEST_ROOM", "HOME_OFFICE", "ENTERTAINMENT"],
      featured: false,
      bestseller: false,
      rating: 4.85,
      reviewCount: 31,
      leadTime: "10–14 weeks",
      warranty: "10 years structural",
      features: [
        "Fully fitted compact kitchenette",
        "En-suite wet room with rainfall shower",
        "Sleeping area for up to 2 persons",
        "Full-height triple glazing",
        "Separate mains water and drainage connection",
        "Underfloor heating throughout",
        "Fibre broadband ready",
        "Planning guidance included",
        "10-year structural warranty",
      ],
      specs: {
        construction: "SIP panel with steel subframe",
        glazing: "Triple-glazed aluminium-framed",
        cladding: "Siberian Larch or Composite",
        roofing: "Sedum living roof (standard)",
        floor: "Engineered oak throughout",
        insulation: "Passive House standard specification",
        services: "Full mains connection (water, drainage, power)",
        heating: "Underfloor heating + MVHR ventilation",
        planning: "Planning guidance included",
        delivery: "3–5 day professional installation",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=1600&q=90",
            alt: "The Annexe garden suite exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85",
            alt: "The Annexe interior living area",
            isPrimary: false,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85",
            alt: "The Annexe kitchenette and bathroom",
            isPrimary: false,
            order: 2,
          },
        ],
      },
      sizes: {
        create: [
          { label: "4.0 × 5.0m", widthM: 4.0, depthM: 5.0, heightM: 2.8, sqm: 20, priceAdder: 0 },
          { label: "4.5 × 6.0m", widthM: 4.5, depthM: 6.0, heightM: 2.8, sqm: 27, priceAdder: 8000 },
          { label: "5.0 × 7.0m", widthM: 5.0, depthM: 7.0, heightM: 3.0, sqm: 35, priceAdder: 16000 },
        ],
      },
      finishes: {
        create: [
          { name: "Natural Larch", hexColor: "#D4A76A", priceAdder: 0 },
          { name: "Charcoal Grey", hexColor: "#3D3D3D", priceAdder: 0 },
          { name: "Sage Green", hexColor: "#6B8F71", priceAdder: 0 },
          { name: "Slate Grey Composite", hexColor: "#7A7A7A", priceAdder: 1200 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Mum lives in comfort just 10m from us",
            body: "We built The Annexe for my 78-year-old mother. It gives her full independence — her own front door, shower, kitchen — while keeping her close. The planning team handled everything. I cannot thank YourGardenPod enough.",
            authorName: "Helen C.",
            authorAge: "53",
            authorUse: "Granny Annexe",
            verified: true,
          },
        ],
      },
    },
  });

  const studio = await prisma.product.create({
    data: {
      slug: "studio-gym-pod",
      name: "The Studio",
      tagline: "Your home gym, art studio, or creative retreat — purpose-built",
      description:
        "The Studio is our dedicated wellness and creativity pod. Sprung hardwood floor, full-height mirror wall option, acoustic treatment, and a skylight make this the ideal space for movement, music, and making.",
      longDescription: `The Studio was designed in close collaboration with personal trainers, artists, musicians, and therapists. It solves the real problems that home gyms and studios face: inadequate acoustics, unsuitable flooring, poor lighting, and the soul-crushing feeling of working in a converted garage.

With a 110mm sprung hardwood floor, 12m² mirror wall option, full acoustic lining, and a 3.2m apex ceiling (on 4m+ models), The Studio gives you a space that genuinely rivals professional facilities — in your own garden.

For artists, replace the mirror wall with a north-facing skylight. For musicians, upgrade to our premium acoustic package. For yogis, choose the cork floor and infrared heating combo.`,
      price: 16995,
      category: "STUDIO",
      useCase: ["GYM_WELLNESS", "ART_STUDIO", "YOGA_STUDIO", "MUSIC_STUDIO"],
      featured: true,
      rating: 4.9,
      reviewCount: 54,
      leadTime: "6–8 weeks",
      warranty: "10 years structural",
      features: [
        "110mm sprung hardwood floor",
        "Optional full-height mirror wall",
        "Acoustic treatment lining throughout",
        "3.2m apex ceiling on 4m+ models",
        "Apex skylight module",
        "Mirror bar and ballet barre option",
        "600mm rubber boundary floor option",
        "Premium ventilation system",
      ],
      specs: {
        construction: "SIP panel + steel stud interior",
        glazing: "Double-glazed aluminium bi-folds",
        cladding: "Composite or Larch",
        roofing: "Apex with skylight option",
        floor: "110mm sprung hardwood (standard) / Cork / Rubber",
        insulation: "Acoustic + thermal PIR hybrid",
        electrical: "Full fit-out + 3-phase option for heavy equipment",
        heating: "Infrared panels or underfloor",
        planning: "Usually permitted development",
        delivery: "1–2 day installation",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=90",
            alt: "The Studio home gym pod exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1200&q=85",
            alt: "The Studio interior with sprung floor and mirrors",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "3.0 × 4.0m", widthM: 3.0, depthM: 4.0, heightM: 2.8, sqm: 12, priceAdder: 0 },
          { label: "3.5 × 5.0m", widthM: 3.5, depthM: 5.0, heightM: 3.2, sqm: 17.5, priceAdder: 4200 },
          { label: "4.0 × 6.0m", widthM: 4.0, depthM: 6.0, heightM: 3.2, sqm: 24, priceAdder: 9000 },
        ],
      },
      finishes: {
        create: [
          { name: "Natural Larch", hexColor: "#D4A76A", priceAdder: 0 },
          { name: "Anthracite", hexColor: "#3D3D3D", priceAdder: 0 },
          { name: "Sage", hexColor: "#7A9E7E", priceAdder: 0 },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Cancelled my gym membership",
            body: "Best decision I ever made. The sprung floor is absolutely incredible — my knees have never felt better. I do pilates, yoga, and strength training every morning. The Studio paid for itself within 18 months vs gym fees.",
            authorName: "Amanda W.",
            authorAge: "52",
            authorUse: "Home Gym & Pilates",
            verified: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${[horizon, zenith, nordic, annexe, studio].length} products`);
  console.log("🌱 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
