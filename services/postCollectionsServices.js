const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostCollectionsCollection = () => getDatabase().collection("post-collections");

async function findPostCollections(skip, limit, numberOfPosts) {
    const cursor = await getPostCollectionsCollection().aggregate([
        {},
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { postsList: { $slice: [0, numberOfPosts] } },
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
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
    ]);

    const result = await cursor.toArray();
    return result;
}

module.exports = {
    findPostCollections,
};
