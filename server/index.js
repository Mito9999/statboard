const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();

app.use(cors());

app.get("/weather", async (req, res) => {
    const zip = req.query.zip;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    );
    const weatherJSON = await weatherResponse.json();

    res.json(weatherJSON);
});

app.listen(3001, () => {
    console.log("-- Server Listening for Requests on port 3001 --");
});
