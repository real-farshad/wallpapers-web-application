const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function queryUserSaves(query, userId) {
    let error, saves;

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
                    from: "likes",
                    localField: "wallpaper.0._id",
                    foreignField: "wallpaperId",
                    as: "like",
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
                },
            },
            {
                $addFields: {
                    saved: true,
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

        const cursor = await getSavesCollection().aggregate(pipeline);
        saves = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        saves = null;
    }

    return [error, saves];
}

module.exports = queryUserSaves;
