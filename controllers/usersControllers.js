const bcrypt = require("bcrypt");
const { userSchema, userPasswordSchema } = require("../schemas/usersSchemas");

// GET /
async function getUserInfo(req, res) {
    let user;

    if (req.user.googleId) {
        // if user has signed up with google return google info
        user = {
            username: req.user._json.name,
            avatar: req.user._json.picture,
            local: false,
        };
    }

    // if user has signed up locally return local info
    user = {
        username: req.user.username,
        email: req.user.email,
        local: true,
    };

    return res.json(user);
}

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
            return res.status(403).json({
                error: "an user with this email address already exists!",
            });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        // add new user to the database
        const newUserId = await database.addNewUser(user);

        // return new user's id
        return res.json({ newUserId });
    } catch (err) {
        next(err);
    }
}

// PUT /
// req.body => username, email, password
async function updateUser(req, res, next, database) {
    // check for local account
    if (!req.user.local) {
        return res.status(400).json({
            error: "invalid operation!",
        });
    }

    let newUser;

    // validate request's body
    try {
        newUser = await userSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate password
    const isCorrectPassword = await bcrypt.compare(newUser.password, req.user.password);
    if (!isCorrectPassword) {
        return res.status(401).json({ error: "incorrect password!" });
    }

    try {
        // check if email has changed
        if (req.user.email !== req.body.email) {
            // check if an user with new email already exists
            const searchResult = await database.findUserByEmail(newUser.email);
            if (searchResult) {
                return res.status(403).json({
                    error: "an user with this email address already exists!",
                });
            }
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        // update user info
        const [matchedCount, modifiedCount] = await database.findAndUpdateUserById(
            req.user._id,
            newUser
        );

        if (matchedCount !== 1) {
            return res.status(404).json({ error: "no user with this id was found!" });
        }

        // return new user's id
        return res.json({ modifiedUsersCount: modifiedCount });
    } catch (err) {
        next(err);
    }
}

// DELETE /
// req.body => password
async function deleteUser(req, res, next, database) {
    // check for local account
    if (!req.user.local) {
        return res.status(400).json({
            error: "invalid operation!",
        });
    }

    // validate request's body
    try {
        await userPasswordSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate password
    const isCorrectPassword = await bcrypt.compare(req.body.password, req.user.password);
    if (!isCorrectPassword) {
        return res.status(401).json({ error: "incorrect password!" });
    }

    // delete user from database
    const deletedUsersCount = await database.deleteUserById(req.user._id);

    // return deleted users count
    return res.json({ deletedUsersCount });
}

module.exports = {
    getUserInfo,
    createNewUser,
    updateUser,
    deleteUser,
};
