const validateUserUpdate = require("../../validation/userUpdate");
const checkPassword = require("../../utils/checkPassword");

async function updateUser(userUpdate, user, db) {
    let [err, validUpdate] = await validateUserUpdate(userUpdate);
    if (err) return { known: true, status: 400, message: err.message };

    const hasCorrectPassword = await checkPassword(
        validUpdate.confirmationPassword,
        user.password
    );
    if (!hasCorrectPassword) {
        return {
            known: true,
            status: 400,
            message: "wrong confirmation password!",
        };
    }

    if (validUpdate.email) {
        let userWithSameEmail;
        [err, userWithSameEmail] = await db.findUserByEmail(validUpdate.email);
        if (err) return err;

        if (userWithSameEmail) {
            return {
                known: true,
                status: 400,
                message: "a user with this email already exists!",
            };
        }
    }

    err = await db.updateUser(user._id, validUpdate);
    if (err) return err;

    return null;
}

module.exports = updateUser;
