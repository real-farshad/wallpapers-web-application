const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsLikesCollection = () => getDatabase().collection("posts-likes");

async function getUserLikedPosts(userId, skip, limit) {
    const cursor = await getPostsLikesCollection().aggregate([
        { $match: { user_id: new ObjectId(userId) } },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        { $sort: { "post.publish_date": -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { postId: 0 } },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function findOnePostLike(postId, userId) {
    const result = await getPostsLikesCollection().findOne({
        postId: new ObjectId(postId, userId),
        userId: new ObjectId(postId, userId),
    });

    return result;
}

async function addNewPostLike(newPostLike) {
    await getPostsLikesCollection().insertOne({
        ...postLike,
        postId: new ObjectId(newPostLike.postId),
        userId: new ObjectId(newPostLike.userId),
    });
}

async function findAndDeletePostLike(postId, userId) {
    const result = await getPostsLikesCollection().deleteOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    getUserLikedPosts,
    findOnePostLike,
    addNewPostLike,
    findAndDeletePostLike,
};
