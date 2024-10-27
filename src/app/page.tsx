'use client'; // クライアントコンポーネントとして指定

import { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import GoogleImageGrid from '../../components/GoogleImageGrid';
import { useFetchWeather } from '../../utils/useFetchWeather';
import WeatherUI from '../../components/WeatherUI';
import KeywordGenerator from '../../components/keywordGenerator';
import ClothingCardList from './firestore/components/ClothingCardList'
import { getClothingItems } from '../lib/firestore';


const Home = async () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');  // ロケーションの管理
  const { weatherData, loading, error } = useFetchWeather(location);
  const clothingItems = await getClothingItems();

  // 検索キーワードを設定する関数
  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };
  const handleSearch = () => {
    console.log("Search initiated for location",location)
  }

  return (
    <div>
      <div className='container'>
           <WeatherUI
        location={location}
        setLocation={setLocation}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
        weatherData={weatherData}
      />
      </div>
 <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Google画像検索</h1>
      <SearchForm onSubmit={handleSearchSubmit} /> {/* onSubmitを正しく渡す */}
      <div className="mt-8">
        <GoogleImageGrid searchTerm={searchTerm} />
      </div>
      <div>
        <h1>Welcome to Fashionista!</h1>
        <KeywordGenerator />
      </div>
    </div>

    <div><ClothingCardList items={clothingItems} /></div>
  </div>
   
  );
};

export default Home;