import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "./Modal";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={NAV_STYLES}>
            <span style={{ fontSize: "1.5em" }}>Statboard</span>
            <SettingsIcon
                style={{ fontSize: "2em", cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            />
            <Modal open={isModalOpen} close={() => setIsModalOpen(false)}>
                <h1>Settings</h1>
            </Modal>
        </div>
    );
}
