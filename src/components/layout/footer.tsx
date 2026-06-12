// src/components/layout/footer.tsx
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Instagram, Facebook, Youtube, Linkedin, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/ui/newsletter-form";

const FOOTER_LINKS = {
  Products: [
    { label: "Garden Rooms", href: "/shop?category=GARDEN_ROOM" },
    { label: "Garden Pods", href: "/shop?category=GARDEN_POD" },
    { label: "Studios", href: "/shop?category=STUDIO" },
    { label: "Saunas", href: "/shop?category=SAUNA" },
    { label: "All Products", href: "/shop" },
  ],
  Services: [
    { label: "Design Configurator", href: "/configurator" },
    { label: "Installation", href: "/about#installation" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Inspiration Gallery", href: "/inspiration" },
  ],
  Help: [
    { label: "Returns Policy", href: "/returns" },
    { label: "Warranty & Guarantee", href: "/warranty" },
    { label: "Delivery & Lead Time", href: "/delivery" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

const TRUST_BADGES = [
  { label: "10-Year Structural Warranty", icon: "🛡" },
  { label: "FSC Certified Timber", icon: "🌲" },
  { label: "Carbon Neutral Delivery", icon: "♻️" },
  { label: "UK Manufactured", icon: "🇬🇧" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-sand-200">
      {/* Newsletter band */}
      <div className="bg-forest-800 py-14 md:py-16">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                Get inspired in your inbox
              </h3>
              <p className="text-forest-200 font-body text-sm max-w-md">
                Design ideas, customer stories, seasonal offers, and planning tips — delivered monthly.
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px]">
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-b border-white/5 py-7">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <span className="text-xl">{badge.icon}</span>
                <span className="font-body text-xs font-medium text-sand-400 uppercase tracking-wide">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-site py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {/* Brand column */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <Logo variant="light" size="lg" />
            </div>

            <p className="font-body text-sm text-sand-300 leading-relaxed mb-8">
              Bespoke garden rooms and pods, handcrafted in the UK with premium sustainable materials. 
              Transforming outdoor spaces since 2015.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta-400 mt-0.5 shrink-0" />
                <span className="font-body text-xs text-sand-500">
                  Tainhaus Workshop<br />
                  14 Craftsman Way, Worcestershire, WR4 0AB
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <Link href="tel:+441234567890" className="font-body text-xs text-sand-500 hover:text-white transition-colors">
                  01234 567 890
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <Link href="mailto:hello@tainhaus.co.uk" className="font-body text-xs text-sand-500 hover:text-white transition-colors">
                  hello@tainhaus.co.uk
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sand-500 hover:text-white hover:bg-forest-700 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-body text-xs font-semibold text-sand-400 uppercase tracking-widest mb-5">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-sand-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-sand-600">
            © {new Date().getFullYear()} Tainhaus Ltd. All rights reserved. Company No. 12345678. 
            VAT No. GB 123 4567 89
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Cookie Policy", "Terms & Conditions", "Accessibility"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="font-body text-xs text-sand-600 hover:text-sand-300 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
