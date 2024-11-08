import fs from "fs/promises";
import { PrismaClient, Listing } from "@prisma/client";
import { ScrapflyClient, ScrapeConfig, ScrapeResult } from "scrapfly-sdk";
import * as cheerio from "cheerio";

const prisma = new PrismaClient();

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

class ScrapeClient {
  private client: ScrapflyClient;

  constructor() {
    if (!process.env.SCRAPFLY_API_KEY) {
      throw new Error("SCRAPFLY_API_KEY environment variable is not set");
    }
    this.client = new ScrapflyClient({ key: process.env.SCRAPFLY_API_KEY });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async scrapePages(url: string): Promise<ScrapeResult | null> {
    // Updated configuration to default settings for Scrapfly
    const config: ScrapeConfig = new ScrapeConfig({
      url: url,
      tags: ["player", "project:default"],
      asp: true,
      render_js: true,
    });

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result: ScrapeResult = await this.client.scrape(config);
        if (!result) return null;
        return result;
      } catch (error: unknown) {
        const err = error as Error & {
          response?: { data: unknown; status: number };
        };
        console.error(`Attempt ${attempt}/${MAX_RETRIES} failed:`, {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });

        if (attempt < MAX_RETRIES) {
          const delayTime = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`Waiting ${delayTime}ms before retry...`);
          await this.delay(delayTime);
          continue;
        }
        throw error;
      }
    }
    throw new Error(
      `Failed to fetch URL ${url} after ${MAX_RETRIES} attempts.`,
    );
  }
}

// Helper function to safely parse integers
function safeParseInt(value: string, defaultValue = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export async function scrapeRooms() {
  const scrapeClient = new ScrapeClient();

  try {
    // Fetch the first 3 listings with type = 'room'
    const listings: Listing[] = await prisma.listing.findMany({
      where: { type: "room" }, // Limit to 3 rows
    });

    for (const listing of listings) {
      const testUrl = `https://flatmates.com.au/${listing.id}`; // Construct URL from listing ID
      console.log(`Scraping room details from: ${testUrl}`);

      try {
        const result = await scrapeClient.scrapePages(testUrl);
        if (!result) {
          throw new Error("Failed to fetch page content");
        }

        const html = result.result?.content;
        // const html = await fs.readFile("received.txt", "utf-8"); // Read HTML from file
        // console.log("HTML content:", html);
        // console.log("HTML received successfully.");

        if (!html || html.length < 1000) {
          await fs.writeFile("received.txt", html, "utf-8");
          console.log("HTML content saved to received.txt for inspection.");

          throw new Error(
            "Received suspicious HTML content (too short or empty)",
          );
        }

        await fs.writeFile("received.txt", html, "utf-8");

        const $ = cheerio.load(html);

        // Name and Location
        const name = $("h1.sc-dvQaRk.hDZebC").text().trim();

        // Type (e.g., "Shared room for rent")
        const type = $("span.sc-ZOtfp.iYICtO").text().trim();

        // Weekly Rent
        const weeklyRentText = $("div.styles__value___2sVSi").text().trim();
        const weeklyRentMatch = /\$(\d+)/.exec(weeklyRentText);
        const weeklyRent = weeklyRentMatch?.[1]
          ? parseInt(weeklyRentMatch[1], 10)
          : 0;

        // Number of Beds, Bathrooms, Flatmates
        const noBeds = safeParseInt(
          $(
            ".styles__propertyMainFeatures___3BjdC .styles__propertyFeature___2rYID",
          )
            .eq(0)
            .find(".styles__value___1vCLN")
            .text()
            .trim(),
          0,
        );

        const noBathrooms = safeParseInt(
          $(
            ".styles__propertyMainFeatures___3BjdC .styles__propertyFeature___2rYID",
          )
            .eq(1)
            .find(".styles__value___1vCLN")
            .text()
            .trim(),
          0,
        );

        const noFlatmates = safeParseInt(
          $(
            ".styles__propertyMainFeatures___3BjdC .styles__propertyFeature___2rYID",
          )
            .eq(2)
            .find(".styles__value___1vCLN")
            .text()
            .trim(),
          0,
        );

        // Property Features
        const propertyFeatures: string[] = [];
        $(
          ".styles__featureStyles__titleContainer___3hmOe .styles__detail___2H3m9",
        ).each((_, elem) => {
          const featureTitle = $(elem)
            .find(".styles__detail__title___3eco0")
            .text()
            .trim();
          if (featureTitle) propertyFeatures.push(featureTitle);
        });

        // Accepting Tags
        const acceptingTags: string[] = [];
        $(".styles__tag__title___AaWpY").each((_, elem) => {
          const tag = $(elem).text().trim();
          if (tag) acceptingTags.push(tag);
        });

        // Room Features
        const roomFeatures: string[] = [];
        $(".styles__feature___1Xp9o").each((_, elem) => {
          const feature = $(elem)
            .find(".styles__textLabel___l3CX6")
            .text()
            .trim();
          if (feature) roomFeatures.push(feature);
        });

        // Inspection Availability
        const inspectAvailable = $(".styles__button___28552").length > 0;

        // Bond
        let bond: number | null = null;
        const bondText = $(".styles__detail__subTitle___2i0oE:contains('bond')")
          .text()
          .trim();
        const bondMatch = /\$(\d+)\s+bond/i.exec(bondText);
        if (bondMatch?.[1]) {
          bond = parseInt(bondMatch[1], 10);
        }

        // Stay Length
        let stayLength: number | null = null;
        const stayText = $(
          ".styles__detail__title___2GerX:contains('month stay')",
        )
          .text()
          .trim();
        const stayMatch = /(\d+)\s+month stay/i.exec(stayText);
        if (stayMatch?.[1]) {
          stayLength = parseInt(stayMatch[1], 10);
        }

        // Furnished
        let furnished = "";
        const furnishedText = $(
          '.styles__detail__title___2GerX:contains("furnished")',
        )
          .text()
          .trim();
        if (furnishedText.toLowerCase().includes("furnished")) {
          furnished = "Furnished";
        } else if (furnishedText.toLowerCase().includes("unfurnished")) {
          furnished = "Unfurnished";
        }

        // Bills
        let bills = "";
        if (
          $('.styles__detail__title___2GerX:contains("Bills included")')
            .length > 0
        ) {
          bills = "Bills included in rent";
        }

        // Bathroom
        let bathRoom = "";
        const bathroomText = $(
          '.styles__detail__title___2GerX:contains("bathroom")',
        )
          .text()
          .trim();
        if (bathroomText.toLowerCase().includes("private")) {
          bathRoom = "Private Bathroom";
        } else if (bathroomText.toLowerCase().includes("shared")) {
          bathRoom = "Shared Bathroom";
        } else if (bathroomText.toLowerCase().includes("ensuite")) {
          bathRoom = "En-suite Bathroom";
        }

        // Accepted People
        const acceptedText = $(
          '.styles__detail__title___2GerX:contains("Anyone")',
        )
          .text()
          .trim();
        const acceptedPeople = acceptedText || acceptingTags.join(", ");

        // Author and Response Rate
        const author = $(".styles__name___3Cl1v").text().trim() || null;
        const online = $(".styles__online___24Sst").text().trim() || null;
        const responseRate =
          $("span.styles__value___Z98nS").text().trim() ?? null;

        // Description (first two <p> elements for room description)
        const descriptionParagraphs = $(
          ".styles__description__wrapper___1LKEI",
        );
        // Split the paragraphs into description and about flatmate
        const description = descriptionParagraphs.eq(0).text().trim(); // First paragraph as description
        const aboutFlatmate = descriptionParagraphs.eq(1).text().trim(); // Second paragraph as about flatmate
        const authorAvatar = $(".styles__avatar___28552 img")
          .attr("src")
          ?.trim();

        // One-liner (e.g., "Free to Message")

        // Image URLs
        const images: string[] = [];
        $(".carousel-slide img").each((_, elem) => {
          const imgUrl = $(elem).attr("src")?.trim();
          if (imgUrl) {
            images.push(imgUrl);
          }
        });

        // Create Room object
        // Ensure you handle optional fields properly
        const roomData = {
          id: listing.id,
          name,
          type,
          location: name,
          description,
          aboutFlatmate,
          noBeds,
          noBathrooms,
          noFlatmates,
          author,
          propertyFeatures,
          acceptingTags,
          inspectAvailable,
          weeklyRent,
          bond,
          roomType: type,
          stayLength: stayLength ?? null,
          roomFeatures,
          furnished,
          internet: null, // Assuming this is not scraped
          online,
          authorAvatar: authorAvatar ?? null, // Set to null if undefined
          responseRate,
          parking: null, // Assuming this is not scraped
          bathRoom,
          bills,
          acceptedPeople,
          images,
          // Remove createdAt and updatedAt if you want Prisma to handle them
        };

        // Save roomData to the database with error handling
        try {
          await prisma.room.create({ data: roomData });
          console.log("Room data successfully saved to the database.");
        } catch (error) {
          console.error("Failed to save room data:", error);
        }
      } catch (error) {
        console.error(`Error scraping room details:`, error);
        throw error;
      }
    }

    return "Room scraping completed successfully for all listings";
  } catch (error) {
    console.error("Error in scrapeRooms:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
