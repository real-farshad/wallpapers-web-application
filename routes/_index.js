const express = require("express");
const categories = require("./categories");
const wallpapers = require("./wallpapers");
const auth = require("./auth");
const users = require("./users");
const likes = require("./likes");
const saves = require("./saves");
const comments = require("./comments");
const collections = require("./collections");
const collectionsRecords = require("./collectionsRecords");

const router = express.Router();

router.use("/categories", categories);
router.use("/wallpapers", wallpapers);
router.use("/auth", auth);
router.use("/users", users);
router.use("/likes", likes);
router.use("/saves", saves);
router.use("/comments", comments);
router.use("/collections", collections);
router.use("/collections-records", collectionsRecords);

module.exports = router;
