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
    const result = await database().findOneAndUpdate(query, update, {
        upsert: true,
        returnOriginal: false,
    });

    const user = result.value;
    return user;
}

async function addNewUser(newUser) {
    const { insertedId } = await usersCollection().inserteOne(newUser);
    return insertedId;
}

module.exports = {
    findUserById,
    findUserByEmail,
    findAndUpdateOneUser,
    addNewUser,
};
