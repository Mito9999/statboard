import React, { useContext } from "react";
import MainContext from "./context";

import Card from "./Card";

export default function Cards({ cards, setCards }) {
    const context = useContext(MainContext);

    const removeCard = (cardID) => {
        const filteredCards = cards.filter((card) => card.id !== cardID);
        setCards(filteredCards);
    };

    return (
        <div className="all-cards" style={{ color: context.theme.text }}>
            {cards.map((cardInfo) => (
                <Card
                    key={cardInfo.id}
                    style={{ backgroundColor: context.theme.card }}
                    cardInfo={cardInfo}
                    removeCard={removeCard}
                />
            ))}
        </div>
    );
}
