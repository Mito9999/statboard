import React, { useContext } from "react";
import Toggle from "react-switch";
import MainContext from "../context";

export default function SettingCard({ text, value }) {
    const { settings } = useContext(MainContext);
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
            <div style={{ marginLeft: "10px" }}>
                <Toggle
                    id={value}
                    value={(!settings.data[value]).toString()}
                    checked={settings.data[value]}
                    onChange={settings.handleSettingsUpdate}
                />
            </div>
        </div>
    );
}
