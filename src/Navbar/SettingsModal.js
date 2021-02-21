import React, { useContext } from "react";
import Modal from "../Modal";
import { settingsArray, initialSettings } from "../constants";
import { getFromStorage, exportData } from "../utils";

import SettingCard from "./SettingCard";
import MainContext from "../context";

export default function SettingsModal({
    data: { isSettingsModalOpen, setIsSettingsModalOpen },
}) {
    const { cards, settings } = useContext(MainContext);

    const importData = (e, data) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            if (e.target.name === "import-cards") {
                const currentCardIDs = cards.data.map((card) => card.id);
                const cardsFromFile = JSON.parse(event.target.result);
                const newCards = cardsFromFile.filter(
                    (card) => !currentCardIDs.includes(card.id)
                );

                data.setCards((prev) => [...prev, ...newCards]);
            } else if (e.target.name === "import-settings") {
                data.setSettingsData(JSON.parse(event.target.result));
            }
        };

        reader.readAsText(file);
    };
    return (
        <Modal
            open={isSettingsModalOpen}
            close={() => setIsSettingsModalOpen(false)}
        >
            <h1>Settings</h1>
            <h3 style={{ margin: "30px 0px 15px 0px" }}>General</h3>
            {settingsArray.map(({ text, value }) => (
                <SettingCard key={value} text={text} value={value} />
            ))}
            <input
                name="import-cards"
                onChange={(e) => importData(e, cards)}
                type="file"
                accpet=".json"
            />
            <button
                onClick={() =>
                    exportData(getFromStorage("cards"), "statboard-cards.json")
                }
            >
                Export Cards
            </button>
            <input
                name="import-settings"
                onChange={(e) => importData(e, settings)}
                type="file"
                accpet=".json"
            />
            <button
                onClick={() =>
                    exportData(
                        getFromStorage("settings"),
                        "statboard-settings.json"
                    )
                }
            >
                Export Settings
            </button>
            <button
                onClick={() => {
                    settings.setSettingsData((prev) => ({
                        ...prev,
                        ...initialSettings.data,
                    }));
                }}
            >
                Reset Settings
            </button>
        </Modal>
    );
}
