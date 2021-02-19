import React from "react";
import {
    theme,
    initialSettings as settings,
    initialCards as cards,
    initialRefresh as refresh,
} from "./constants";

const MainContext = React.createContext({ theme, settings, cards, refresh });

export default MainContext;
