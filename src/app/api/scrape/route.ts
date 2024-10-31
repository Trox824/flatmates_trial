import { NextResponse } from 'next/server';
import { scrapeListings } from './scrape';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  // Add basic authentication
  const headersList = headers();
  const apiKey = headersList.get('x-api-key');
  
  if (!process.env.SCRAPE_API_KEY || apiKey !== process.env.SCRAPE_API_KEY) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const result = await scrapeListings();
    return NextResponse.json({ 
      success: true, 
      message: result 
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error during scraping',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optionally, add a GET endpoint to check status
export async function GET() {
  return NextResponse.json({ 
    status: 'online',
    message: 'Use POST method to trigger scraping' 
  });
} 