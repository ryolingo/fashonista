'use client';

import { useState } from 'react';
import { useFetchWeather } from '../utils/useFetchWeather';
import KeywordGenerator from './keywordGenerator';
import WeatherUI from './WeatherUI';
import Welcome from './Welcome';
import WeatherTimeline from './WetherTimline';
import GoogleSearch from './GoogleImages/GoogleSearch';

export default function MainDisplay() {
   const [location, setLocation] = useState('');
   const [fetchLocation, setFetchLocation] = useState<string | null>(null);
   const { weatherData, loading, error } = useFetchWeather(fetchLocation || '');
   const { currentWeather } = useFetchWeather(fetchLocation || '');

   // 検索ワードを処理して保存する関数

   // ロケーション検索
   const handleSearch = (location: string) => {
      setFetchLocation(location);
   };

   return (
      <div>
         <Welcome />
         <div id='search' className='container'>
            <WeatherUI
               location={location}
               setLocation={setLocation}
               handleSearch={handleSearch}
               loading={loading}
               error={error}
               currentWeather={currentWeather}
               weatherData={weatherData}
            />
         </div>
         {weatherData && (
            <div className='container mx-auto p-4 mt-8'>
               <h2 className='text-2xl ml-20 font-extrabold mb-30'>今日の天気のタイムライン</h2>
               <WeatherTimeline weatherData={weatherData} />
            </div>
         )}
         <div className='container p-4 pt-10 max-w-5xl mx-auto'>
            <p className='text-lg text-center text-gray-500 mb-8'>
               OK。次は気になる服を検索キーワードに入力してね。
            </p>
            <GoogleSearch />
            <div className='mt-8'>
               <KeywordGenerator />
            </div>
         </div>
      </div>
   );
}
