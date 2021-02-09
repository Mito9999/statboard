import React from "react";
import {
    theme,
    initialSettings as settings,
    initialCards as cards,
} from "./constants";

const MainContext = React.createContext({ theme, settings, cards });

export default MainContext;
