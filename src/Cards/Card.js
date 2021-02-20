import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SITE_INFO } from "../cardFunctions";
import { handleEmptyData, getFromStorage } from "../utils";
import MainContext from "../context";

import { MdRefresh, MdClose } from "react-icons/md";

const CardWrapper = styled.div`
    flex: 1 0 200px;
    min-width: 250px;
    height: 250px;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 25px;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0);
    backface-visibility: hidden;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.295);
    transition: all 120ms ease-in;
    transition-property: transform, box-shadow;

    &:hover {
        transform: scale(1.03);
        box-shadow: 5px 8px 15px 0px rgba(0, 0, 0, 0.295);
    }

    @media (max-width: 500px) {
        flex-basis: auto;
        width: 90%;
    }
`;

const Title = styled.div`
    text-align: center;
    font-size: 1.25rem;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;

    span {
        font-size: 2rem;
        margin-right: 5px;
    }

    .dollar {
        font-size: 1.5rem;
    }
`;

const Icons = styled.div`
    margin: 0 auto;
    font-size: 1.75rem;

    & > * {
        margin: 0 10px;
        cursor: pointer;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359.99deg);
        }
    }

    .refreshing {
        animation: spinner 1s linear infinite;
    }
`;

const Card = ({ cardInfo, removeCard, ...restProps }) => {
    const context = useContext(MainContext);
    const [data, setData] = useState(handleEmptyData("Loading..."));
    const [isLoading, setIsLoading] = useState(true);

    const siteInfo = SITE_INFO[cardInfo.site];

    const getAndSetData = async () => {
        setIsLoading(true);

        const prevData = data;
        try {
            const siteData = await siteInfo.fn(cardInfo);
            setData(siteData);
        } catch (err) {
            console.log(err);
            setData(prevData);
        }

        setTimeout(() => setIsLoading(false), 50); // TEMP FIX for when data is cached, just to show that the click has been registered
    };

    useEffect(() => {
        getAndSetData();
        const refreshIntervalID = setInterval(() => {
            let shouldRefresh = true;

            if (siteInfo.refreshPeriod) {
                const {
                    refreshPeriod: { start, end },
                } = siteInfo;
                const now = new Date();

                const [startHour] = start; // [startHour, startMinute]
                const [endHour] = end; // [endHour, endMinute]
                const currentHour = now.getHours();

                // TODO: Add minute accuracy - check for hour AND minute instead of just hour.
                // TODO: Add support for other time zones.

                // const currentMinute = now.getMinutes();
                // const minuteIsOutOfRange = currentMinute < startMinute && currentMinute > endMinute;

                // console.log(`${currentHour} > ${startHour} && ${currentHour} < ${endHour}`); // For future testing
                const isHourInRange =
                    currentHour > startHour && currentHour < endHour;

                shouldRefresh = isHourInRange;
            }

            if (shouldRefresh && getFromStorage("settings").autoUpdate) {
                getAndSetData();
            }
        }, siteInfo.refreshInterval);

        return () => {
            clearInterval(refreshIntervalID);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (context.refresh.shouldAllCardsRefresh) {
            try {
                console.log("Refreshing:", cardInfo.site);
                getAndSetData();
            } catch {
                console.error("Failed to refresh:", cardInfo.site);
            }
            context.refresh.setShouldAllCardsRefresh(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    return (
        <CardWrapper {...restProps}>
            <Title>{data[0]}</Title>
            <Data>
                <div>{data[1]}</div>
                <div>{data[2]}</div>
            </Data>
            <Icons
                style={{
                    color: context.theme.icons,
                }}
            >
                <MdClose onClick={() => removeCard(cardInfo.id)} />
                <MdRefresh
                    onClick={() => {
                        if (!isLoading) {
                            getAndSetData();
                        }
                    }}
                    className={isLoading ? "refreshing" : ""}
                />
            </Icons>
        </CardWrapper>
    );
};

export default Card;
