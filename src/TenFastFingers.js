import React, { useState, useEffect } from "react";
import { headersArray, API_URL } from "./fetchVariables.js";

const Card = ({ cardInfo, removeCard }) => {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);

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

            const filtered = { avg_norm, languages_sorted };
            return filtered;
        } catch (err) {
            console.log("DATA_ERROR:" + err);
            return {
                avg_norm: 0,
                languages_sorted: [
                    {
                        0: {
                            anzahl: "0",
                        },
                    },
                ],
            };
        }
    };

    useEffect(() => {
        (async () => {
            const data = await getData();
            try {
                const { avg_norm, languages_sorted } = data;
                const filtered = { avg_norm, languages_sorted };
                setJsonData(filtered);
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            } catch (err) {
                console.log("MOUNT_ERROR:" + err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showTests = () => {
        try {
            return jsonData.languages_sorted[0][0].anzahl;
        } catch {
            return "0";
        }
    };

    const [hovered, setHovered] = useState(false);

    return (
        <>
            {jsonData && !loading ? (
                <div
                    className={`card ${hovered ? "hovered" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onDoubleClick={() => removeCard(cardInfo.id)}
                >
                    {/* {hovered && (
                        <div
                            className="card--remove"
                            onClick={() => removeCard(cardInfo.id)}
                        >
                            (X)
                        </div>
                    )} */}
                    <div className="card--title">10fastfingers.com</div>
                    <div className="card--data">
                        <div>
                            <span>{jsonData.avg_norm}</span>
                            WPM
                        </div>
                        <div>
                            <span>{showTests()}</span>
                            TESTS
                        </div>
                    </div>
                </div>
            ) : loading ? (
                "Loading..."
            ) : null}
        </>
    );
};

export default Card;
