// utils/fetchImages.ts
export const fetchImages = async (searchTerm: string) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=YOUR_ACCESS_KEY`
    );
    const data = await response.json();
    return data.results;
  };
  