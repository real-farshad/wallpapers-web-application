const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function queryCollections(query) {
    let error, collections;

    try {
        let { title, page, limit } = query;
        const match = title ? { $text: { $search: title } } : {};

        const cursor = await getCollectionsCollection().aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            { $skip: page > 0 ? (page - 1) * limit : 0 },
            { $limit: limit > 0 ? limit : 10 },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$userId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { username: 1 } },
                    ],
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "collections-records",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$collectionId", "$$id"] },
                            },
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 },
                        {
                            $lookup: {
                                from: "wallpapers",
                                let: { id: "$wallpaperId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$id"] },
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            "imageUrl.thumbnail": 1,
                                        },
                                    },
                                ],
                                as: "wallpaper",
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                "imageUrl.thumbnail": {
                                    $first: "$wallpaper.imageUrl.thumbnail",
                                },
                            },
                        },
                    ],
                    as: "wallpapers",
                },
            },
            {
                $project: {
                    title: 1,
                    createdAt: 1,
                    wallpaper: { $first: "$wallpapers" },
                    user: { $first: "$user" },
                },
            },
        ]);

        const result = await cursor.toArray();
        collections = result;

        error = null;
    } catch (err) {
        error = err;
        collections = null;
    }

    return [error, collections];
}

module.exports = queryCollections;
