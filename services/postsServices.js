const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const postsCollection = () => database().collection("posts");

async function searchPostsList({ search, category_id, sort, skip, limit }) {
    const find = {};
    if (search !== "") find.$text = { $search: search };
    if (category_id !== "") find.category_id = { category_id };

    const cursor = await postsCollection().find(find).sort(sort).skip(skip).limit(limit);
    const result = await cursor.toArray();
    return result;
}

async function addNewPost(newPost) {
    await postsCollection().insertOne(newPost);
}

async function findAndUpdatePostById(id, newPost) {
    const result = await postsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newPost }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeletePostById(id) {
    const result = await postsCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function incrementPostLikeCount(id) {
    await postsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $inc: { like_count: 1 } }
    );
}

async function decrementPostLikeCount(id) {
    await postsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $inc: { like_count: -1 } }
    );
}

module.exports = {
    searchPostsList,
    addNewPost,
    findAndUpdatePostById,
    findAndDeletePostById,
    incrementPostLikeCount,
    decrementPostLikeCount,
};
