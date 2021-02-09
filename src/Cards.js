import React, { useContext } from "react";
import MainContext from "./context";

import Card from "./Card";

export default function Cards() {
    const { theme, cards } = useContext(MainContext);

    const removeCard = (cardID) => {
        const filteredCards = cards.data.filter((card) => card.id !== cardID);
        cards.setCards(filteredCards);
    };

    return (
        <div className="all-cards" style={{ color: theme.text }}>
            {cards.data.map((cardInfo) => (
                <Card
                    key={cardInfo.id}
                    style={{ backgroundColor: theme.card }}
                    cardInfo={cardInfo}
                    removeCard={removeCard}
                />
            ))}
        </div>
    );
}
