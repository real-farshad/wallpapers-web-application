import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import CollectionCard from "./CollectionCard";
import "../styles/CollectionsPreview.scss";

function CollectionsPreview() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        (async () => {
            const collectionRes = await fetch("/api/collections/?limit=6");
            const popularCollections = await collectionRes.json();

            for (let collection of popularCollections) {
                const collectionsPostsRes = await fetch(
                    `/api/collections-posts/${collection._id}?limit=1`
                );
                const collectionPost = await collectionsPostsRes.json();
                console.log(collectionPost[0]);
                collection.imageUrl = collectionPost[0].post.imageUrl;
            }

            setCollections(popularCollections);
        })();
    }, []);

    return (
        <div className="collections-preview">
            <div className="collections-preview__title">
                <SectionTitle
                    title={
                        <span>
                            MOST <br />
                            POPULAR <br />
                            COLLECTIONS
                        </span>
                    }
                />
            </div>

            {collections.length > 0 &&
                collections.map((collection: any) => {
                    return (
                        <div className="collections-preview__card" key={collection._id}>
                            <CollectionCard data={collection} />
                        </div>
                    );
                })}
        </div>
    );
}

export default CollectionsPreview;
