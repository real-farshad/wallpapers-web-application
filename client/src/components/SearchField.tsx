import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/SearchField.scss";

function SearchField() {
    const params = useParams();
    const [searchParams] = useSearchParams();

    const contentType = params.contentType ? params.contentType : "wallpapers";

    const title = searchParams.get("title");
    const [titleInput, setTitleInput] = useState(title ? title : "");

    const sort = searchParams.get("sort");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const hasValidTitle = titleInput.length > 3;
        if (!hasValidTitle) return;

        let url = `/search/${contentType}?title=${titleInput}`;
        if (contentType === "wallpapers" && sort) url += `&sort=${sort}`;

        window.location.replace(url);
    }

    return (
        <form className="search-field" onSubmit={handleFormSubmit}>
            <input
                className="search-field__input"
                placeholder="SEARCH"
                maxLength={64}
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
            />
        </form>
    );
}

export default SearchField;
