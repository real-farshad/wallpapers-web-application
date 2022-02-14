const express = require("express");
const createUser = require("../usecases/users/createUser");

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
        if (!user) return res.status(401).json({ error: info.message });

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

router.get("/sign-out", (req, res) => {
    req.logout();
    return res.json({ signedOut: true });
});

module.exports = router;
