const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsCommentsCollection = () => getDatabase().collection("posts-comments");

async function getUserCommentsList(userId, skip, limit) {
    const cursor = await getPostsLikesCollection().aggregate([
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
        { $project: { post: 1 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function getPostCommentsList(postId, skip, limit) {
    const cursor = await getPostsCommentsCollection().aggregate([
        { $match: { postId: new ObjectId(postId) } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
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

async function addNewPostComment(newPostComment) {
    await getPostsCommentsCollection().insertOne({
        ...newPostComment,
        postId: new ObjectId(newPostComment.postId),
        userId: new ObjectId(newPostComment.userId),
    });
}

async function findAndDeletePostComment(postId, userId) {
    const result = await getPostsCommentsCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    getUserCommentsList,
    getPostCommentsList,
    addNewPostComment,
    findAndDeletePostComment,
};
