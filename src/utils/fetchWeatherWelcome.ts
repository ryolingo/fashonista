// utils/fetchWeatherData.ts
export const fetchWeatherWelcome = async (latitude: number, longitude: number) => {
   const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
   );

   if (!response.ok) {
      throw new Error('Failed to fetch weather data from OpenWeatherMap API');
   }

   const data = await response.json();
   return data;
};
