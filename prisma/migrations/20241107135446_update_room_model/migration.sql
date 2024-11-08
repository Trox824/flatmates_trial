/*
  Warnings:

  - You are about to drop the column `accpetingTags` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `oneLiner` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,listingId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "accpetingTags",
DROP COLUMN "oneLiner",
ADD COLUMN     "acceptingTags" TEXT[],
ADD COLUMN     "authorAvatar" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "online" TEXT,
ADD COLUMN     "responseRate" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_listingId_key" ON "Favorite"("userId", "listingId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
