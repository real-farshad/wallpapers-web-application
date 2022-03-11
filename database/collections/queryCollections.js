const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function queryCollections(query) {
    let error, collections;

    try {
        let { title, page, limit } = query;
        const match = title ? { $text: { $search: title } } : {};

        const pipeline = [
            {
                $match: match,
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $skip: page > 0 ? (page - 1) * limit : 0,
            },
            {
                $limit: limit > 0 ? limit : 10,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "collections-records",
                    localField: "_id",
                    foreignField: "collectionId",
                    as: "record",
                },
            },
            {
                $lookup: {
                    from: "wallpapers",
                    localField: "record.0.wallpaperId",
                    foreignField: "_id",
                    as: "wallpaper",
                },
            },
            {
                $addFields: {
                    user: {
                        $first: "$user",
                    },
                    wallpaper: {
                        $first: "$wallpaper",
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    wallpaperCount: 1,
                    createdAt: 1,
                    "user.username": "$user.username",
                    "wallpaper.imageUrl.thumbnail":
                        "$wallpaper.imageUrl.thumbnail",
                },
            },
        ];

        const cursor = await getCollectionsCollection().aggregate(pipeline);
        collections = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        collections = null;
    }

    return [error, collections];
}

module.exports = queryCollections;
