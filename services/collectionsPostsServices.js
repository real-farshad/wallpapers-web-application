const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCollectionsPostsCollection = () => getDatabase().collection("collections-posts");

async function findCollectionPosts(collectionId, skip, limit) {
    const cursor = await getCollectionsPostsCollection().aggregate([
        { $match: { collectionId: new ObjectId(collectionId) } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "posts",
                let: { id: "$postId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
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
                ],
                as: "post",
            },
        },
        {
            $project: {
                _id: 0,
                post: { $first: "$post" },
            },
        },
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

async function deleteManycollectionPostsByPostId(postId) {
    await getCollectionsPostsCollection().deleteMany({
        postId: new ObjectId(postId),
    });
}

module.exports = {
    findCollectionPosts,
    addNewCollectionPost,
    findCollectionPostByid,
    deleteCollectionPostById,
    deleteManycollectionPostsByPostId,
};
