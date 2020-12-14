import React, { useState, useEffect } from "react";
import { headersArray, API_URL } from "./fetchVariables.js";

function App() {
    const [jsonData, setJsonData] = useState(null);

    const getData = async () => {
        let myHeaders = new Headers();

        headersArray.forEach((header) => {
            myHeaders.append(header[0], header[1]);
        });

        const data = await fetch(API_URL, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        })
            .then((response) => response.json())
            .catch((error) => console.log("error", error));

        const { min_norm, max_norm, avg_norm, languages_sorted } = data;
        const filtered = { min_norm, max_norm, avg_norm, languages_sorted };

        setJsonData(filtered);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>{jsonData ? JSON.stringify(jsonData, null, 2) : "Loading..."}</div>
    );
}

export default App;
