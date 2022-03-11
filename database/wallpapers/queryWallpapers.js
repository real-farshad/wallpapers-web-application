const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function queryWallpapers(query, userId) {
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

        const pipeline = [
            {
                $match: match,
            },
            {
                $sort: sort,
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
                    localField: "publisherId",
                    foreignField: "_id",
                    as: "publisher",
                },
            },
            {
                $addFields: {
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
                            let: { wallpaperId: "$_id" },
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
                            let: { wallpaperId: "$_id" },
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
                imageUrl: {
                    thumbnail: 1,
                },
                title: 1,
                likeCount: 1,
                createdAt: 1,
                publisher: "$publisher.username",
                liked: 1,
                saved: 1,
            },
        });

        const cursor = await getWallpapersCollection().aggregate(pipeline);
        wallpapers = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        wallpapers = null;
    }

    return [error, wallpapers];
}

module.exports = queryWallpapers;
