const express = require("express");
const createUser = require("../usecases/users/createUser");
const deleteUser = require("../usecases/users/deleteUser");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const user = req.body;
    const db = req.database;

    const err = await createWallpaper(user, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.delete("/", async (req, res, next) => {
    const user = req.user;
    const password = req.body.password;
    const db = req.database;

    const err = await deleteUser(user, password, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
