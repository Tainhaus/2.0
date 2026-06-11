// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CookieConsent } from "@/components/ui/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tainhaus.co.uk"),
  title: {
    default: "Tainhaus — Premium Garden Rooms & Pods",
    template: "%s | Tainhaus",
  },
  description:
    "Bespoke garden rooms, pods, studios, saunas, and annexes. Handcrafted to the highest standard, designed to transform your outdoor space — for life.",
  keywords: ["garden room","garden pod","garden office","home office pod","garden studio","garden sauna","garden annexe","outdoor living","bespoke garden buildings"],
  authors: [{ name: "Tainhaus" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tainhaus.co.uk",
    siteName: "Tainhaus",
    title: "Tainhaus — Premium Garden Rooms & Pods",
    description: "Bespoke garden rooms, pods, studios, saunas, and annexes. Handcrafted to the highest standard.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Tainhaus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tainhaus — Premium Garden Rooms & Pods",
    description: "Bespoke garden rooms, pods, studios, saunas, and annexes.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0A3D2A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-sand-100 text-charcoal-800 antialiased" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <CookieConsent />
      </body>
    </html>
  );
}
