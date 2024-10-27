import axios from 'axios';

const GEMINI_API_BASE_URL = 'https://api.google.com/gemini/v1'; 

export const generateKeywords = async (userPreference: string) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_BASE_URL}/text:generate`, 
      {
        prompt: `Generate trending keywords based on: ${userPreference}`,
        maxTokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GOOGLE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating keywords: ', error);
    return [];
  }
};
