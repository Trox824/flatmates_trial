// pages/api/scrapeRooms.ts

import { NextResponse } from 'next/server';
import { scrapeRooms } from './scrapeRoom';

export async function POST(req: Request) {
  try {
    const result = await scrapeRooms();
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

export async function GET() {
  try {
    const result = await scrapeRooms();
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
