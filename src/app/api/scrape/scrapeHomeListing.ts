import axios, { AxiosError, AxiosResponse } from "axios";
import type { Listing } from "@prisma/client";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import Bottleneck from "bottleneck";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SCRAPFLY_API_KEY = process.env.SCRAPFLY_API_KEY;
const SCRAPFLY_ENDPOINT = "https://api.scrapfly.io/scrape";
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000; // 1 second

// Initialize Bottleneck
const limiter = new Bottleneck({
  minTime: 250, // Minimum time between requests (4 requests per second)
  maxConcurrent: 5, // Maximum number of concurrent requests
  reservoir: 100, // Initial number of requests
  reservoirRefreshAmount: 100, // Number of requests to add per refresh
  reservoirRefreshInterval: 60 * 1000, // Refresh every minute
});

/**
 * Utility function to delay execution for a specified time.
 * @param ms - Milliseconds to delay.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Add interface for error response
interface ScrapflyErrorResponse {
  data: unknown;
  status: number;
  headers: {
    "retry-after"?: string;
    [key: string]: string | string[] | undefined;
  };
}

/**
 * Fetches HTML content using Scrapfly with retry logic on 429 errors.
 * Respects the `Retry-After` header when present.
 * @param url - The target URL to scrape.
 * @returns HTML content as a string.
 * @throws Error if all retry attempts fail.
 */
async function fetchWithScrapfly(url: string): Promise<string> {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    attempt += 1;
    try {
      const response = await axios.get<ScrapflyResponse>(SCRAPFLY_ENDPOINT, {
        params: {
          url,
          render_js: true,
          country: "au",
          retry: true,
          asp: true,
        },
        headers: {
          Authorization: `Bearer ${SCRAPFLY_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 30000,
      });

      if (response.status !== 200) {
        console.error("Scrapfly response:", {
          status: response.status,
          data: response.data,
        });
        throw new Error(`Scrapfly returned status ${response.status}`);
      }

      if (!response.data?.result?.content) {
        console.error("Unexpected response structure:", response.data);
        throw new Error("Invalid response structure from Scrapfly");
      }

      return response.data.result.content;
    } catch (error: unknown) {
      const err = error as AxiosError & { response?: ScrapflyErrorResponse };
      console.error(`Attempt ${attempt}/${MAX_RETRIES} failed:`, {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (err.response && err.response.status === 429) {
        const retryAfter =
          parseInt(err.response.headers["retry-after"] ?? "0", 10) ??
          INITIAL_RETRY_DELAY_MS / 1000;
        const delayTime = retryAfter * 1000;
        console.warn(
          `Rate limited. Waiting for ${delayTime}ms before retrying...`,
        );
        await delay(delayTime);
      } else if (attempt < MAX_RETRIES) {
        const delayTime = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`Waiting ${delayTime}ms before retrying...`);
        await delay(delayTime);
      } else {
        console.error(`All ${MAX_RETRIES} attempts failed for URL: ${url}`);
        throw error;
      }
    }
  }

  throw new Error(`Failed to fetch URL ${url} after ${MAX_RETRIES} attempts.`);
}

/**
 * Scrapes listings from the target website and stores them in the database.
 * Additionally, exports the scraped data to a JSON file.
 * @returns Success message upon completion.
 */
export async function scrapeListings() {
  try {
    const baseUrl = "https://flatmates.com.au/";
    const totalPages = 3; // Total number of pages to scrape
    const scrapedData: Listing[] = [];

    const pagePromises = [];

    for (let page = 1; page <= totalPages; page++) {
      const targetUrl = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
      console.log(`Queuing scrape for: ${targetUrl}`);

      // Schedule the scrape task with Bottleneck
      const scheduledTask = limiter.schedule(async () => {
        console.log(`Starting scrape of: ${targetUrl}`);

        try {
          const html = await fetchWithScrapfly(targetUrl);

          // Verify we got meaningful content
          if (!html || html.length < 1000) {
            throw new Error(
              "Received suspicious HTML content (too short or empty)",
            );
          }

          // Log the first 500 characters to check the response
          console.log("HTML Preview:", html.substring(0, 500));

          const $ = cheerio.load(html);

          const listingTiles = $(".styles__listingTile___2OrNd");

          console.log("Number of listing tiles found:", listingTiles.length);

          const pageScrapedData: Listing[] = [];

          const listingPromises = listingTiles
            .map(async (_, element) => {
              const $element = $(element);

              // Get basic listing info
              const href =
                $element.find(".styles__tileLink___1JJi8")?.attr("href") ?? "";
              const id = href.replace("/", "");
              const type = href.startsWith("/F") ? "person" : "room";

              // Get common fields
              const price = $element.find(".styles__price___3Jhqs").text();
              const priceNumber = RegExp(/\$(\d+)/).exec(price)?.[1] ?? "0";
              const billsIncluded = price.toLowerCase().includes("inc. bills");

              // Get type-specific fields
              let heading = "",
                address: string | null = null,
                secondaryContent: string | null = null,
                subheading = "",
                description = "";

              if (type === "person") {
                heading =
                  $element.find(".styles__heading___3Jsfc").text() ?? "";
                subheading =
                  $element.find(".styles__subheading___288j8").text() ?? "";
                description =
                  $element.find(".styles__description___2439E").text() ?? "";
              } else {
                heading =
                  $element.find(".styles__roomInfo___1BEdy").text() ?? "";
                address =
                  $element.find(".styles__address___28Scu").text() ?? null;
                secondaryContent =
                  $element.find(".styles__secondaryContent___r-YXk").text() ??
                  null;
              }

              // Get availability date
              const availableText = $element
                .find(".styles__availability___UzGsZ")
                .text();
              let availableFrom: Date | null = null;

              if (availableText.toLowerCase().includes("now")) {
                availableFrom = new Date();
              } else {
                const dateMatch = RegExp(/Available (\d{1,2} \w+ \d{4})/).exec(
                  availableText,
                );
                if (dateMatch?.[1]) {
                  const parsedDate = new Date(dateMatch[1]);
                  if (!isNaN(parsedDate.getTime())) {
                    availableFrom = parsedDate;
                  } else {
                    console.error("Invalid date format:", dateMatch[1]);
                    availableFrom = null;
                  }
                }
              }

              try {
                // Create listing in database using the correct model name
                const listing = await prisma.listing.create({
                  data: {
                    id,
                    type,
                    heading: heading ?? "",
                    price: parseInt(priceNumber),
                    billsIncluded,
                    address,
                    secondaryContent,
                    subheading,
                    description,
                    availableFrom,
                    noBeds: 0,
                    noBathrooms: 0,
                    noFlatmates: 0,
                    propertyFeatures: [],
                    accpetingTags: [],
                    inspectAvailable: false,
                    weeklyRent: parseInt(priceNumber),
                  },
                });

                // Add the created listing to pageScrapedData array
                pageScrapedData.push(listing);
              } catch (dbError) {
                console.error(`Error creating listing with ID ${id}:`, dbError);
                // Optionally, handle duplicate entries or other DB-specific errors here
              }
            })
            .get(); // Convert Cheerio object to array

          await Promise.all(listingPromises);

          scrapedData.push(...pageScrapedData);

          console.log(`Page ${page} scraped successfully.`);
        } catch (pageError) {
          console.error(`Error scraping page ${page}:`, pageError);
          // Optionally, implement additional logic like alerting or pausing the scraper
        }
      });

      pagePromises.push(scheduledTask);
    }

    await Promise.all(pagePromises);

    // Export scraped data to JSON after all pages are processed
    try {
      const jsonData = JSON.stringify(scrapedData, null, 2);
      await fs.writeFile("listings.json", jsonData, "utf-8");
      console.log("Data successfully exported to listings.json");
    } catch (fileError) {
      console.error("Error exporting data to JSON:", fileError);
    }

    return "Scraping completed successfully and data exported to JSON";
  } catch (error) {
    console.error("Error scraping listings:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

interface ScrapflyResponse {
  result?: {
    content: string;
  };
}

// Optionally remove or use the function below
/*
async function testScrapflyConfig(): Promise<ScrapflyAccountResponse> {
  try {
    const response = await axios.get<ScrapflyAccountResponse>('https://api.scrapfly.io/account', {
      headers: {
        'Authorization': `Bearer ${SCRAPFLY_API_KEY}`,
        'Accept': 'application/json',
      },
    });
    console.log('Scrapfly account status:', response.data);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error & { response?: { data: unknown } };
    console.error('Error checking Scrapfly account:', err.response?.data ?? err.message);
    throw error;
  }
}

// Call the test function
// await testScrapflyConfig();
*/
