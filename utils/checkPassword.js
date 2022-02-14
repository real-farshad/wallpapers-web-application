const bcrypt = require("bcrypt");

async function checkPassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

module.exports = checkPassword;
