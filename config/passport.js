const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const checkPassword = require("../utils/checkPassword");

module.exports.passportConfig = function (app, db) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                const email = username;
                const [err, user] = await db.findUserByEmail(email);
                if (err) return done(err);

                if (!user) {
                    return done(null, false, {
                        message: "invalid email or password!",
                    });
                }

                const hashCorrectPassword = await checkPassword(
                    password,
                    user.password
                );

                if (!hashCorrectPassword) {
                    return done(null, false, {
                        message: "invalid email or password!",
                    });
                }

                return done(null, user);
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    username: profile._json.name,
                    avatar: profile._json.picture,
                    local: false,
                };

                const [err, user] = await db.insertOrUpdateUser(
                    { googleId: profile.id },
                    newUser
                );
                if (err) done(err);

                done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const [err, user] = await db.findUserById(id);
        if (err) done(err);
        done(null, user);
    });
};

module.exports.passport = passport;
