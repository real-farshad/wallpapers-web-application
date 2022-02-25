const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
    getDatabase().collection("collections-records");

async function queryCollectionRecords(collectionId, query) {
    let error, collectionRecords;

    try {
        let { page, limit } = query;
        const cursor = await getCollectionsRecordsCollection().aggregate([
            { $match: { collectionId: new ObjectId(collectionId) } },
            { $sort: { createdAt: -1 } },
            { $skip: page > 0 ? (page - 1) * limit : 0 },
            { $limit: limit > 0 ? limit : 10 },
            {
                $lookup: {
                    from: "wallpapers",
                    let: { id: "$wallpaperId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $lookup: {
                                from: "users",
                                let: { id: "$publisherId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$id"] },
                                        },
                                    },
                                    {
                                        $project: {
                                            username: 1,
                                        },
                                    },
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
                    ],
                    as: "wallpaper",
                },
            },
            {
                $project: {
                    _id: 0,
                    wallpaper: { $first: "$wallpaper" },
                },
            },
        ]);

        const result = await cursor.toArray();

        if (!result[0]) collectionRecords = null;
        else {
            const wallpapers = [];
            for (let record of result) wallpapers.push(record.wallpaper);
            collectionRecords = wallpapers;
        }

        error = null;
    } catch (err) {
        error = err;
        collectionRecords = null;
    }

    return [error, collectionRecords];
}

module.exports = queryCollectionRecords;
