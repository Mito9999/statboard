import React, { useState, useEffect, useContext } from "react";

import { SITE_INFO } from "../cardFunctions";
import { handleEmptyData, getFromStorage } from "../utils";
import MainContext from "../context";

import { MdRefresh, MdClose } from "react-icons/md";

const Card = ({ cardInfo, removeCard, ...restProps }) => {
    const context = useContext(MainContext);
    const [data, setData] = useState(handleEmptyData("Loading..."));
    const [hovered, setHovered] = useState(false);

    const getAndSetData = async () => {
        const prevData = data;
        try {
            const siteInfo = await SITE_INFO[cardInfo.site].fn(cardInfo);
            setData(siteInfo);
        } catch (err) {
            setData(prevData);
            console.log(err);
        }
    };

    useEffect(() => {
        getAndSetData();
        const minuteTimerID = setInterval(() => {
            if (getFromStorage("settings").autoUpdate === true) {
                getAndSetData();
            }
        }, 60 * 1000);

        return () => {
            clearInterval(minuteTimerID);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            {...restProps}
            className={`card ${hovered ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="card--title">{data[0]}</div>
            <div className="card--data">
                <div>{data[1]}</div>
                <div>{data[2]}</div>
            </div>
            <div
                className="card--icons"
                style={{
                    color: context.theme.icons,
                    fontSize: "1.75rem",
                }}
            >
                <MdClose
                    onClick={() => {
                        removeCard(cardInfo.id);
                    }}
                />
                <MdRefresh
                    onClick={() => {
                        setData(handleEmptyData("Loading..."));
                        getAndSetData();
                    }}
                />
            </div>
        </div>
    );
};

export default Card;
