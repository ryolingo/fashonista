import axios from 'axios';

const BASE_URL = 'https://api.pinterest.com/v5/';

// Check for access token
const accessToken = process.env.NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error('Pinterest access token is not defined');
}

export interface Pin {
  id: string;
  media: {
    images: {
      orig: {
        url: string;
      };
    };
  };
  title: string;
}

async function searchPinsByKeyword(keyword: string) {
    try {
      const response = await fetch(`/api/pinterest?query=${encodeURIComponent(keyword)}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Found pin IDs:', data.pinIds);
      } else {
        console.error('Error searching for pins:', data.error);
      }
    } catch (error) {
      console.error('Failed to search for pins:', error);
    }
  }