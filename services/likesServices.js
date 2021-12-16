const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getLikesCollection = () => getDatabase().collection("likes");

async function getUserLikes(userId, skip, limit) {
    const cursor = await getLikesCollection().aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $sort: { "post.createdAt": -1 } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        { $project: { _id: 0, post: 1 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function findOnePostLike(postId, userId) {
    const result = await getLikesCollection().findOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    return result;
}

async function addNewLike(newLike) {
    await getLikesCollection().insertOne({
        ...newLike,
        postId: new ObjectId(newLike.postId),
        userId: new ObjectId(newLike.userId),
    });
}

async function findAndDeleteLike(postId, userId) {
    const result = await getLikesCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function deleteManyLikesByPostId(postId) {
    await getLikesCollection().deleteMany({
        postId: new ObjectId(postId),
    });
}

module.exports = {
    getUserLikes,
    findOnePostLike,
    addNewLike,
    findAndDeleteLike,
    deleteManyLikesByPostId,
};
