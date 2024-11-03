import { NextResponse } from 'next/server';
import { scrapeListings } from './scrapeHomeListing';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  // Add basic authentication
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