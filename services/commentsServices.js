const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCommentsCollection = () => getDatabase().collection("comments");

async function getUserCommentsList({ userId, skip, limit }) {
    const cursor = await getCommentsCollection().aggregate([
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
        { $project: { post: 1 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function getCommentsList(postId, skip, limit) {
    const cursor = await getCommentsCollection().aggregate([
        { $match: { postId: new ObjectId(postId) } },
        {
            $lookup: {
                from: "users",
                let: { id: "$userId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                    { $project: { username: 1, avatar: 1 } },
                ],
                as: "user",
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { userId: 0 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function addNewComment(newComment) {
    await getCommentsCollection().insertOne({
        ...newComment,
        postId: new ObjectId(newComment.postId),
        userId: new ObjectId(newComment.userId),
    });
}

async function findAndDeleteComment({ postId, userId }) {
    const result = await getCommentsCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function deleteManyCommentsByPostId(postId) {
    await getCommentsCollection().deleteMany({
        postId: new ObjectId(postId),
    });
}

module.exports = {
    getUserCommentsList,
    getCommentsList,
    addNewComment,
    findAndDeleteComment,
    deleteManyCommentsByPostId,
};
