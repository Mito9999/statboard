import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";

import ThemeContext, { themes } from "./context";
import { getFromStorage, saveToStorage } from "./utils";

import Navbar from "./Navbar";
import Cards from "./Cards";

const initialSettings = {
    autoUpdate: false,
    lightMode: false,
};

const initialCards = [
    {
        site: "ethereum",
        data: ["0x5fa22d211d9f8d4cb094807ff8c468e664f18c97"],
        id: nanoid(),
    },
];

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

    const themeValue = settingsData.lightMode ? themes.light : themes.dark;
    document.body.style.color = themeValue.text;
    document.body.style.backgroundColor = themeValue.background;

    useEffect(() => {
        saveToStorage("cards", cards);
    }, [cards]);

    return (
        <ThemeContext.Provider value={themeValue}>
            <Navbar
                setCards={setCards}
                data={{ settingsData, handleSettingsUpdate }}
            />
            <Cards cards={cards} setCards={setCards} />
        </ThemeContext.Provider>
    );
}

export default App;
