export const dynamic = "force-dynamic";
// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number(),
  product: z.object({
    name: z.string(),
    images: z.array(z.object({ url: z.string() })),
  }),
  selectedSize: z.object({ label: z.string() }).optional(),
  selectedFinish: z.object({ name: z.string() }).optional(),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema),
  customerDetails: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    postcode: z.string(),
    notes: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerDetails } = checkoutSchema.parse(body);
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const description = [item.selectedSize?.label, item.selectedFinish?.name].filter(Boolean).join(" · ");
      const imageUrl = item.product.images?.[0]?.url;
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.product.name,
            description: description || undefined,
            images: imageUrl ? [imageUrl] : undefined,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: { name: "VAT (20%)" },
        unit_amount: Math.round(subtotal * 0.2 * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customerDetails.email,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["GB"] },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
      metadata: {
        customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
        phone: customerDetails.phone ?? "",
        address: `${customerDetails.address1}, ${customerDetails.city}, ${customerDetails.postcode}`,
        notes: customerDetails.notes ?? "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
