const express = require("express");
const database = require("../services");
const { passport } = require("../configs/passport");

const {
    signUpNewUser,
    signInUser,
    signOutUser,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/sign-up", (req, res, next) => signUpNewUser(req, res, next, database));
router.post("/sign-in", (req, res, next) => signInUser(req, res, next));

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => res.redirect("/")
);

router.get("/sign-out", (req, res) => signOutUser(req, res));

module.exports = router;
