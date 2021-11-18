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

async function findAndUpdateOneUser(query, update) {
    const result = await usersCollection().findOneAndUpdate(
        query,
        { $set: update },
        { upsert: true, returnOriginal: false }
    );

    const user = result.value;
    return user;
}

async function findAndUpdateUserById(id, newUser) {
    const { matchedCount, modifiedCount } = await usersCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newUser }
    );

    return [matchedCount, modifiedCount];
}

async function addNewUser(newUser) {
    const { insertedId } = await usersCollection().insertOne(newUser);
    return insertedId;
}

async function deleteUserById(id) {
    const { deletedCount } = await usersCollection().deleteOne({
        _id: new ObjectId(id),
    });

    return deletedCount;
}

module.exports = {
    findUserById,
    findUserByEmail,
    findAndUpdateOneUser,
    findAndUpdateUserById,
    addNewUser,
    deleteUserById,
};
