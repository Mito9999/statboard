import React from "react";
import {
    handleEmptyData,
    createCardFunction,
    numberToOrdinalSuffix,
    numberToAbbreviation,
} from "./utils";

const MAIN_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://statboard.vercel.app"; // without trailing forward-slash
const CORS_URL = `${MAIN_URL}/api/proxy`; // without trailing forward-slash

const tenfastfingers = (cardInfo) => {
    const headersArray = [
        ["authority", "10fastfingers.com"],
        ["content-length", "0"],
        ["accept", "application/json, text/javascript, */*; q=0.01"],
        [
            "user-agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Safari/537.36",
        ],
        ["x-requested-with", "XMLHttpRequest"],
        ["origin", "https://10fastfingers.com"],
    ];

    const API_URL = `${CORS_URL}/10fastfingers.com/users/get_graph_data/0/`;

    const getData = async () => {
        let myHeaders = new Headers();
        headersArray.forEach((header) =>
            myHeaders.append(header[0], header[1])
        );

        try {
            const { avg_norm, languages_sorted } = await fetch(
                API_URL + cardInfo.data[0],
                {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                }
            ).then((response) => response.json());

            const showTests = () => {
                try {
                    return languages_sorted[0][0].anzahl;
                } catch {
                    return "0";
                }
            };

            return [
                <>{cardInfo.site}</>,
                <>
                    <span>{avg_norm}</span>WPM
                </>,
                <>
                    <span>{showTests()}</span>TESTS
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    };
    return getData();
};

const reddit = async (cardInfo) =>
    createCardFunction(
        `https://www.reddit.com/user/${cardInfo.data[0]}/about.json`,
        cardInfo,
        {
            "data.total_karma": "KARMA",
            "": "",
        }
    );

const ethermine = (cardInfo) => {
    return (async () => {
        try {
            const data = await fetch(
                `https://api.ethermine.org/miner/${cardInfo.data[0]}/currentStats`
            );
            const res = await data.json();
            return [
                <>{cardInfo.site}</>,
                <>
                    <span>
                        {Math.round(res.data.reportedHashrate / 1000000)}
                    </span>
                    MH/s
                </>,
                <>
                    <span>
                        {(res.data.unpaid / 1000000000000000000).toFixed(5)}
                    </span>
                    ETH
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

const ethereum = (cardInfo) => {
    return (async () => {
        try {
            const data = await fetch(
                `https://ethplorer.io/service/service.php?data=${cardInfo.data[0]}`
            );
            const res = await data.json();
            return [
                <>{cardInfo.site}</>,
                <>
                    <span>
                        <span className="dollar">$</span>
                        {(res.ethPrice.rate * res.balance).toFixed(2)}
                    </span>
                    USD
                </>,
                <>
                    <span>{res.balance.toFixed(5)}</span>
                    ETH
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

const mee6 = (cardInfo) => {
    return (async () => {
        try {
            const [serverID, userID] = cardInfo.data;

            const data = await fetch(
                `${CORS_URL}/mee6.xyz/api/plugins/levels/leaderboard/${serverID}`
            );
            const res = await data.json();

            const user = res.players.find(
                (playerObj) => playerObj.id === userID
            );
            const ranking = res.players.indexOf(user) + 1;
            const rankingText = numberToOrdinalSuffix(ranking);

            return [
                <>{cardInfo.site}</>,
                <>
                    <span>{user.message_count}</span>
                    MESSAGES
                </>,
                <>
                    <span>{ranking + rankingText}</span>
                    PLACE
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

const yahoofinance = (cardInfo) => {
    return (async () => {
        try {
            const data = await fetch(
                `${CORS_URL}/query1.finance.yahoo.com/v8/finance/chart/${cardInfo.data[0]}`
            );
            const res = await data.json();

            const {
                regularMarketPrice: stockPrice,
                chartPreviousClose: closePrice,
            } = res.chart.result[0].meta;

            const percentChange =
                ((stockPrice - closePrice) / closePrice) * 100;

            return [
                <>{cardInfo.data[0]}</>,
                <>
                    <span>{stockPrice.toFixed(2)}</span>
                    USD
                </>,
                <>
                    <span>{percentChange.toFixed(2)}</span>%
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

const weather = (cardInfo) => {
    return (async () => {
        try {
            const data = await fetch(
                `${MAIN_URL}/api/weather?zip=${cardInfo.data[0]}`
            );
            const { city, temp, wind_speed } = await data.json();

            return [
                <>{city}</>,
                <>
                    <span>{Math.round(temp)}</span>F
                </>,
                <>
                    <span>{Math.round(wind_speed)}</span>MPH
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

const crypto = (cardInfo) => {
    return (async () => {
        try {
            const data = await fetch(
                `${MAIN_URL}/api/crypto?symbol=${cardInfo.data[0]}`
            );
            const { symbols, price, cap } = await data.json();

            return [
                <>{symbols}</>,
                <>
                    <span className="dollar">$</span>
                    <span>{price.toFixed(2)}</span>USD
                </>,
                <>
                    <span>{numberToAbbreviation(cap)}</span>(24h)
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();
};

// the refreshPeriod object's start and end properties are hours and minutes in an array
// that determine if a card should auto-refresh. the purpose of this is to avoid unnecesary
// refreshes. for when the stock market isn't open there is no need to refresh yahoofinance
export const SITE_INFO = {
    "10fastfingers": {
        fn: tenfastfingers,
        dataTypes: ["Account ID"],
        refreshInterval: 5 * 60,
        needsAuth: false,
        hasDocs: false,
    },
    reddit: {
        fn: reddit,
        dataTypes: ["Username"],
        refreshInterval: 10 * 60,
        needsAuth: false,
        hasDocs: true,
    },
    ethermine: {
        fn: ethermine,
        dataTypes: ["Wallet Address"],
        refreshInterval: 2 * 60,
        needsAuth: false,
        hasDocs: true,
    },
    ethereum: {
        fn: ethereum,
        dataTypes: ["Wallet Address"],
        refreshInterval: 2 * 60,
        needsAuth: false,
        hasDocs: false,
    },
    mee6: {
        fn: mee6,
        dataTypes: ["Server ID", "User ID"],
        refreshInterval: 10 * 60,
        needsAuth: false,
        hasDocs: false,
    },
    yahoofinance: {
        fn: yahoofinance,
        dataTypes: ["Stock Ticker Symbol"],
        refreshInterval: 1 * 60,
        refreshPeriod: {
            start: [9, 30],
            end: [16, 0],
        },
        needsAuth: false,
        hasDocs: false,
    },
    weather: {
        fn: weather,
        dataTypes: ["ZIP Code"],
        refreshInterval: 10 * 60,
        needsAuth: false,
        hasDocs: true,
    },
    crypto: {
        fn: crypto,
        dataTypes: ["Symbol"],
        refreshInterval: 2 * 60,
        needsAuth: false,
        hasDocs: true,
    },
};
