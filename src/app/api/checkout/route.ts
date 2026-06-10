export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

const schema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    name:      z.string(),
    price:     z.number().positive(),
    quantity:  z.number().int().positive(),
    image:     z.string().optional(),
    size:      z.string().optional(),
    finish:    z.string().optional(),
  })),
  successUrl: z.string().url().optional(),
  cancelUrl:  z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  // Rate limit: 10 checkout attempts per IP per 15 minutes
  const ip = getClientIP(req);
  const limit = rateLimit(`checkout:${ip}`, { maxRequests: 10, windowMs: 15 * 60_000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY not configured");
    return NextResponse.json({ error: "Payment system not configured." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { items, successUrl, cancelUrl } = schema.parse(body);

    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tainhaus.co.uk";

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            description: [item.size, item.finish].filter(Boolean).join(" Â· ") || undefined,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // pence
        },
        quantity: item.quantity,
      })),
      success_url: successUrl ?? `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  cancelUrl  ?? `${siteUrl}/checkout`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      metadata: {
        source: "tainhaus-web",
      },
      custom_text: {
        submit: {
          message: "We will contact you within 24 hours to confirm your order and arrange delivery.",
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
    }
    console.error("[checkout] Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
