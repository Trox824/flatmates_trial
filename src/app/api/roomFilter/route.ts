import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "12");
  const sort = url.searchParams.get("sort") ?? "address";
  const addressKeyword = url.searchParams.get("address") ?? "";

  // Get filter parameters
  const rentMin = url.searchParams.get("rentMin");
  const rentMax = url.searchParams.get("rentMax");
  const billsIncluded = url.searchParams.get("billsIncluded");
  const date = url.searchParams.get("date");
  const stayLength = url.searchParams.get("stayLength");
  const accommodationTypes = url.searchParams.get("accommodationTypes");
  const households = url.searchParams.get("households");
  const bedroomAvailable = url.searchParams.get("bedroomAvailable");

  // Add missing filter parameter declarations
  const propertyFeatures = url.searchParams.get("propertyFeatures");
  const bathroomsMin = url.searchParams.get("bathroomsMin");
  const flatmatesMax = url.searchParams.get("flatmatesMax");
  const inspectionRequired = url.searchParams.get("inspectionRequired");

  const offset = (page - 1) * limit;

  try {
    // Define orderBy based on schema fields
    let orderBy: Prisma.ListingOrderByWithRelationInput = { address: "asc" };

    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "rentHighToLow":
        orderBy = { weeklyRent: "desc" }; // Using weeklyRent from schema
        break;
      case "rentLowToHigh":
        orderBy = { weeklyRent: "asc" }; // Using weeklyRent from schema
        break;
      case "earliestAvailable":
        orderBy = { availableFrom: "asc" };
        break;
      case "recentlyActive":
        orderBy = { updatedAt: "desc" };
        break;
    }

    // Build the filtering condition based on schema
    const filters: Prisma.ListingWhereInput = {
      // Address filter
      address: addressKeyword
        ? {
            contains: addressKeyword,
            mode: "insensitive",
          }
        : undefined,

      // Available from date filter
      availableFrom: date
        ? {
            gte: new Date(date),
          }
        : undefined,

      // Bills included filter
      billsIncluded: billsIncluded ? billsIncluded === "true" : undefined,

      // Weekly rent filter (using weeklyRent from schema)
      weeklyRent: {
        ...(rentMin && { gte: parseInt(rentMin) }),
        ...(rentMax && { lte: parseInt(rentMax) }),
      },

      // Accommodation type filter
      type: accommodationTypes
        ? {
            in: accommodationTypes.split(","),
          }
        : undefined,

      // Household/accepting tags filter
      // Bedroom availability filter
      noBeds: bedroomAvailable
        ? {
            gte: parseInt(bedroomAvailable),
          }
        : undefined,

      // Additional filters you might want to add
      propertyFeatures: propertyFeatures
        ? {
            hasSome: propertyFeatures.split(","),
          }
        : undefined,

      // Number of bathrooms filter
      noBathrooms: bathroomsMin
        ? {
            gte: parseInt(bathroomsMin),
          }
        : undefined,

      // Number of flatmates filter
      noFlatmates: flatmatesMax
        ? {
            lte: parseInt(flatmatesMax),
          }
        : undefined,

      // Inspection availability filter
      inspectAvailable: inspectionRequired
        ? inspectionRequired === "true"
        : undefined,
    };

    // Remove undefined filters
    Object.keys(filters).forEach(
      (key) =>
        filters[key as keyof Prisma.ListingWhereInput] === undefined &&
        delete filters[key as keyof Prisma.ListingWhereInput],
    );

    // Fetch listings with pagination and filters
    const listings = await prisma.listing.findMany({
      where: filters,
      orderBy: orderBy,
      skip: offset,
      take: limit,
    });

    // Get total count of filtered listings
    const totalResults = await prisma.listing.count({
      where: filters,
    });

    return NextResponse.json({
      listings,
      page,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.error();
  }
}
