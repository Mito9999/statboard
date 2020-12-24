import React, { useState, useEffect } from "react";
import { tenfastfingers } from "./cardFunctions";

const Card = ({ cardInfo, removeCard }) => {
    const [data, setData] = useState([
        <>Loading...</>,
        <>Loading...</>,
        <>Loading...</>,
    ]);

    useEffect(() => {
        (async () => {
            try {
                const res = await tenfastfingers(cardInfo);
                setData(res);
            } catch (err) {
                console.log("MOUNT_ERROR:" + err);
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
