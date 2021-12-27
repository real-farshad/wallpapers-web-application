import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/SearchField.scss";

function SearchField() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const title = searchParams.get("title");

    const [searchInput, setSearchInput] = useState(title ? title : "");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const searchInputIsTooShort = searchInput.length < 3;
        if (searchInputIsTooShort) return;

        const selection = searchParams.get("selection");
        const url = `/search?title=${searchInput}${
            selection ? `&selection=${selection}` : ""
        }`;

        navigate(url);
    }

    return (
        <form className="search-field" onSubmit={handleFormSubmit}>
            <input
                className="search-field__input"
                placeholder="SEARCH"
                maxLength={64}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </form>
    );
}

export default SearchField;
