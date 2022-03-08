async function likeWallpaper(wallpaperId: string) {
    const url = "/api/likes/" + wallpaperId;

    const res = await fetch(url, { method: "POST" });
    const result: any = await res.json();

    console.log(result);

    const success = result.success ? true : false;
    return success;
}

export default likeWallpaper;
