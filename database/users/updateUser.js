const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function deleteUser(userId) {
    let error;

    try {
        await getUsersCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $set: newUser }
        );

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = deleteUser;
