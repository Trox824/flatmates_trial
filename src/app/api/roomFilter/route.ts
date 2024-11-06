import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { PrismaClient, Prisma } from "@prisma/client";

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
    const rooms = await prisma.listing.findMany({
      where: {
        type: "room",
        ...addressFilter, // Apply the address filter if provided
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    // Get total count of listings to calculate total pages if needed
    const totalRooms = await prisma.listing.count({
      where: {
        type: "room",
        ...addressFilter,
      },
    });
    const totalResults = totalRooms;

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
