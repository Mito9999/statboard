export const handleEmptyData = (text = "Error", text2 = text, text3 = text) => {
    return [<>{text}</>, <>{text2}</>, <>{text3}</>];
};

const resolve = (path, obj) => {
    return path
        .split(".")
        .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
};

export const createCardFunction = (URL, cardInfo, texts) => {
    return (async () => {
        try {
            const data = await fetch(URL);
            const res = await data.json();

            return [
                <>{cardInfo.site}</>,
                <>
                    <span>{resolve(Object.keys(texts)[0], res)}</span>
                    {Object.values(texts)[0]}
                </>,
                <>
                    <span>{resolve(Object.keys(texts)[1], res)}</span>
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
