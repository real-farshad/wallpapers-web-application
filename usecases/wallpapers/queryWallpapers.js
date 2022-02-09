const validateWallpapersQuery = require("../../validation/wallpapersQuery");

async function queryWallpapers(query, db) {
    let [err, validQuery] = await validateWallpapersQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let wallpapers;
    [err, wallpapers] = await db.queryWallpapers(validQuery);
    if (err) return err;

    return [null, wallpapers];
}

module.exports = queryWallpapers;
