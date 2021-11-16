const userSchema = require("../schemas/usersSchemas");

// POST /
// req.body => username, email, password
async function createNewUser(req, res, next, database) {
    let user;

    // validate request's body
    try {
        user = await userSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // check if an user with this email already exists
        const searchResult = await database.findUserByEmail(user.email);
        if (searchResult) {
            return res
                .status(403)
                .json({ error: "an user with this email address already exists!" });
        }

        // add new user to the database
        const newUserId = await database.addNewUser(user);

        // return new user's id
        return res.json({ newUserId });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewUser,
};
