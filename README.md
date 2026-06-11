# Tainhaus — Premium Garden Rooms & Pods E-Commerce Platform

A production-ready Next.js 15 e-commerce website for a premium garden rooms and pods brand. Replace `[Tainhaus]` with your actual brand name.

---

## ✨ Features

### Frontend
- **Next.js 15 App Router** with React Server Components
- **Tailwind CSS** custom design system (Forest Green / Terracotta / Sand palette)
- **Playfair Display + DM Sans** font pairing for luxury feel
- Fully **responsive & mobile-first**
- Smooth **CSS animations** and micro-interactions
- **Dark/light mode** ready (warm tones default)
- 95+ Lighthouse score target 

### Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, use cases, featured products, testimonials, process, trust, newsletter |
| `/shop` | Product listing with category, use-case, price filters + sort |
| `/products/[slug]` | Product detail with gallery, configurator, specs, reviews |
| `/configurator` | 4-step interactive pod design tool |
| `/about` | Brand story, values, team, sustainability, timeline |
| `/contact` | Enquiry form + contact details |
| `/checkout` | Stripe-ready checkout flow |
| `/checkout/success` | Post-purchase confirmation |

### Backend
- **Prisma ORM + PostgreSQL** (Products, Orders, Reviews, Enquiries, Newsletter)
- **Stripe** checkout session creation (ready to connect)
- **Clerk** authentication (admin-ready)
- **Zod** validation on all API routes
- Newsletter, enquiry, and products API routes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or hosted)
- Git

### 1. Clone and install

```bash
git clone https://github.com/your-org/your-garden-pod.git
cd your-garden-pod
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values. At minimum you need:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/gardenpod"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

**Option A — Local PostgreSQL with Docker:**
```bash
docker run \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gardenpod \
  -p 5432:5432 \
  -d postgres:16
```

**Option B — Hosted (Supabase, Neon, Railway, Vercel Postgres):**
Get the connection string from your provider and set `DATABASE_URL`.

### 4. Run Prisma migrations and seed

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed with 5 demo products
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🏗️ Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, metadata, nav, footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + custom CSS
│   ├── loading.tsx             # Global loading state
│   ├── not-found.tsx           # 404 page
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact + enquiry form
│   ├── configurator/page.tsx   # Pod design configurator
│   ├── shop/page.tsx           # Product listing
│   ├── products/[slug]/        # Product detail
│   └── api/                    # API routes
│       ├── newsletter/         # POST - Newsletter signup
│       ├── products/           # GET - Product listing
│       ├── enquiry/            # POST - Contact enquiry
│       └── checkout/           # POST - Stripe session
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx          # Fixed responsive navbar
│   │   ├── footer.tsx          # Rich footer with newsletter
│   │   └── cart-drawer.tsx     # Slide-in cart
│   ├── sections/
│   │   ├── hero.tsx            # Slideshow hero
│   │   ├── use-cases.tsx       # 6 use case cards
│   │   ├── featured-products.tsx # RSC product section
│   │   ├── testimonials.tsx    # Animated testimonial carousel
│   │   ├── process.tsx         # 4-step process
│   │   ├── trust.tsx           # Trust signals grid
│   │   └── newsletter-section.tsx
│   ├── shop/
│   │   ├── product-card.tsx    # Product card with hover
│   │   ├── product-card-skeleton.tsx
│   │   ├── product-gallery.tsx # Main image + lightbox
│   │   ├── product-configurator.tsx # Size/finish/use selector
│   │   ├── reviews-section.tsx # Reviews with rating bars
│   │   ├── shop-header.tsx     # Title + quick filters + sort
│   │   └── shop-filters.tsx    # Sidebar filters
│   └── ui/
│       └── newsletter-form.tsx
│
├── lib/
│   ├── utils.ts                # cn, formatPrice, helpers
│   ├── prisma.ts               # Prisma client singleton
│   └── cart-store.ts           # Zustand cart store
│
├── types/
│   └── index.ts                # TypeScript types
│
├── hooks/
│   └── useScrollAnimation.ts   # Intersection observer hook
│
prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # 5 demo products with reviews
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your site URL (used for OG and redirects) |
| `STRIPE_SECRET_KEY` | For checkout | Stripe secret key (sk_test_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For checkout | Stripe public key (pk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe webhook signing secret |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | For auth | Clerk public key |
| `CLERK_SECRET_KEY` | For auth | Clerk secret key |
| `RESEND_API_KEY` | Optional | For enquiry email notifications |

See `.env.example` for the full list with descriptions.

---

## 💳 Stripe Integration

The Stripe checkout is structured and ready — you just need to connect your keys.

### 1. Add your Stripe keys to `.env.local`

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 2. Connect the checkout flow

In `src/app/checkout/page.tsx`, uncomment the API call block:

```typescript
const res = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items, customerDetails: form }),
});
const { url } = await res.json();
window.location.href = url;
```

### 3. Set up webhooks (for order confirmation)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Listen to events locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Create `src/app/api/webhooks/stripe/route.ts` to handle `checkout.session.completed` events.

---

## 🔐 Authentication (Clerk)

The project is Clerk-ready for customer accounts and an admin dashboard.

### Setup

1. Create a free account at [clerk.com](https://clerk.com)
2. Add your keys to `.env.local`
3. Wrap your app with `<ClerkProvider>` in `src/app/layout.tsx`

```typescript
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>...</html>
    </ClerkProvider>
  );
}
```

4. Protect admin routes with Clerk middleware

---

## 🌱 Database Seeding

The seed script creates 5 products:

| Product | Category | Price |
|---------|----------|-------|
| The Horizon | Garden Room | £18,995 |
| The Zenith | Garden Pod | £22,995 |
| The Nordic | Sauna | £8,995 |
| The Annexe | Garden Room | £42,995 |
| The Studio | Studio | £16,995 |

To re-seed (clears existing data first):

```bash
npm run db:seed
```

To view data in a visual interface:

```bash
npm run db:studio
```

---

## 🚀 Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial Tainhaus build"
git push origin main
```

### 2. Create Vercel project

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Click Deploy

### 3. Add environment variables

In Vercel Dashboard → Settings → Environment Variables, add all variables from `.env.example`.

For the database, use **Vercel Postgres** (one-click setup) or connect Supabase/Neon:

```bash
vercel env add DATABASE_URL
```

### 4. Run migrations on production

```bash
# Via Vercel CLI
vercel env pull .env.production.local
DATABASE_URL="your-prod-url" npx prisma db push
DATABASE_URL="your-prod-url" npx tsx prisma/seed.ts
```

Or add a build command in `package.json`:

```json
"build": "prisma generate && next build"
```

### 5. Custom domain

In Vercel Dashboard → Domains → Add your domain.

---

## 🖼️ Replacing Placeholder Images

All product images currently use Unsplash URLs. Replace with your own photography:

1. Upload images to Cloudinary (recommended) or any CDN
2. Update the `url` fields in `prisma/seed.ts`
3. Add your CDN domain to `next.config.ts` `remotePatterns`
4. Re-run `npm run db:seed`

For Cloudinary:
```typescript
// In next.config.ts
{
  protocol: "https",
  hostname: "res.cloudinary.com",
}
```

---

## 🎨 Customisation Guide

### Brand name
Search and replace `Tainhaus` across all files.

### Colours
Edit `tailwind.config.ts` — the `forest`, `terracotta`, `sand`, and `olive` colour scales.

### Products
Edit `prisma/seed.ts` with your actual products, or use Prisma Studio (`npm run db:studio`) to add/edit products.

### Typography
Change the Google Fonts imports in `src/app/layout.tsx`. The display font variable is `--font-display`.

### Phone / email
Search for `01234 567 890` and `hello@Tainhaus.co.uk` and replace throughout.

### Address
Search for `14 Craftsman Way, Worcestershire` and replace.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Clerk |
| Payments | Stripe |
| State | Zustand |
| Validation | Zod |
| Fonts | Google Fonts (Playfair Display, DM Sans, DM Mono) |
| Deployment | Vercel |

---

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to DB
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with demo data
```

---

## 📋 Next Steps for Production

### Essential before launch
- [ ] Replace all Unsplash images with real brand photography
- [ ] Replace `[Tainhaus]` with your actual brand name
- [ ] Connect Stripe with live keys and test full checkout flow
- [ ] Set up email notifications for enquiries (Resend / SendGrid)
- [ ] Set up Stripe webhooks for order confirmation emails
- [ ] Configure custom domain in Vercel
- [ ] Add Google Analytics or Plausible
- [ ] Test on mobile devices

### Nice to have
- [ ] Admin dashboard (Clerk + Prisma Studio or build custom)
- [ ] Customer accounts & order history
- [ ] Wishlist functionality
- [ ] Product image upload flow (Cloudinary)
- [ ] Live chat widget
- [ ] Blog / content marketing section
- [ ] Google My Business integration
- [ ] Sitemap + robots.txt (Next.js built-in)

---

## 📄 Licence

© Tainhaus Ltd. All rights reserved.

---

*Built with care by Tainhaus. Replace this with your own attribution.*
