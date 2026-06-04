export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:            z.string().min(2),
  email:           z.string().email(),
  phone:           z.string().optional(),
  message:         z.string().min(10),
  productId:       z.string().optional(),
  productInterest: z.string().optional(),
  type:            z.enum(["GENERAL", "PRODUCT", "CONFIGURATOR", "TRADE"]).default("GENERAL"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { prisma } = await import("@/lib/prisma");
    const enquiry = await prisma.enquiry.create({
      data: {
        name:    data.name,
        email:   data.email,
        phone:   data.phone,
        message: data.message,
        type:    data.type,
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    console.error("[enquiry] error:", err);
    return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return NextResponse.json({ enquiries });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
