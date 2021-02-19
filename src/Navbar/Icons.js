import React, { useContext } from "react";
import { MdAdd, MdSettings, MdRefresh } from "react-icons/md";

import MainContext from "../context";

export default function Icons({
    data: { setIsAddModalOpen, setIsSettingsModalOpen },
}) {
    const { refresh } = useContext(MainContext);

    return (
        <div className="nav--icons">
            <MdAdd onClick={() => setIsAddModalOpen(true)} />
            <MdRefresh onClick={() => refresh.setShouldAllCardsRefresh(true)} />
            <MdSettings onClick={() => setIsSettingsModalOpen(true)} />
        </div>
    );
}
