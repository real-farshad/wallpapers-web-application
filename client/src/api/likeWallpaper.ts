async function likeWallpaper(wallpaperId: string) {
    const url = "/api/likes/" + wallpaperId;
    const result: any = await fetch(url);
    const success = result.success ? true : false;
    return success;
}

export default likeWallpaper;
