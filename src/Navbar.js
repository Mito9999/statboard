import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Modal from "./Modal";
import SettingCard from "./SettingCard";

import { saveToStorage } from "./utils";
import { SITE_INFO } from "./cardFunctions";

import "./Navbar.css";
import { MdAdd, MdSettings } from "react-icons/md";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const settingsArray = [
    {
        text: "Auto Update",
        value: "autoUpdate",
    },
    {
        text: "Light Mode",
        value: "lightMode",
    },
];

export default function Navbar({
    setCards,
    data: { settingsData, handleSettingsUpdate },
}) {
    useEffect(() => {
        saveToStorage("settings", settingsData);
    }, [settingsData]);

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        site: "10fastfingers",
        data: [],
    });

    const handleSiteInputChange = ({ target: { value } }, index) => {
        const newData = [...formData.data];
        newData[index] = value;

        setFormData((prev) => ({
            ...prev,
            data: newData,
        }));
    };

    const makeNewCard = (e) => {
        e.preventDefault();
        setCards((prev) => [
            ...prev,
            {
                site: formData.site,
                data: formData.data,
                id: nanoid(),
            },
        ]);
    };

    return (
        <div style={NAV_STYLES}>
            <span style={{ fontSize: "1.5em", fontWeight: "600" }}>
                Statboard
            </span>
            <div className="nav--icons">
                <MdAdd onClick={() => setIsAddModalOpen(true)} />
                <MdSettings onClick={() => setIsSettingsModalOpen(true)} />
            </div>
            <Modal open={isAddModalOpen} close={() => setIsAddModalOpen(false)}>
                <h1>Add</h1>
                <select
                    name="site"
                    value={formData.site}
                    onChange={({ target: { value } }) => {
                        setFormData((prev) => ({
                            ...prev,
                            site: value,
                            data: [],
                        }));
                    }}
                >
                    {Object.entries(SITE_INFO).map((siteValue) => (
                        <option key={siteValue[0]} value={siteValue[0]}>
                            {siteValue[0]}
                        </option>
                    ))}
                </select>
                <form>
                    {SITE_INFO[formData.site].dataTypes.map(
                        (dataType, index) => (
                            <input
                                key={formData.site + dataType}
                                type="text"
                                value={formData.data[index] || ""}
                                onChange={(e) => {
                                    handleSiteInputChange(e, index);
                                }}
                                placeholder={dataType}
                            />
                        )
                    )}
                    <button onClick={makeNewCard}>Add</button>
                </form>
            </Modal>
            <Modal
                open={isSettingsModalOpen}
                close={() => setIsSettingsModalOpen(false)}
            >
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
