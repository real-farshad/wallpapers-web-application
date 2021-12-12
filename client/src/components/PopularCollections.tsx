import { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import InfiniteScrollCollections from "./InfiniteScrollCollections";
import "../styles/PopularCollections.scss";

function PopularCollections() {
    const [popularCollections, setPopularCollections] = useState([]);
    const [collectionsFinished, setCollectionsFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/collections/?sort=new&limit=8");
            const collections = await res.json();
            setPopularCollections(collections);
        })();
    }, []);

    async function loadMoreCollections() {
        const res = await fetch(`/api/collections/?sort=new&page=${page}&limit=8`);
        const collections = await res.json();

        setPopularCollections((prevState) => [...prevState, ...(collections as never[])]);
        if (collections.length < 8) setCollectionsFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <div className="popular-collections">
            <div className="popular-collections__info">
                <div className="popular-collections__period"></div>

                <div className="popular-collections__title">
                    <SectionTitle
                        title={
                            <span>
                                MOST <br />
                                RECENT <br />
                                WALLPAPERS
                            </span>
                        }
                    />
                </div>
            </div>

            <InfiniteScrollCollections
                collections={popularCollections}
                loadMoreCollections={loadMoreCollections}
                collectionsFinished={collectionsFinished}
            />
        </div>
    );
}

export default PopularCollections;
