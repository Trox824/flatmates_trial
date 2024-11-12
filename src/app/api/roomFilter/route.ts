import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const pageParam: string | null = url.searchParams.get("page");
  const limitParam: string | null = url.searchParams.get("limit");
  const sort: string = url.searchParams.get("sort") ?? "address";
  const addressKeywordParam: string | null = url.searchParams.get("address");
  const rentMinParam: string | null = url.searchParams.get("rentMin");
  const rentMaxParam: string | null = url.searchParams.get("rentMax");
  const billsIncludedParam: string | null =
    url.searchParams.get("billsIncluded");
  const availableFromParam: string | null = url.searchParams.get("date"); // Changed from "availableFrom" to "date"
  const bedroomAvailableParam: string | null =
    url.searchParams.get("bedroomAvailable");
  const bathroomsMinParam: string | null = url.searchParams.get("bathroomsMin");
  const flatmatesMaxParam: string | null = url.searchParams.get("flatmatesMax");
  const accommodationTypesParam: string | null =
    url.searchParams.get("accommodationTypes");

  // Parse and validate pagination parameters
  const page: number = pageParam !== null ? parseInt(pageParam, 10) : 1;
  const limit: number = limitParam !== null ? parseInt(limitParam, 10) : 12;
  const offset: number = (page - 1) * limit;

  // Trim and validate string parameters
  const addressKeyword: string =
    addressKeywordParam !== null ? addressKeywordParam.trim() : "";

  // Build conditions and parameters
  const conditions: string[] = [];
  const params: (string | number | boolean | Date)[] = [];

  if (rentMinParam !== null) {
    const rentMin: number = parseFloat(rentMinParam);
    if (!isNaN(rentMin)) {
      conditions.push(`r."weeklyRent" >= $${params.length + 1}`);
      params.push(rentMin);
    }
  }

  if (billsIncludedParam !== null) {
    const billsIncluded: boolean = billsIncludedParam === "true";
    conditions.push(`l."billsIncluded" = $${params.length + 1}`);
    params.push(billsIncluded);
  }

  if (accommodationTypesParam !== null) {
    const typesArray: string[] = accommodationTypesParam
      .split(",")
      .map((type) => type.trim());
    if (typesArray.length > 0) {
      const placeholders: string = typesArray
        .map((_, index) => `$${params.length + index + 1}`)
        .join(", ");
      conditions.push(`l."heading" ILIKE ANY (ARRAY[${placeholders}])`);
      params.push(...typesArray.map((type: string) => `%${type}%`));
    }
  }

  if (availableFromParam !== null) {
    const availableFromDate: Date = new Date(availableFromParam);
    if (!isNaN(availableFromDate.getTime())) {
      conditions.push(`l."availableFrom" <= $${params.length + 1}`);
      params.push(availableFromDate);
    }
  }

  if (rentMaxParam !== null) {
    const rentMax: number = parseFloat(rentMaxParam);
    if (!isNaN(rentMax)) {
      conditions.push(`r."weeklyRent" <= $${params.length + 1}`);
      params.push(rentMax);
    }
  }

  if (bedroomAvailableParam !== null) {
    const bedroomAvailable: number = parseInt(bedroomAvailableParam, 10);
    if (!isNaN(bedroomAvailable)) {
      conditions.push(`r."noBeds" >= $${params.length + 1}`);
      params.push(bedroomAvailable);
    }
  }

  if (bathroomsMinParam !== null) {
    const bathroomsMin: number = parseInt(bathroomsMinParam, 10);
    if (!isNaN(bathroomsMin)) {
      conditions.push(`r."noBathrooms" >= $${params.length + 1}`);
      params.push(bathroomsMin);
    }
  }

  if (flatmatesMaxParam !== null) {
    const flatmatesMax: number = parseInt(flatmatesMaxParam, 10);
    if (!isNaN(flatmatesMax)) {
      conditions.push(`r."noFlatmates" <= $${params.length + 1}`);
      params.push(flatmatesMax);
    }
  }

  if (addressKeyword !== "") {
    conditions.push(`r."location" ILIKE $${params.length + 1}`);
    params.push(`%${addressKeyword}%`);
  }

  let whereClause: string = "";
  if (conditions.length > 0) {
    whereClause = "WHERE " + conditions.join(" AND ");
  }

  // Determine the order clause
  let orderClause: string = "";
  switch (sort) {
    case "newest":
      orderClause = 'ORDER BY r."createdAt" DESC';
      break;
    case "rentHighToLow":
      orderClause = 'ORDER BY r."weeklyRent" DESC';
      break;
    case "rentLowToHigh":
      orderClause = 'ORDER BY r."weeklyRent" ASC';
      break;
    case "earliestAvailable":
      orderClause = 'ORDER BY l."availableFrom" ASC';
      break;
    case "recentlyActive":
      orderClause = 'ORDER BY r."updatedAt" DESC';
      break;
    case "location":
    default:
      orderClause = 'ORDER BY l."address" ASC';
      break;
  }

  // Build the main query without parameterizing limit and offset
  const mainQuery: string = `
    SELECT r."id", r."weeklyRent", r."noBeds", r."noBathrooms", r."noFlatmates", r."location", r."createdAt", r."updatedAt", l."availableFrom", l."billsIncluded", l."address", r."images", l."heading", l."secondaryContent"
    FROM "Room" r
    JOIN "Listing" l ON r.id = l.id
    ${whereClause}
    ${orderClause}
    LIMIT ${limit} OFFSET ${offset}
  `;

  // Clone params for count query without limit and offset
  const countParams: (string | number | boolean | Date)[] = [...params];

  const countQuery: string = `
    SELECT COUNT(DISTINCT r.id) AS count
    FROM "Room" r
    JOIN "Listing" l ON r.id = l.id
    ${whereClause}
  `;

  try {
    // Add logging to debug the queries
    console.log("Main Query Parameters:", params);
    console.log("Count Query Parameters:", countParams);

    // Fetch rooms with pagination, filters, and include listing data
    const rooms: Array<{
      id: string;
      weeklyRent: number;
      noBeds: number;
      noBathrooms: number;
      noFlatmates: number;
      location: string;
      createdAt: Date;
      updatedAt: Date;
      availableFrom: Date;
      billsIncluded: boolean;
      address: string;
      images: string[];
      heading: string;
      secondaryContent: string;
    }> = await prisma.$queryRawUnsafe(mainQuery, ...params);
    console.log("Number of rooms returned:", rooms.length);

    // Get total count of filtered rooms
    const totalResultsArray: { count: bigint }[] = await prisma.$queryRawUnsafe(
      countQuery,
      ...countParams,
    );
    console.log("Raw count result:", totalResultsArray[0]);

    const totalResultsBigInt: bigint = totalResultsArray[0]?.count ?? BigInt(0);

    // Convert BigInt to Number
    const totalResults: number = Number(totalResultsBigInt);

    // Calculate total pages
    const totalPages: number = Math.ceil(totalResults / limit);
    console.log(mainQuery);
    return NextResponse.json({
      listings: rooms,
      page,
      totalResults,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.error();
  }
}
