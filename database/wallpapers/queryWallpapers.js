const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function queryWallpapers(query) {
    let error;
    let wallpapers;

    try {
        const { title, categoryId, duration, page, limit } = query;

        const match = {};
        if (title) match.$text = { $search: title };
        if (categoryId) match.categoryId = new ObjectId(categoryId);
        if (duration) match.createdAt = { $gt: duration };

        const cursor = await getWallpapersCollection().aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            { $skip: page > 0 ? (page - 1) * limit : 0 },
            { $limit: limit > 0 ? limit : 10 },
        ]);

        const result = await cursor.toArray();
        wallpapers = result;

        error = null;
    } catch (err) {
        error = err;
        wallpapers = null;
    }

    return [error, wallpapers];
}

module.exports = queryWallpapers;
