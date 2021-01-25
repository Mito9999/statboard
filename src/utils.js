const stringToObjectProperty = (path, obj) => {
    return path
        .split(".")
        .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
};

export const handleEmptyData = (text = "Error", text2 = text, text3 = text) => {
    return [<>{text}</>, <>{text2}</>, <>{text3}</>];
};

export const createCardFunction = (URL, cardInfo, texts) => {
    return (async () => {
        try {
            const data = await fetch(URL);
            const res = await data.json();

            if (Object.values(texts).length !== 2) {
                console.error("Must pass 2 key/value pairs into 'texts'");
            }

            return [
                <>{cardInfo.site}</>,
                <>
                    <span>
                        {stringToObjectProperty(Object.keys(texts)[0], res)}
                    </span>
                    {Object.values(texts)[0]}
                </>,
                <>
                    <span>
                        {stringToObjectProperty(Object.keys(texts)[1], res)}
                    </span>
                    {Object.values(texts)[1]}
                </>,
            ];
        } catch {
            return handleEmptyData();
        }
    })();

    // USAGE:
    // createCardFunction(
    //     "https://ethplorer.io/service/service.php?data=0x5fA22d211D9f8d4Cb094807fF8C468e664f18C97",
    //     cardInfo,
    //     {
    //         "ethPrice.rate": "USD",
    //         balance: "ETH",
    //     }
    // );
};
