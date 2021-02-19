import React from "react";
import Modal from "../Modal";
import { settingsArray } from "../constants";
import { getFromStorage, exportData } from "../utils";

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
            <button
                onClick={() =>
                    exportData(getFromStorage("cards"), "cards.json")
                }
            >
                Export Cards
            </button>
        </Modal>
    );
}
