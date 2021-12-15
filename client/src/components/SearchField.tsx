import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/SearchField.scss";

function SearchField() {
    const { text } = useParams();

    const [search, setSaerch] = useState(text ? text : "");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const searchTextIsTooShort = search.length < 3;
        if (searchTextIsTooShort) return;

        window.location.href = "/search/" + search;
    }

    function handleSearchInputChange(e: any) {
        setSaerch(e.target.value);
    }

    return (
        <form className="search-field" onSubmit={handleFormSubmit}>
            <input
                className="search-field__input"
                placeholder="SEARCH"
                value={search}
                onChange={handleSearchInputChange}
            />
        </form>
    );
}

export default SearchField;
