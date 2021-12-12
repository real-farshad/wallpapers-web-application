import { Fragment, useCallback, useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";

interface InfiniteScrollCollectionsTypes {
    collections: object[];
    collectionsFinished: boolean;
    loadMoreCollections: () => void;
}

function InfiniteScrollCollections(props: InfiniteScrollCollectionsTypes) {
    const { collections, collectionsFinished, loadMoreCollections } = props;

    const [reachedBottom, setReachedBottom] = useState(false);

    useEffect(() => {
        if (reachedBottom) {
            loadMoreCollections();
            setReachedBottom(false);
        }
    }, [reachedBottom]);

    const lastCollectionCardRef = useCallback((lastCollectionCard) => {
        if (lastCollectionCard !== null) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            observer.unobserve(lastCollectionCard as any);
                            setReachedBottom(true);
                        }
                    });
                },
                { threshold: 0.7 }
            );
            observer.observe(lastCollectionCard as any);
        }
    }, []);

    return (
        <Fragment>
            {collections.length > 0 &&
                collections.map((collection: any, collectionIndex) => {
                    const isLastWallpaper = collectionIndex === collections.length - 1;
                    const observe = isLastWallpaper && !collectionsFinished;
                    return observe ? (
                        <div ref={lastCollectionCardRef} key={collection._id}>
                            <CollectionCard data={collection} />
                        </div>
                    ) : (
                        <div key={collection._id}>
                            <CollectionCard data={collection} />
                        </div>
                    );
                })}
        </Fragment>
    );
}

export default InfiniteScrollCollections;
