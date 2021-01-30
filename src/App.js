import React, { useState } from "react";
import "./App.css";

import ThemeContext, { themes } from "./context";
import { getFromStorage } from "./utils";

import Navbar from "./Navbar";
import Cards from "./Cards";

const initialSettings = {
    autoUpdate: false,
    lightMode: false,
};

function App() {
    const [settingsData, setSettingsData] = useState({
        ...initialSettings,
        ...getFromStorage("settings"),
    }); // gets the default settings, overrides some of them with the user-selected settings

    const handleSettingsUpdate = (checked, _, id) => {
        setSettingsData((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const themeValue = settingsData.lightMode ? themes.light : themes.dark;
    document.body.style.color = themeValue.text;
    document.body.style.backgroundColor = themeValue.background;

    return (
        <ThemeContext.Provider value={themeValue}>
            <Navbar data={{ settingsData, handleSettingsUpdate }} />
            <Cards />
        </ThemeContext.Provider>
    );
}

export default App;
