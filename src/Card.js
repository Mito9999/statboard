import React, { useState, useEffect } from "react";
import { SITE_INFO } from "./cardFunctions";
import { handleEmptyData } from "./utils";

const Card = ({ cardInfo, removeCard }) => {
    const [data, setData] = useState(handleEmptyData("Loading..."));

    useEffect(() => {
        (async () => {
            try {
                const asdfjkl = await SITE_INFO[cardInfo.site].fn(cardInfo);
                console.log(asdfjkl);
                setData(asdfjkl);
            } catch (err) {
                setData(handleEmptyData());
                console.log(err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div
                className={`card ${hovered ? "hovered" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onDoubleClick={() => removeCard(cardInfo.id)}
            >
                <div className="card--title">{data[0]}</div>
                <div className="card--data">
                    <div>{data[1]}</div>
                    <div>{data[2]}</div>
                </div>
            </div>
        </>
    );
};

export default Card;
