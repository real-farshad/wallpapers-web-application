const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createLike = require("../usecases/likes/createLike");

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
    const newLike = req.body;
    const userId = req.user._id;
    const db = req.database;

    const err = await createLike(newLike, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
