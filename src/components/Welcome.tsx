import React, { useEffect, useState } from 'react';
import { fetchWeatherWelcome } from '@/utils/fetchWeatherWelcome';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FaArrowDown } from 'react-icons/fa'; // Importing an icon library

const textShadow = { textShadow: '0 0 2px rgba(0, 0, 0, 0.5)' };

const Welcome = () => {
   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
   const [weather, setWeather] = useState<any>(null);
   const [time, setTime] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);

   // 天気の検索の部分までスクロール
   const handleScroll = () => {
      const targetElement = document.getElementById('search');
      if (targetElement) {
         targetElement.scrollIntoView({ behavior: 'smooth' });
      }
   };

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
               let weather = 'nature';

               if (weatherCondition.includes('clear')) {
                  weather = 'sunny';
               } else if (weatherCondition.includes('cloud')) {
                  weather = 'cloudy';
               } else if (weatherCondition.includes('rain')) {
                  weather = 'rainy';
               }

               const randomImage = Math.floor(Math.random() * 5) + 1;
               setBackgroundImage(`/images/weather/${weather}/${weather}${randomImage}.jpg`);
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
               <div className='text-center max-w-screen-lg mx-auto pl-4'>
                  <h2
                     className='text-4xl lg:text-6xl font-extrabold text-white mb-4 whitespace-nowrap drop-shadow-2xl'
                     style={textShadow}
                  >
                     Fashonistaにようこそ
                  </h2>
                  <h3
                     className='text-2xl sm:text-3xl font-light text-white mb-4 mt-3 drop-shadow-2xl'
                     style={textShadow}
                  >
                     Fashionistaで天気からコーディネートを探そう
                  </h3>
                  {error && <p className='text-red-500'>{error}</p>}
                  {weather && (
                     <div className='bg-gray-200 bg-opacity-40 rounded-lg p-6 md:p-8 shadow-lg mt-20 mx-auto w-full max-w-xs'>
                        {/* Center the card and adjust its size */}
                        <p
                           className='text-2xl font-extrabold lg:text-5xl  text-white drop-shadow-lg'
                           style={{ textShadow: '0 0 2px rgba(0, 0, 0, 0.4)' }}
                        >
                           {`${Math.floor(weather.main.temp)}°C`}
                        </p>
                        {time && (
                           <p
                              className='text-xl md:text-2xl text-white mt-2 drop-shadow-2xl'
                              style={textShadow}
                           >
                              {time}
                           </p>
                        )}
                     </div>
                  )}
                  <button onClick={handleScroll}>
                     <div className='mt-20 text-white flex flex-col items-center animate-bounce'>
                        <FaArrowDown className='text-3xl mb-2' /> {/* Down arrow icon */}
                        <p className='text-lg drop-shadow-2xl' style={textShadow}>
                           スクロールして始める
                        </p>{' '}
                        {/* Text below the icon */}
                     </div>
                  </button>
               </div>
            </div>
         </AspectRatio>
      </div>
   );
};

export default Welcome;
