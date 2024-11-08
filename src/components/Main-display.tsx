'use client';

import { useState } from 'react';
import { useFetchWeather } from '../utils/useFetchWeather';
import GoogleImageGrid from './GoogleImageGrid';
import KeywordGenerator from './keywordGenerator';
import SearchForm from './SearchForm';
import WeatherUI from './WeatherUI';
import Welcome from './Welcome';
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import db from '@/lib/firebase'; // Firebaseクライアント用設定をインポート
import WeatherTimeline from './WetherTimline';
import { v4 as uuidv4 } from 'uuid';

export default function MainDisplay() {
   const [termId] = useState(uuidv4());
   const [searchTerm, setSearchTerm] = useState('');
   const [location, setLocation] = useState('');
   const [fetchLocation, setFetchLocation] = useState<string | null>(null);
   const { weatherData, loading, error } = useFetchWeather(fetchLocation || '');
   const { currentWeather } = useFetchWeather(fetchLocation || '');
   const { data: session, status } = useSession();

   // 検索ワードを処理して保存する関数

   const handleSearchSubmit = async (term: string) => {
      setSearchTerm(term);
      // ログインしているかどうかを確認
      if (!session) {
         console.log('ログインしていないため、データは保存されません。');
         return;
      }
      try {
         // FirestoreのSearchTermコレクションへの参照を作成
         const collectionRef = collection(db, 'clothingItems');
         const date = new Date();
         const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
         // addDocを使用して新しいドキュメントを作成
         await addDoc(collectionRef, {
            term,
            timestamp: formattedDate,
            user: session.user?.email || 'unknown', // ユーザー情報を追加（任意）
         });
         console.log('データを保存しました');
      } catch (error) {
         console.error('データの保存に失敗しました:', error);
      }
   };
   // ロケーション検索
   const handleSearch = (location: string) => {
      setFetchLocation(location);
   };

   return (
      <div>
         <Welcome />
         <div className='container'>
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
            <div className='flex items-center gap-4 mb-5'>
               <h2 className='text-3xl font-bold text-primary mb-7 pl-60'>何を着よう？</h2>
               <div className='flex items-center'>
                  <SearchForm onSubmit={handleSearchSubmit} />
               </div>
            </div>
            <div className='mt-8'>
               <GoogleImageGrid searchTerm={searchTerm} />
            </div>
            <div className='mt-8'>
               <KeywordGenerator />
            </div>
         </div>
      </div>
   );
}
