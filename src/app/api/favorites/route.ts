export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../server/auth";
import { prisma } from "../../../server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all favorites for the current user
    const favorites = await prisma.favorite.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        listingId: true,
      },
    });

    // Return just the listing IDs
    return NextResponse.json({
      favorites: favorites.map((fav) => ({ id: fav.listingId })),
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
