const validateWallpapersQuery = require("../../validation/wallpapersQuery");

async function queryWallpapers(query, userId, db) {
    let [err, validQuery] = await validateWallpapersQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let wallpapers;
    [err, wallpapers] = await db.queryWallpapers(validQuery, userId);
    if (err) return [err, wallpapers];

    return [null, wallpapers];
}

module.exports = queryWallpapers;
