const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function queryUserLikes(query, userId) {
    let error, likes;

    try {
        const { page, limit } = query;

        const cursor = await getLikesCollection()
            .find({ _id: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .skip(page > 0 ? (page - 1) * limit : 0)
            .limit(limit > 0 ? limit : 10);

        likes = await cursor.toArray();
        error = null;
    } catch (err) {
        error = err;
        likes = null;
    }

    return [error, likes];
}

module.exports = queryUserLikes;
