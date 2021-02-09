import React, { useState } from "react";
import "./index.css";

import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Icons from "./Icons";
import AddModal from "./AddModal";
import SettingsModal from "./SettingsModal";

const NAV_STYLES = {
    margin: "3em 1em 2em 1em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function Navbar({
    setCards,
    data: { settingsData, handleSettingsUpdate },
}) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    return (
        <div style={NAV_STYLES}>
            <Logo />
            <SearchBar />
            <Icons data={{ setIsAddModalOpen, setIsSettingsModalOpen }} />

            <AddModal data={{ isAddModalOpen, setIsAddModalOpen, setCards }} />
            <SettingsModal
                data={{
                    isSettingsModalOpen,
                    setIsSettingsModalOpen,
                    settingsData,
                    handleSettingsUpdate,
                }}
            />
        </div>
    );
}
