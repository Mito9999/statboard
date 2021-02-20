import React, { useContext } from "react";
import Modal from "../Modal";
import { settingsArray } from "../constants";
import { getFromStorage, exportData } from "../utils";

import SettingCard from "./SettingCard";
import MainContext from "../context";

export default function SettingsModal({
    data: { isSettingsModalOpen, setIsSettingsModalOpen },
}) {
    const { cards, settings } = useContext(MainContext);

    const importData = (e, updateFunction) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            updateFunction(JSON.parse(event.target.result));
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
                onChange={(e) => importData(e, cards.setCards)}
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
                onChange={(e) => importData(e, settings.setSettingsData)}
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
        </Modal>
    );
}
