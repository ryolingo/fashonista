import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/weather/[...location]
// weather/東京都 のように場所を指定する
// weather/35.6895/139.6917 のように緯度経度を指定する
export async function GET(request: NextRequest, { params }: { params: { location: string } }) {
   const { location } = params;
   const paramsLength = location.length;

   if (!location) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 });
   }

   try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      let url = '';

      if (paramsLength === 1) {
         url = `https://api.openweathermap.org/data/2.5/forecast?q=${location[0]}&appid=${apiKey}&lang=ja&units=metric`;
      } else if (paramsLength === 2) {
         url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&lang=ja&units=metric&appid=${apiKey}`;
      }

      const response = await axios.get(url);
      return NextResponse.json(response.data);
   } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
   }
}
