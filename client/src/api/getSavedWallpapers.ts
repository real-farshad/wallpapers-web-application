async function getSavedWallpapers(page: number, limit: number) {
    const url = `/api/saves?page=${page}&limit=${limit}`;

    const res = await fetch(url);
    const wallpapers = await res.json();

    return wallpapers;
}

export default getSavedWallpapers;
