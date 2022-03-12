interface searchWallpapersTypes {
    title?: string;
    category?: string;
    duration?: string;
    sort?: string;
    page: number;
    limit: number;
}

async function searchWallpapers({
    title,
    category,
    duration,
    sort,
    page,
    limit,
}: searchWallpapersTypes) {
    let url = `/api/wallpapers/?page=${page}&limit=${limit}`;
    url += title ? `&title=${title}` : "";
    url += category ? `&category=${category}` : "";
    url += duration ? `&duration=${duration}` : "";
    url += sort ? `&sort=${sort}` : "";

    const res = await fetch(url);
    const wallpapers = await res.json();

    return wallpapers;
}

export default searchWallpapers;
