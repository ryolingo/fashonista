import React from 'react';

const WeatherTimeline = ({ weatherData }: { weatherData: any }) => {
   if (!weatherData) return <p>Loading...</p>;

   // OpenWeather API からの3時間ごとの天気データを1日分だけ表示
   const hourlyWeather = weatherData.list.slice(0, 8); // 最初の8件を取得（24時間分）
   console.log(weatherData);
   return (
      <div
         className='weather-timeline'
         style={{ display: 'flex', overflowX: 'auto', padding: '10px' }}
      >
         {hourlyWeather.map((weather: any, index: number) => (
            <div
               key={index}
               style={{
                  flex: '0 0 auto',
                  width: '150px',
                  textAlign: 'center',
                  marginRight: '10px',
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '10px',
               }}
            >
               <p>{new Date(weather.dt_txt).getHours()}:00</p>
               <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                  style={{ width: '50px', height: '50px' }}
               />
               <p>{Math.round(weather.main.temp - 273.15)}°C</p>
            </div>
         ))}
      </div>
   );
};

export default WeatherTimeline;
