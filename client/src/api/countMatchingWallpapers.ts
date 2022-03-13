interface countMatchingWallpapersTypes {
    title?: string;
    category?: string;
    duration?: string;
}

async function countMatchingWallpapers({
    title,
    category,
    duration,
}: countMatchingWallpapersTypes) {
    let url = `/api/wallpapers/count/?`;
    url += title ? `&title=${title}` : "";
    url += category ? `&category=${category}` : "";
    url += duration ? `&duration=${duration}` : "";

    const res = await fetch(url);
    const result = await res.json();

    return result.count;
}

export default countMatchingWallpapers;
