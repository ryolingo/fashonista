// utils/fetchGoogleWelcomeImages.ts
export const fetchGoogleWelcomeImages = async (searchTerm: string) => {
   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Replace with your Google API key from Google Cloud Console
   const searchEngineId = process.env.NEXT_PUBLIC_GOOGLE_CX; // Replace with your Search Engine ID from CSE

   const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
         searchTerm
      )}&cx=${searchEngineId}&searchType=image&siteSearch=pinterest.com&key=${apiKey}`
   );

   if (!response.ok) {
      throw new Error('Failed to fetch images from Google Custom Search API');
   }

   const data = await response.json();
   return data.items || [];
};
