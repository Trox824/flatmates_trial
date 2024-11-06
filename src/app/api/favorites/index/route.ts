import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { authOptions } from "~/server/auth";

export async function GET() {
  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*", // In production, replace * with your actual domain
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, headers },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        favorites: {
          include: {
            listing: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers },
      );
    }

    return NextResponse.json(
      {
        favorites: user.favorites.map((favorite) => favorite.listing),
      },
      { headers },
    );
  } catch (error) {
    console.error("Error fetching Favorite:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers },
    );
  }
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*", // In production, replace * with your actual domain
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
