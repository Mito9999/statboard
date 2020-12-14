import React, { useState } from "react";
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

    const [cards, setCards] = useState([
        {
            site: "10fastfingers",
            id: 2069581,
        },
    ]);

    const makeNewCard = (e) => {
        e.preventDefault();
        setCards((prev) => [
            ...prev,
            {
                site: "10fastfingers",
                id: formData.ID,
            },
        ]);

    };

    const addCard = () => {
        setIsModalOpen(true);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="all-cards">
            {cards.map((cardInfo, index) => <Card key={index} cardInfo={cardInfo} />)}
            <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={addCard}
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
