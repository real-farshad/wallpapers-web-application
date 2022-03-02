type searchCollectionsTypes = ({ title, page, limit }: any) => Promise<any>;
const searchCollections: searchCollectionsTypes = async ({
    title,
    page,
    limit,
}) => {
    const url = `/api/collections/?title=${title}&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    const collections = await res.json();
    return collections;
};

export default searchCollections;
