const app = require("express")();
const helmet = require("helmet");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");
const fetch = require("node-fetch");

app.use(cors());
app.use(helmet());

app.get("/api/weather", async (req, res) => {
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

app.get("/api/proxy/:proxyUrl*", (req, res) => {
    req.url = req.url.replace("/proxy/", "/");
    proxy.emit("request", req, res);
});

module.exports = app;
