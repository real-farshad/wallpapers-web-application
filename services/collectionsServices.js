const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCollectionsCollection = () => getDatabase().collection("collections");

async function findCollections(search, skip, limit) {
    const query = {};
    if (search !== "") query.$text = { $search: search };

    const cursor = await getCollectionsCollection().aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                let: { id: "$userId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                    { $project: { username: 1, _json: { name: 1 } } },
                ],
                as: "user",
            },
        },
        {
            $lookup: {
                from: "collections-posts",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$collectionId", "$$id"] } } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 1 },
                    {
                        $lookup: {
                            from: "posts",
                            let: { id: "$postId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$_id", "$$id"] },
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        "imageUrl.thumbnail": 1,
                                    },
                                },
                            ],
                            as: "post",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            "imageUrl.thumbnail": {
                                $first: "$post.imageUrl.thumbnail",
                            },
                        },
                    },
                ],
                as: "posts",
            },
        },
        {
            $project: {
                title: 1,
                createdAt: 1,
                post: { $first: "$posts" },
                user: { $first: "$user" },
            },
        },
    ]);

    const result = await cursor.toArray();
    return result;
}

async function findCollectionById(id) {
    const result = await getCollectionsCollection().findOne({
        _id: new ObjectId(id),
    });

    return result;
}

async function findUserCollectionById({ collectionId, userId }) {
    const result = await getCollectionsCollection().findOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId),
    });

    return result;
}

async function findUserCollections(userId, skip, limit) {
    const cursor = await getCollectionsCollection()
        .find({ userId: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const result = await cursor.toArray();
    return result;
}

async function addNewCollection(newCollection) {
    await getCollectionsCollection().insertOne({
        ...newCollection,
        userId: new ObjectId(newCollection.userId),
    });
}

async function findAndDeleteCollection(collectionId, userId) {
    const result = await getCollectionsCollection().deleteOne({
        collectionId: new ObjectId(collectionId),
        userId: new ObjectId(userId),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

async function incrementCollectionPostCount(collectionId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(collectionId) },
        { $inc: { postCount: 1 } }
    );
}

async function decrementCollectionPostCount(collectionId) {
    await getPostsCollection().updateOne(
        { _id: new ObjectId(collectionId) },
        { $inc: { postCount: -1 } }
    );
}

module.exports = {
    findCollections,
    findCollectionById,
    findUserCollectionById,
    findUserCollections,
    addNewCollection,
    findAndDeleteCollection,
    incrementCollectionPostCount,
    decrementCollectionPostCount,
};
