import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Navbar from "./Navbar";
import "./index.css";

ReactDOM.render(
    <>
        <Navbar />
        <App />
    </>,
    document.getElementById("root")
);
