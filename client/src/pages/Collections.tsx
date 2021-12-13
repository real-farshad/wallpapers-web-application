import { useEffect, useState } from "react";
import StandardLayout from "../components/StandardLayout";
import SectionGrid from "../components/SectionGrid";
import SectionTitle from "../components/SectionTitle";
import InfiniteScrollCollections from "../components/InfiniteScrollCollections";
import "../styles/Collections.scss";

function Collections() {
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
        <StandardLayout>
            <SectionGrid>
                <div className="collections__title">
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

                <InfiniteScrollCollections
                    collections={popularCollections}
                    loadMoreCollections={loadMoreCollections}
                    collectionsFinished={collectionsFinished}
                />
            </SectionGrid>
        </StandardLayout>
    );
}

export default Collections;
