async function unlikeWallpaper(wallpaperId: string) {
    const url = "/api/likes/" + wallpaperId;
    const result: any = await fetch(url, { method: "DELETE" });
    const success = result.success ? true : false;
    return success;
}

export default unlikeWallpaper;
