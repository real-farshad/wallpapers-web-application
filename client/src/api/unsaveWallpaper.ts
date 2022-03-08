async function unsaveWallpaper(wallpaperId: string) {
    const url = "/api/saves/" + wallpaperId;
    const result: any = await fetch(url, { method: "DELETE" });
    const success = result.success ? true : false;
    return success;
}

export default unsaveWallpaper;
