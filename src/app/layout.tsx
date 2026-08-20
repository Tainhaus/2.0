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
    "Ibiza", "garden bar UK", "wooden garden room",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/favicon-192x192.png",
    shortcut: "/favicon.ico",
    other: [
      { rel: "icon", url: "/favicon-512x512.png", sizes: "512x512" },
    ],
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
  "telephone": "+447859765130",
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
        {/* Floating WhatsApp button */}
        <a
          href="https://wa.me/447859765130?text=Hi%20Tainhaus,%20I'm%20interested%20in%20one%20of%20your%20log%20cabins%20and%20would%20like%20a%20free%20quote."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 999,
            backgroundColor: "#25D366",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
