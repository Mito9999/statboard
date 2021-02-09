import React, { useState, useEffect } from "react";
import "./App.css";

import MainContext from "./context";
import { getFromStorage, saveToStorage } from "./utils";
import { theme, initialSettings, initialCards } from "./constants";

import Navbar from "./Navbar";
import Cards from "./Cards";

const getCardsFromStorage = () => {
    try {
        return getFromStorage("cards").length > 0
            ? getFromStorage("cards")
            : initialCards;
    } catch {
        return initialCards;
    }
};

function App() {
    const [cards, setCards] = useState(getCardsFromStorage());

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

    const themeValue = settingsData.lightMode ? theme.light : theme.dark;
    document.body.style.color = themeValue.text;
    document.body.style.backgroundColor = themeValue.background;

    useEffect(() => {
        saveToStorage("cards", cards);
        saveToStorage("settings", settingsData);
    }, [cards, settingsData]);

    return (
        <MainContext.Provider
            value={{
                theme: themeValue,
                settings: {
                    data: settingsData,
                    handleSettingsUpdate,
                },
                cards: {
                    data: cards,
                    setCards,
                },
            }}
        >
            <Navbar />
            <Cards />
        </MainContext.Provider>
    );
}

export default App;
