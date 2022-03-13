const validateCountWallpapersQuery = require("../../validation/countWallpapersQuery");

async function getWallpapersCount(query, db) {
    let [err, validQuery] = await validateCountWallpapersQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let wallpapersCount;
    [err, wallpapersCount] = await db.getWallpapersCount(validQuery);
    if (err) return [err, wallpapersCount];

    return [null, wallpapersCount];
}

module.exports = getWallpapersCount;
