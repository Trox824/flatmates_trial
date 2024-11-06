import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../server/db";

interface RemoveFavoriteBody {
  listingId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { listingId } = req.body as RemoveFavoriteBody;

  if (!listingId) {
    return res.status(400).json({ message: "Listing ID is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.id) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleted = await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        listingId,
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing Favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
