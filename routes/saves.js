const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createSave = require("../usecases/saves/createSave");
const queryUserSaves = require("../usecases/saves/queryUserSaves");
const deleteLike = require("../usecases/likes/deleteLike");

const router = express.Router();

router.post("/:id", authenticateUser, async (req, res, next) => {
    const wallpaperId = req.params.id;
    const userId = req.user._id;
    const db = req.database;

    const err = await createSave(wallpaperId, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.get("/:id", authenticateUser, async (req, res, next) => {
    const query = req.query;
    const userId = req.user._id;
    const db = req.database;

    const [err, saves] = await queryUserSaves(query, userId, db);
    if (err) return next(err);

    return res.json(saves);
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
    const wallpaperId = req.params.id;
    const userId = req.user._id;
    const db = req.database;

    const err = await deleteLike(wallpaperId, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
