const app = require("express")();
const helmet = require("helmet");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");
const fetch = require("node-fetch");
require("dotenv").config();

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

app.get("/api/crypto", async (req, res) => {
    try {
        const symbol = req.query.symbol;
        const cryptoResponse = await fetch(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`
        );
        const { RAW: allJSONData } = await cryptoResponse.json();
        const {
            PRICE: price,
            FROMSYMBOL: symbol1,
            TOSYMBOL: symbol2,
            VOLUMEDAY: volume,
        } = allJSONData[symbol]["USD"];

        res.json({
            symbols: `${symbol1} - ${symbol2}`,
            price,
            volume,
        });
    } catch {
        res.status(404);
        res.json({
            message: "Failed to get crypto data.",
        });
    }
});

const proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
});

app.get("/api/proxy/:proxyUrl*", (req, res) => {
    req.url = req.url.replace("/api/proxy/", "/");
    proxy.emit("request", req, res);
});

app.listen(3001, () => {
    console.log("Server listening on port 3001");
});

module.exports = app;
