const handleError = require("./utils/handleError");
const hashPassword = require("./utils/hashPassword");
const validateUserObject = require("./validation/validateUserObject");
const checkPassword = require("./utils/checkPassword");
const checkUniqueEmail = require("./utils/checkUniqueEmail");

async function updateUser(req, res, next, database) {
    const currentUser = req.user;
    let updatedUser = req.body;

    let err = checkLocalUser(currentUser);
    if (err) return handleError(err, res, next);

    [err, updatedUser] = await validateUser(updatedUser, currentUser);
    if (err) return handleError(err, res, next);

    const emailHasChanged = updatedUser.email !== currentUser.email;
    if (emailHasChanged) {
        err = await checkUniqueEmail(updatedUser.email, database);
        if (err) return handleError(err, res, next);
    }

    updatedUser.password = await hashPassword(updatedUser.password);

    err = await updateUserInDatabase(currentUser._id, updatedUser, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

function checkLocalUser(user) {
    if (!user.local) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid operation!",
        };

        return knownError;
    }

    return null;
}

async function validateUser(updatedUserObject, currentUser) {
    let [err, updatedUser] = await validateUserObject(updatedUserObject);
    if (err) return [err, null];

    err = await checkPassword(updatedUser.password, currentUser.password);
    if (err) return [err, null];

    return [null, user];
}

async function updateUserInDatabase(userId, updatedUser, database) {
    try {
        const success = await database.findAndUpdateUserById(
            userId,
            updatedUser
        );

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no user with this id was found",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = updateUser;
