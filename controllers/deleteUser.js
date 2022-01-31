const handleError = require("./utils/handleError");
const { userPasswordSchema } = require("../schemas/usersSchemas");
const checkPassword = require("./utils/checkPassword");

async function deleteUser(req, res, next, database) {
    const currentUser = req.user;

    if (currentUser.local) {
        const confirmPassword = req.body;
        const passwordHash = user.password;

        const err = await validatePassword(confirmPassword, passwordHash);
        if (err) return handleError(err, res, next);
    }

    const err = await deleteUserFromDatabase(currentUser._id, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function validatePassword(password, hash) {
    try {
        await userPasswordSchema.validateAsync(password);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return knownError;
    }

    err = await checkPassword(password, hash);
    if (err) return err;

    return null;
}

async function deleteUserFromDatabase(userId) {
    try {
        const success = await database.findAndDeleteUserById(userId);

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no user with this id was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteUser;
