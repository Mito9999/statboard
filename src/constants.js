import { nanoid } from "nanoid";

export const settingsArray = [
    { text: "Auto Update", value: "autoUpdate" },
    { text: "Light Mode", value: "lightMode" },
];

export const initialSettings = {
    autoUpdate: false,
    lightMode: false,
};

export const initialCards = [
    {
        site: "ethereum",
        data: ["0x5fa22d211d9f8d4cb094807ff8c468e664f18c97"],
        id: nanoid(),
    },
];

export const searchData = [
    { name: "Amazon", prefix: "a", url: "https://www.amazon.com/s?k={{query}}" },
    { name: "Google", prefix: "g", url: "https://www.google.com/search?q={{query}}" },
    { name: "Github", prefix: "gh", url: "https://github.com/search?q={{query}}" },
    { name: "Stack Overflow", prefix: "so", url: "https://stackoverflow.com/search?q={{query}}" },
    { name: "YouTube", prefix: "yt", url: "https://www.youtube.com/results?search_query={{query}}" },
    { name: "Google Calendar", prefix: "cal", url: "https://calendar.google.com/calendar" },
    { name: "Google Translate", prefix: "gt", url: "https://translate.google.com/?sl=en&tl=es&text={{query}}" },
    { name: "Google Fonts", prefix: "gfont", url: "https://fonts.google.com/?query={{query}}" },
    { name: "React Icons", prefix: "ri", url: "https://react-icons.github.io/react-icons/search?q={{query}}" },
    { name: "Wikipedia", prefix: "w", url: "https://www.wikipedia.org/wiki/{{query}}" },
    { name: "Read The Docs", prefix: "rtd", url: "https://readthedocs.org/search/?q={{query}}" },
    { name: "Reddit", prefix: "r", url: "https://www.reddit.com/search/?q={{query}}" },
    { name: "Mozilla Developer Network", prefix: "mdn", url: "https://developer.mozilla.org/en-US/search?q={{query}}" },
    { name: "Google Maps", prefix: "maps", url: "https://www.google.com/maps/search/{{query}}" },
    { name: "Yahoo Finance", prefix: "yf", url: "https://finance.yahoo.com/quote/{{query}}" },
    { name: "Namecheap", prefix: "nc", url: "https://www.namecheap.com/domains/registration/results/?domain={{query}}" },
    { name: "Netlify", prefix: "nfly", url: "https://app.netlify.com/" },
    { name: "Spanish Dict (Conjugations)", prefix: "sdc", url: "https://www.spanishdict.com/conjugate/{{query}}" },
    { name: "Node Package Manager (NPM) Search", prefix: "npms", url: "https://www.npmjs.com/search?q={{query}}" },
    { name: "Node Package Manager (NPM) Exact Match", prefix: "npm", url: "https://www.npmjs.com/package/{{query}}" },
    { name: "Vercel Dashboard", prefix: "vercel", url: "https://vercel.com/dashboard" },
];

export const selectDropdownStyles = (theme) => ({
    option: (provided, state) => ({
        ...provided,
        color: theme.text,
        backgroundColor: theme.background,
    }),
    control: (base, state) => ({
        ...base,
        color: theme.text,
        backgroundColor: theme.background,
        boxShadow: null,
    }),
    menuList: (base) => ({
        ...base,
        padding: 0,
    }),
    input: (base) => ({
        ...base,
        color: theme.text,
        fontFamily: "inherit",
    }),
    singleValue: (base) => ({
        ...base,
        color: theme.text,
    }),
});
