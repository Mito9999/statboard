import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";
import AddModal from "./AddModal";
import "./App.css";

import { SITE_INFO } from "./cardFunctions";

const initialCards = [
    {
        site: "10fastfingers",
        data: ["2069581"],
        dataTypes: ["Account ID"],
        id: nanoid(),
    },
];

const getCardsLengthFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("cards")).length;
    } catch {
        return 0;
    }
};

function App() {
    const [cards, setCards] = useState(
        getCardsLengthFromStorage() > 0
            ? JSON.parse(localStorage.getItem("cards"))
            : initialCards
    );

    // Form and Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        site: "10fastfingers",
        data: [],
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

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

    useEffect(() => {
        console.log(cards);
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    const removeCard = (cardID) => {
        const filteredCards = cards.filter((card) => card.id !== cardID);
        setCards(filteredCards);
    };

    const handleSiteInputChange = (e) => {
        const { name, value } = e.target;
        // name is an integer, for indexing

        const newData = [...formData.data];
        newData[parseInt(name)] = value;

        setFormData((prev) => ({
            ...prev,
            data: newData,
        }));
    };

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
                                name={index}
                                value={formData.data[index]}
                                onChange={handleSiteInputChange}
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
