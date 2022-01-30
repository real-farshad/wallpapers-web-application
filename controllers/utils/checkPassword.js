const bcrypt = require("bcrypt");

async function checkPassword(password, hash) {
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

module.exports = checkPassword;
