import React from 'react';

interface WeatherUIProps {
   location: string;
   setLocation: (location: string) => void;
   handleSearch: () => void; // handleSearchを受け取る
   loading: boolean;
   error: string | null;
   weatherData: any;
}

const WeatherUI: React.FC<WeatherUIProps> = ({
   location,
   setLocation,
   handleSearch,
   loading,
   error,
   weatherData,
}) => {
   return (
      <div className='container mx-auto p-4'>
         <h1 className='text-2xl font-bold'>Weather App</h1>
         <div className='mt-4'>
            <input
               type='text'
               placeholder='Enter location'
               value={location}
               onChange={(e) => setLocation(e.target.value)}
               className='border p-2'
            />
            <button onClick={handleSearch} className='ml-2 bg-blue-500 text-white p-2'>
               Get Weather
            </button>
         </div>

         {loading && <p>Loading...</p>}
         {error && <p className='text-red-500'>{error}</p>}

         {weatherData && (
            <div className='mt-4'>
               <h2 className='text-xl font-bold'>Weather in {weatherData.name}</h2>
               <p>{weatherData.weather[0].description}</p>
               <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            </div>
         )}
      </div>
   );
};

export default WeatherUI;
