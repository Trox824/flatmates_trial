import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { PrismaClient, Prisma, Listing } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "12");
  const sort = url.searchParams.get("sort") ?? "address"; // Default sort by address
  const addressKeyword = url.searchParams.get("address") ?? ""; // Get address filter keyword
  const date = url.searchParams.get("date"); // New date parameter
  const stayLength = url.searchParams.get("stayLength"); // New stay length parameter
  const rentPerWeek = url.searchParams.get("rentPerWeek");
  const accommodationType = url.searchParams.get("accommodationType");
  const household = url.searchParams.get("household");
  const bedroomAvailable = url.searchParams.get("bedroomAvailable");

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
      // Add new sort options based on rentPerWeek or others if needed
    }

    // Build the filtering condition
    const filters: Prisma.ListingWhereInput = {
      address: addressKeyword
        ? {
            contains: addressKeyword,
            mode: "insensitive",
          }
        : undefined,
      availableFrom: date
        ? {
            gte: new Date(date),
          }
        : undefined,
      price: rentPerWeek
        ? {
            equals: parseFloat(rentPerWeek),
          }
        : undefined,
    };

    // Fetch room listings with pagination and filters
    const rooms = await prisma.listing.findMany({
      where: filters,
      orderBy: orderBy,
      skip: offset,
      take: limit,
    });

    // Get total count of listings
    const totalResults = await prisma.listing.count({
      where: filters,
    });

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
