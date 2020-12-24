import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";
import AddModal from "./AddModal";
import "./App.css";

const initialCards = [
    {
        site: "10fastfingers",
        data: 2069581,
        id: nanoid(),
    },
];

function App() {
    const [cards, setCards] = useState(
        JSON.parse(localStorage.getItem("cards")).length > 0
            ? JSON.parse(localStorage.getItem("cards"))
            : initialCards
    );

    // Form and Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ site: "", data: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

    useEffect(() => {
        console.log(cards);
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    const removeCard = (cardID) => {
        const filteredCards = cards.filter((card) => card.id !== cardID);
        setCards(filteredCards);
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
                    <option value="10fastfingers">10fastfingers</option>
                    <option value="reddit">reddit</option>
                </select>
                <form>
                    <input
                        type="text"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                    />
                    <button onClick={makeNewCard}>Add</button>
                </form>
            </AddModal>
        </div>
    );
}

export default App;
