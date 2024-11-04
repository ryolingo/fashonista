import React from 'react';
import { Cloud, Droplet, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import InputPrefecture from './input-prefecture';

interface WeatherUIProps {
   location: string;
   setLocation: (location: string) => void;
   handleSearch: (Location: string) => void;
   loading: boolean;
   error: string | null;
   currentWeather: any;
   weatherData: any;
}

export default function Component({
   location,
   setLocation,
   handleSearch,
   loading,
   error,
   currentWeather,
   weatherData,
}: WeatherUIProps) {
   return (
      <div className='w-full'>
         <h1 className='text-4xl font-bold text-center mb-8 text-primary'>Weather Forecast</h1>
         <div className='flex justify-center mb-8'>
            <div className='flex flex-col w-1/2 justify-center items-center sm:flex-row gap-4 '>
               <InputPrefecture handleSearch={handleSearch} />
            </div>
         </div>

         {loading && <p className='text-center text-muted-foreground'>Loading...</p>}
         {error && <p className='text-center text-destructive'>{error}</p>}

         {currentWeather && (
            <div className='mt-8 bg-card text-card-foreground p-6 rounded-lg shadow-lg'>
               <h2 className='text-2xl font-semibold mb-4'>Today's Weather</h2>
               <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2 sm:col-span-1'>
                     <p className='text-4xl font-bold'>
                        {Math.round(currentWeather.main.temp - 273.15)}°C
                     </p>
                     <p className='text-xl capitalize'>{currentWeather.weather[0].description}</p>
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                     <div className='flex items-center gap-2 mb-2'>
                        <Droplet className='text-blue-500' />
                        <span>Humidity: {currentWeather.main.humidity}%</span>
                     </div>
                     <div className='flex items-center gap-2'>
                        <Wind className='text-green-500' />
                        <span>Wind: {currentWeather.wind.speed} m/s</span>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
