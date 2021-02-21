import React, { useState, useContext } from "react";
import { submitSearch } from "../utils";
import { MdSearch } from "react-icons/md";
import { searchData } from "../constants";
import MainContext from "../context.js";

import styled from "styled-components";

const Form = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 800px) {
        display: none;
    }
`;

const Input = styled.input`
    height: 38px;
    border: 1px solid #aaa;
    border-radius: 10px;
    margin-top: 8px;
    outline: none;
    padding: 8px;
    margin-top: 0px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
`;

export default function SearchBar() {
    const { theme } = useContext(MainContext);

    const [search, setSearch] = useState("");
    return (
        <div>
            <Form onSubmit={(e) => submitSearch(e, search, searchData)}>
                <Input
                    type="text"
                    style={{
                        marginRight: "15px",
                        border: `2.5px solid ${theme.card}`,
                    }}
                    onChange={({ target: { value } }) => {
                        setSearch(value);
                    }}
                />
                <MdSearch
                    style={{ fontSize: "2em", cursor: "pointer" }}
                    onClick={(e) => submitSearch(e, search, searchData)}
                />
            </Form>
        </div>
    );
}
