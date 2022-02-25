const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function queryWallpapers(query) {
    let error, wallpapers;

    try {
        let { title, categoryId, duration, sort, page, limit } = query;

        const match = {};
        if (title) match.$text = { $search: title };
        if (categoryId) match.categoryId = new ObjectId(categoryId);
        if (duration) {
            const standardTime = new Date(`1-1-${duration}`).getTime();
            match.createdAt = { $gt: standardTime };
        }

        if (sort && sort === "popular") sort = { likeCount: -1 };
        else sort = { createdAt: -1 };

        const cursor = await getWallpapersCollection().aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: page > 0 ? (page - 1) * limit : 0 },
            { $limit: limit > 0 ? limit : 10 },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$publisherId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { username: 1 } },
                    ],
                    as: "publisher",
                },
            },
            {
                $project: {
                    imageUrl: { thumbnail: 1 },
                    title: 1,
                    likeCount: 1,
                    createdAt: 1,
                    publisher: { $first: "$publisher" },
                },
            },
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
