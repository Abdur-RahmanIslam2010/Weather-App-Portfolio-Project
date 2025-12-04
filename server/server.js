const express = require('express');
const cors = require('cors');
const path = require('path');

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
        "clear": path.resolve('./icons/weather_sun_icon_187672.svg'),
        "partially_cloudy": path.resolve('./icons/partly_cloudy_day_sun_clouds_weather_icon_177560.svg'),
        "foggy": path.resolve('./icons/foggy_weather_icon_131727.svg'),
        "drizzle": path.resolve('./icons/drizzle_rain_weather_snow_icon_177579.svg'),
        "rain": path.resolve('./icons/drizzle_rain_weather_snow_icon_177579.svg'),
        "snow": path.resolve('./icons/weather_snow_snowflake_winter_freeze_icon_189094.svg'),
        "shower": path.resolve('./icons/rain_cloud_weather_icon_187688.svg'),
        "snow_shower": path.resolve('./icons/weather_snow_cloud_snowflake_snowfall_icon_189106.svg'),
        "thunderstorm": path.resolve('./icons/weather_thunder_storm_icon_187682.svg'),
        "left_arrow": path.resolve('./icons/arrow_left_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'),
        "right_arrow": path.resolve('./icons/arrow_right_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg')
    };
    res.sendFile(icons[icon]);
});

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server started and is listening at http://localhost:${port}`);
    }
});