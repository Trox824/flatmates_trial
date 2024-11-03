import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import { ScrapflyClient, ScrapeConfig } from "scrapfly-sdk";
import type { ScrapeResult } from "scrapfly-sdk";
import * as cheerio from "cheerio";

const prisma = new PrismaClient();

const MAX_RETRIES = 3; // Removed ': number'
const RETRY_DELAY_MS = 1000; // Removed ': number'

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
    const config: ScrapeConfig = new ScrapeConfig({
      url: url,
      asp: true,
      country: "AU", // Changed to "AU" to match your original URL
      render_js: true,
      retry: false, // Disable Scrapfly's built-in retry
      timeout: 60000, // Set timeout to 60,000ms (60 seconds)
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Ch-Ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
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
    const testUrl =
      "https://flatmates.com.au/studio-sydney-croydon-park-2133-P1518859";
    const testId = "P1518859";

    console.log(`Scraping room details from: ${testUrl}`);

    try {
      const result = await scrapeClient.scrapePages(testUrl);
      if (!result) {
        throw new Error("Failed to fetch page content");
      }

      const html = result.result?.content;
      console.log("HTML content:", html);
      console.log("HTML received successfully.");

      if (!html || html.length < 1000) {
        // Save HTML to file for inspection
        await fs.writeFile("received.html", html, "utf-8");
        console.log("HTML content saved to received.html for inspection.");

        throw new Error(
          "Received suspicious HTML content (too short or empty)",
        );
      }

      // Save HTML to file for inspection
      await fs.writeFile("received.html", html, "utf-8");

      const $ = cheerio.load(html);

      // Update selectors based on actual HTML structure

      // Name and Location
      const name = $('h1[data-testid="listing-title"]').text().trim();

      // Type (e.g., "Shared room for rent")
      const typeText = $('span[data-testid="listing-type"]').text().trim();
      const type = typeText.includes("room") ? "room" : "home";

      // Weekly Rent
      const weeklyRentText = $('span[data-testid="listing-price"]')
        .text()
        .trim();
      const weeklyRentMatch = /\$(\d+)/.exec(weeklyRentText);
      const weeklyRent = weeklyRentMatch?.[1]
        ? parseInt(weeklyRentMatch[1], 10)
        : 0;

      // Bills Included
      const bills = $('span[data-testid="bills-included"]').text().trim();

      // Number of Beds, Bathrooms, Flatmates
      const noBeds = safeParseInt(
        $('div[data-testid="property-features"] div:contains("Bedrooms")')
          .next()
          .text()
          .trim(),
        0,
      );

      const noBathrooms = safeParseInt(
        $('div[data-testid="property-features"] div:contains("Bathrooms")')
          .next()
          .text()
          .trim(),
        0,
      );

      const noFlatmates = safeParseInt(
        $('div[data-testid="property-features"] div:contains("Flatmates")')
          .next()
          .text()
          .trim(),
        0,
      );

      // Property Features
      const propertyFeatures: string[] = [];
      $('div[data-testid="property-features"] ul li').each((_, elem) => {
        const feature = $(elem).text().trim();
        if (feature) propertyFeatures.push(feature);
      });

      // Room Features
      const roomFeatures: string[] = [];
      $('div[data-testid="room-features"] ul li').each((_, elem) => {
        const feature = $(elem).text().trim();
        if (feature) roomFeatures.push(feature);
      });

      // Accepting Tags
      const acceptingTags: string[] = [];
      $('div[data-testid="accepting"] span').each((_, elem) => {
        const tag = $(elem).text().trim();
        if (tag) acceptingTags.push(tag);
      });

      // Inspection Availability
      const inspectAvailable =
        $('button:contains("Request inspection")').length > 0;

      // Bond
      let bond: number | null = null;
      const bondText = $('span[data-testid="bond"]').text().trim();
      const bondMatch = /\$(\d+)/.exec(bondText);
      if (bondMatch?.[1]) {
        bond = parseInt(bondMatch[1], 10);
      }

      // Stay Length
      let stayLength: number | null = null;
      const stayText = $('span[data-testid="minimum-stay"]').text().trim();
      const stayMatch = /Minimum (\d+) months/i.exec(stayText);
      if (stayMatch?.[1]) {
        stayLength = parseInt(stayMatch[1], 10);
      }

      // Furnished
      let furnished = "";
      const furnishedText = $('span[data-testid="furnishings"]').text().trim();
      if (furnishedText.toLowerCase().includes("furnished")) {
        furnished = "Furnished";
      }

      // Internet
      let internet = "";
      if (
        propertyFeatures.some((feature) =>
          feature.toLowerCase().includes("internet"),
        )
      ) {
        internet = "Internet Included";
      }

      // Parking
      let parking = "";
      if (
        propertyFeatures.some((feature) =>
          feature.toLowerCase().includes("parking"),
        )
      ) {
        parking = "Parking Available";
      }

      // Bathroom
      let bathRoom = "";
      if (
        roomFeatures.some((feature) =>
          feature.toLowerCase().includes("bathroom"),
        )
      ) {
        bathRoom = "En-suite Bathroom";
      }

      // Accepted People
      const acceptedPeople = acceptingTags.join(", ");

      // Author and Response Rate
      const author =
        $('span[data-testid="advertiser-name"]').text().trim() ?? null;
      const responseRate =
        $('span[data-testid="response-rate"]').text().trim() ?? null;

      // Description
      const description = $('div[data-testid="description"]').text().trim();

      // About Flatmate
      const aboutFlatmate = $('div[data-testid="about-flatmates"]')
        .text()
        .trim();

      // One-liner (e.g., "Free to Message")
      const oneLiner =
        $('span[data-testid="listing-tagline"]').text().trim() ?? "";

      // Image URLs
      const images: string[] = [];
      $('div[data-testid="listing-carousel"] img').each((_, elem) => {
        const imgUrl = $(elem).attr("src")?.trim();
        if (imgUrl) {
          const absoluteUrl = imgUrl.startsWith("http")
            ? imgUrl
            : `https://flatmates.com.au${imgUrl}`;
          images.push(absoluteUrl);
        }
      });

      // Create Room object
      const roomData = {
        id: testId,
        name,
        type,
        author,
        responseRate,
        location: name, // Adjust as needed
        oneLiner,
        description,
        aboutFlatmate,
        noBeds,
        noBathrooms,
        noFlatmates,
        propertyFeatures,
        roomFeatures,
        acceptingTags,
        inspectAvailable,
        weeklyRent,
        bond,
        roomType: type, // Adjust if necessary
        stayLength: stayLength ?? null, // Removed type annotation
        furnished,
        internet,
        parking,
        bathRoom,
        bills,
        acceptedPeople,
        images,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Log the scraped data instead of saving to database
      console.log("Scraped Room Data:", JSON.stringify(roomData, null, 2));

      // Export single room data to JSON
      try {
        const jsonData = JSON.stringify(roomData, null, 2);
        await fs.writeFile("test-room.json", jsonData, "utf-8");
        console.log("Data successfully exported to test-room.json");
      } catch (fileError) {
        console.error("Error exporting data to JSON:", fileError);
      }

      return "Test room scraping completed successfully";
    } catch (error) {
      console.error(`Error scraping room details:`, error);
      throw error;
    }
  } catch (error) {
    console.error("Error in scrapeRooms:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
