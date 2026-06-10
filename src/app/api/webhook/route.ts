export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  try {
    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const { prisma } = await import("@/lib/prisma");

      // Create order record
      await prisma.enquiry.create({
        data: {
          name:    session.customer_details?.name ?? "Customer",
          email:   session.customer_details?.email ?? "",
          message: `Order completed via Stripe. Session: ${session.id}. Amount: Â£${(session.amount_total / 100).toFixed(2)}`,
          type:    "PRODUCT",
        },
      });

      console.log(`âœ… Payment confirmed: ${session.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook] error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
