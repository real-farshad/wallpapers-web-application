const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsSavesCollection = () => getDatabase().collection("posts-saves");

async function getUserSaveddPosts(userId, skip, limit) {
    const cursor = await getPostsSavesCollection().aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { _id: 0, post: 1 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function findOnePostSave(postId, userId) {
    const result = await getPostsSavesCollection().findOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    return result;
}

async function addNewPostSave(newPostSave) {
    await getPostsSavesCollection().insertOne({
        ...newPostSave,
        postId: new ObjectId(newPostSave.postId),
        userId: new ObjectId(newPostSave.userId),
    });
}

async function findAndDeletePostSave(postId, userId) {
    const result = await getPostsSavesCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    getUserSaveddPosts,
    findOnePostSave,
    addNewPostSave,
    findAndDeletePostSave,
};
