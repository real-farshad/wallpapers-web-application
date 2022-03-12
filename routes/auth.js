const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createUser = require("../usecases/users/createUser");
const { passport } = require("../config/passport");

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
    const user = req.body;
    const db = req.database;

    const err = await createUser(user, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.post("/sign-in", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return next({
                known: true,
                status: 401,
                error: info.message,
            });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ success: true });
        });
    })(req, res, next);
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/",
    }),
    (req, res) => res.redirect("http://localhost:3000/")
);

router.get("/check", authenticateUser, (req, res) => {
    const user = req.user;

    const userInfo = {
        username: user.username,
        avatar: user.avatar ? user.avatar : null,
        local: user.local,
    };

    return res.json(userInfo);
});

router.get("/sign-out", authenticateUser, (req, res) => {
    req.logout();
    return res.json({ success: true });
});

module.exports = router;
