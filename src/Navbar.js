import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Modal from "./Modal";
import SettingCard from "./SettingCard";

import { saveToStorage } from "./utils";
import { SITE_INFO } from "./cardFunctions";

import "./Navbar.css";
import { MdAdd, MdSettings } from "react-icons/md";
import Select from "react-select";

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

    React.useEffect(() => {
        console.log(formData);
    }, [formData]);

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
                <Select
                    options={Object.entries(SITE_INFO).map((siteValue) => ({
                        value: siteValue[0],
                        label: siteValue[0],
                    }))}
                    onChange={({ value }) => {
                        console.log(value);
                        setFormData((prev) => ({
                            ...prev,
                            site: value,
                            data: [],
                        }));
                    }}
                />
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
