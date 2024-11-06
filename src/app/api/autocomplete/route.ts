import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const results = await prisma.listing.findMany({
    where: {
      address: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: { address: true },
    take: 10,
  });

  return NextResponse.json([
    ...new Set(results.map((listing) => listing.address)),
  ]);
}
