const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsCommentsCollection = () => getDatabase().collection("posts-comments");

async function getUserLikedPosts(userId, skip, limit) {
    const cursor = await getPostsLikesCollection().aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
            $lookup: {
                from: "posts",
                localField: "post_id",
                foreignField: "_id",
                as: "post",
            },
        },
        { $sort: { "post.publish_date": -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { post: 1 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function getPostCommentsList(postId, skip, limit) {
    const cursor = await getPostsCommentsCollection().aggregate([
        { $match: { post_id: new ObjectId(postId) } },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user_info",
            },
        },
        { $sort: { publish_date: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { user_id: 0 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function addNewPostComment(newPostComment) {
    await getPostsCommentsCollection().insertOne({
        ...newPostComment,
        post_id: new ObjectId(newPostComment.postId),
        user_id: new ObjectId(newPostComment.userId),
    });
}

async function findAndDeletePostComment(postId, userId) {
    const result = await getPostsCommentsCollection().deleteOne({
        post_id: new ObjectId(postId),
        user_id: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    getUserLikedPosts,
    getPostCommentsList,
    addNewPostComment,
    findAndDeletePostComment,
};
