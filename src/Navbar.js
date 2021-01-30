import React, { useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "./Modal";

import SettingCard from "./SettingCard";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const initialSettings = {
    autoUpdate: false,
    testingValue: false,
};

const settingsArray = [
    {
        text: "Auto Update",
        value: "autoUpdate",
    },
];

export default function Navbar() {
    const [settingsData, setSettingsData] = useState({
        ...initialSettings,
        ...JSON.parse(localStorage.getItem("settings")),
    }); // gets the default settings, overrides some of them with the user-selected settings

    const handleSettingsUpdate = (checked, _, id) => {
        setSettingsData((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    useEffect(() => {
        console.log(settingsData);
        localStorage.setItem("settings", JSON.stringify(settingsData));
    }, [settingsData]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={NAV_STYLES}>
            <span style={{ fontSize: "1.5em", fontWeight: "600" }}>
                Statboard
            </span>
            <SettingsIcon
                style={{ fontSize: "2em", cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            />
            <Modal open={isModalOpen} close={() => setIsModalOpen(false)}>
                <h1>Settings</h1>
                <h3 style={{ margin: "30px 0px 15px 0px" }}>General</h3>
                {settingsArray.map(({ text, value }) => (
                    <SettingCard
                        key={value}
                        text={text}
                        value={value}
                        settingsData={settingsData}
                        handleSettingsUpdate={handleSettingsUpdate}
                    />
                ))}
            </Modal>
        </div>
    );
}
