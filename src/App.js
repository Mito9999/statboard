import React, { useState, useEffect } from "react";
import { headersArray, API_URL } from "./fetchVariables.js";
import "./App.css";

const userID = 2069581;

function App() {
    const [jsonData, setJsonData] = useState(null);

    const getData = async () => {
        let myHeaders = new Headers();

        headersArray.forEach((header) => {
            myHeaders.append(header[0], header[1]);
        });

        const { min_norm, max_norm, avg_norm, languages_sorted } = await fetch(
            API_URL + userID,
            {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
            }
        )
            .then((response) => response.json())
            .catch((error) => console.log("error", error));

        const filtered = { min_norm, max_norm, avg_norm, languages_sorted };

        setJsonData(filtered);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>{jsonData ? (
            <div class="card">
                <div class="card--title">
                    10fastfingers.com
                </div>
                <div class="card--data">
                    <div>
                        <span>
                            {jsonData.languages_sorted[0][0].anzahl}
                        </span>
                        TESTS
                    </div>
                    <div>
                        <span>
                            {jsonData.avg_norm}
                        </span>
                        WPM
                    </div>
                </div>
            </div>
        ) : "Loading..."}</div>
    );
}

export default App;
