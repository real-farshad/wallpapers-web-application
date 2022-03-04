interface searchCollectionsTypes {
    title?: string;
    page: number;
    limit: number;
}

async function searchCollections({
    title,
    page,
    limit,
}: searchCollectionsTypes) {
    let url = `/api/collections/?page=${page}&limit=${limit}`;
    url += title ? `&title=${title}` : "";

    const res = await fetch(url);
    const collections = await res.json();

    return collections;
}

export default searchCollections;
