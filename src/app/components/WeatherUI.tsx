import React from 'react';
import { Cloud, Droplet, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface WeatherUIProps {
   location: string;
   setLocation: (location: string) => void;
   handleSearch: () => void;
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
      <div className='container ml-80 mx-auto p-4 max-w-3xl'>
         <h1 className='text-4xl font-bold text-center mb-8 text-primary'>Weather Forecast</h1>
         <div className='flex flex-col sm:flex-row gap-4 mb-8'>
            <input
               type='text'
               placeholder='Enter location'
               value={location}
               onChange={(e) => setLocation(e.target.value)}
               className='flex-grow border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
            />
            <button onClick={handleSearch} className={cn(buttonVariants())}>
               Search Weather
            </button>
         </div>

         {loading && <p className='text-center text-muted-foreground'>Loading...</p>}
         {error && <p className='text-center text-destructive'>{error}</p>}

         {currentWeather && (
            <div className='mt-8 bg-card text-card-foreground p-6 rounded-lg shadow-lg'>
               <h2 className='text-2xl font-semibold mb-4'>Todays Wether</h2>
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
