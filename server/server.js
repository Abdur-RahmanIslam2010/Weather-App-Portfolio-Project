const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&daily=temperature_2m_min,temperature_2m_max,sunset,sunrise,weather_code&hourly=temperature_2m,relative_humidity_2m&timezone=America%2FNew_York")
    .then(response => response.json())
    .then(data => {
        res.send(data);
    })
});

app.get('/icons/:icon', (req, res) => {
    const icon = req.params.icon;
    const icons = {
        "clear": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\weather_sun_icon_187672.svg",
        "partially_cloudy": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\partly_cloudy_day_sun_clouds_weather_icon_177560.svg",
        "foggy": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\foggy_weather_icon_131727.svg",
        "drizzle": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\drizzle_rain_weather_snow_icon_177579.svg",
        "rain": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\rain_weather_cloud_icon_187697.svg",
        "snow": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\weather_snow_snowflake_winter_freeze_icon_189094.svg",
        "shower": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\rain_cloud_weather_icon_187688.svg",
        "snow_shower": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\weather_snow_cloud_snowflake_snowfall_icon_189106.svg",
        "thunderstorm": "C:\\Users\\islam\\OneDrive\\Desktop\\Dido\\Portfolio_Projects\\WeatherAPI\\server\\icons\\weather_thunder_storm_icon_187682.svg"
    };
    res.sendFile(icons[icon]);
});

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server started and is listening at http://localhost:${port}`);
    }
});