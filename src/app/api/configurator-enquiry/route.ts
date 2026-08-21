export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { sendConfiguratorEmail } from "@/lib/email";
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

    if (!data.name || !data.email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    await sendConfiguratorEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      cabinType: data.cabinType,
      size: data.size,
      colour: data.colour,
      notes: data.notes,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[configurator-enquiry] error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
