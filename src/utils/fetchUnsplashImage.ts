// utils/fetchUnsplashImages.ts
export const fetchUnsplashImages = async (searchTerm: string) => {
   const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY; // Use your Unsplash Access Key

   const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
         searchTerm
      )}&client_id=${accessKey}&per_page=10`
   );

   if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash API');
   }

   const data = await response.json();
   return data.results || [];
};
