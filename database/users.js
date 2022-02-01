const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getUsersCollection = () => getDatabase().collection("users");

async function findUserById(id) {
    const user = await getUsersCollection().findOne({ _id: new ObjectId(id) });
    return user;
}

async function findUserByEmail(email) {
    const user = await getUsersCollection().findOne({ email });
    return user;
}

async function addNewUser(newUser) {
    await getUsersCollection().insertOne(newUser);
}

async function insertOrUpdateUser(query, update) {
    const result = await getUsersCollection().findOneAndUpdate(
        query,
        { $set: update },
        { upsert: true, returnOriginal: false }
    );

    const user = result.value;
    return user;
}

async function findAndUpdateUserById(id, newUser) {
    const result = await getUsersCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newUser }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeleteUserById(id) {
    const result = await getUsersCollection().deleteOne({
        _id: new ObjectId(id),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    findUserById,
    findUserByEmail,
    addNewUser,
    insertOrUpdateUser,
    findAndUpdateUserById,
    findAndDeleteUserById,
};
