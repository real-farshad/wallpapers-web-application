const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getSavesCollection = () => getDatabase().collection("saves");

async function getUserSavedPosts(userId, skip, limit) {
    const cursor = await getSavesCollection().aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $sort: { createdAt: -1 } },
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

async function findOneSave(postId, userId) {
    const result = await getSavesCollection().findOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    return result;
}

async function addNewSave(newSave) {
    await getSavesCollection().insertOne({
        ...newSave,
        postId: new ObjectId(newSave.postId),
        userId: new ObjectId(newSave.userId),
    });
}

async function findAndDeleteSave(postId, userId) {
    const result = await getSavesCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function deleteManySavesByPostId(postId) {
    await getSavesCollection().deleteMany({
        postId: new ObjectId(postId),
    });
}

module.exports = {
    getUserSavedPosts,
    findOneSave,
    addNewSave,
    findAndDeleteSave,
    deleteManySavesByPostId,
};
