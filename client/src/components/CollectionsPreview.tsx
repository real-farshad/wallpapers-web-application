import { useEffect, useState } from "react";
import searchCollections from "../api/searchCollections";
import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import CollectionCard from "./CollectionCard";
import "../styles/CollectionsPreview.scss";

function CollectionsPreview() {
    const page = 1;
    const limit = 6;

    const [collections, setCollections] = useState([]);

    useEffect(() => {
        addNewCollections();
    }, []);

    async function addNewCollections() {
        const collections = await searchCollections({ page, limit });
        setCollections(collections);
    }

    return (
        <SectionGrid>
            <div className="collections-preview__title">
                <SectionInfoContainer>
                    <SectionTitle>
                        MOST <br />
                        POPULAR <br />
                        COLLECTIONS
                    </SectionTitle>
                </SectionInfoContainer>
            </div>

            {collections.length > 0 &&
                collections.map((collection: any) => {
                    return (
                        <div
                            className="collections-preview__card"
                            key={collection._id}
                        >
                            <CollectionCard data={collection} />
                        </div>
                    );
                })}
        </SectionGrid>
    );
}

export default CollectionsPreview;
