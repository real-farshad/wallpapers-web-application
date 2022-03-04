import { Fragment } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import CollectionCard from "./CollectionCard";

interface CollectionsInfiniteScrollTypes {
    collections: {
        _id: string;
    }[];
    collectionsFinished: boolean;
    setPage: (value: any) => void;
}

function CollectionsInfiniteScroll(props: CollectionsInfiniteScrollTypes) {
    const { collections, collectionsFinished, setPage } = props;

    const setLastCollection: (value: any) => void = useInfiniteScroll(setPage);

    return (
        <Fragment>
            {collections.length > 0 &&
                collections.map((collection, index) => {
                    const isLastCollection = index === collections.length - 1;
                    if (!collectionsFinished && isLastCollection) {
                        return (
                            <div ref={setLastCollection} key={collection._id}>
                                <CollectionCard data={collection} />
                            </div>
                        );
                    } else {
                        return (
                            <CollectionCard
                                data={collection}
                                key={collection._id}
                            />
                        );
                    }
                })}
        </Fragment>
    );
}

export default CollectionsInfiniteScroll;
