import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import Select from "react-select";
import { MdAdd } from "react-icons/md";

import { SITE_INFO } from "../cardFunctions";
import { selectDropdownStyles } from "../constants";
import ThemeContext from "../context";

const defaultFormData = { site: "10fastfingers", data: [] };

export default function AddModal({
    data: { isAddModalOpen, setIsAddModalOpen, setCards },
}) {
    const theme = useContext(ThemeContext);
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
        setCards((prev) => [
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
                onSubmit={(e) => e.preventDefault()}
            >
                {SITE_INFO[formData.site].dataTypes.map((dataType, index) => (
                    <input
                        className="input"
                        key={formData.site + dataType}
                        type="text"
                        value={formData.data[index] || ""}
                        onChange={(e) => {
                            handleSiteInputChange(e, index);
                        }}
                        style={{ width: "100%" }}
                        placeholder={dataType}
                    />
                ))}
                <div
                    onClick={makeNewCard}
                    className="input"
                    style={{
                        fontSize: "2em",
                        cursor: "pointer",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.card,
                    }}
                >
                    <MdAdd />
                </div>
            </form>
        </Modal>
    );
}
