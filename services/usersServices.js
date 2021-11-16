const { database } = require("../configs/mongodb");

const usersCollection = () => database().collection("users");

async function findUserByEmail(email) {
    const result = await usersCollection().findOne({ email });
    return result;
}

async function addNewUser(newUser) {
    const { insertedId } = await usersCollection().inserteOne(newUser);
    return insertedId;
}

module.exports = {
    findUserByEmail,
    addNewUser,
};
