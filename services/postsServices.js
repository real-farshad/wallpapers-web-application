const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const postsCollection = () => database().collection("posts");

async function getPostsList({ search, category_id, sort, skip, limit }) {
    const find = {};
    if (search !== "") find.$text = { $search: search };
    if (category_id !== "") find.category_id = { category_id };

    const cursor = await postsCollection().find(find).sort(sort).skip(skip).limit(limit);
    const result = await cursor.toArray();
    return result;
}

async function addNewPost(newPost) {
    const { insertedId } = await postsCollection.insertOne(newPost);
    return insertedId;
}

async function updatePostById(id, newPost) {
    const { matchedCount, modifiedCount } = await postsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newPost }
    );

    return [matchedCount, modifiedCount];
}

async function deletePostById(id) {
    const { deletedCount } = await postsCollection().deleteOne({ _id: new ObjectId(id) });
    return deletedCount;
}

module.exports = {
    getPostsList,
    addNewPost,
    updatePostById,
    deletePostById,
};
