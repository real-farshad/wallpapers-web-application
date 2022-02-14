const checkPassword = require("../../utils/checkPassword");
const validatePassword = require("../../validation/password");

async function deleteUser(user, password, db) {
    let [err, validPassword] = await validatePassword(password);
    if (err) return { known: true, status: 400, message: err.message };

    const hasCorrectPassword = await checkPassword(
        validPassword,
        user.password
    );

    if (!hasCorrectPassword) {
        return { status: 400, message: "wrong password!" };
    }

    err = await db.deleteUser(user._id);
    if (err) return err;

    return null;
}

module.exports = deleteUser;
