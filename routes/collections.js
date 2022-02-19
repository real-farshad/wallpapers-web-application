const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createCollection = require("../usecases/collections/createCollection");

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
    const collection = req.body;
    const userId = req.user._id;
    const db = req.database;

    const err = await createCollection(collection, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
