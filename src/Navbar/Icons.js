import React from "react";
import { MdAdd, MdSettings } from "react-icons/md";

export default function Icons({
    data: { setIsAddModalOpen, setIsSettingsModalOpen },
}) {
    return (
        <div className="nav--icons">
            <MdAdd onClick={() => setIsAddModalOpen(true)} />
            <MdSettings onClick={() => setIsSettingsModalOpen(true)} />
        </div>
    );
}
