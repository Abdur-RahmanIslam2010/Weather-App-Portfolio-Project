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

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server started and is listening at http://localhost:${port}`);
    }
});