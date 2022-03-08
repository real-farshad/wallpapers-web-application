const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findWallpaperById(wallpaperId, userId) {
    let error, wallpaper;

    try {
        const pipeline = [
            { $match: { _id: new ObjectId(wallpaperId) } },
            {
                $lookup: {
                    from: "categories",
                    let: { id: "$categoryId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { _id: 0, title: 1 } },
                    ],
                    as: "category",
                },
            },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$publisherId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        {
                            $project: {
                                avatar: 1,
                                username: 1,
                            },
                        },
                    ],
                    as: "publisher",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$wallpaperId", "$$id"] },
                            },
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 2 },
                        {
                            $lookup: {
                                from: "users",
                                let: { id: "$userId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$id"] },
                                        },
                                    },
                                    {
                                        $project: {
                                            avatar: 1,
                                            username: 1,
                                        },
                                    },
                                ],
                                as: "user",
                            },
                        },
                        {
                            $project: {
                                description: 1,
                                createdAt: 1,
                                user: { $first: "$user" },
                            },
                        },
                    ],
                    as: "comments",
                },
            },
        ];

        if (userId) {
            const likeLookup = {
                $lookup: {
                    from: "likes",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$wallpaperId", "$$id"] },
                                userId,
                            },
                        },
                    ],
                    as: "like",
                },
            };
            pipeline.push(likeLookup);
        }

        if (userId) {
            const saveLookup = {
                $lookup: {
                    from: "saves",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$wallpaperId", "$$id"] },
                                userId,
                            },
                        },
                    ],
                    as: "save",
                },
            };
            pipeline.push(saveLookup);
        }

        pipeline.push({
            $project: {
                imageUrl: {
                    large: 1,
                },
                title: 1,
                likeCount: 1,
                createdAt: 1,
                comments: 1,
                category: { $first: "$category" },
                publisher: { $first: "$publisher" },
                like: { $first: "$like" },
                save: { $first: "$save" },
            },
        });

        const cursor = await getWallpapersCollection().aggregate(pipeline);
        const result = await cursor.toArray();
        wallpaper = result[0];

        if (wallpaper.like) wallpaper.liked = true;
        else wallpaper.liked = false;
        delete wallpaper.like;

        if (wallpaper.save) wallpaper.saved = true;
        else wallpaper.saved = false;
        delete wallpaper.save;

        error = null;
    } catch (err) {
        error = err;
        wallpaper = null;
    }

    return [error, wallpaper];
}

module.exports = findWallpaperById;
