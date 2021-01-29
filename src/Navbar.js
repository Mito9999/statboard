import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function Navbar() {
    return (
        <div style={NAV_STYLES}>
            <span style={{ fontSize: "1.5em" }}>Statboard</span>
            <SettingsIcon style={{ fontSize: "2em" }} />
        </div>
    );
}
