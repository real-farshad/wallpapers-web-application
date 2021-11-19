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
    let newUser = req.body;

    // validate request's body
    try {
        newUser = await userSchema.validateAsync(newUser);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // check if an user with this email already exists
        const userWithSameEmail = await database.findUserByEmail(newUser.email);

        if (userWithSameEmail) {
            return res.status(403).json({
                error: "an user with this email address already exists!",
            });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;

        // add new user to the database
        await database.addNewUser(newUser);

        // return success
        return res.json({ newUserCreated: true });
    } catch (err) {
        next(err);
    }
}

// PUT /
// req.body => username, email, password
async function updateUser(req, res, next, database) {
    // check for local account
    if (!req.user.username) {
        return res.status(400).json({
            error: "invalid operation!",
        });
    }

    let updatedUser = req.body;

    // validate request's body
    try {
        updatedUser = await userSchema.validateAsync(updatedUser);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate password
    const hasCorrectPassword = await bcrypt.compare(
        updatedUser.password,
        req.user.password
    );

    if (!hasCorrectPassword) {
        return res.status(401).json({
            error: "incorrect password!",
        });
    }

    try {
        // check if email has changed
        if (req.user.email !== updatedUser.email) {
            // check if an user with new email already exists
            const userWithSameEmail = await database.findUserByEmail(updatedUser.email);

            if (userWithSameEmail) {
                return res.status(403).json({
                    error: "an user with this email address already exists!",
                });
            }
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updatedUser.password, salt);
        updateUser.password = hashedPassword;

        // find and update user info
        const result = await database.findAndUpdateUserById(req.user._id, updatedUser);

        if (!result) {
            return res.status(404).json({
                error: "no user with this id was found!",
            });
        }

        // return success
        return res.json({ userInfoUpdated: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /
// req.body => password
async function deleteUser(req, res, next, database) {
    // check for local account
    if (req.user.username) {
        let userPassword = req.body.password;

        // validate request's body
        try {
            userPassword = await userPasswordSchema.validateAsync(userPassword);
        } catch (err) {
            return res.status(403).json({ error: err.message });
        }

        // validate password
        const hasCorrectPassword = await bcrypt.compare(userPassword, req.user.password);
        if (!hasCorrectPassword) {
            return res.status(401).json({
                error: "incorrect password!",
            });
        }
    }

    try {
        // find and delete user from database
        const result = await database.findAndDeleteUserById(req.user._id);

        if (!result) {
            return res.status(404).json({
                error: "no user with this id was found!",
            });
        }

        // return success
        return res.json({ userDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserInfo,
    createNewUser,
    updateUser,
    deleteUser,
};
