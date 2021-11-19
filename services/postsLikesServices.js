const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsLikesCollection = () => getDatabase().collection("posts-likes");

async function findOnePostLike(post_id, user_id) {
    const result = await getPostsLikesCollection().findOne({
        post_id: new ObjectId(post_id),
        user_id: new ObjectId(user_id),
    });

    return result;
}

async function addNewPostLike(newPostLike) {
    await getPostsLikesCollection().insertOne(newPostLike);
}

async function findAndDeletePostLike(post_id, user_id) {
    const result = await getPostsLikesCollection().deleteOne({
        post_id: new ObjectId(post_id),
        user_id: new ObjectId(user_id),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    findOnePostLike,
    addNewPostLike,
    findAndDeletePostLike,
};
