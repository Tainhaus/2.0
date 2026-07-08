// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CookieConsent } from "@/components/ui/cookie-consent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

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
    "Tainhaus supplies premium log cabins and garden rooms across the UK. From compact garden offices to full 2-bedroom annexes — delivered and installed in 4-6 weeks.",
  keywords: [
    "log cabins UK", "garden rooms UK", "log cabin for sale", "garden office UK",
    "sustainable log cabin", "eco garden room", "FSC certified log cabin",
    "log cabin home office", "garden room with installation", "log cabin annexe",
    "outdoor kitchen pod", "garden bar UK", "wooden garden room",
    "insulated garden room", "buy log cabin UK", "tainhaus",
  ],
  authors: [{ name: "Tainhaus", url: "https://tainhaus.co.uk" }],
  creator: "Tainhaus",
  publisher: "Tainhaus",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tainhaus.co.uk",
    siteName: "Tainhaus",
    title: "Tainhaus | Premium Log Cabins & Garden Rooms UK",
    description: "Premium log cabins and garden rooms delivered and installed across the UK in 4-6 weeks.",
    images: [{ url: "/hero-1.jpg", width: 1200, height: 630, alt: "Tainhaus premium log cabin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tainhaus | Premium Log Cabins & Garden Rooms UK",
    description: "Premium log cabins and garden rooms delivered and installed across the UK in 4-6 weeks.",
    images: ["/hero-1.jpg"],
  },
  alternates: { canonical: "https://tainhaus.co.uk" },
  icons: {
    icon: [{ url: "/tainhaus-logo.png", type: "image/png" }],
    apple: "/tainhaus-logo.png",
    shortcut: "/tainhaus-logo.png",
  },
  category: "home improvement",
};

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
  address: { "@type": "PostalAddress", addressCountry: "GB", addressRegion: "England" },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  priceRange: "££",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`scroll-smooth ${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/hero-1.jpg.png" fetchPriority="high" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-38Y28936K6" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-38Y28936K6');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
