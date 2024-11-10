import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
   request: NextRequest,
   { params }: { params: { userPreference: string } }
) {
   const apiKey = process.env.GOOGLE_API_KEY;
   const genAI = new GoogleGenerativeAI(apiKey!);
   const { userPreference } = params;
   if (!userPreference) {
      return NextResponse.json({ error: 'User preference is required' }, { status: 400 });
   }

   try {
      // Define the model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      // Create a Japanese prompt based on user preference
      const prompt = `「${userPreference}」に基づいたトレンドキーワードを日本語で生成してください。`;

      // Generate content using the prompt
      const result = await model.generateContent(prompt);

      // Extract and return the generated text
      const generatedText = result.response.text();

      const keywords = generatedText.split('\n').map((kw: string) => kw.trim());
      return NextResponse.json(keywords, { status: 200 });
   } catch (error) {
      NextResponse.json({ error: ' Failed contacting Gemini API ' }, { status: 500 });
   }
}
