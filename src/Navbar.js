import React, { useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "./Modal";

import Toggle from "react-toggle";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const initialSettings = {
    autoUpdate: false,
};

export default function Navbar() {
    const [settingsData, setSettingsData] = useState({
        ...initialSettings,
        ...JSON.parse(localStorage.getItem("settings")),
    }); // gets the default settings, overrides some of them with the user-selected settings

    const handleSettingsUpdate = ({ target: { name, value } }) => {
        setSettingsData((prev) => ({
            ...prev,
            [name]: value === "true",
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
                <h2>General</h2>
                <span title="Every 1 minute">Auto Update</span>
                <Toggle
                    icons={false}
                    name="autoUpdate"
                    value={(!settingsData.autoUpdate).toString()}
                    checked={settingsData.autoUpdate}
                    onChange={handleSettingsUpdate}
                />
            </Modal>
        </div>
    );
}
