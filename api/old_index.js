const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();

app.use(cors());
app.use(helmet());

app.get("/weather", async (req, res) => {
    const zip = req.query.zip;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    );
    const weatherJSON = await weatherResponse.json();

    res.json(weatherJSON);
});

const proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
});

app.get("/proxy/:proxyUrl*", (req, res) => {
    req.url = req.url.replace("/proxy/", "/");
    proxy.emit("request", req, res);
});

app.listen(3001, () => {
    console.log("-- Server Listening for Requests on port 3001 --");
});