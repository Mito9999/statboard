import React from "react";
import { handleEmptyData, createCardFunction } from "./utils";

const tenfastfingers = (cardInfo) => {
    const headersArray = [
        ["authority", "10fastfingers.com"],
        ["content-length", "0"],
        ["accept", "application/json, text/javascript, */*; q=0.01"],
        [
            "user-agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        ],
        ["x-requested-with", "XMLHttpRequest"],
        ["origin", "https://10fastfingers.com"],
        ["sec-fetch-site", "same-origin"],
        ["sec-fetch-mode", "cors"],
        ["sec-fetch-dest", "empty"],
        ["referer", "https://10fastfingers.com/user/"],
        ["accept-language", "en-US,en;q=0.9"],
    ];

    const API_URL =
        "https://cors-anywhere.herokuapp.com/https://10fastfingers.com/users/get_graph_data/0/";

    const getData = async () => {
        let myHeaders = new Headers();

        headersArray.forEach((header) => {
            if (header[0] === "referer") {
                myHeaders.append(header[0], header[1] + cardInfo.data);
            } else {
                myHeaders.append(header[0], header[1]);
            }
        });

        try {
            const { avg_norm, languages_sorted } = await fetch(
                API_URL + cardInfo.data,
                {
                    method: "POST",
                    headers: myHeaders,
                    redirect: "follow",
                }
            )
                .then((response) => response.json())
                .catch((error) => {
                    console.log("FETCH_ERROR: ", error);
                });

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
        } catch (err) {
            console.log("DATA_ERROR:" + err);
            return handleEmptyData();
        }
    };
    return getData();
};

const reddit = async (cardInfo) =>
    createCardFunction(
        `https://www.reddit.com/user/${cardInfo.data}/about.json`,
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
                `https://api.ethermine.org/miner/${cardInfo.data}/currentStats`
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
                `https://ethplorer.io/service/service.php?data=${cardInfo.data}`
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

export const SITE_INFO = {
    "10fastfingers": {
        fn: tenfastfingers,
        dataType: "Account ID",
    },
    reddit: {
        fn: reddit,
        dataType: "Username",
    },
    ethermine: {
        fn: ethermine,
        dataType: "Wallet Address",
    },
    ethereum: {
        fn: ethereum,
        dataType: "Wallet Address",
    },
};
