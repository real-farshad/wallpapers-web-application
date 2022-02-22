const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function updateUser(userId, userUpdate) {
    let error;

    try {
        await getUsersCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $set: userUpdate }
        );

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = updateUser;
