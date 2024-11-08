import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RoomWithListing {
  id: string;
  // add other room fields you need
  heading2: string | null;
  address2: string | null;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Old code:
    // const room = await prisma.room.findUnique({
    //   where: {
    //     id: id,
    //   },
    // });

    // New code that matches the format with Listing data:
    const room = await prisma.$queryRaw<RoomWithListing[]>`
      SELECT r.*, l.heading as heading2, l.address as address2
      FROM "Room" r
      LEFT JOIN "Listing" l ON l.id = r.id
      WHERE r.id = ${params.id};
    `;

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room[0]);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 },
    );
  }
}
