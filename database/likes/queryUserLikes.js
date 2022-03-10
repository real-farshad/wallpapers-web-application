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
                    from: "saves",
                    localField: "wallpaper.0._id",
                    foreignField: "wallpaperId",
                    as: "save",
                },
            },
            {
                $addFields: {
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
                $addFields: {
                    liked: true,
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
                $project: {
                    _id: {
                        $first: "$wallpaper._id",
                    },
                    title: {
                        $first: "$wallpaper.title",
                    },
                    "imageUrl.thumbnail": {
                        $first: "$wallpaper.imageUrl.thumbnail",
                    },
                    likeCount: {
                        $first: "$wallpaper.likeCount",
                    },
                    createdAt: {
                        $first: "$wallpaper.createdAt",
                    },
                    publisher: {
                        $first: "$publisher.username",
                    },
                    saved: 1,
                    liked: 1,
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
