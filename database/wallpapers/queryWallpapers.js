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
                imageUrl: { thumbnail: 1 },
                title: 1,
                likeCount: 1,
                createdAt: 1,
                publisher: { $first: "$publisher" },
                like: { $first: "$like" },
                save: { $first: "$save" },
            },
        });

        const cursor = await getWallpapersCollection().aggregate(pipeline);
        wallpapers = await cursor.toArray();

        for (let wallpaper of wallpapers) {
            if (wallpaper.like) wallpaper.liked = true;
            else wallpaper.liked = false;
            delete wallpaper.like;

            if (wallpaper.save) wallpaper.saved = true;
            else wallpaper.saved = false;
            delete wallpaper.save;
        }

        error = null;
    } catch (err) {
        error = err;
        wallpapers = null;
    }

    return [error, wallpapers];
}

module.exports = queryWallpapers;
