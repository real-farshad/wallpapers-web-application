const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
    getDatabase().collection("collections-records");

async function queryCollectionWallpapers(collectionId, userId, query) {
    let error, collectionWallpapers;

    try {
        const { page, limit } = query;
        const pipeline = [
            {
                $match: {
                    collectionId: new ObjectId(collectionId),
                },
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
                    from: "wallpapers",
                    localField: "wallpaperId",
                    foreignField: "_id",
                    as: "wallpaper",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "wallpaper.0.publisherId",
                    foreignField: "_id",
                    as: "publisher",
                },
            },
            {
                $addFields: {
                    wallpaper: {
                        $first: "$wallpaper",
                    },
                    publisher: {
                        $first: "$publisher",
                    },
                },
            },
        ];

        if (userId) {
            pipeline.push(
                ...[
                    {
                        $lookup: {
                            from: "likes",
                            let: { wallpaperId: "$wallpaperId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$userId",
                                                        new ObjectId(userId),
                                                    ],
                                                },
                                                {
                                                    $eq: [
                                                        "$wallpaperId",
                                                        "$$wallpaperId",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "like",
                        },
                    },
                    {
                        $lookup: {
                            from: "saves",
                            let: { wallpaperId: "$wallpaperId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$userId",
                                                        new ObjectId(userId),
                                                    ],
                                                },
                                                {
                                                    $eq: [
                                                        "$wallpaperId",
                                                        "$$wallpaperId",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "save",
                        },
                    },
                    {
                        $addFields: {
                            liked: {
                                $cond: {
                                    if: {
                                        $eq: ["$like", []],
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                            saved: {
                                $cond: {
                                    if: {
                                        $eq: ["$save", []],
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                    },
                ]
            );
        }

        pipeline.push({
            $project: {
                _id: "$wallpaper._id",
                createdAt: 1,
                title: "$wallpaper.title",
                publisher: "$publisher.username",
                "imageUrl.thumbnail": "$wallpaper.imageUrl.thumbnail",
                likeCount: "$wallpaper.likeCount",
                liked: 1,
                saved: 1,
            },
        });

        const cursor = await getCollectionsRecordsCollection().aggregate(
            pipeline
        );
        collectionWallpapers = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        collectionWallpapers = null;
    }

    return [error, collectionWallpapers];
}

module.exports = queryCollectionWallpapers;
