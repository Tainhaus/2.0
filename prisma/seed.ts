// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with Northern Log Cabins products...");

  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.finish.deleteMany();
  await prisma.product.deleteMany();

  // ─── 1. SICILIA ───────────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "sicilia-6-7x3-8m-log-cabin",
      name: "Sicilia 6.7×3.8m Log Cabin",
      tagline: "A contemporary haven of style and comfort",
      description: "Immerse yourself in the modern elegance and comfort of the Sicilia Log Cabin — a sleek retreat where contemporary design meets timeless charm. This spacious cabin is meticulously designed to provide a versatile space where you can relax, work, create, or entertain with flair.",
      longDescription: `The Sicilia is our most spacious contemporary log cabin. Whether you envision it as a stylish garden office, a chic studio space, a cosy lounge area, or a welcoming guest suite, the Sicilia is crafted to elevate your lifestyle and offer a luxurious haven amidst the serenity of nature.

Constructed with premium Nordic spruce logs grown in ecologically managed forests of Sweden, Finland and the Baltic States, every Sicilia is built to last. The 44mm log walls provide excellent insulation, keeping the space warm in winter and cool in summer.

Double-glazed windows and secure doors flood the interior with natural light while maintaining energy efficiency. The flexible interior layout can be personalised to suit your exact needs — from a professional home office setup to a creative studio or entertainment space.

All products are packaged in UV-resistant plastic film and protected during transport. Installation plans are available for download upon purchase.`,
      price: 6237,
      category: "LOG_CABIN",
      useCase: ["HOME_OFFICE", "ART_STUDIO", "GUEST_ROOM", "ENTERTAINMENT"],
      featured: true,
      bestseller: true,
      rating: 4.8,
      reviewCount: 24,
      leadTime: "3–5 weeks",
      warranty: "5 years structural",
      features: [
        "44mm Nordic spruce log construction",
        "Double glazed windows and doors",
        "Floor area: 24.9m²",
        "Ridge height: 304cm",
        "Side wall height: 228cm",
        "18mm floor and roof boards",
        "Autoclave treated foundation bearers",
        "Installation plans included",
        "UV-resistant packaging",
        "Fully customisable interior",
      ],
      specs: {
        externalDimensions: "676 × 400 cm",
        wallDimensions: "656 × 380 cm",
        logThickness: "40mm",
        sideWallHeight: "228 cm",
        ridgeHeight: "304 cm",
        roofSurface: "31.9 m²",
        roofBoards: "18 mm",
        frontOverhang: "20 cm",
        roofTiltAngle: "22°",
        floorBoards: "18 mm",
        floorSurface: "24.9 m²",
        windows: "2 × 865 × 1210mm double glazed",
        door: "1425 × 1900mm double glazed",
        packageWeight: "68 kg",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2971356815.jpg?v=1750691576",
            alt: "Sicilia 6.7x3.8m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Sicilia_jpg.jpg?v=1750691577",
            alt: "Sicilia Log Cabin floor plan",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "6.7 × 3.8m (Standard)", widthM: 6.7, depthM: 3.8, heightM: 3.04, sqm: 24.9, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Perfect home office",
            body: "We had the Sicilia installed as a home office and it's transformed how we work. Spacious, well insulated and looks beautiful in the garden. The installation team were brilliant.",
            authorName: "Sarah T.",
            authorAge: "38",
            authorUse: "Home Office",
            verified: true,
          },
          {
            rating: 5,
            title: "Excellent quality",
            body: "Really impressed with the build quality. The logs are thick and solid, the doors and windows fit perfectly. Warm in winter and cool in summer.",
            authorName: "James W.",
            authorAge: "45",
            authorUse: "Garden Room",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 2. ORIENTAL-4 ───────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "oriental-4-4-7x3-2m-log-cabin",
      name: "Oriental 4 — 4.7×3.2m Log Cabin",
      tagline: "Your tranquil oasis in nature's embrace",
      description: "Unveil the perfect blend of elegance and tranquillity with the Oriental 4 Log Cabin. This captivating cabin offers a harmonious fusion of traditional allure and modern sophistication, providing a serene oasis where relaxation and creativity intertwine seamlessly.",
      longDescription: `The Oriental 4 is crafted from premium Nordic spruce wood, offering lasting durability and natural charm. Its generous dimensions of 4.7m × 3.2m provide ample room for various uses and configurations, from a reading nook or art studio to a meditation space or personal sanctuary.

Multiple windows and a single door provide generous natural light and ventilation throughout the cabin. The simple, clean lines of the Oriental design mean it suits both modern and traditional garden settings equally well.

Whether you envision it as a cosy retreat, an artistic studio, or a peaceful meditation space, the Oriental 4 is meticulously crafted to enrich your outdoor experience and create a tranquil sanctuary for rejuvenation and inspiration.

All products are constructed using dry spruce grown in ecologically managed forests of Sweden, Finland, Russia or the Baltic States, packaged in UV-resistant plastic film and covered by our 5-year construction warranty.`,
      price: 5371,
      category: "LOG_CABIN",
      useCase: ["READING_RETREAT", "ART_STUDIO", "HOME_OFFICE", "YOGA_STUDIO"],
      featured: true,
      rating: 4.7,
      reviewCount: 18,
      leadTime: "3–4 weeks",
      warranty: "5 years structural",
      features: [
        "Premium Nordic spruce construction",
        "40mm wall logs for excellent insulation",
        "Floor area: 12.80m²",
        "3 double glazed windows",
        "Double glazed door included",
        "Ridge height: 222cm",
        "Side wall height: 211cm",
        "18mm floor and roof boards",
        "Autoclave treated foundation bearers",
        "Suitable as office, studio or retreat",
      ],
      specs: {
        externalDimensions: "470 × 320 cm",
        wallDimensions: "450 × 300 cm",
        logThickness: "40mm",
        sideWallHeight: "211 cm",
        ridgeHeight: "222 cm",
        roofSurface: "28.30 m²",
        roofBoards: "18 mm",
        roofTiltAngle: "2°",
        floorBoards: "18 mm",
        floorSurface: "12.80 m²",
        windows: "3 × 515 × 1890mm double glazed",
        door: "1425 × 1955mm double glazed",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2971356160.jpg?v=1750691476",
            alt: "Oriental 4 4.7x3.2m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Oriental_4_jpg.jpg?v=1750691479",
            alt: "Oriental 4 Log Cabin floor plan",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "4.7 × 3.2m (Standard)", widthM: 4.7, depthM: 3.2, heightM: 2.22, sqm: 12.8, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Beautiful garden studio",
            body: "Used this as an art studio and it's perfect. Loads of natural light from the three windows, warm and dry all year round. Very happy with the quality.",
            authorName: "Claire B.",
            authorAge: "52",
            authorUse: "Art Studio",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 3. GLORIA-H ─────────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "gloria-h-4-5x2-9m-log-cabin",
      name: "Gloria H — 4.5×2.9m Log Cabin",
      tagline: "Luxury craftsmanship in Nordic high-quality spruce",
      description: "Introducing the Gloria H Log Cabin from Northern Log Cabins, a stunning abode crafted from 100% Nordic high-quality spruce. Step into luxury and craftsmanship with this exquisite log cabin featuring extra-dry laminated timber windows and doors.",
      longDescription: `The Gloria H is built from 100% Nordic high-quality spruce — the same material used in premium Scandinavian construction for centuries. Extra-dry (8–12% moisture content) laminated timber windows and doors resist warping and ensure a perfect fit year after year.

The glazed windows open in both directions for optimal ventilation, keeping the cabin fresh and comfortable even on warm summer days. Glazed doors with 100% furnishings are included as standard, along with an 18mm thick profile board for both ceiling and floor.

Autoclave impregnated timber foundation beams ensure long-term durability and resistance to damp and rot. Storm bars and all fixation equipment are included, making installation straightforward.

Ideal as a serene home office, cosy guest accommodation, tranquil reading nook, or artist's studio, the Gloria H is a versatile space that will enhance your garden for decades. Covered by our 5-year construction warranty and packaged in UV-resistant plastic film for safe delivery.`,
      price: 3788,
      category: "LOG_CABIN",
      useCase: ["HOME_OFFICE", "READING_RETREAT", "GUEST_ROOM", "ART_STUDIO"],
      featured: true,
      new: true,
      rating: 4.9,
      reviewCount: 31,
      leadTime: "2–3 weeks",
      warranty: "5 years structural",
      features: [
        "100% Nordic high-quality spruce",
        "Extra-dry (8–12%) laminated timber doors & windows",
        "Windows open in both directions",
        "18mm profile board ceiling and floor",
        "Autoclave impregnated foundation beams",
        "Storm bars included",
        "All fixation equipment included",
        "Installation drawings included",
        "5-year construction warranty",
        "UV-resistant packaging",
      ],
      specs: {
        material: "100% Nordic high-quality spruce",
        windowMaterial: "Extra-dry laminated timber (8–12% moisture)",
        floorBoards: "18mm profile board",
        ceilingBoards: "18mm profile board",
        foundationBeams: "Autoclave impregnated",
        warranty: "5 years from purchase",
        delivery: "UV-resistant plastic film packaging",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2971355675.jpg?v=1744282003",
            alt: "Gloria H 4.5x2.9m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Gloria_H_JPG.jpg?v=1744282011",
            alt: "Gloria H Log Cabin floor plan",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "4.5 × 2.9m (Standard)", widthM: 4.5, depthM: 2.9, heightM: 2.2, sqm: 13.05, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Superb quality for the price",
            body: "Absolutely love the Gloria H. The windows are a real highlight — they open both ways and let in so much air. Well made and straightforward to put up.",
            authorName: "Mike D.",
            authorAge: "41",
            authorUse: "Home Office",
            verified: true,
          },
          {
            rating: 5,
            title: "Perfect reading room",
            body: "My 68-year-old mother uses this as a reading and craft room. She's absolutely delighted — warm, bright, and very well made. Delivery was quick and the instructions were clear.",
            authorName: "Helen P.",
            authorAge: "44",
            authorUse: "Reading Room",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 4. DOVER COMBI ─────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "dover-combi-6m-x-4m",
      name: "Dover Combi — 6m×4m Log Cabin",
      tagline: "Two rooms in one — living space plus generous storage",
      description: "Introducing the Dover Combi Log Cabin — a versatile and stylish dual-room cabin crafted with precision using 44mm double T&G Nordic pine wall logs. An internal partition creates two separate spaces: a 13.89m² living area and a 7.29m² storage room.",
      longDescription: `The Dover Combi solves the age-old problem of wanting both a comfortable garden room and proper outdoor storage — without sacrificing either. The internal partition divides the cabin into a generous 13.89m² living or working space and a practical 7.29m² storage area, both accessed from the outside.

Constructed from 44mm double tongue and groove Nordic pine wall logs, the Dover Combi exudes quality and durability. Double-glazed windows and doors with double rubber gasket seals ensure excellent insulation and a snug atmosphere year-round.

A cylinder lock provides added security for your belongings, while the double door (2/3 glazed) and single solid door both open outwards for easy access. Two single windows allow natural light and ventilation into the main living area.

The light construction supports various roof coverings including bitumen tiles, giving you flexibility to personalise the finish. Whether used as a home office with tool storage, a garden retreat with equipment storage, or a hobby room with a secure annex, the Dover Combi delivers where other single-room cabins fall short.

Comes with nails, screws, and detailed installation instructions for straightforward DIY assembly.`,
      price: 7699,
      category: "LOG_CABIN",
      useCase: ["HOME_OFFICE", "ENTERTAINMENT", "GYM_WELLNESS", "GARDEN_ROOM"],
      featured: true,
      bestseller: true,
      rating: 4.8,
      reviewCount: 42,
      leadTime: "3–5 weeks",
      warranty: "5 years structural",
      features: [
        "44mm double T&G Nordic pine wall logs",
        "Internal partition — two separate rooms",
        "Main room: 13.89m² living space",
        "Storage room: 7.29m²",
        "Double-glazed windows and doors",
        "Double rubber gasket insulation seal",
        "Cylinder lock security",
        "Double door (2/3 glazed) + single solid door",
        "Customisable roof covering",
        "Nails, screws and installation instructions included",
      ],
      specs: {
        wallLogs: "44mm double T&G Nordic pine",
        mainRoomArea: "13.89 m²",
        storageArea: "7.29 m²",
        internalDimensions: "4.3 × 2.8m",
        doubleDoor: "1210 × 1940mm",
        singleDoor: "850 × 1940mm",
        doubleWindow: "1370 × 1030mm",
        lock: "Cylinder lock",
        roofCovering: "Supports bitumen tiles and alternatives",
        warranty: "5 years from purchase",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2362063246.jpg?v=1744280566",
            alt: "Dover Combi 6m x 4m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/608B0749-AA6B-4613-9B28-C67F6404A8B7.jpg?v=1744280574",
            alt: "Dover Combi interior showing dual rooms",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "6m × 4m (Standard)", widthM: 6.0, depthM: 4.0, heightM: 2.5, sqm: 21.18, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Best of both worlds",
            body: "Finally a cabin that gives me a proper office space AND somewhere to store all my garden equipment. The two-room design is genius. Well built and exactly as described.",
            authorName: "Tom H.",
            authorAge: "47",
            authorUse: "Home Office + Storage",
            verified: true,
          },
          {
            rating: 5,
            title: "Great for the hobby room",
            body: "I use the main room for my model railway and the storage side for all the equipment and materials. Exactly what I needed. The double glazing keeps it warm all winter.",
            authorName: "Roger M.",
            authorAge: "63",
            authorUse: "Hobby Room",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 5. GLORIA-F ─────────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "gloria-f-4-5x2-0m-log-cabin",
      name: "Gloria F — 4.5×2.0m Log Cabin",
      tagline: "Elegant Nordic retreat in a compact footprint",
      description: "Introducing the Gloria F Log Cabin — a retreat crafted from 100% Nordic high-quality spruce. Featuring doors and windows made from extra-dry laminated timber with just 8–12% moisture content, this elegant cabin combines beauty with long-lasting durability.",
      longDescription: `The Gloria F is proof that you don't need a large garden to enjoy a premium log cabin. At just 4.5m × 2.0m, it fits neatly into smaller gardens and patios while delivering the same quality construction as our larger models.

Doors and windows are produced from extra-dry laminated timber with a moisture content of just 8–12%, ensuring they resist warping and continue to fit perfectly for years. The large glazed windows open in both directions for excellent ventilation, while the glazed doors bring generous natural light into the space.

An 18mm thick profile board is used for both ceiling and floor, giving the interior a refined, finished feel. Autoclave impregnated timber foundation beams provide a rot-resistant, durable base. Storm bars and all fixation equipment are included.

Perfect as a peaceful garden retreat, an artist's studio bathed in natural light, a cosy home office, or a stylish guest space. Comes complete with installation drawings and plans for straightforward assembly.

Covered by our 5-year construction warranty from the date of purchase. All products are packaged in UV-resistant plastic film for protection during delivery and storage.`,
      price: 3367,
      category: "LOG_CABIN",
      useCase: ["HOME_OFFICE", "READING_RETREAT", "ART_STUDIO", "GUEST_ROOM"],
      featured: false,
      rating: 4.7,
      reviewCount: 19,
      leadTime: "2–3 weeks",
      warranty: "5 years structural",
      features: [
        "100% Nordic high-quality spruce",
        "Extra-dry laminated timber doors & windows (8–12% moisture)",
        "Large windows open in both directions",
        "18mm profile board ceiling and floor",
        "Autoclave impregnated foundation beams",
        "Storm bars included",
        "All fixation equipment included",
        "Installation drawings included",
        "Compact 4.5 × 2.0m footprint",
        "Floor area: 7.7m²",
      ],
      specs: {
        externalDimensions: "445 × 200 cm",
        wallDimensions: "425 × 180 cm",
        logThickness: "28mm",
        sideWallHeight: "188–211 cm",
        ridgeHeight: "217 cm",
        roofSurface: "10.6 m²",
        roofBoards: "18 mm",
        frontOverhang: "20 cm",
        roofTiltAngle: "7°",
        floorBoards: "18 mm",
        floorSurface: "7.7 m²",
        door: "840 × 1955mm + 1425 × 1955mm",
        packageWeight: "41 kg",
        packageSize: "470 × 108 × 41 cm",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2971355665.jpg?v=1744282005",
            alt: "Gloria F 4.5x2.0m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Gloria_F_jpg.jpg?v=1744282011",
            alt: "Gloria F Log Cabin floor plan",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "4.5 × 2.0m (Standard)", widthM: 4.5, depthM: 2.0, heightM: 2.17, sqm: 7.7, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Perfect for a small garden",
            body: "We have a terrace garden so space is limited. The Gloria F fits perfectly and looks lovely. Great quality for the price — warm, dry and well made.",
            authorName: "Anna K.",
            authorAge: "35",
            authorUse: "Garden Retreat",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 6. DERBY ────────────────────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "derby-4-5m-x-3m",
      name: "Derby — 4.5m×3m Log Cabin",
      tagline: "Versatile outdoor living with style and functionality",
      description: "Introducing the Derby Log Cabin from Northern Log Cabins — your go-to choice for versatile outdoor living and storage solutions. Crafted with 44mm Spruce double T&G wall logs, this cabin combines a comfortable 7.617m² cabin area with a practical 3.907m² storage section.",
      longDescription: `The Derby is built for those who want a proper multi-purpose outdoor building. The clever design combines a comfortable, insulated living or working space of 7.617m² with a 3.907m² storage area — all within a 4.5m × 3m footprint.

Wall logs of 44mm Spruce with double T&G jointing provide enhanced stability and excellent insulation. The high ridge height of 2.5m adds a spacious feel to the main cabin area, while the varying wall heights of 2.2m and 1.9m give the structure its distinctive split-level profile.

A cylinder lock provides added security, while adjustable hinges on windows and doors guarantee a snug, secure fit. The practical layout features a double door (1210 × 1940mm) and a single door (850 × 1940mm), along with a double window (1370 × 1030mm) for natural light and visibility.

The internal dimensions of 4.3 × 2.8m offer versatility for a range of uses — from a home office or creative studio to a storage space for tools and equipment. Foundation bearers are treated against rot for a sturdy and durable base.

Comes complete with nails, screws, and detailed installation instructions, making assembly straightforward for the DIY enthusiast. Covered by our 5-year construction warranty.`,
      price: 5499,
      category: "LOG_CABIN",
      useCase: ["HOME_OFFICE", "GYM_WELLNESS", "GARDEN_ROOM", "ART_STUDIO"],
      featured: true,
      rating: 4.8,
      reviewCount: 37,
      leadTime: "3–4 weeks",
      warranty: "5 years structural",
      features: [
        "44mm Spruce double T&G wall logs",
        "Ridge height: 2.5m",
        "Cabin area: 7.617m²",
        "Storage area: 3.907m²",
        "Internal dimensions: 4.3 × 2.8m",
        "Cylinder lock security",
        "Double door (1210 × 1940mm)",
        "Single door (850 × 1940mm)",
        "Double window (1370 × 1030mm)",
        "Rot-treated foundation bearers",
        "All fixings and instructions included",
      ],
      specs: {
        wallLogs: "44mm Spruce double T&G",
        ridgeHeight: "2.5 m",
        wallHeights: "2.2m and 1.9m",
        cabinArea: "7.617 m²",
        storageArea: "3.907 m²",
        internalDimensions: "4.3 × 2.8 m",
        doubleDoor: "1210 × 1940mm",
        singleDoor: "850 × 1940mm",
        doubleWindow: "1370 × 1030mm",
        lock: "Cylinder lock",
        warranty: "5 years from purchase",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/products/2361983871.jpg?v=1744280565",
            alt: "Derby 4.5m x 3m Log Cabin exterior",
            isPrimary: true,
            order: 0,
          },
        ],
      },
      sizes: {
        create: [
          { label: "4.5 × 3m (Standard)", widthM: 4.5, depthM: 3.0, heightM: 2.5, sqm: 11.52, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            title: "Exactly what we needed",
            body: "The Derby is spot on. I use the main cabin as a woodworking workshop and the storage section for all my timber and materials. Solid, well insulated and very good looking.",
            authorName: "David R.",
            authorAge: "58",
            authorUse: "Workshop + Storage",
            verified: true,
          },
          {
            rating: 4,
            title: "Great product, good instructions",
            body: "Good quality cabin and the split design works really well in practice. Assembly took a weekend but the instructions were clear. Deducted one star only because delivery took slightly longer than expected.",
            authorName: "Paul S.",
            authorAge: "44",
            authorUse: "Home Office",
            verified: true,
          },
        ],
      },
    },
  });

  // ─── 7. MONACO 2 BED LOG CABIN ────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "monaco-2-bed-log-cabin",
      name: "Monaco 2 — 2 Bed Log Cabin",
      tagline: "Your spacious retreat for modern living",
      description: "Experience luxury living with the Monaco 2 Bed Log Cabin. This exceptional cabin combines elegance and functionality, offering a spacious retreat that embodies contemporary design and comfort.",
      longDescription: "The Monaco 2 Bed Log Cabin is built with 70mm thick triple tongue and groove logs sourced from Finland. Two well-appointed bedrooms make this cabin ideal as a permanent residence, a holiday retreat, or a premium guest annexe.\n\nEvery Monaco comes with 100mm insulation in both floor and roof. Premium double-glazed doors and windows are available in any colour, and pre-drilled logs allow electrical cables to be concealed.\n\nBacked by our 5-year structural warranty. Call us for pricing on this bespoke product.",
      price: 0,
      category: "ANNEXE",
      useCase: ["GUEST_ROOM", "HOME_OFFICE", "ENTERTAINMENT"],
      featured: true,
      new: true,
      inStock: true,
      rating: 5.0,
      reviewCount: 0,
      leadTime: "Call for lead time",
      warranty: "5 years structural",
      features: ["70mm triple T&G logs from Finland", "Two bedrooms", "Spacious lounge and kitchen", "100mm floor and roof insulation", "Premium double-glazed doors and windows", "Pre-drilled logs for concealed electrics", "HIAB delivery to site included", "5-year structural warranty"],
      specs: { logThickness: "70mm triple tongue and groove", timberSource: "Finland", bedrooms: "2", insulation: "100mm floor and roof", delivery: "HIAB to site", warranty: "5 years" },
      images: { create: [{ url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins1.jpg?v=1750691417", alt: "Monaco 2 Bed Log Cabin exterior", isPrimary: true, order: 0 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins2.jpg?v=1750691421", alt: "Monaco 2 Bed Log Cabin side view", isPrimary: false, order: 1 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins3.jpg?v=1750691423", alt: "Monaco interior living area", isPrimary: false, order: 2 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins4.jpg?v=1750691425", alt: "Monaco bedroom", isPrimary: false, order: 3 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins5.jpg?v=1750691426", alt: "Monaco detail", isPrimary: false, order: 4 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins6.jpg?v=1750691428", alt: "Monaco kitchen", isPrimary: false, order: 5 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins7.jpg?v=1750691429", alt: "Monaco bedroom detail", isPrimary: false, order: 6 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins8.jpg?v=1750691430", alt: "Monaco garden view", isPrimary: false, order: 7 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins9.jpg?v=1750691431", alt: "Monaco detail view", isPrimary: false, order: 8 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins10.jpg?v=1750691432", alt: "Monaco interior", isPrimary: false, order: 9 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins11.jpg?v=1750691433", alt: "Monaco exterior detail", isPrimary: false, order: 10 }, { url: "https://www.northernlogcabins.com/cdn/shop/files/Monaco2bedroomlogcabinNorthernLogCabins12.jpg?v=1750691434", alt: "Monaco full exterior", isPrimary: false, order: 11 }] },
      sizes: { create: [{ label: "Call for pricing", widthM: 0, depthM: 0, heightM: 0, sqm: 0, priceAdder: 0 }] },
      finishes: { create: [{ name: "Birch", hexColor: "#D4C5A9", imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030", priceAdder: 0 }, { name: "Stone Grey", hexColor: "#8A8F8A", imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030", priceAdder: 0 }, { name: "Oak", hexColor: "#B8864E", imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030", priceAdder: 0 }, { name: "Black", hexColor: "#1A1A1A", imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030", priceAdder: 0 }] },
      reviews: { create: [] },
    },
  });

  
  // ─── 9. OUTDOOR KITCHEN POD ──────────────────────────────────
  await prisma.product.create({
    data: {
      slug: "outdoor-kitchen-pod-garden-bar-3-0x2-6m",
      name: "Outdoor Kitchen Pod & Garden Bar",
      tagline: "The ultimate alfresco entertainment suite for your garden",
      description: "Elevate your outdoor hosting with the ultimate luxury garden addition. This premium timber kitchen pod comes complete with integrated kitchen units, a fridge, and a premium BBQ — turning your backyard into a high-end restaurant and bar.",
      longDescription: `Transform your garden with the ultimate entertaining space. Crafted from high-quality dense timber, the Kitchen Pod comes complete with integrated kitchen units, a fridge, and a premium BBQ, allowing you to prep, cook, and serve without ever stepping inside the main house.

When the party winds down, the insulated electrical roller shutter secures the unit with the push of a button. Available as a full luxury turnkey install or as a shell-only unit — the perfect customisable upgrade for your outdoor lifestyle.

The standard footprint is 3.0m x 2.6m but this pod is fully customisable and available in any size to fit your garden layout. Wall thickness options of 44mm, 70mm, or 95mm interlocking premium solid logs are available.

Pre-drilled internal cable channels allow electrical wiring to be completely hidden for a flawless finish. Fully outfitted with 2 internal sockets, 1 weatherproof external socket, and elegant internal and external lighting as standard.`,
      price: 15445,
      category: "KITCHEN_POD",
      useCase: ["ENTERTAINMENT", "HOME_OFFICE"],
      featured: true,
      new: true,
      inStock: true,
      bestseller: false,
      rating: 5.0,
      reviewCount: 0,
      leadTime: "4-6 weeks",
      warranty: "5 years structural",
      features: [
        "3.0m x 2.6m standard footprint — any size available",
        "44mm, 70mm or 95mm solid log wall options",
        "Premium kitchen units, fridge and BBQ included",
        "Integrated bar counter and bench seating",
        "Insulated electrical roller shutter (auto)",
        "Heavy-duty EPDM rubber roof",
        "Pre-drilled log channels for concealed electrics",
        "2 internal sockets, 1 external socket",
        "Internal and external lighting included",
        "Optional decking extension available",
      ],
      specs: {
        standardFootprint: "3.0m x 2.6m",
        sizing: "Fully customisable — any size",
        wallThickness: "44mm, 70mm or 95mm",
        roofMaterial: "Heavy-duty EPDM rubber",
        shutter: "Insulated electrical roller shutter",
        shutterFinishes: "Anthracite Grey, Black, White or Oak",
        electrics: "2x internal, 1x external socket",
        lighting: "Internal and external fittings",
        appliances: "BBQ, fridge, kitchen cabinetry",
        warranty: "5 years from purchase",
      },
      images: {
        create: [
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Kitchen_pod_log_cabin_by_Northen_Log_cabins_5_3add265e-ecc9-494e-88d5-79c92e245bc6.png?v=1779456884",
            alt: "Outdoor Kitchen Pod exterior view",
            isPrimary: true,
            order: 0,
          },
          {
            url: "https://www.northernlogcabins.com/cdn/shop/files/Kitchen_pod_log_cabin_by_Northen_Log_cabins_7_6cb60713-64ec-45c4-a1f7-fc3292a59d22.jpg?v=1779450829",
            alt: "Outdoor Kitchen Pod with shutter open",
            isPrimary: false,
            order: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "Standard 3.0 x 2.6m", widthM: 3.0, depthM: 2.6, heightM: 2.5, sqm: 7.8, priceAdder: 0 },
          { label: "Custom size", widthM: 0, depthM: 0, heightM: 0, sqm: 0, priceAdder: 0 },
        ],
      },
      finishes: {
        create: [
          {
            name: "Birch",
            hexColor: "#D4C5A9",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/birch-aluwoodpanel1.jpg?v=1724067587&width=1030",
            priceAdder: 0,
          },
          {
            name: "Stone Grey",
            hexColor: "#8A8F8A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/stonegray-outdoorwallpanel1.jpg?v=1725361464&width=1030",
            priceAdder: 0,
          },
          {
            name: "Oak",
            hexColor: "#B8864E",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/oak-outdoorwallpanel1.jpg?v=1730215792&width=1030",
            priceAdder: 0,
          },
          {
            name: "Black",
            hexColor: "#1A1A1A",
            imageUrl: "https://akuwoodpanel.uk/cdn/shop/files/black-aluwoodpanel1.jpg?v=1724067608&width=1030",
            priceAdder: 0,
          },
        ],
      },
      reviews: {
        create: [],
      },
    },
  });

  console.log("✅ All 8 Tainhaus products seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
