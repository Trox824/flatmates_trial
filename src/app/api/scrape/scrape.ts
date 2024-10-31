import axios from 'axios';
import { PrismaClient, Listing } from '@prisma/client';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import pLimit from 'p-limit';

const prisma = new PrismaClient();

const SCRAPFLY_API_KEY = process.env.SCRAPFLY_API_KEY;
const SCRAPFLY_ENDPOINT = 'https://api.scrapfly.io/scrape';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

/**
 * Utility function to delay execution for a specified time.
 * @param ms - Milliseconds to delay.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches HTML content using Scrapfly with retry logic on 429 errors.
 * @param url - The target URL to scrape.
 * @returns HTML content as a string.
 * @throws Error if all retry attempts fail.
 */
async function fetchWithScrapfly(url: string): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get(SCRAPFLY_ENDPOINT, {
        params: {
          url,
          render_js: true,
          country: 'au',
          // Remove or adjust the proxy_pool parameter
          // proxy_pool: 'residential',
          retry: true,
          asp: true
        },
        headers: {
          'Authorization': `Bearer ${SCRAPFLY_API_KEY}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      if (response.status !== 200) {
        console.error('Scrapfly response:', {
          status: response.status,
          data: response.data
        });
        throw new Error(`Scrapfly returned status ${response.status}`);
      }

      if (!response.data?.result?.content) {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Invalid response structure from Scrapfly');
      }

      return response.data.result.content;

    } catch (error: any) {
      console.error(`Attempt ${attempt}/${MAX_RETRIES} failed:`, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (attempt < MAX_RETRIES) {
        const delayTime = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Waiting ${delayTime}ms before retry...`);
        await delay(delayTime);
        continue;
      }
      throw error;
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
    const baseUrl = 'https://flatmates.com.au/';
    const totalPages = 300; // Total number of pages to scrape
    const concurrency = 5; // Number of concurrent page requests
    const limit = pLimit(concurrency);
    const scrapedData: Listing[] = [];

    const pagePromises = [];

    for (let page = 1; page <= totalPages; page++) {
      pagePromises.push(
        limit(async () => {
          const targetUrl = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
          console.log(`Starting scrape of: ${targetUrl}`);

          try {
            const html = await fetchWithScrapfly(targetUrl);

            // Verify we got meaningful content
            if (!html || html.length < 1000) {
              throw new Error('Received suspicious HTML content (too short or empty)');
            }

            // Log the first 500 characters to check the response
            console.log('HTML Preview:', html.substring(0, 500));

            const $ = cheerio.load(html);

            const listingTiles = $('.styles__listingTile___2OrNd');

            console.log('Number of listing tiles found:', listingTiles.length);

            const pageScrapedData: Listing[] = [];

            const promises = listingTiles.map(async (_, element) => {
              const $element = $(element);

              // Get basic listing info
              const href = $element.find('.styles__tileLink___1JJi8').attr('href') || '';
              const id = href.replace('/', '');
              const type = href.startsWith('/F') ? 'person' : 'room';

              // Get common fields
              const price = $element.find('.styles__price___3Jhqs').text();
              const priceNumber = parseInt(price.match(/\$(\d+)/)?.[1] || '0');
              const billsIncluded = price.toLowerCase().includes('inc. bills');

              // Get type-specific fields
              let heading, address, secondaryContent, subheading, description;

              if (type === 'person') {
                heading = $element.find('.styles__heading___3Jsfc').text();
                subheading = $element.find('.styles__subheading___288j8').text();
                description = $element.find('.styles__description___2439E').text();
              } else {
                heading = $element.find('.styles__roomInfo___1BEdy').text();
                address = $element.find('.styles__address___28Scu').text();
                secondaryContent = $element.find('.styles__secondaryContent___r-YXk').text();
              }

              // Get availability date
              const availableText = $element.find('.styles__availability___UzGsZ').text();
              let availableFrom: Date | null = null;

              if (availableText.toLowerCase().includes('now')) {
                availableFrom = new Date();
              } else {
                const dateMatch = availableText.match(/Available (\d{1,2} \w+ \d{4})/);
                if (dateMatch && dateMatch[1]) {
                  const parsedDate = new Date(dateMatch[1]);
                  if (!isNaN(parsedDate.getTime())) {
                    availableFrom = parsedDate;
                  } else {
                    console.error('Invalid date format:', dateMatch[1]);
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
                    heading: heading || '',
                    price: priceNumber,
                    billsIncluded,
                    address: address || null,
                    secondaryContent: secondaryContent || null,
                    subheading: subheading || null,
                    description: description || null,
                    availableFrom,
                    noBeds: 0,
                    noBathrooms: 0,
                    noFlatmates: 0,
                    propertyFeatures: [],
                    accpetingTags: [],
                    inspectAvailable: false,
                    weeklyRent: priceNumber,
                  },
                });

                // Add the created listing to pageScrapedData array
                pageScrapedData.push(listing);
              } catch (dbError) {
                console.error(`Error creating listing with ID ${id}:`, dbError);
                // Optionally, you can choose to rethrow or handle the error as needed
              }
            }).get(); // Convert Cheerio object to array

            await Promise.all(promises);

            scrapedData.push(...pageScrapedData);

            console.log(`Page ${page} scraped successfully.`);
          } catch (pageError) {
            console.error(`Error scraping page ${page}:`, pageError);
          }
        })
      );
    }

    await Promise.all(pagePromises);

    // Export scraped data to JSON after all pages are processed
    try {
      const jsonData = JSON.stringify(scrapedData, null, 2);
      await fs.writeFile('listings.json', jsonData, 'utf-8');
      console.log('Data successfully exported to listings.json');
    } catch (fileError) {
      console.error('Error exporting data to JSON:', fileError);
    }

    return 'Scraping completed successfully and data exported to JSON';
  } catch (error) {
    console.error('Error scraping listings:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function testScrapflyConfig() {
  try {
    const response = await axios.get('https://api.scrapfly.io/account', {
      headers: {
        'Authorization': `Bearer ${SCRAPFLY_API_KEY}`,
        'Accept': 'application/json',
      },
    });
    console.log('Scrapfly account status:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error checking Scrapfly account:', error.response?.data || error.message);
    throw error;
  }
}

// Call the test function
// await testScrapflyConfig();
