import React, { useContext } from "react";
import ThemeContext from "./context";

import Card from "./Card";

export default function Cards({ cards, setCards }) {
    const theme = useContext(ThemeContext);

    const removeCard = (cardID) => {
        const filteredCards = cards.filter((card) => card.id !== cardID);
        setCards(filteredCards);
    };

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
        </div>
    );
}
