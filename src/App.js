import React, { useState, useEffect } from "react";
import { headersArray, API_URL } from "./fetchVariables.js";
import Card from "./Card";
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
        <div className="all-cards">
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
            {jsonData ? <Card jsonData={jsonData} /> : "Loading..."}
        </div>
    );
}

export default App;
