import './App.css';
import WeatherCard from './Components/WeatherCard/Weather';
import React, { useState, useEffect } from 'react';

function App() {

  const [day, setDay] = useState([]);
  const [wmo, setWmo] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      const res = await fetch("http://localhost:8080/api");
      const data = await res.json();
      
      const dailyData = data.daily;

      setDay(dailyData.time);
      setWmo(dailyData.weather_code);
    }

    fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <div>
        {day.map((d, i) => (
          <WeatherCard key={i} date={d} weather={wmo[i]} />
        ))}
        
      </div>
    </div>
  );
}

export default App;
