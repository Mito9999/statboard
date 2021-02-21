import React, { useState } from "react";
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

export default function Navbar() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    return (
        <div style={NAV_STYLES}>
            <Logo />
            <SearchBar />
            <Icons data={{ setIsAddModalOpen, setIsSettingsModalOpen }} />

            <AddModal data={{ isAddModalOpen, setIsAddModalOpen }} />
            <SettingsModal
                data={{
                    isSettingsModalOpen,
                    setIsSettingsModalOpen,
                }}
            />
        </div>
    );
}
