import React from "react";

export const tenfastfingers = (cardInfo) => {
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
            return [
                <>
                    <span>0</span>WPM
                </>,
                <>
                    <span>0</span>TESTS
                </>,
            ];
        }
    };
    return getData();
};

export const reddit = async (cardInfo) => {
    const res = await fetch(
        `https://www.reddit.com/user/${cardInfo.data}/about.json`
    );
    const {
        data: { total_karma, inbox_count },
    } = await res.json();
    console.log(total_karma, inbox_count);
    return [
        <>{cardInfo.site}</>,
        <>
            <span>{total_karma}</span>KARMA
        </>,
        <>
            <span></span>
        </>,
    ];
};
