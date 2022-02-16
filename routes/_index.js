const express = require("express");
const categories = require("./categories");
const wallpapers = require("./wallpapers");
const auth = require("./auth");
const users = require("./users");
const likes = require("./likes");

const router = express.Router();

router.use("/categories", categories);
router.use("/wallpapers", wallpapers);
router.use("/auth", auth);
router.use("/users", users);
router.use("/likes", likes);

module.exports = router;
