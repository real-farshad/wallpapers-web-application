const handleError = require("./utils/handleError");
const hashPassword = require("./utils/hashPassword");
const validateUserObject = require("./utils/validateUserObject");
const checkUniqueEmail = require("./utils/checkUniqueEmail");

async function createNewUser(req, res, next, database) {
    let user = req.body;

    let err;
    [err, user] = await validateUser(user, database);
    if (err) return handleError(err, res, next);

    user.password = await hashPassword(user.password);
    user.local = true;

    err = await addNewUserToDatabase(user, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function validateUser(userObject, database) {
    let [err, user] = await validateUserObject(userObject);
    if (err) return [err, null];

    err = await checkUniqueEmail(user.email, database);
    if (err) return [err, null];

    return [null, user];
}

async function addNewUserToDatabase(user, database) {
    try {
        await database.addNewUser(user);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewUser;
