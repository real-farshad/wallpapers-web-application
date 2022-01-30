const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getPostsCollection = () => getDatabase().collection("posts");

async function searchPostsList(
    search,
    categoryId,
    sort,
    duration,
    skip,
    limit
) {
    const query = {};
    if (search !== "") query.$text = { $search: search };
    if (categoryId !== "") query.categoryId = new ObjectId(categoryId);
    if (duration !== "") query.createdAt = { $gt: duration };

    const cursor = await getPostsCollection().aggregate([
        { $match: query },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                let: { id: "$publisherId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                    { $project: { username: 1, _json: { name: 1 } } },
                ],
                as: "publisher",
            },
        },
        {
            $project: {
                imageUrl: { thumbnail: 1 },
                title: 1,
                likeCount: 1,
                createdAt: 1,
                publisher: { $first: "$publisher" },
            },
        },
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
                let: { id: "$categoryId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                    { $project: { _id: 0, title: 1 } },
                ],
                as: "category",
            },
        },
        {
            $lookup: {
                from: "users",
                let: { id: "$publisherId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                    {
                        $project: {
                            avatar: 1,
                            username: 1,
                            _json: { name: 1 },
                        },
                    },
                ],
                as: "publisher",
            },
        },
        {
            $lookup: {
                from: "comments",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$postId", "$$id"] } } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 2 },
                    {
                        $lookup: {
                            from: "users",
                            let: { id: "$userId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$_id", "$$id"] },
                                    },
                                },
                                {
                                    $project: {
                                        avatar: 1,
                                        username: 1,
                                        _json: { name: 1 },
                                    },
                                },
                            ],
                            as: "user",
                        },
                    },
                    {
                        $project: {
                            description: 1,
                            createdAt: 1,
                            user: { $first: "$user" },
                        },
                    },
                ],
                as: "comments",
            },
        },
        {
            $project: {
                imageUrl: {
                    large: 1,
                },
                title: 1,
                likeCount: 1,
                createdAt: 1,
                category: { $first: "$category" },
                publisher: { $first: "$publisher" },
                comments: 1,
            },
        },
    ]);

    const result = await cursor.toArray();
    return result[0];
}

async function addNewPost(newPost) {
    await getPostsCollection().insertOne({
        ...newPost,
        publisherId: new ObjectId(newPost.categoryId),
        categoryId: new ObjectId(newPost.categoryId),
    });
}

async function findUserPostById({ postId, userId }) {
    const result = await getPostsCollection().findOne({
        postId: new ObjectId(postId),
        publisherId: new ObjectId(userId),
    });

    return result;
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

async function findAndDeletePostById(postId, userId) {
    const result = await getPostsCollection().deleteOne({
        _id: new ObjectId(postId),
        publisher: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function incrementLikeCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { likeCount: 1 } }
    );
}

async function decrementLikeCount(postId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { likeCount: -1 } }
    );
}

module.exports = {
    searchPostsList,
    findPostById,
    addNewPost,
    findUserPostById,
    findAndUpdatePostById,
    findAndDeletePostById,
    incrementLikeCount,
    decrementLikeCount,
};
