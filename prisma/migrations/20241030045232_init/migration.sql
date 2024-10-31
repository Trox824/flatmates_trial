/*
  Warnings:

  - You are about to drop the column `category` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `price` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyRent` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "category",
DROP COLUMN "location",
ADD COLUMN     "accpetingTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "address" TEXT,
ADD COLUMN     "billsIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inspectAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noBathrooms" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "noBeds" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "noFlatmates" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "propertyFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weeklyRent" INTEGER NOT NULL,
ALTER COLUMN "availableFrom" DROP NOT NULL,
ALTER COLUMN "availableFrom" DROP DEFAULT;
