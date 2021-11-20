const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsCollection = () => getDatabase().collection("posts");

async function searchPostsList(search, categoryId, sort, skip, limit) {
    const query = {};
    if (search !== "") query.$text = { $search: search };
    if (categoryId !== "") query.categoryId = new ObjectId(categoryId);

    const cursor = await getPostsCollection().aggregate([
        { $match: query },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
        { $project: { categoryId: 0 } },
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
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $project: { categoryId: 0 } },
    ]);

    const result = await cursor.toArray();
    return result[0];
}

async function addNewPost(newPost) {
    await getPostsCollection().insertOne({
        ...newPost,
        categoryId: new ObjectId(newPost.categoryId),
    });
}

async function findAndUpdatePostById(id, updatedPost) {
    const result = await getPostsCollection().updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...updatedPost,
                categoryId: new ObjectId(updatedPost.categoryId),
            },
        }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeletePostById(id) {
    const result = await getPostsCollection().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount !== 1) return null;
    return result;
}

async function incrementPostLikeCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { like_count: 1 } }
    );
}

async function decrementPostLikeCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { like_count: -1 } }
    );
}

async function incrementPostCommentCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { comment_count: 1 } }
    );
}

async function decrementPostCommentCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { comment_count: -1 } }
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
    incrementPostCommentCount,
    decrementPostCommentCount,
};
