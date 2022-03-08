async function saveWallpaper(wallpaperId: string) {
    const url = "/api/saves/" + wallpaperId;
    const result: any = await fetch(url);
    const success = result.success ? true : false;
    return success;
}

export default saveWallpaper;
