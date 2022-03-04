async function getCollectionInfo(id: string) {
    const url = `/api/collections/${id}`;

    const res = await fetch(url);
    const collectionInfo = await res.json();

    return collectionInfo;
}

export default getCollectionInfo;
