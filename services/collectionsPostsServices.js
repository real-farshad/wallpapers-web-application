const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCollectionsPostsCollection = () => getDatabase().collection("collections-posts");

async function findCollectionPosts(collectionId, skip, limit) {
    const cursor = await getCollectionsPostsCollection().aggregate([
        { $match: { collectionId: new ObjectId(collectionId) } },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function addNewCollectionPost(newCollectionPost) {
    await getCollectionsPostsCollection().insertOne({
        ...newCollectionPost,
        collectionId: new ObjectId(newCollectionPost.collectionId),
        postId: new ObjectId(newCollectionPost.postId),
    });
}

async function findCollectionPostByid(collectionPostId) {
    const result = await getCollectionsPostsCollection().findOne({
        _id: new ObjectId(collectionPostId),
    });

    return result;
}

async function deleteCollectionPostById(id) {
    const result = await getCollectionsPostsCollection().deleteOne({
        _id: new ObjectId(id),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    findCollectionPosts,
    addNewCollectionPost,
    findCollectionPostByid,
    deleteCollectionPostById,
};
