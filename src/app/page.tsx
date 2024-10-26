'use client'; // クライアントコンポーネントとして指定

import { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import GoogleImageGrid from '../../components/GoogleImageGrid';
import { useFetchWeather } from '../../utils/useFetchWeather';
import WeatherUI from '../../components/WeatherUI';
import KeywordGenerator from '../../components/keywordGenerator';
import WeatherTimeline from '../../components/WetherTimline';

const Home = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [location, setLocation] = useState(''); // ロケーションの管理
   const [fetchLocation, setFetchLocation] = useState<string | null>(null);
   const { weatherData, loading, error } = useFetchWeather(fetchLocation || '');
   const { currentWeather } = useFetchWeather(fetchLocation || ''); // 現在の天気データを取得
   // 検索キーワードを設定する関数
   const handleSearchSubmit = (term: string) => {
      setSearchTerm(term);
   };
   const handleSearch = () => {
      console.log('Search initiated for location', location);
      setFetchLocation(location);
   };

   return (
      <div>
         <div className='container'>
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
            <div className='container mt-8'>
               <h2 className='text-2xl mb-4'>Today's Weather Timeline</h2>
               <WeatherTimeline weatherData={weatherData} /> {/* タイムラインで天気情報を表示 */}
            </div>
         )}
         <div className='container mx-auto p-4'>
            <h1 className='text-2xl mb-4'>Google画像検索</h1>
            <SearchForm onSubmit={handleSearchSubmit} /> {/* onSubmitを正しく渡す */}
            <div className='mt-8'>
               <GoogleImageGrid searchTerm={searchTerm} />
            </div>
            <div>
               <h1>Welcome to Fashionista!</h1>
               <KeywordGenerator />
            </div>
         </div>
      </div>
   );
};

export default Home;
