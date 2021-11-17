const bcrypt = require("bcrypt");
const userSchema = require("../schemas/usersSchemas");
const { passport } = require("../configs/passport");

// POST /
// req.body => username, email, password
async function signUpNewUser(req, res, next, database) {
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

async function signInUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({ error: info.message });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.json({ signedIn: true });
        });
    })(req, res, next);
}

async function signOutUser(req, res) {
    req.logout();
    return res.json({ signedOut: true });
}

module.exports = {
    signUpNewUser,
    signInUser,
    signOutUser,
};
