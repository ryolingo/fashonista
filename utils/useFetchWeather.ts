import { useState, useEffect } from 'react';

export const useFetchWeather = (location: string) => {
   const [weatherData, setWeatherData] = useState<any>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   useEffect(() => {
      const fetchWeather = async () => {
         try {
      const response = await fetch(`/api/weather?location=${location}`);
            const data = await response.json();
            if (!response.ok) {
               setError('Error fetching weather data');
               setLoading(false);
               return;
            }
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
   return { weatherData, loading, error };
};