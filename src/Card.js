import React, { useState, useEffect } from "react";
import { tenfastfingers } from "./cardFunctions";

const handleEmptyData = (text = "Error") => {
    return [<>{text}</>, <>{text}</>, <>{text}</>];
};

const Card = ({ cardInfo, removeCard }) => {
    const [data, setData] = useState(handleEmptyData("Loading..."));

    useEffect(() => {
        (async () => {
            try {
                let siteFunction = () => {};
                let isValidSite = true;
                switch (cardInfo.site) {
                    case "10fastfingers":
                        siteFunction = tenfastfingers;
                        break;
                    default:
                        isValidSite = false;
                        break;
                }
                const res = await (isValidSite
                    ? siteFunction(cardInfo)
                    : handleEmptyData());

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
