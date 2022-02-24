const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function queryUserSaves(query, userId) {
    let error, saves;

    try {
        const { page, limit } = query;

        const cursor = await getSavesCollection()
            .find({ _id: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .skip(page > 0 ? (page - 1) * limit : 0)
            .limit(limit > 0 ? limit : 10);

        saves = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        saves = null;
    }

    return [error, saves];
}

module.exports = queryUserSaves;
