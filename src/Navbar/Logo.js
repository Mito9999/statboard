import React from "react";
import logo from "./logo.png";

export default function Logo() {
    return (
        <span
            style={{
                fontSize: "1.5em",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
            }}
        >
            <img src={logo} alt="Statboard Logo" style={{ height: "40px" }} />
            Statboard
        </span>
    );
}
