import { useState } from "react";
import "../styles/SearchField.scss";

function SearchField() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { selection, text } = params;

    const [search, setSaerch] = useState(text ? text : "");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const searchTextIsTooShort = search.length < 3;
        if (searchTextIsTooShort) return;

        window.location.href = `/search?selection=${
            selection === "new" ? "new" : "popular"
        }&text=${search}`;
    }

    function handleSearchInputChange(e: any) {
        setSaerch(e.target.value);
    }

    return (
        <form className="search-field" onSubmit={handleFormSubmit}>
            <input
                className="search-field__input"
                placeholder="SEARCH"
                maxLength={64}
                value={search}
                onChange={handleSearchInputChange}
            />
        </form>
    );
}

export default SearchField;
