const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function findUserByEmail(email) {
    let error, user;

    try {
        user = await getUsersCollection().findOne({ email });
        error = null;
    } catch (err) {
        error = err;
        user = null;
    }

    return [error, user];
}

module.exports = findUserByEmail;
