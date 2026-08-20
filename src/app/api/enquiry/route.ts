export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
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
