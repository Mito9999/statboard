import React, { useContext } from "react";
import { MdAdd, MdSettings, MdRefresh } from "react-icons/md";

import MainContext from "../context";

import styled from "styled-components";

const NavIcons = styled.div`
    font-size: 2em;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        cursor: pointer;
        margin-left: 20px;
    }
`;

export default function Icons({
    data: { setIsAddModalOpen, setIsSettingsModalOpen },
}) {
    const { refresh } = useContext(MainContext);

    return (
        <NavIcons>
            <MdAdd onClick={() => setIsAddModalOpen(true)} />
            <MdRefresh onClick={() => refresh.setShouldAllCardsRefresh(true)} />
            <MdSettings onClick={() => setIsSettingsModalOpen(true)} />
        </NavIcons>
    );
}
