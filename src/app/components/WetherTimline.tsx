'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react';

interface WeatherData {
   dt_txt: string;
   weather: Array<{ main: string; description: string }>;
   main: { temp: number; humidity: number };
   wind: { speed: number };
}

const getWeatherIcon = (main: string, hour: number) => {
   const isNight = hour >= 18 || hour < 6;
   const iconClass = `w-8 h-8 ${isNight ? 'text-indigo-200' : 'text-yellow-500'}`;

   switch (main.toLowerCase()) {
      case 'clear':
         return isNight ? (
            <Moon className={iconClass} aria-label='晴れ（夜）' />
         ) : (
            <Sun className={iconClass} aria-label='晴れ（昼）' />
         );
      case 'clouds':
         return (
            <Cloud
               className={`w-8 h-8 ${isNight ? 'text-indigo-300' : 'text-gray-500'}`}
               aria-label='曇り'
            />
         );
      case 'rain':
         return <CloudRain className='w-8 h-8 text-blue-500' aria-label='雨' />;
      case 'snow':
         return <CloudSnow className='w-8 h-8 text-blue-200' aria-label='雪' />;
      case 'thunderstorm':
         return <CloudLightning className='w-8 h-8 text-yellow-600' aria-label='雷雨' />;
      default:
         return (
            <Wind
               className={`w-8 h-8 ${isNight ? 'text-indigo-200' : 'text-gray-400'}`}
               aria-label='その他の天気'
            />
         );
   }
};

const getBackgroundStyle = (hour: number) => {
   const isNight = hour >= 18 || hour < 6;
   return isNight
      ? 'bg-gradient-to-b from-indigo-900 to-purple-900 text-white'
      : 'bg-gradient-to-b from-blue-400 to-blue-200';
};

const WeatherTimeline = ({ weatherData }: { weatherData: { list: WeatherData[] } }) => {
   if (!weatherData) return <p>Loading...</p>;

   const hourlyWeather = weatherData.list.slice(0, 8); // 24時間分のデータ

   return (
      <ScrollArea className='w-full ml-20 whitespace-nowrap rounded-md border'>
         <div className='flex w-max space-x-4 p-4'>
            {hourlyWeather.map((weather, index) => {
               const hour = new Date(weather.dt_txt).getHours();
               const backgroundStyle = getBackgroundStyle(hour);
               return (
                  <Card key={index} className={`w-[150px] ${backgroundStyle}`}>
                     <CardContent className='p-4 flex flex-col items-center'>
                        <p className='text-lg font-semibold mb-2'>{hour}:00</p>
                        {getWeatherIcon(weather.weather[0].main, hour)}
                        <p className='text-2xl font-bold my-2'>
                           {Math.round(weather.main.temp - 273.15)}°C
                        </p>
                        <p className='text-sm text-muted-foreground'>
                           {weather.weather[0].description}
                        </p>
                        <div className='mt-2 text-sm'>
                           <p>湿度: {weather.main.humidity}%</p>
                           <p>風速: {weather.wind.speed}m/s</p>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>
         <ScrollBar orientation='horizontal' />
      </ScrollArea>
   );
};

export default WeatherTimeline;
