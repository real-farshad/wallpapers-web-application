async function unlikeWallpaper(wallpaperId: string) {
    const url = "/api/likes/" + wallpaperId;

    const res = await fetch(url, { method: "DELETE" });
    const result: any = await res.json();

    const success = result.success ? true : false;
    return success;
}

export default unlikeWallpaper;
