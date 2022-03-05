async function findWallpaper(id: string) {
    const url = `/api/wallpapers/${id}`;

    const res = await fetch(url);
    const wallpaper = await res.json();

    return wallpaper;
}

export default findWallpaper;
