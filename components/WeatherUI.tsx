import React from 'react';

interface WeatherUIProps {
   location: string;
   setLocation: (location: string) => void;
   handleSearch: () => void;
   loading: boolean;
   error: string | null;
   currentWeather: any; // 現在の天気データ
   weatherData: any; // 天気予報データ
}

const WeatherUI: React.FC<WeatherUIProps> = ({
   location,
   setLocation,
   handleSearch,
   loading,
   error,
   currentWeather, // 現在の天気を受け取る
   weatherData, // 予報データを受け取る
}) => {
   return (
      <div className='container mx-auto p-4'>
         <h1 className='text-2xl font-bold'>Wether</h1>
         <div className='mt-4'>
            <input
               type='text'
               placeholder='場所を入力してください'
               value={location}
               onChange={(e) => setLocation(e.target.value)}
               className='border p-2'
            />
            <button onClick={handleSearch} className='ml-2 bg-blue-500 text-white p-2'>
               天気を検索
            </button>
         </div>

         {loading && <p>Loading...</p>}
         {error && <p className='text-red-500'>{error}</p>}

         {/* 現在の天気表示 */}
         {currentWeather && (
            <div className='mt-4'>
               <h2 className='text-xl font-bold'>今日の天気</h2>
               <p>{currentWeather.weather[0].description}</p>
               <p>気温: {Math.round(currentWeather.main.temp - 273.15)}°C</p>
               <p>湿度: {currentWeather.main.humidity}%</p>
               <p>風速: {currentWeather.wind.speed} m/s</p>
            </div>
         )}

         {/* 天気予報表示 */}
         {weatherData && weatherData.list && (
            <div className='mt-8 flex justify-around'>
               {weatherData.list.slice(1, 6).map((forecast: any, index: number) => (
                  <div
                     key={index}
                     className='bg-white p-4 rounded-lg shadow-lg flex flex-col items-center'
                     style={{ width: '120px' }}
                  ></div>
               ))}
            </div>
         )}
      </div>
   );
};

export default WeatherUI;
