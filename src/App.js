import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import Card from "./Card";
import AddModal from "./AddModal";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({ ID: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [cards, setCards] = useState(
        JSON.parse(localStorage.getItem("cards")).length > 0
            ? JSON.parse(localStorage.getItem("cards"))
            : [
                {
                    site: "10fastfingers",
                    data: 2069581,
                    id: nanoid()
                },
            ]
    );

    useEffect(() => {
        console.log(cards);
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    const makeNewCard = (e) => {
        e.preventDefault();
        setCards((prev) => [
            ...prev,
            {
                site: "10fastfingers",
                data: parseInt(formData.ID),
                id: nanoid()
            },
        ]);
    };

    const removeCard = (cardID) => {
        const filteredCards = cards.filter(card => card.id !== cardID);
        console.log(filteredCards);
        setCards(filteredCards);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="all-cards">
            {cards.map((cardInfo) => (
                <Card key={cardInfo.id} cardInfo={cardInfo} removeCard={removeCard} />
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
                <h1>10FastFingers</h1>
                ID:
                <form>
                    <input
                        type="text"
                        name="ID"
                        value={formData.ID}
                        onChange={handleChange}
                    />
                    <button onClick={makeNewCard}>Add</button>
                </form>
            </AddModal>
        </div>
    );
}

export default App;
