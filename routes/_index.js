const express = require("express");
const categories = require("./categories");
const wallpapers = require("./wallpapers");

const router = express.Router();

router.use("/categories", categories);
router.use("/wallpapers", wallpapers);

module.exports = router;
