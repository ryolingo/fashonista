import { useState, useEffect } from 'react';

export const useFetchWeather = (location: string) => {
   const [weatherData, setWeatherData] = useState<any>(null);
   const [currentWeather, setCurrentWeather] = useState<any>(null); // 現在の天気用
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchWeather = async () => {
         setLoading(true);
         setError(null);

         try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
               location
            )}&appid=${apiKey}&lang=ja`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
               setError('Error fetching weather data');
               setLoading(false);
               return;
            }

            // ログを追加してデータを確認
            console.log('Full weather data:', data);
            console.log('Current weather (list[0]):', data.list[0]);

            setCurrentWeather(data.list[0]); // 現在の天気をlist[0]から設定
            setWeatherData(data);
            setLoading(false);
         } catch (error) {
            setError('Failed to fetch weather data');
            setLoading(false);
         }
      };

      if (location) {
         fetchWeather();
      }
   }, [location]);

   return { weatherData, currentWeather, loading, error };
};
