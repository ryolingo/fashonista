import type { NextApiRequest, NextApiResponse } from 'next';
import { generateKeywords } from '../../../utils/geminiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const { userPreference } = await req.json();

   if (!userPreference) {
      return NextResponse.json({ error: 'User perference is required' }, { status: 400 });
   }

   try {
      const keywords = await generateKeywords(userPreference);
      if (keywords.length > 0) {
         return NextResponse.json({ keywords });
      } else {
         return NextResponse.json({ keywords: [] });
      }
   } catch (error) {
      return NextResponse.json({ error: 'Failed to generate keywords' }, { status: 500 });
   }
}
