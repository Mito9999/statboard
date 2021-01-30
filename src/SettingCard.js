import React from "react";
import Toggle from "react-switch";

export default function SettingCard({
    text,
    value,
    settingsData,
    handleSettingsUpdate,
}) {
    return (
        <div
            style={{
                display: "flex",
                width: "250px",
                marginBottom: "15px",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <span>{text}</span>
            <Toggle
                id={value}
                value={(!settingsData[value]).toString()}
                checked={settingsData[value]}
                onChange={handleSettingsUpdate}
            />
        </div>
    );
}
