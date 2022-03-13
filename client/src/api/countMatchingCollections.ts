interface countMatchingCollectionsTypes {
    title?: string;
}

async function countMatchingCollections({
    title,
}: countMatchingCollectionsTypes) {
    let url = `/api/collections/count/?`;
    url += title ? `&title=${title}` : "";

    const res = await fetch(url);
    const result = await res.json();

    console.log(result);

    return result.count;
}

export default countMatchingCollections;
