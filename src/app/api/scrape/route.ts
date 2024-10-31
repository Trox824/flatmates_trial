import { NextResponse } from 'next/server';
import { scrapeListings } from './scrape';
// ... your other imports ...

export async function GET() {
  try {
    const result = await scrapeListings();
    return NextResponse.json({ 
      success: true, 
      message: result 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error during scraping' },
      { status: 500 }
    );
  }
} 