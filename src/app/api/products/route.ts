export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { prisma } = await import("@/lib/prisma");
    const where: Record<string, unknown> = {};
    const category = searchParams.get("category");
    const useCase  = searchParams.get("useCase");
    if (category) where.category = category;
    if (useCase)  where.useCase = { has: useCase };
    const products = await prisma.product.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } }, sizes: true, finishes: true },
      orderBy: { featured: "desc" },
      take: 20,
    });
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
