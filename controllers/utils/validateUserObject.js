const { userSchema } = require("../schemas/usersSchemas");

async function validateUserObject(userObject) {
    try {
        const user = await userSchema.validateAsync(userObject);
        return [null, user];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateUserObject;
