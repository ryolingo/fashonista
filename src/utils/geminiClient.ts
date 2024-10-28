import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
   throw new Error('GOOGLE_API_KEY is not defined in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateKeywords = async (userPreference: string) => {
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
      return keywords;
   } catch (error) {
      const err = error as any;
      console.error('Error contacting Gemini API:', err.response?.data || err.message);
      return [];
   }
};
