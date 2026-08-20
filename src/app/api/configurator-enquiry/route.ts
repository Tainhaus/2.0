// src/app/api/configurator-enquiry/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { sendConfiguratorEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

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
