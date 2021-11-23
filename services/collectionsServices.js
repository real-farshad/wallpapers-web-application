const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCollectionsCollection = () => getDatabase().collection("collections");

async function findCollections(skip, limit) {
    const cursor = await getCollectionsCollection().aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);

    const result = await cursor.toArray();
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

module.exports = {
    findCollections,
    findUserCollections,
    addNewCollection,
    findAndDeleteCollection,
};
