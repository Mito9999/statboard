import React, { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";

import { SITE_INFO } from "./cardFunctions";
import { getFromStorage, saveToStorage } from "./utils";
import ThemeContext from "./context";

import Card from "./Card";
import Modal from "./Modal";

const initialCards = [
    {
        site: "ethereum",
        data: ["0x5fa22d211d9f8d4cb094807ff8c468e664f18c97"],
        id: nanoid(),
    },
];

const getCardsFromStorage = () => {
    try {
        return getFromStorage("cards").length > 0
            ? getFromStorage("cards")
            : initialCards;
    } catch {
        return initialCards;
    }
};

export default function Cards() {
    const theme = useContext(ThemeContext);
    console.log("THEME: ", theme);
    const [cards, setCards] = useState(getCardsFromStorage());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        site: "10fastfingers",
        data: [],
    });

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

    const removeCard = (cardID) => {
        const filteredCards = cards.filter((card) => card.id !== cardID);
        setCards(filteredCards);
    };

    useEffect(() => {
        console.log(cards);
        saveToStorage("cards", cards);
    }, [cards]);

    return (
        <div className="all-cards" style={{ color: theme.text }}>
            {cards.map((cardInfo) => (
                <Card
                    key={cardInfo.id}
                    style={{ backgroundColor: theme.card }}
                    cardInfo={cardInfo}
                    removeCard={removeCard}
                />
            ))}
            <div
                className="card"
                style={{ backgroundColor: theme.card, cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="card--data">
                    <div className="card--add">+</div>
                </div>
            </div>
            <Modal open={isModalOpen} close={() => setIsModalOpen(false)}>
                <h1>Add</h1>
                <select
                    name="site"
                    value={formData.site}
                    onChange={({ target: { value } }) => {
                        setFormData((prev) => ({
                            ...prev,
                            site: value,
                            data: [],
                        }));
                    }}
                >
                    {Object.entries(SITE_INFO).map((siteValue) => (
                        <option key={siteValue[0]} value={siteValue[0]}>
                            {siteValue[0]}
                        </option>
                    ))}
                </select>
                <form>
                    {SITE_INFO[formData.site].dataTypes.map(
                        (dataType, index) => (
                            <input
                                key={formData.site + dataType}
                                type="text"
                                value={formData.data[index] || ""}
                                onChange={(e) => {
                                    handleSiteInputChange(e, index);
                                }}
                                placeholder={dataType}
                            />
                        )
                    )}
                    <button onClick={makeNewCard}>Add</button>
                </form>
            </Modal>
        </div>
    );
}
