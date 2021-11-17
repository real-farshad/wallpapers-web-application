const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const database = require("../services/index");

module.exports.passportConfig = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const email = username;
                    const user = await database.findUserByEmail(email);

                    if (!user)
                        return done(null, false, {
                            message: "invalid email or password!",
                        });

                    const result = await bcrypt.compare(password, user.password);

                    if (!result) {
                        return done(null, false, {
                            message: "invalid email or password!",
                        });
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
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
                try {
                    const user = await database().findAndUpdateOneUser(
                        { googleId: profile.id },
                        { ...profile }
                    );

                    done(null, user);
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await database.findUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

module.exports.passport = passport;
