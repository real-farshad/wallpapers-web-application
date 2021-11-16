const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const postsLikesCollection = () => database().collection("posts-likes");

async function addNewPostLike(newPostLike) {
    const { insertedId } = await postsLikesCollection().insertOne(newPostLike);
    return insertedId;
}

async function deletePostLikeById(post_id, user_id) {
    const { deletedCount } = await postsLikesCollection().deleteOne({
        post_id: new ObjectId(post_id),
        user_id: new ObjectId(user_id),
    });

    return deletedCount;
}

module.exports = {
    addNewPostLike,
    deletePostLikeById,
};
