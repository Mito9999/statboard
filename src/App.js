import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";
import AddModal from "./AddModal";
import "./App.css";

import { SITE_INFO } from "./cardFunctions";

const initialCards = [
    {
        site: "ethereum",
        data: ["0x5fa22d211d9f8d4cb094807ff8c468e664f18c97"],
        id: nanoid(),
    },
];

const getCardsFromStorage = () => {
    try {
        const cardsFromStorage = JSON.parse(localStorage.getItem("cards"));
        return cardsFromStorage.length > 0 ? cardsFromStorage : initialCards;
    } catch {
        return initialCards;
    }
};

function App() {
    const [cards, setCards] = useState(getCardsFromStorage());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        site: "10fastfingers",
        data: [],
    });
    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "site") {
            setFormData((prev) => ({
                ...prev,
                data: [],
            }));
        }
    };

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
        localStorage.setItem("cards", JSON.stringify(cards));
        console.log(cards);
    }, [cards]);

    return (
        <div className="all-cards">
            {cards.map((cardInfo) => (
                <Card
                    key={cardInfo.id}
                    cardInfo={cardInfo}
                    removeCard={removeCard}
                />
            ))}
            <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="card--data">
                    <div className={"card--add"}>+</div>
                </div>
            </div>
            <AddModal open={isModalOpen} close={() => setIsModalOpen(false)}>
                <h1>Add</h1>
                <select
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                >
                    {Object.entries(SITE_INFO).map((siteValue) => (
                        <option value={siteValue[0]}>{siteValue[0]}</option>
                    ))}
                </select>
                <form>
                    {SITE_INFO[formData.site].dataTypes.map(
                        (dataType, index) => (
                            <input
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
            </AddModal>
        </div>
    );
}

export default App;
