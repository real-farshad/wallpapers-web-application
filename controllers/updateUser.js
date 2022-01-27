const bcrypt = require("bcrypt");
const { userSchema } = require("../schemas/usersSchemas");
const handleError = require("./utils/handleError");

// PUT /
// req.body => username, email, password
async function updateUser(req, res, next, database) {
    const localUser = req.user.local;
    if (!localUser) {
        return res.status(400).json({
            error: "invalid operation!",
        });
    }

    let [userError, user] = await validateUser(req.body);
    if (userError) return handleError(userError, res, next);

    const passwordError = await checkPassword({
        password: user.password,
        hash: req.user.password,
    });

    if (passwordError) return handleError(passwordError, res, next);

    const emailError = await checkEmail(
        {
            newEmail: user.email,
            previousEmail: req.user.email,
        },
        database
    );

    if (emailError) return handleError(emailError, res, next);

    user.password = await hashUserPassword(user.password);

    try {
        const success = await database.findAndUpdateUserById(
            req.user._id,
            user
        );

        if (!success) {
            return res.status(404).json({
                error: "no user with this id was found!",
            });
        }

        return res.json({ userInfoUpdated: true });
    } catch (err) {
        return next(err);
    }
}

async function validateUser(user) {
    try {
        const validUser = await userSchema.validateAsync(user);
        return [null, validUser];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

async function checkPassword({ password, hash }) {
    const hasCorrectPassword = await bcrypt.compare(password, hash);
    if (!hasCorrectPassword) {
        const knownError = {
            known: true,
            status: 401,
            message: "incorrect password!",
        };

        return knownError;
    } else {
        return null;
    }
}

async function checkEmail({ newEmail, previousEmail }, database) {
    const emailHasChanged = newEmail !== previousEmail;
    if (emailHasChanged) {
        const userWithSameEmail = await database.findUserByEmail(
            updatedUser.email
        );

        if (userWithSameEmail) {
            const knownError = {
                knwon: true,
                status: 403,
                message: "an user with this email address already exists!",
            };

            return knownError;
        }
    }

    return null;
}

function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports = updateUser;
