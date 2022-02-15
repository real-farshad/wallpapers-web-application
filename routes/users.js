const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const checkLocalUser = require("../middleware/checkLocalUser");
const deleteUser = require("../usecases/users/deleteUser");
const updateUser = require("../usecases/users/updateUser");

const router = express.Router();

router.put("/", authenticateUser, checkLocalUser, async (req, res, next) => {
    const userUpdate = req.body;
    const user = req.user;
    const db = req.database;

    const err = await updateUser(userUpdate, user, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.delete("/", authenticateUser, async (req, res, next) => {
    const user = req.user;
    const password = req.body.password;
    const db = req.database;

    const err = await deleteUser(user, password, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
