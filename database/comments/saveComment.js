const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCommentsCollection = () => getDatabase().collection("comments");

async function saveComment(comment) {
    let error;

    try {
        await getCommentsCollection().insertOne({
            ...comment,
            wallpaperId: new ObjectId(comment.wallpaperId),
            userId: new ObjectId(comment.userId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = saveComment;
