import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import Select from "react-select";
import { MdAdd } from "react-icons/md";

import { SITE_INFO } from "../cardFunctions";
import { selectDropdownStyles } from "../constants";
import MainContext from "../context";

import styled from "styled-components";

const Input = styled.input`
    height: 38px;
    border: 1px solid #aaa;
    border-radius: 10px;
    margin-top: 8px;
    outline: none;
    padding: 8px;
    width: 100%;
`;

const PlusButton = styled.div`
    height: 38px;
    border: 1px solid #aaa;
    border-radius: 10px;
    margin-top: 8px;
    outline: none;
    padding: 8px;
    font-size: 2em;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const defaultFormData = { site: "10fastfingers", data: [] };

export default function AddModal({
    data: { isAddModalOpen, setIsAddModalOpen },
}) {
    const { theme, cards } = useContext(MainContext);
    const [formData, setFormData] = useState({ ...defaultFormData });

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
        cards.setCards((prev) => [
            ...prev,
            {
                site: formData.site,
                data: formData.data,
                id: nanoid(),
            },
        ]);
    };

    return (
        <Modal
            open={isAddModalOpen}
            close={() => {
                setFormData((prev) => ({
                    ...prev,
                    ...defaultFormData,
                }));
                setIsAddModalOpen(false);
            }}
        >
            <h1>Add</h1>
            <div>
                <Select
                    options={Object.entries(SITE_INFO).map((siteValue) => ({
                        value: siteValue[0],
                        label: siteValue[0],
                    }))}
                    onChange={({ value }) => {
                        setFormData((prev) => ({
                            ...prev,
                            site: value,
                            data: [],
                        }));
                    }}
                    styles={selectDropdownStyles(theme)}
                />
            </div>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                }}
                onSubmit={makeNewCard}
            >
                {SITE_INFO[formData.site].dataTypes.map((dataType, index) => (
                    <Input
                        key={formData.site + dataType}
                        type="text"
                        value={formData.data[index] || ""}
                        onChange={(e) => {
                            handleSiteInputChange(e, index);
                        }}
                        placeholder={dataType}
                    />
                ))}
                <PlusButton
                    onClick={makeNewCard}
                    style={{ backgroundColor: theme.card }}
                >
                    <MdAdd />
                </PlusButton>
            </form>
        </Modal>
    );
}
