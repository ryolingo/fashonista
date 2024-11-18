import React from 'react';
import { Droplet, Wind } from 'lucide-react';

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
      <div>
         <div className='flex justify-center items-center w-full'>
            <div className='container p-4 max-w-3xl mt-6 mx-auto'>
               <h2 className='text-4xl font-bold text-center mb-2 mt-10 text-primary'>
                  今日の天気を調べよう
               </h2>

               <div className='flex flex-col w-full justify-center items-center mt-7 sm:flex-row gap-4 '>
                  <InputPrefecture handleSearch={handleSearch} />
               </div>

               {loading && <p className='text-center text-muted-foreground'>読み込み中...</p>}
               {error && <p className='text-center text-destructive'>{error}</p>}

               {currentWeather && (
                  <div className='mt-8 bg-card text-card-foreground p-6 rounded-lg shadow-lg'>
                     <h2 className='text-2xl font-semibold mb-4'>今日の天気</h2>
                     <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2 sm:col-span-1'>
                           <p className='text-4xl font-bold'>
                              {Math.round(currentWeather.main.temp - 273.15)}°C
                           </p>
                           <p className='text-xl capitalize'>
                              {currentWeather.weather[0].description}
                           </p>
                        </div>
                        <div className='col-span-2 sm:col-span-1'>
                           <div className='flex items-center gap-2 mb-2'>
                              <Droplet className='text-blue-500' />
                              <span>湿度: {currentWeather.main.humidity}%</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Wind className='text-green-500' />
                              <span>風速: {currentWeather.wind.speed} m/s</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
