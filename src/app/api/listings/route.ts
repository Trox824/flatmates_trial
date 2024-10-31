import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import type { Listing } from '@prisma/client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const limit = parseInt(url.searchParams.get('limit') ?? '12');

  const offset = (page - 1) * limit;

  try {
    // Fetch paginated 'room' listings
    const rooms = await db.$queryRaw<Listing[]>`
      SELECT * FROM "Listing" WHERE type = 'room' ORDER BY RANDOM() LIMIT ${limit} OFFSET ${offset};
    `;

    // Fetch paginated 'person' listings
    const personListings = await db.$queryRaw<Listing[]>`
      SELECT * FROM "Listing" WHERE type = 'person' ORDER BY RANDOM() LIMIT ${limit} OFFSET ${offset};
    `;

    // Combine and shuffle listings
    const allListings = [...rooms, ...personListings];

    return NextResponse.json({ listings: allListings, page });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.error();
  }
}