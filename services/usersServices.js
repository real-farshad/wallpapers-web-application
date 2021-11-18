const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const usersCollection = () => database().collection("users");

async function findUserById(id) {
    const user = await usersCollection().findOne({ _id: new ObjectId(id) });
    return user;
}

async function findUserByEmail(email) {
    const user = await usersCollection().findOne({ email });
    return user;
}

async function addNewUser(newUser) {
    await usersCollection().insertOne(newUser);
}

async function insertOrUpdateUser(query, update) {
    const result = await usersCollection().findOneAndUpdate(
        query,
        { $set: update },
        { upsert: true, returnOriginal: false }
    );

    const user = result.value;
    return user;
}

async function findAndUpdateUserById(id, newUser) {
    const result = await usersCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newUser }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeleteUserById(id) {
    const result = await usersCollection().deleteOne({
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
