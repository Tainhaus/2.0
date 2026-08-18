// src/components/layout/footer.tsx
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Instagram, Facebook, ArrowRight, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Products: [
    { label: "Garden Rooms", href: "/shop?category=GARDEN_ROOM" },
    { label: "Garden Pods", href: "/shop?category=GARDEN_POD" },
    { label: "Studios", href: "/shop?category=STUDIO" },
    { label: "Office Spaces", href: "/shop?category=GARDEN_ROOM" },
    { label: "All Products", href: "/shop" },
  ],
  Services: [
    { label: "Design Configurator", href: "/configurator" },
    { label: "Custom Build", href: "/configurator" },
    { label: "Installation", href: "/about#installation" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/about#sustainability" },
  ],
  Help: [
    { label: "Returns Policy", href: "/returns" },
    { label: "Warranty & Guarantee", href: "/warranty" },
    { label: "Delivery & Lead Time", href: "/delivery" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/tainhaus", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/tainhaus", Icon: Facebook },
];

const TRUST_BADGES = [
  { label: "5-Year Structural Warranty", icon: "🛡" },
  { label: "FSC Certified Timber", icon: "🌲" },
  { label: "Carbon Neutral Delivery", icon: "♻️" },
  { label: "UK Installed", icon: "🇬🇧" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-sand-200">

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
              Premium log cabins and garden rooms, delivered and installed across the UK.
              FSC-certified timber. Built to last decades.
            </p>

            <div className="space-y-3 mb-8">

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <Link href="mailto:info@tainhaus.co.uk" className="font-body text-xs text-sand-500 hover:text-white transition-colors">
                  info@tainhaus.co.uk
                </Link>
              </div>
              <div className="font-body text-xs text-sand-500">
                Mon–Fri: 7:00am – 6:00pm<br />
                Saturday: 9:00am – 5:00pm
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
                    <li key={link.href + link.label}>
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
            © {new Date().getFullYear()} Tainhaus Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Cookie Policy", "Terms & Conditions"].map((item) => (
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
