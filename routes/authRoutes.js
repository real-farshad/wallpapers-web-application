const express = require("express");
const { passport } = require("../configs/passport");
const database = require("../services");
const validateAuthorization = require("../middlewares/validateAuthorization");

const createNewUser = require("../controllers/createNewUser");

const router = express.Router();

router.post("/sign-up", (req, res, next) =>
    createNewUser(req, res, next, database)
);

router.post("/sign-in", (req, res, next) => {
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
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => res.redirect("/")
);

router.get("/sign-out", validateAuthorization, (req, res) => {
    req.logout();
    return res.json({ signedOut: true });
});

module.exports = router;
