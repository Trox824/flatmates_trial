-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "subheading" TEXT,
    "location" TEXT,
    "secondaryContent" TEXT,
    "description" TEXT,
    "category" TEXT,
    "availableFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonListing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "location" TEXT,
    "image" TEXT,
    "stayLength" INTEGER NOT NULL,
    "moveInDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "verification" TEXT,
    "tags" TEXT[],
    "preferences" TEXT[],
    "oneLiner" TEXT,
    "preferedLocation" TEXT,
    "furnishedRoom" TEXT,
    "maxNoFlatmates" TEXT,
    "parking" TEXT,
    "bathRoom" TEXT,
    "internet" TEXT,
    "preferedAccommodationType" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT,
    "oneLiner" TEXT,
    "description" TEXT,
    "aboutFlatmate" TEXT,
    "noBeds" INTEGER NOT NULL,
    "noBathrooms" INTEGER NOT NULL,
    "noFlatmates" INTEGER NOT NULL,
    "propertyFeatures" TEXT[],
    "accpetingTags" TEXT[],
    "inspectAvailable" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weeklyRent" INTEGER NOT NULL,
    "bond" INTEGER,
    "roomType" TEXT,
    "stayLength" INTEGER,
    "furnished" TEXT,
    "internet" TEXT,
    "parking" TEXT,
    "bathRoom" TEXT,
    "bills" TEXT,
    "acceptedPeople" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureListing" (
    "name" TEXT NOT NULL,
    "svgLink" TEXT NOT NULL,

    CONSTRAINT "FeatureListing_pkey" PRIMARY KEY ("name")
);
