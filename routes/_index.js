const express = require("express");
const categories = require("./categories");
const wallpapers = require("./wallpapers");
const users = require("./users");

const router = express.Router();

router.use("/categories", categories);
router.use("/wallpapers", wallpapers);
router.use("/users", users);

module.exports = router;
