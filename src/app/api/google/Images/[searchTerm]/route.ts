import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/google/Images/[serachTerm]
export async function GET(request: NextRequest, { params }: { params: { searchTerm: string } }) {
   const { searchTerm } = params;

   if (!searchTerm) {
      return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
   }

   const apiKey = process.env.GOOGLE_API_KEY;
   const searchEngineId = process.env.NEXT_PUBLIC_GOOGLE_CX;
   const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      searchTerm
   )}&cx=${searchEngineId}&searchType=image&siteSearch=pinterest.com&key=${apiKey}`;
   try {
      const response = await axios.get(url);
      return NextResponse.json(response.data);
   } catch (error) {
      return NextResponse.json(
         { error: 'Failed to fetch images from Google Custom Search API' },
         { status: 500 }
      );
   }
}
