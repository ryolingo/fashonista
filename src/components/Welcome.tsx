import React, { useEffect, useState } from 'react';
import { fetchWeatherWelcome } from '@/utils/fetchWeatherWelcome';
import { fetchUnsplashImages } from '@/utils/fetchUnsplashImage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FaArrowDown } from 'react-icons/fa'; // Importing an icon library

const Welcome = () => {
   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
   const [weather, setWeather] = useState<any>(null);
   const [time, setTime] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         async (position) => {
            const { latitude, longitude } = position.coords;

            try {
               const weatherData = await fetchWeatherWelcome(latitude, longitude);
               setWeather(weatherData);

               const localTime = new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
               });
               setTime(localTime);

               const weatherCondition = weatherData.weather[0].main.toLowerCase();
               let searchTerm = 'nature';

               if (weatherCondition.includes('clear')) {
                  searchTerm = 'clear sky';
               } else if (weatherCondition.includes('cloud')) {
                  searchTerm = 'cloudy sky';
               } else if (weatherCondition.includes('rain')) {
                  searchTerm = 'rainy sky';
               }

               const images = await fetchUnsplashImages(searchTerm);
               if (images.length > 0) {
                  const randomImage = images[Math.floor(Math.random() * images.length)];
                  setBackgroundImage(randomImage.urls.full);
               }
            } catch (error) {
               console.error('Error fetching weather or background image:', error);
               setError('Failed to fetch weather or image data.');
            }
         },
         (geoError) => {
            console.error('Geolocation error:', geoError);
            setError('Failed to get location. Please enable location services.');
         }
      );
   }, []);

   return (
      <div className='w-full h-screen'>
         <AspectRatio
            ratio={16 / 9}
            className='w-full h-full'
            style={{
               backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
         >
            <div className='flex items-center justify-center w-full h-full bg-gray-300 bg-opacity-20 p-10'>
               <div className='text-center max-w-screen-md mx-auto'>
                  <h2 className='text-4xl lg:text-6xl font-extrabold text-white mb-4'>
                     Fashionistaにようこそ
                  </h2>
                  <h3 className='text-2xl sm:text-3xl font-light text-white mb-4'>
                     Fashionistaで天気からコーディネートを探そう
                  </h3>
                  {error && <p className='text-red-500'>{error}</p>}
                  {weather && (
                     <div className='bg-white bg-opacity-20 rounded-lg p-6 md:p-8 shadow-lg mt-20 mx-auto w-full max-w-xs'>
                        {/* Center the card and adjust its size */}
                        <p className='text-2xl font-extrabold lg:text-5xl text-white'>
                           {`${Math.floor(weather.main.temp)}°C`}
                        </p>
                        {time && <p className='text-xl md:text-2xl text-white mt-2'>{time}</p>}
                     </div>
                  )}
                  <div className='mt-20 text-white flex flex-col items-center animate-bounce'>
                     <FaArrowDown className='text-3xl mb-2' /> {/* Down arrow icon */}
                     <p className='text-lg'>スクロールして始める</p> {/* Text below the icon */}
                  </div>
               </div>
            </div>
         </AspectRatio>
      </div>
   );
};

export default Welcome;
