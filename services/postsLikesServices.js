const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const postsLikesCollection = () => database().collection("posts-likes");

async function findOnePostLike(query) {
    const result = await postsLikesCollection().findOne(query);
    return result;
}

async function addNewPostLike(newPostLike) {
    await postsLikesCollection().insertOne(newPostLike);
}

async function findAndDeletePostLike(post_id, user_id) {
    const result = await postsLikesCollection().deleteOne({
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
