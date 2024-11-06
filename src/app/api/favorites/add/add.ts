import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../server/db";

// Define the expected shape of the request body
interface AddFavoriteRequestBody {
  listingId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Type the request body to avoid `any`
  const { listingId } = req.body as AddFavoriteRequestBody;

  if (!listingId) {
    return res.status(400).json({ message: "Listing ID is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // Ensure `user` and `user.id` are defined
    if (!user?.id) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the Favorite already exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        listingId,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Listing already favorited" });
    }

    await prisma.favorite.create({
      data: {
        userId: user.id,
        listingId,
      },
    });

    res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Error adding Favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
