const bcrypt = require("bcrypt");
const { userSchema } = require("../schemas/usersSchemas");
const handleError = require("./utils/handleError");

// POST /
// req.body => username, email, password
async function createNewUser(req, res, next, database) {
    const [err, newUser] = await validateUser(req.body);
    if (err) return handleError(err, res, next);

    try {
        newUser.password = await hashUserPassword(newUser.password);
        newUser.local = true;

        await database.addNewUser(newUser);

        return res.json({ newUserCreated: true });
    } catch (err) {
        return next(err);
    }
}

async function validateUser(user) {
    let validUser = { ...user };

    try {
        validUser = await userSchema.validateAsync(validUser);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }

    try {
        const userWithSameEmail = await database.findUserByEmail(newUser.email);

        if (userWithSameEmail) {
            const knownError = {
                known: true,
                status: 403,
                message: "an user with this email address already exists!",
            };

            return [knownError, null];
        }
    } catch (err) {
        return [err, null];
    }

    return [null, validUser];
}

function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports = createNewUser;
