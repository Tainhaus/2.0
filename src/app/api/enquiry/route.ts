export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: max 5 submissions per minute per IP
  const ip = getClientIP(req);
  if (!rateLimit(ip, 5, 60000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await sendEnquiryEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      type: data.type,
      productInterest: data.productInterest,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[enquiry] error:", err);
    return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 500 });
  }
}
