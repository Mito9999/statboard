import React from "react";
import { initialSettings as settings } from "./constants";

export const theme = {
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
const MainContext = React.createContext({ theme, settings });

export default MainContext;
