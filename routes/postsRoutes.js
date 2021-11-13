const express = require("express");
const postsDatabase = require("../services/postsServices");
const { getPostsController } = require("../controllers/postsControllers");

const router = express.Router();

router.get("/", (req, res, next) => getPostsController(postsDatabase, req, res, next));

module.exports = router;
