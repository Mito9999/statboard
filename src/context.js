import React from "react";

export const themes = {
    light: {
        background: "#f6f5f5",
        card: "#d3e0ea",
        icons: "#ff884b",
        text: "#276678",
    },
    dark: {
        background: "#222831",
        card: "#30475e",
        icons: "#f2a365",
        text: "#ececec",
    },
};

const ThemeContext = React.createContext(themes);

export default ThemeContext;
