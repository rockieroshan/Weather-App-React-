import React, { useState } from 'react';
import './App.css';
function App() {
  const [query, setquery] = useState('');
  // const [date, setDate] = useState('');
  const [weather, setWeather] = useState({});

  const onSearch = (evt) => {
    if (evt.key === 'Enter') {
      // const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      // setDate(utc.split('/').reverse().join('/'));
      const api = {
        key: '726b9bfbecb053bc746c73750563b55c',
        base: 'https://api.openweathermap.org/data/2.5/',
      };
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          console.log(data);
          setWeather(data);
        });
    }
  };
  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            onChange={(e) => setquery(e.target.value)}
            value={query}
            placeholder="Search..."
            onKeyPress={onSearch}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              {/* <div className="date">{date}</div> */}
            </div>
            <div className="weather-box">
              <div className="temp">{Math.floor(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="noLocation">Please look for a location</div>
        )}
      </main>
    </div>
  );
}

export default App;
