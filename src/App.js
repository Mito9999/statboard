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

        return filtered;
    };

    useEffect(() => {
        console.log("App is in development mode");
        // stores response from 10ff to localstorage for development to prevent multiple unnecessary requests
        (async () => {
            const data = localStorage.getItem("jsonData") ? JSON.parse(localStorage.getItem("jsonData")) : await getData();
            const { min_norm, max_norm, avg_norm, languages_sorted } = data;
            const filtered = { min_norm, max_norm, avg_norm, languages_sorted };
            setJsonData(filtered);
        })();
    }, []);

    useEffect(() => {
        localStorage.setItem("jsonData", JSON.stringify(jsonData))
    }, [jsonData])

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
