import React, { useContext } from "react";
import styled from "styled-components";
import MainContext from "../context";

import Card from "./Card";

const AllCards = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default function Cards() {
    const { theme, cards } = useContext(MainContext);

    const removeCard = (cardID) => {
        const filteredCards = cards.data.filter((card) => card.id !== cardID);
        cards.setCards(filteredCards);
    };

    return (
        <AllCards style={{ color: theme.text }}>
            {cards.data.map((cardInfo) => (
                <Card
                    key={cardInfo.id}
                    style={{ backgroundColor: theme.card }}
                    cardInfo={cardInfo}
                    removeCard={removeCard}
                />
            ))}
        </AllCards>
    );
}
