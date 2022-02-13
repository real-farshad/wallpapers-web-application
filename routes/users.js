const express = require("express");
const createUser = require("../usecases/users/createUser");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const user = req.body;
    const db = req.database;

    const err = await createWallpaper(user, db);
    if (err) return next(err);

    return res.send({ success: true });
});

module.exports = router;
