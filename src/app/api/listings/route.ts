import { NextResponse } from "next/server";
import { db } from "~/server/db";
import type { Listing } from "@prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "12");

  const offset = (page - 1) * limit;

  try {
    // Join Listing and Room tables to fetch listings with room images
    const listingsWithImages = await db.$queryRaw<Listing[]>`
      SELECT l.*, r.images
      FROM "Listing" l
      JOIN "Room" r ON r.id = l.id
      WHERE l.type = 'room'
      ORDER BY RANDOM()
      LIMIT ${limit} OFFSET ${offset};
    `;

    return NextResponse.json({ listings: listingsWithImages, page });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.error();
  }
}
