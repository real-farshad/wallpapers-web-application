interface getCollectionWallpapersTypes {
    id?: string;
    page: number;
    limit: number;
}

async function getCollectionWallpapers({
    id,
    page,
    limit,
}: getCollectionWallpapersTypes) {
    const url = `/api/collections-records/${id}?page=${page}&limit=${limit}`;

    const res = await fetch(url);
    const collectionWallpapers = await res.json();

    return collectionWallpapers;
}

export default getCollectionWallpapers;
