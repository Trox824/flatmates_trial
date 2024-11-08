import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { PrismaClient, Prisma, Listing } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "12");
  const sort = url.searchParams.get("sort") ?? "address"; // Default sort by address
  const addressKeyword = url.searchParams.get("address") ?? ""; // Get address filter keyword

  const offset = (page - 1) * limit;

  try {
    // Define orderBy with the correct type
    let orderBy: Prisma.ListingOrderByWithRelationInput = { address: "asc" };

    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "rentHighToLow":
        orderBy = { price: "desc" };
        break;
      case "rentLowToHigh":
        orderBy = { price: "asc" };
        break;
      case "earliestAvailable":
        orderBy = { availableFrom: "asc" };
        break;
      case "recentlyActive":
        orderBy = { updatedAt: "desc" };
        break;
    }

    // Build the filtering condition
    const addressFilter = addressKeyword
      ? ({
          address: {
            contains: addressKeyword,
            mode: "insensitive",
          },
        } as Prisma.ListingWhereInput) // Explicitly typing the filter condition
      : {};

    // Fetch room listings with pagination and soft address filter
    const rooms = await prisma.$queryRaw<Listing[]>`
      SELECT l.*, r.images
      FROM "Listing" l
      JOIN "Room" r ON r.id = l.id
      WHERE l.type = 'room'
      ${addressKeyword ? Prisma.sql`AND l.address ILIKE ${`%${addressKeyword}%`}` : Prisma.empty}
      ${
        sort === "newest"
          ? Prisma.sql`ORDER BY l."createdAt" DESC`
          : sort === "rentHighToLow"
            ? Prisma.sql`ORDER BY l.price DESC`
            : sort === "rentLowToHigh"
              ? Prisma.sql`ORDER BY l.price ASC`
              : sort === "earliestAvailable"
                ? Prisma.sql`ORDER BY l."availableFrom" ASC`
                : sort === "recentlyActive"
                  ? Prisma.sql`ORDER BY l."updatedAt" DESC`
                  : Prisma.sql`ORDER BY l.address ASC`
      }
      LIMIT ${limit} OFFSET ${offset};
    `;

    // Get total count of listings
    const [{ count }] = await prisma.$queryRaw<[{ count: number }]>`
      SELECT COUNT(*)::integer as count
      FROM "Listing" l
      JOIN "Room" r ON r.id = l.id
      WHERE l.type = 'room'
      ${addressKeyword ? Prisma.sql`AND l.address ILIKE ${`%${addressKeyword}%`}` : Prisma.empty}
    `;

    const totalResults = count;

    return NextResponse.json({
      listings: rooms,
      page,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.error();
  }
}
