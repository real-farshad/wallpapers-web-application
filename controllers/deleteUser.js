const bcrypt = require("bcrypt");
const { userPasswordSchema } = require("../schemas/usersSchemas");
const handleError = require("./utils/handleError");

// DELETE /
// req.body => password
async function deleteUser(req, res, next, database) {
    const localUser = req.user.local;
    if (localUser) {
        const err = await validatePassword({
            password: req.body,
            hash: req.user.password,
        });

        if (err) return handleError(err, res, next);
    }

    try {
        const success = await database.findAndDeleteUserById(req.user._id);

        if (!success) {
            return res.status(404).json({
                error: "no user with this id was found!",
            });
        }

        return res.json({ userDeleted: true });
    } catch (err) {
        return next(err);
    }
}

async function validatePassword({ password, hash }) {
    let validPassword;

    try {
        validPassword = await userPasswordSchema.validateAsync(password);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return knownError;
    }

    const hasCorrectPassword = await bcrypt.compare(validPassword, hash);
    if (!hasCorrectPassword) {
        const knownError = {
            known: true,
            status: 401,
            message: "incorrect password!",
        };

        return knownError;
    }

    return null;
}

module.exports = deleteUser;
