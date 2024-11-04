'use client';
import { useState } from 'react';
import { useFetchWeather } from '../utils/useFetchWeather';
import GoogleImageGrid from './GoogleImageGrid';
import KeywordGenerator from './keywordGenerator';
import SearchForm from './SearchForm';
import WeatherUI from './WeatherUI';
import WeatherTimeline from './WetherTimline';
import InputPrefecture from './input-prefecture';

export default function MainDisplay() {
   const [searchTerm, setSearchTerm] = useState('');
   const [location, setLocation] = useState(''); // ロケーションの管理
   const [fetchLocation, setFetchLocation] = useState<string | null>(null); // fetchLocationを使用
   const { weatherData, loading, error } = useFetchWeather(fetchLocation || '');
   const { currentWeather } = useFetchWeather(fetchLocation || ''); // 現在の天気データを取得

   // 検索キーワードを設定する関数
   const handleSearchSubmit = (term: string) => {
      setSearchTerm(term);
   };

   // 検索ボタンが押されたときの動作
   const handleSearch = (location: string) => {
      setFetchLocation(location); // fetchLocationの状態を更新
   };
   return (
      <div className='px-10 flex flex-col items-center mt-10'>
         <div className='w-full max-w-5xl'>
            <div className=''>
               <WeatherUI
                  location={location}
                  setLocation={setLocation} // 場所を入力するための状態設定関数を渡す
                  handleSearch={handleSearch} // 検索ボタンを押したときの動作
                  loading={loading} // ローディング状態を渡す
                  error={error} // エラー状態を渡す
                  currentWeather={currentWeather} // 現在の天気データを渡す
                  weatherData={weatherData} // 天気予報データを渡す
               />
            </div>
            {weatherData && (
               <div className='mt-8'>
                  <h2 className='text-2xl font-extrabold mb-4'>Today's Weather Timeline</h2>
                  <WeatherTimeline weatherData={weatherData} /> {/* タイムラインで天気情報を表示 */}
               </div>
            )}
            <div>
               <h1 className='text-3xl font-extrabold mb-4 text-center'>何を着よう？</h1>
               <SearchForm onSubmit={handleSearchSubmit} /> {/* onSubmitを正しく渡す */}
               <div className='mt-8'>
                  <GoogleImageGrid searchTerm={searchTerm} />
               </div>
               <div>
                  <KeywordGenerator />
               </div>
            </div>
         </div>
      </div>
   );
}
