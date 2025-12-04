import './App.css';
import TempTable from './Components/TemperatureTable/Table';
import WeatherCard from './Components/WeatherCard/Weather';
import React, { useState, useEffect } from 'react';

function App() {

  const [days, setDay] = useState([]);
  const [wmo, setWmo] = useState([]);
  const [time, setTime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [hum, setHum] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchWeatherData() {
      const res = await fetch("http://localhost:8080/api");
      const data = await res.json();
      
      const dailyData = data.daily;
      const hourlyData = data.hourly;

      setTime(hourlyData.time);
      setTemp(hourlyData.temperature_2m);
      setHum(hourlyData.relative_humidity_2m);
      setDay(dailyData.time);
      setWmo(dailyData.weather_code);
    }

    fetchWeatherData();
  }, []);

  const day1Times = time.slice(0, 24).map(day => day.substring(11));
  const day2Times = time.slice(24, 48).map(day => day.substring(11));
  const day3Times = time.slice(48, 72).map(day => day.substring(11));
  const day4Times = time.slice(72, 96).map(day => day.substring(11));
  const day5Times = time.slice(96, 120).map(day => day.substring(11));
  const day6Times = time.slice(120, 144).map(day => day.substring(11));
  const day7Times = time.slice(144).map(day => day.substring(11));

  const weekTimes = [day1Times, day2Times, day3Times, day4Times, day5Times, day6Times, day7Times];

  const day1Temp = temp.slice(0, 24);
  const day2Temp = temp.slice(24, 48);
  const day3Temp = temp.slice(48, 72);
  const day4Temp = temp.slice(72, 96);
  const day5Temp = temp.slice(96, 120);
  const day6Temp = temp.slice(120, 144);
  const day7Temp = temp.slice(144);

  const weekTemp = [day1Temp, day2Temp, day3Temp, day4Temp, day5Temp, day6Temp, day7Temp];

  const day1Hum = hum.slice(0, 24);
  const day2Hum = hum.slice(24, 48);
  const day3Hum = hum.slice(48, 72);
  const day4Hum = hum.slice(72, 96);
  const day5Hum = hum.slice(96, 120);
  const day6Hum = hum.slice(120, 144);
  const day7Hum = hum.slice(144);

  const weekHum = [day1Hum, day2Hum, day3Hum, day4Hum, day5Hum, day6Hum, day7Hum];

  const wmoCodes = {
    "Clear": [0, "clear"],
    "Mostly Clear": [1, 2, 3, "partially_cloudy"],
    "Foggy": [45, 48, "foggy"],
    "Drizzle": [51, 53, 55, "drizzle"],
    "Freezing Drizzle": [56, 57, "drizzle"],
    "Rainy": [61, 63, 65, "rain"],
    "Freezing Rain": [66, 67, "rain"],
    "Snowy": [71, 73, 75, "snow"],
    "Snow grains": [77, "snow"],
    "Rain Showers": [80, 81, 82, "shower"],
    "Snow Showers": [85, 86, "snow_shower"],
    "Thunderstorm": [95, "thunderstorm"],
    "Thunderstorm (with hail)": [96, 99, "thunderstorm"]
  };
  
  function getWeatherLabel(code) {
    for (const [label, codes] of Object.entries(wmoCodes)) {
      if (codes.includes(code)) {return label};
    }
    return "Unknown Weather";
  };

  function getWeatherIcon(code) {
    for (const [ _, codes ] of Object.entries(wmoCodes)) {
      if (codes.includes(code)) {return codes.at(-1)};
    }
  }

  function leftTempButtonClick() {
    if (index === 0) {
      setIndex(6);
    } else {
      setIndex(index - 1);
    }
  }
  function rightTempButtonClick() {
    if (index < 6) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }
  return (
    <div className="App">
      <div className='weather-cards-container'>
        {days.map((d, i) => (
          <WeatherCard key={i} date={d} weather={getWeatherLabel(wmo[i])} icon={getWeatherIcon(wmo[i])} />
        ))}
      </div>
      <TempTable date={days[index]} time={weekTimes[index]} temp={weekTemp[index]} hum={weekHum[index]} leftClick={leftTempButtonClick} rightClick={rightTempButtonClick}/>
    </div>
  );
}

export default App;
