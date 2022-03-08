async function unsaveWallpaper(wallpaperId: string) {
    const url = "/api/saves/" + wallpaperId;

    const res = await fetch(url, { method: "DELETE" });
    const result: any = await res.json();

    const success = result.success ? true : false;
    return success;
}

export default unsaveWallpaper;
