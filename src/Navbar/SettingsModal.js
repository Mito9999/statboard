import React from "react";
import Modal from "../Modal";
import { settingsArray } from "../constants";
import { getFromStorage, importData, exportData } from "../utils";

import SettingCard from "./SettingCard";

export default function SettingsModal({
    data: { isSettingsModalOpen, setIsSettingsModalOpen },
}) {
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
                onChange={(e) => importData(e, "cards")}
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
