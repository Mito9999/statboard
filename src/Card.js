import React, { useState, useEffect } from "react";
import { SITE_INFO } from "./cardFunctions";
import { handleEmptyData } from "./utils";

import RefreshIcon from "@material-ui/icons/Refresh";
import CloseIcon from "@material-ui/icons/Close";

const Card = ({ cardInfo, removeCard }) => {
    const [data, setData] = useState(handleEmptyData("Loading..."));
    const [hovered, setHovered] = useState(false);

    const getAndSetData = async () => {
        try {
            const siteInfo = await SITE_INFO[cardInfo.site].fn(cardInfo);
            setData(siteInfo);
        } catch (err) {
            setData(handleEmptyData());
            console.log(err);
        }
    };

    useEffect(() => {
        getAndSetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className={`card ${hovered ? "hovered" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="card--title">{data[0]}</div>
                <div className="card--data">
                    <div>{data[1]}</div>
                    <div>{data[2]}</div>
                </div>
                <div className="card--icons">
                    <CloseIcon
                        onClick={() => {
                            removeCard(cardInfo.id);
                        }}
                    />
                    <RefreshIcon
                        onClick={() => {
                            setData(handleEmptyData("Loading..."));
                            getAndSetData();
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Card;
