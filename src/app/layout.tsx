// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CookieConsent } from "@/components/ui/cookie-consent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A3D2A",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tainhaus.co.uk"),
  title: {
    default: "Tainhaus | Premium Log Cabins & Garden Rooms UK",
    template: "%s | Tainhaus Log Cabins",
  },
  description:
    "Tainhaus supplies premium log cabins and garden rooms across the UK. From compact garden offices to full 2-bedroom annexes — delivered and installed in 4-6 weeks. Browse our range and get a free quote.",
  keywords: [
    "log cabins UK",
    "garden rooms UK",
    "log cabin for sale",
    "garden office UK",
    "log cabin home office",
    "garden room with installation",
    "log cabin annexe",
    "outdoor kitchen pod",
    "garden bar UK",
    "wooden garden room",
    "insulated garden room",
    "buy log cabin UK",
    "log cabin delivered installed",
    "garden room prices",
    "log cabin garden office",
    "tainhaus",
    "log cabins England",
    "garden rooms North West",
    "garden studio UK",
    "home office garden pod",
  ],
  authors: [{ name: "Tainhaus", url: "https://tainhaus.co.uk" }],
  creator: "Tainhaus",
  publisher: "Tainhaus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tainhaus.co.uk",
    siteName: "Tainhaus",
    title: "Tainhaus | Premium Log Cabins & Garden Rooms UK",
    description:
      "Premium log cabins and garden rooms delivered and installed across the UK in 4-6 weeks. Browse our range from compact garden offices to full 2-bedroom annexes.",
    images: [
      {
        url: "/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Tainhaus premium log cabin in a beautiful UK garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tainhaus | Premium Log Cabins & Garden Rooms UK",
    description:
      "Premium log cabins and garden rooms delivered and installed across the UK in 4-6 weeks.",
    images: ["/hero-1.jpg"],
  },
  alternates: {
    canonical: "https://tainhaus.co.uk",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
  },
  category: "home improvement",
};

// JSON-LD structured data for rich results in Google
const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Tainhaus",
  description: "Premium log cabins and garden rooms supplied and installed across the UK.",
  url: "https://tainhaus.co.uk",
  logo: "https://tainhaus.co.uk/tainhaus-logo.png",
  image: "https://tainhaus.co.uk/hero-1.jpg",
  telephone: "+441234567890",
  email: "info@tainhaus.co.uk",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressRegion: "England",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  priceRange: "££",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Log Cabins & Garden Rooms",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Garden Rooms" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Log Cabin Annexes" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Outdoor Kitchen Pods" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body bg-sand-100 text-charcoal-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CookieConsent />
      </body>
    </html>
  );
}
