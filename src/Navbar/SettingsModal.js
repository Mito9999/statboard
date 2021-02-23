import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import { settingsArray, initialSettings } from "../constants";
import { getFromStorage, exportData } from "../utils";

import SettingCard from "./SettingCard";
import MainContext from "../context";

import { MdCloudUpload, MdCloudDownload } from "react-icons/md";

const FileInput = styled.input`
    display: none;
`;

const FileLabel = styled.label`
    appearance: auto;
    writing-mode: horizontal-tb !important;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
    box-sizing: border-box;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 6px;
    border-width: 2px;
    border-style: outset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial; ;
`;

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

    // TODO: STYLE BUTTONS

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
            {/* <FileLabel htmlFor="import-cards">
                <MdCloudUpload />
                Import Cards
            </FileLabel>
            <FileInput
                id="import-cards"
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
                <MdCloudDownload />
                Export Cards
            </button>
            <FileLabel htmlFor="import-settings">Import Settings</FileLabel>
            <FileInput
                id="import-settings"
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
            </button> */}
        </Modal>
    );
}
