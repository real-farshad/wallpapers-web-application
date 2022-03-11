const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function queryUserLikes(query, userId) {
    let error, likes;

    try {
        const { page, limit } = query;

        const pipeline = [
            {
                $match: {
                    userId: new ObjectId(userId),
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
            {
                $lookup: {
                    from: "saves",
                    let: {
                        wallpaperId: "$wallpaper._id",
                    },
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
                    liked: true,
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
            {
                $project: {
                    _id: "$wallpaper._id",
                    title: "$wallpaper.title",
                    "imageUrl.thumbnail": "$wallpaper.imageUrl.thumbnail",
                    likeCount: "$wallpaper.likeCount",
                    createdAt: 1,
                    publisher: "$publisher.username",
                    liked: 1,
                    saved: 1,
                },
            },
        ];

        const cursor = await getLikesCollection().aggregate(pipeline);
        likes = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        likes = null;
    }

    return [error, likes];
}

module.exports = queryUserLikes;
