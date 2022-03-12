const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createComment = require("../usecases/comments/createComment");
const deleteComment = require("../usecases/comments/deleteComment");

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
    const comment = req.body;
    const userId = req.user._id;
    const db = req.database;

    const err = await createComment(comment, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
    const commentId = req.params.id;
    const userId = req.user._id;
    const db = req.database;

    const err = await deleteComment(commentId, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
