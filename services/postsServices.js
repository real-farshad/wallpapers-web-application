const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsCollection = () => getDatabase().collection("posts");

async function searchPostsList(search, category, sort, skip, limit) {
    const find = {};
    if (search !== "") find.$text = { $search: search };
    if (category !== "") find.category = { category };

    const cursor = await getPostsCollection().aggregate([
        { $match: find },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function findPostById(id) {
    const cursor = await getPostsCollection().aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
    ]);

    const result = await cursor.toArray();
    return result[0];
}

async function addNewPost(newPost) {
    await getPostsCollection().insertOne(newPost);
}

async function findAndUpdatePostById(id, newPost) {
    const result = await getPostsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newPost }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeletePostById(id) {
    const result = await getPostsCollection().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount !== 1) return null;
    return result;
}

async function incrementPostLikeCount(id) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $inc: { like_count: 1 } }
    );
}

async function decrementPostLikeCount(id) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(id) },
        { $inc: { like_count: -1 } }
    );
}

module.exports = {
    searchPostsList,
    findPostById,
    addNewPost,
    findAndUpdatePostById,
    findAndDeletePostById,
    incrementPostLikeCount,
    decrementPostLikeCount,
};
