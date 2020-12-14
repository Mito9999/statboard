import React, { useState, useEffect } from "react";
import { headersArray, API_URL } from "./fetchVariables.js";

const Card = ({ cardInfo }) => {
    const [jsonData, setJsonData] = useState(null);

    const getData = async () => {
        let myHeaders = new Headers();

        headersArray.forEach((header) => {
            if (header[0] === "referer") {
                myHeaders.append(header[0], header[1] + cardInfo.id);
            } else {
                myHeaders.append(header[0], header[1]);
            }
        });

        const { min_norm, max_norm, avg_norm, languages_sorted } = await fetch(
            API_URL + cardInfo.id,
            {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
            }
        )
            .then((response) => response.json())
            .catch((error) => console.log("error", error));

        const filtered = { min_norm, max_norm, avg_norm, languages_sorted };

        return filtered;
    };

    useEffect(() => {
        (async () => {
            const data = await getData();
            const { min_norm, max_norm, avg_norm, languages_sorted } = data;
            const filtered = { min_norm, max_norm, avg_norm, languages_sorted };
            setJsonData(filtered);
        })();
    }, []);

    return (
        <>
            { jsonData ? (
                <div className="card">
                    <div className="card--title">10fastfingers.com</div>
                    <div className="card--data">
                        <div>
                            <span>{jsonData.avg_norm}</span>
                        WPM
                    </div>
                        <div>
                            <span>{jsonData.languages_sorted[0][0].anzahl}</span>
                        TESTS
                    </div>
                    </div>
                </div>
            ) : "Loading..."
            }
        </>
    );
};

export default Card;
