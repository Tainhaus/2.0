export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name:  z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limit: 3 signups per IP per 10 minutes
  const ip = getClientIP(req);
  const allowed = rateLimit(ip, 3, 600000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, name } = schema.parse(body);

    const { prisma } = await import("@/lib/prisma");
    await prisma.newsletterSubscriber.upsert({
      where:  { email },
      update: { active: true, name: name ?? undefined },
      create: { email, name },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
