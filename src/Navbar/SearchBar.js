import React, { useState, useContext } from "react";
import { submitSearch } from "../utils";
import { MdSearch } from "react-icons/md";
import { searchData } from "../constants";
import ThemeContext from "../context";

export default function SearchBar() {
    const theme = useContext(ThemeContext);

    const [search, setSearch] = useState("");
    return (
        <div>
            <form
                onSubmit={(e) => submitSearch(e, search, searchData)}
                className="top-search-bar"
            >
                <input
                    type="text"
                    className="input"
                    style={{
                        marginRight: "15px",
                        border: `4px solid ${theme.card}`,
                    }}
                    onChange={({ target: { value } }) => {
                        setSearch(value);
                    }}
                />
                <MdSearch style={{ fontSize: "2em", cursor: "pointer" }} />
            </form>
        </div>
    );
}
