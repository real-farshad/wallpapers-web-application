const saveUser = require("./saveUser");
const insertOrUpdateUser = require("./insertOrUpdateUser");
const findUserById = require("./findUserById");
const findUserByEmail = require("./findUserByEmail");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");

module.exports = {
    saveUser,
    insertOrUpdateUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
};
